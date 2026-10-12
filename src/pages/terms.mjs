// /terms/ (and, via privacy.mjs, /privacy/) — brief §7 legal pages.
// Full text carried over VERBATIM from source/pages/<name>.md: no rewording, no fixes (the placeholder in Terms §2,
// "2-5 messages per month", the scott@ email and the Privacy §14 address are kept on purpose — flagged in brief §11).
// Only presentation is added: numbered sections, sticky contents rail with reading progress, definition / note styling,
// and links on text that already names a destination (emails, the site URL, "Privacy Policy", allaboutcookies.org).
// Styles: src/css/page-terms.css (all .lg-* scoped).
import fs from 'fs';
import { site } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const ROOT = new URL('../../', import.meta.url).pathname;
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pad = n => String(n).padStart(2, '0');

const DOCS = {
  terms: { label: 'Terms & Conditions', href: 'terms/' },
  privacy: { label: 'Privacy Policy', href: 'privacy/' },
};

/** Parse the scraped markdown into numbered sections of typed blocks. Text is never altered. */
function parse(name) {
  const lines = fs.readFileSync(ROOT + `source/pages/${name}.md`, 'utf8').split('\n').map(l => l.trim());
  const sections = [];
  let cur = null, list = null, addr = false;
  const push = b => { if (cur) cur.blocks.push(b); };
  const endList = () => { if (list) { push({ t: 'ul', items: list }); list = null; } };
  for (const l of lines) {
    if (!l) { endList(); continue; }
    if (/^(URL|Slug):/.test(l) || /^# /.test(l)) continue;
    const h = l.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (h) { endList(); addr = false; cur = { n: +h[1], title: h[2], id: `s${h[1]}-${slug(h[2])}`, blocks: [] }; sections.push(cur); continue; }
    if (/^##\s/.test(l)) continue; // document title heading (same as the H1)
    if (addr) { (cur.address ||= []).push(l); continue; }
    const li = l.match(/^[-•*]\s+(.*)$/);
    if (li) { (list ||= []).push(li[1]); continue; }
    endList();
    if (/^[A-Z][A-Z ]+:\s/.test(l)) { const [, k, v] = l.match(/^([^:]+:)\s(.*)$/); push({ t: 'note', k, v }); continue; }
    const def = l.match(/^([A-Z][A-Za-z &-]{2,40}:)\s(.+)$/);
    if (def) { const last = cur.blocks.at(-1); if (last?.t === 'dl') last.items.push([def[1], def[2]]); else push({ t: 'dl', items: [[def[1], def[2]]] }); continue; }
    if (l.length < 50 && !/[.:!?]$/.test(l) && !/https?:|www\./.test(l)) { push({ t: 'h3', text: l }); continue; }
    push({ t: 'p', text: l });
    if (/by post to:$/.test(l)) addr = true;
  }
  endList();
  return sections;
}

/** Escape + add links/emphasis on words that are already there. */
function inline(ctx, s, name) {
  let o = esc(s);
  o = o.replace(/([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,})/gi, '<a href="mailto:$1">$1</a>');
  o = o.replace(/http:\/\/colonial-electric\.com\//g, `<a href="${ctx.r('')}">http://colonial-electric.com/</a>`);
  o = o.replace(/www\.allaboutcookies\.org/g, '<a href="https://www.allaboutcookies.org" rel="noopener" target="_blank">www.allaboutcookies.org</a>');
  if (name === 'terms') o = o.replace(/our Privacy Policy/g, `our <a href="${ctx.r('privacy/')}">Privacy Policy</a>`);
  o = o.replace(/\b(STOP|HELP)\b/g, '<b class="lg-kw">$1</b>');
  return o;
}

/** "Lead phrase. rest" / "Lead: rest" list items get a bold lead-in (privacy §2, §4). */
function listItem(ctx, s, name) {
  const m = s.match(/^([A-Z][^.:]{2,48}[.:])\s(.+)$/);
  if (m && /^[A-Z]/.test(m[2])) return `<li><strong>${esc(m[1])}</strong> ${inline(ctx, m[2], name)}</li>`;
  return `<li>${inline(ctx, s, name)}</li>`;
}

function block(ctx, b, name) {
  switch (b.t) {
    case 'p': return `<p>${inline(ctx, b.text, name)}</p>`;
    case 'h3': return `<h3 class="lg-h3">${esc(b.text)}</h3>`;
    case 'ul': return `<ul class="lg-list" role="list">${b.items.map(i => listItem(ctx, i, name)).join('')}</ul>`;
    case 'dl': return `<dl class="lg-defs">${b.items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${inline(ctx, v, name)}</dd></div>`).join('')}</dl>`;
    case 'note': return `<aside class="lg-note"><span class="lg-note__icon">${icon('shield', { size: 20 })}</span><p><strong>${esc(b.k)}</strong> ${inline(ctx, b.v, name)}</p></aside>`;
  }
  return '';
}

export function legalPage(ctx, name) {
  const doc = DOCS[name];
  const other = DOCS[name === 'terms' ? 'privacy' : 'terms'];
  const sections = parse(name);
  const email = 'scott@colonial-electric.com';

  ctx.jsonld = [...(ctx.jsonld || []), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
    { '@type': 'ListItem', position: 2, name: doc.label, item: site.origin + '/' + doc.href },
  ] }];

  const tocItems = sections.map(s => `<li><a href="#${s.id}" data-lg-link><span class="lg-toc__n">${pad(s.n)}</span><span class="lg-toc__t">${esc(s.title)}</span></a></li>`).join('');

  const hero = `<section class="lg-hero on-dark stars-bg">
  <div class="container lg-hero__grid">
    <div class="lg-hero__text">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">${esc(doc.label)}</span></li></ol></nav>
      <p class="eyebrow">Legal</p>
      <h1 class="h1 lg-hero__h1">${esc(ctx.page.h1)}</h1>
      <nav class="lg-switch" aria-label="Legal documents">
        <a href="${ctx.r(DOCS.terms.href)}"${name === 'terms' ? ' aria-current="page"' : ''}>${esc(DOCS.terms.label)}</a>
        <a href="${ctx.r(DOCS.privacy.href)}"${name === 'privacy' ? ' aria-current="page"' : ''}>${esc(DOCS.privacy.label)}</a>
      </nav>
    </div>
    <div class="lg-seal" aria-hidden="true">
      <div class="lg-seal__crest">${picture(ctx, 'emblem', { alt: '', sizes: '200px', loading: 'eager' })}</div>
      <p class="lg-seal__name">Colonial Electric</p>
      <p class="lg-seal__lic">${esc(site.license)}</p>
    </div>
  </div>
  <div class="container">
    <dl class="lg-meta">
      <div><dt>Sections</dt><dd>${pad(sections.length)}</dd></div>
      <div><dt>Questions</dt><dd><a href="mailto:${email}">${email}</a></dd></div>
      <div><dt>Call Us</dt><dd><a href="${site.tel}">${site.phone}</a></dd></div>
    </dl>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;

  const body = sections.map(s => `<section class="lg-sec" id="${s.id}" aria-labelledby="${s.id}-h" data-lg-sec>
  <h2 class="lg-sec__h" id="${s.id}-h"><span class="lg-sec__n" aria-hidden="true">${pad(s.n)}</span><span class="sr-only">${s.n}. </span><span class="lg-sec__t">${esc(s.title)}</span></h2>
  <div class="lg-sec__body">
    ${s.blocks.map(b => block(ctx, b, name)).join('\n    ')}
    ${s.address ? `<address class="lg-address">${icon('pin', { size: 20 })}<span>${s.address.map(esc).join('<br>')}</span></address>` : ''}
  </div>
</section>`).join('\n');

  const doc_ = `<section class="lg-doc" data-lg>
  <div class="container lg-doc__grid">
    <details class="lg-mtoc">
      <summary><span class="label-wide">On this page</span><span class="lg-mtoc__count">${sections.length} sections</span>${icon('chevron-down', { size: 18 })}</summary>
      <ol role="list" class="lg-toc__list">${tocItems}</ol>
    </details>
    <aside class="lg-rail">
      <nav class="lg-toc" aria-label="On this page">
        <p class="label-wide lg-toc__label">On this page</p>
        <div class="lg-toc__track"><span class="lg-toc__fill" data-lg-fill></span></div>
        <ol role="list" class="lg-toc__list">${tocItems}</ol>
      </nav>
    </aside>
    <article class="lg-article" aria-label="${esc(doc.label)}">
      ${body}
      <footer class="lg-end">
        <a class="lg-next" href="${ctx.r(other.href)}">
          <span class="label-wide">Also read</span>
          <span class="lg-next__t">${esc(other.label)}</span>
          <span class="lg-next__arrow">${icon('arrow-right', { size: 22 })}</span>
        </a>
        <a class="lg-top" href="#main">Back to top</a>
      </footer>
    </article>
  </div>
</section>`;

  return [hero, doc_, script].join('\n');
}

// Scroll-spy + progress rail + close mobile contents on pick. Progressive enhancement only.
const script = `<script>
(function(){
  var root=document.querySelector('[data-lg]'); if(!root||!('IntersectionObserver' in window)) return;
  var secs=[].slice.call(root.querySelectorAll('[data-lg-sec]')), links=[].slice.call(root.querySelectorAll('[data-lg-link]')), fill=root.querySelector('[data-lg-fill]'), art=root.querySelector('.lg-article'), md=root.querySelector('.lg-mtoc');
  var set=function(id){links.forEach(function(a){var on=a.getAttribute('href')==='#'+id;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
  var vis={};
  var io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting;});for(var i=0;i<secs.length;i++){if(vis[secs[i].id]){set(secs[i].id);break;}}},{rootMargin:'-20% 0px -65% 0px'});
  secs.forEach(function(s){io.observe(s);});
  var tick=false, upd=function(){tick=false;var r=art.getBoundingClientRect(),h=r.height-window.innerHeight*.5,p=Math.min(1,Math.max(0,(window.innerHeight*.35-r.top)/h));if(fill)fill.style.transform='scaleY('+p.toFixed(4)+')';};
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true}); upd();
  if(md) md.addEventListener('click',function(e){if(e.target.closest('a'))md.open=false;});
})();
</script>`;

export function render(ctx) { return legalPage(ctx, 'terms'); }
