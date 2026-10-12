// Static site generator for the Colonial Electric pitch build.
// usage: node src/build.mjs
// - renders every page in src/data/pages.mjs → docs/<slug>/index.html (home → docs/index.html)
// - all internal URLs are relative (computed from depth) so the site works at / and under /colonial-electric/
// - CSS: src/css/base.css first, then every other src/css/*.css alphabetically → docs/assets/site.css
// - JS:  src/js/base.js first, then every other src/js/*.js alphabetically → docs/assets/site.js
// - copies src/assets → docs/assets; writes sitemap.xml, robots.txt, 404.html; keeps docs/.nojekyll
// - NEVER touches docs/build-progress/. Every write is atomic (temp file + rename): several builders run concurrently.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pages } from './data/pages.mjs';
import { site } from './data/site.mjs';
import { layout } from './partials/layout.mjs';

const SRC = new URL('./', import.meta.url).pathname;
const OUT = path.resolve(SRC, '../docs') + '/';
const t0 = Date.now();

function writeAtomic(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

function concat(dir, first, ext) {
  if (!fs.existsSync(dir)) return '';
  const files = fs.readdirSync(dir).filter(f => f.endsWith(ext) && f !== first && !f.startsWith('.')).sort();
  return [first, ...files].filter(f => fs.existsSync(dir + f))
    .map(f => `/* ===== ${f} ===== */\n${fs.readFileSync(dir + f, 'utf8')}`).join('\n');
}

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

// 1. CSS + JS bundles (version hash busts caches across rebuilds)
const css = concat(SRC + 'css/', 'base.css', '.css');
const js = concat(SRC + 'js/', 'base.js', '.js');
const version = crypto.createHash('md5').update(css + js).digest('hex').slice(0, 8);
writeAtomic(OUT + 'assets/site.css', css);
writeAtomic(OUT + 'assets/site.js', js);

// 2. Static assets
const copied = copyDir(SRC + 'assets', OUT + 'assets');

// 3. Pages
function makeCtx(page, { depth, baseTag = '' } = {}) {
  const d = depth ?? page.slug.split('/').filter(Boolean).length;
  const prefix = d ? '../'.repeat(d) : './';
  return {
    page, depth: d, prefix, version, baseTag,
    /** relative href to a site path like 'contact-us/' ('' = home) */
    r: (href = '') => /^(https?:|tel:|mailto:|#)/.test(href) ? href : prefix + href,
    /** relative href to docs/assets/<p> */
    asset: p => prefix + 'assets/' + p,
    jsonld: [],
  };
}

const seen = new Set();
const failures = [];
for (const page of pages) {
  if (seen.has(page.slug)) throw new Error('Duplicate slug ' + page.slug);
  seen.add(page.slug);
  const ctx = makeCtx(page);
  try {
    const mod = await import(`./pages/${page.template}.mjs`);
    const main = await mod.render(ctx);
    writeAtomic(OUT + page.slug + 'index.html', layout(ctx, main));
  } catch (e) {
    failures.push(page.slug || '/');
    console.error(`✗ /${page.slug}: ${e.stack || e}`);
  }
}

// 4. 404 — served by GitHub Pages from any depth: detect the base path, then resolve everything from the site root.
{
  const page = { slug: '404.html', title: 'Page Not Found', h1: 'Page Not Found', template: '404', description: site.homeDescription };
  const baseTag = `<script>(function(){var s=location.pathname.split('/')[1],b=(s==='colonial-electric'||s==='docs')?'/'+s+'/':'/';document.write('<base href="'+b+'">')})()</script>\n`;
  const ctx = makeCtx(page, { depth: 0, baseTag });
  const { render } = await import('./pages/notfound.mjs'); // branded 404 (brief §7); hrefs via ctx.r() resolve through baseTag
  const main = await render(ctx);
  writeAtomic(OUT + '404.html', layout(ctx, main).replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"'));
}

// 5. SEO files
const today = new Date().toISOString().slice(0, 10);
writeAtomic(OUT + 'sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${site.origin}/${p.slug}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
writeAtomic(OUT + 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
if (!fs.existsSync(OUT + '.nojekyll')) writeAtomic(OUT + '.nojekyll', '');

console.log(`built ${pages.length - failures.length}/${pages.length} pages + 404 · css ${(css.length / 1024).toFixed(1)}KB · js ${(js.length / 1024).toFixed(1)}KB · ${copied} assets copied · v${version} · ${Date.now() - t0}ms`);
if (failures.length) { console.error('FAILED: ' + failures.join(', ')); process.exitCode = 1; }
