// Static site generator for the Colonial Electric pitch build.
// usage: node src/build.mjs
// - renders every page in src/data/pages.mjs → docs/<slug>/index.html (home → docs/index.html)
// - all internal URLs are relative (computed from depth) so the site works at / and under /colonial-electric/
// - CSS: src/css/base.css first, then every other src/css/*.css alphabetically (the cascade order), minified.
//   Each page links only its template's bundle docs/assets/site-<template>.css (src/lib/css-split.mjs picks the files
//   that can style that template). docs/assets/site.css is still written with everything: it is the deploy marker the
//   GitHub workflows poll, and a fallback.
// - JS:  src/js/base.js first, then every other src/js/*.js alphabetically → docs/assets/site.js (minified)
// - copies src/assets → docs/assets (and prunes docs/assets/img files whose source is gone); writes 404.html and the
//   crawler files (src/lib/seo-files.mjs): sitemap.xml, robots.txt, llms.txt, llms-full.txt; keeps docs/.nojekyll
// - sitemap <lastmod> is per page and only moves when that page's <main> changes (hashes in src/data/lastmod.json).
// - NEVER touches docs/build-progress/. Every write is atomic (temp file + rename): several builders run concurrently.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pages } from './data/pages.mjs';
import { site } from './data/site.mjs';
import { layout } from './partials/layout.mjs';
import { minifyCss, minifyJs } from './lib/minify.mjs';
import { planner, pageFeatures, runtimeClasses } from './lib/css-split.mjs';
import { robotsTxt, sitemapXml, pagePhotos, llmsTxt, llmsFullTxt } from './lib/seo-files.mjs';

const SRC = new URL('./', import.meta.url).pathname;
const OUT = path.resolve(SRC, '../docs') + '/';
const t0 = Date.now();

function writeAtomic(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

/** [{ name, text }] for every <ext> file in dir: `first`, then the rest alphabetically. */
function sources(dir, first, ext) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(ext) && f !== first && !f.startsWith('.')).sort();
  return [first, ...files].filter(f => fs.existsSync(dir + f)).map(name => ({ name, text: fs.readFileSync(dir + name, 'utf8') }));
}
const concat = list => list.map(f => `/* ===== ${f.name} ===== */\n${f.text}`).join('\n');

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  let n = 0;
  for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const a = path.join(from, ent.name), b = path.join(to, ent.name);
    if (ent.isDirectory()) { n += copyDir(a, b); continue; }
    const sa = fs.statSync(a);
    if (fs.existsSync(b)) { const sb = fs.statSync(b); if (sb.size === sa.size && sb.mtimeMs >= sa.mtimeMs) continue; }
    writeAtomic(b, fs.readFileSync(a)); n++;
  }
  return n;
}

// Remove files under docs/assets/img that no longer exist in src/assets/img (retired or re-cropped images), so a
// published asset can never outlive its source. Scoped to img/ (site.css/site.js are written by this script).
function prune(from, to) {
  if (!fs.existsSync(to)) return 0;
  let n = 0;
  for (const ent of fs.readdirSync(to, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const a = path.join(from, ent.name), b = path.join(to, ent.name);
    if (ent.isDirectory()) {
      n += prune(a, b);
      if (!fs.existsSync(a) && !fs.readdirSync(b).length) fs.rmdirSync(b);
      continue;
    }
    if (!fs.existsSync(a)) { try { fs.unlinkSync(b); n++; } catch (e) { if (e.code !== 'ENOENT') throw e; } }
  }
  return n;
}

// 1. CSS + JS bundles (version hash busts caches across rebuilds). Per-template CSS bundles are written in step 4b,
// once every page has been rendered and we know which classes each template uses.
const cssSources = sources(SRC + 'css/', 'base.css', '.css');
const css = concat(cssSources);
const js = concat(sources(SRC + 'js/', 'base.js', '.js'));
const version = crypto.createHash('md5').update(css + js).digest('hex').slice(0, 8);
const siteCss = minifyCss(css), siteJs = minifyJs(js);
writeAtomic(OUT + 'assets/site.css', siteCss);
writeAtomic(OUT + 'assets/site.js', siteJs);
// docs/assets/site-<template>.css. Next to site.css on purpose: url(fonts/...) in the CSS resolves against the stylesheet.
const cssFor = template => `site-${template}.css`;

// 2. Static assets
const copied = copyDir(SRC + 'assets', OUT + 'assets');
const pruned = prune(SRC + 'assets/img', OUT + 'assets/img');

// 3. Pages
function makeCtx(page, { depth, baseTag = '' } = {}) {
  const d = depth ?? page.slug.split('/').filter(Boolean).length;
  const prefix = d ? '../'.repeat(d) : './';
  return {
    page, depth: d, prefix, version, baseTag, css: cssFor(page.template),
    /** relative href to a site path like 'contact-us/' ('' = home) */
    r: (href = '') => /^(https?:|tel:|mailto:|#)/.test(href) ? href : prefix + href,
    /** relative href to docs/assets/<p> */
    asset: p => prefix + 'assets/' + p,
    jsonld: [],
  };
}

// <lastmod> / JSON-LD dateModified: the day a page's <main> last changed (hashes in src/data/lastmod.json, see step 5).
// Read before rendering so each page's WebPage.dateModified (src/lib/schema.mjs) matches its sitemap <lastmod>.
const LASTMOD = SRC + 'data/lastmod.json';
const today = new Date().toISOString().slice(0, 10);
let prevLastmod = {};
try { prevLastmod = JSON.parse(fs.readFileSync(LASTMOD, 'utf8')); } catch { /* first build */ }
const mainHash = main => crypto.createHash('md5').update(main.replace(/\?v=[0-9a-f]+/g, '')).digest('hex').slice(0, 12);
const lastmodOf = (slug, h) => (prevLastmod[slug] && prevLastmod[slug].h === h ? prevLastmod[slug] : { h, d: today });

const seen = new Set();
const failures = [];
const outputs = []; // { file, html, template, page?, main? }: written in step 4b, after the CSS bundles
for (const page of pages) {
  if (seen.has(page.slug)) throw new Error('Duplicate slug ' + page.slug);
  seen.add(page.slug);
  const ctx = makeCtx(page);
  try {
    const mod = await import(`./pages/${page.template}.mjs`);
    const main = await mod.render(ctx);
    ctx.dateModified = lastmodOf(page.slug, mainHash(main)).d;
    outputs.push({ file: OUT + page.slug + 'index.html', html: layout(ctx, main), template: page.template, page, main });
  } catch (e) {
    failures.push(page.slug || '/');
    console.error(`✗ /${page.slug}: ${e.stack || e}`);
  }
}

// 4. 404: served by GitHub Pages from any depth: detect the base path, then resolve everything from the site root.
{
  // The browser's preload scanner reads the raw markup before the <base> below is written, so any static
  // relative asset (stylesheet, script, eager image) would be fetched against the bad URL first (stray 404s).
  // So site.css and site.js are written by script after <base>, and eager images are made lazy (the scanner skips lazy ones).
  const page = { slug: '404.html', title: 'Page Not Found', h1: 'Page Not Found', template: '404', description: site.homeDescription };
  const css404 = cssFor(page.template);
  const baseTag = `<script>(function(){var s=location.pathname.split('/')[1],b=(s==='colonial-electric'||s==='docs')?'/'+s+'/':'/';document.write('<base href="'+b+'"><link rel="stylesheet" href="'+b+'assets/${css404}?v=${version}">')})()</script>\n<noscript><link rel="stylesheet" href="${site.assetOrigin}/assets/${css404}?v=${version}"></noscript>\n`;
  const ctx = makeCtx(page, { depth: 0, baseTag });
  const { render } = await import('./pages/notfound.mjs'); // branded 404 (brief §7); hrefs via ctx.r() resolve through baseTag
  const main = await render(ctx);
  const swap = (html, from, to) => { if (!html.includes(from)) throw new Error('404: expected markup not found: ' + from); return html.replace(from, to); };
  let html = layout(ctx, main);
  html = swap(html, '<meta name="robots" content="max-image-preview:large">', '<meta name="robots" content="noindex">');
  // noindex page: no canonical or og:url (a self-canonical on a noindex URL sends mixed signals)
  html = swap(html, `<link rel="canonical" href="${site.origin}/404.html">\n`, '');
  html = swap(html, `<meta property="og:url" content="${site.origin}/404.html">\n`, '');
  html = swap(html, `<link rel="stylesheet" href="${ctx.asset(ctx.css)}?v=${version}">\n`, '');
  // Font preloads would hit the same pre-<base> URL problem; site.css (written after <base>) still loads the faces.
  html = html.replace(/<link rel="preload" as="font"[^>]*>\n/g, '');
  // In-page fragment links would resolve against <base> (the home page), so point them at this URL; then load site.js.
  html = swap(html, `<script src="${ctx.asset('site.js')}?v=${version}" defer></script>`,
    `<script>(function(){var u=location.href.split('#')[0];[].forEach.call(document.querySelectorAll('a[href^="#"]'),function(a){a.href=u+a.getAttribute('href')});document.write('<script src="assets/site.js?v=${version}"><\\/script>')})()</script>`);
  html = html.replace(/<img (?![^>]*\bloading=)/g, '<img loading="lazy" ').replace(/(<img [^>]*\bloading=)"eager"/g, '$1"lazy"');
  outputs.push({ file: OUT + '404.html', html, template: page.template });
}

// 4b. Per-template CSS bundles, then the pages that link them.
{
  const plan = planner(cssSources.map(f => ({ name: f.name, css: f.text })), runtimeClasses(SRC));
  const features = new Map();
  for (const o of outputs) features.set(o.template, pageFeatures(o.html, features.get(o.template)));
  const byName = new Map(cssSources.map(f => [f.name, f]));
  for (const [template, f] of features) writeAtomic(OUT + 'assets/' + cssFor(template), minifyCss(concat(plan(f).map(n => byName.get(n)))));
  // retire bundles of templates that no longer exist
  const live = new Set([...pages.map(p => p.template), '404'].map(cssFor));
  for (const f of fs.readdirSync(OUT + 'assets')) if (/^site-.+\.css$/.test(f) && !live.has(f)) fs.rmSync(OUT + 'assets/' + f, { force: true });
  for (const o of outputs) writeAtomic(o.file, o.html);
}

// 5. Crawler files (src/lib/seo-files.mjs). <lastmod> is the day a page's <main> last changed: a date that moved on
// every build would teach Google to ignore the field. Delete src/data/lastmod.json before the cut-over build so every
// URL starts at the cut-over date.
{
  const prev = prevLastmod;
  const next = {}, entries = [];
  for (const p of pages) {
    const o = outputs.find(x => x.page === p);
    const h = o ? mainHash(o.main) : prev[p.slug]?.h;
    next[p.slug] = lastmodOf(p.slug, h);
    entries.push({ slug: p.slug, lastmod: next[p.slug].d, images: o ? pagePhotos(o.main) : [] });
  }
  if (JSON.stringify(next) !== JSON.stringify(prev)) writeAtomic(LASTMOD, JSON.stringify(next, null, 1) + '\n');
  writeAtomic(OUT + 'sitemap.xml', sitemapXml(entries));
  writeAtomic(OUT + 'robots.txt', robotsTxt());
  writeAtomic(OUT + 'llms.txt', llmsTxt());
  writeAtomic(OUT + 'llms-full.txt', llmsFullTxt());
}
if (!fs.existsSync(OUT + '.nojekyll')) writeAtomic(OUT + '.nojekyll', '');

// 6. Cut-over guard: the production build (site.assetOrigin === site.origin, see README) must not point at a pitch host
// and must carry the GTM container on every page.
if (site.assetOrigin === site.origin) {
  const leaks = outputs.filter(o => /lightbryan26\.github\.io|\.vercel\.app/.test(o.html)).map(o => path.relative(OUT, o.file));
  if (leaks.length) throw new Error('production build still references a pitch host: ' + leaks.join(', '));
  if (site.gtm && outputs.some(o => !o.html.includes(`ns.html?id=${site.gtm}`))) throw new Error('production build: GTM container missing');
}

const kb = s => (Buffer.byteLength(s) / 1024).toFixed(1);
console.log(`built ${pages.length - failures.length}/${pages.length} pages + 404 · css ${kb(css)}KB → ${kb(siteCss)}KB min, per-template bundles assets/site-<template>.css · js ${kb(js)}KB → ${kb(siteJs)}KB · ${copied} assets copied${pruned ? `, ${pruned} stale pruned` : ''} · v${version} · ${Date.now() - t0}ms`);
if (failures.length) { console.error('FAILED: ' + failures.join(', ')); process.exitCode = 1; }
