// SERVICE template (brief §5): one template for all 13 service pages, incl. the /permanent-outdoor-lighting/ variant.
// Content: src/data/services.mjs (verbatim). Styles: src/css/tpl-service.css (every class prefixed .sv).
// Section order (brief §5): hero · intro · block A · block B · trust strip · guarantee · why choose (generator: services grid)
//   · contact CTA · booking process · reviews · quote + towns · contact form · FAQs.
// Variant (outdoor): hero+lead · 4 lighting panels · 8 features · why choose · CTA · booking · reviews · quote + towns.
import { services, serviceIntro, outdoor, whyChoose, serviceCards } from '../data/services.mjs';
import { towns } from '../data/towns.mjs';
import { site } from '../data/site.mjs';
import { bookingH2, whyIntro, trustItems, processSteps, quote } from '../data/shared.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { faqJsonLd } from '../blocks/faqs.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture, images } from '../lib/html.mjs';

const pad = n => String(n).padStart(2, '0');
const isLead = b => typeof b === 'string' && /:\s*$/.test(b);

/* ---------- body blocks ---------- */
function points(list, { steps = false } = {}) {
  const termed = list.every(i => i.term);
  if (!termed) {
    return `<ul class="svp-signs" role="list">${list.map(i => `<li>${icon('bolt', { size: 16 })}<span>${esc(i.text ?? i)}</span></li>`).join('')}</ul>`;
  }
  if (steps) {
    return `<ol class="svp-steps" role="list">${list.map((i, k) => `<li class="svp-steps__i"><span class="svp-steps__n" aria-hidden="true">${pad(k + 1)}</span><div><h3 class="svp-steps__t">${esc(i.term)}</h3><p>${esc(i.text)}</p></div></li>`).join('')}</ol>`;
  }
  return `<ul class="svp-points" role="list">${list.map((i, k) => `<li class="svp-point"><span class="svp-point__n" aria-hidden="true">${pad(k + 1)}</span><h3 class="svp-point__t">${esc(i.term)}</h3><p>${esc(i.text)}</p></li>`).join('')}</ul>`;
}
function body(blocks, opts) {
  let out = '';
  blocks.forEach((b, i) => {
    if (typeof b === 'string') {
      const next = blocks[i + 1];
      out += isLead(b) && next && next.list && !opts?.plainLeads ? `<p class="svp-listlead">${esc(b.replace(/:\s*$/, ''))}</p>` : `<p>${esc(b)}</p>`;
    } else if (b.list) out += points(b.list, opts);
  });
  return out;
}

/* ---------- hero media: the actual service, never the founder portrait ----------
   A real Colonial job photo (photos/services/<slug>.jpg -> images.json 'services/<slug>') fills a crest frame dressed
   like the badge: white inner border, navy keyline, red offset crest and the flag-stripe tab, signed with the real
   badge. A service with no photo yet gets a typographic service sheet in the same frame: its homepage blurb and its
   own listed points, all verbatim (brief §8: no drawn or generated stand-ins for photos). */
const HERO_SIZES = '(min-width: 1280px) 34rem, (min-width: 960px) 40vw, 92vw';
const heroPhotoKey = s => (images['services/' + s.slug] ? 'services/' + s.slug : null);
const badge = (ctx, alt = '', loading = 'lazy') => `<picture><source type="image/webp" srcset="${ctx.asset('img/logo-badge-250.webp')}"><img src="${ctx.asset('img/logo-badge-250.png')}" width="250" height="150" alt="${esc(alt)}" loading="${loading}" decoding="async"></picture>`;
const cardFor = s => serviceCards.find(c => c.href === s.slug + '/');

/* The sheet's points, verbatim: the service's own term list (block A, then block B) under its list lead or H2;
   failing that, its FAQ questions as jump links to the open answer (the FAQ section's own heading, "FAQs"). */
function sheetPoints(s) {
  for (const blk of [s.a, s.b].filter(Boolean)) {
    const i = blk.body.findIndex(x => x.list && x.list.every(it => it.term));
    if (i < 0) continue;
    const prev = blk.body[i - 1];
    const label = typeof prev === 'string' && isLead(prev) ? prev.replace(/:\s*$/, '') : blk.h2;
    return { kind: 'terms', label, items: blk.body[i].list.map(it => ({ text: it.term })) };
  }
  if (s.faqs?.length) return { kind: 'faq', label: 'FAQs', items: s.faqs.map((f, i) => ({ text: f.q, href: `#svp-q-${i + 1}` })) };
  return null;
}

function heroSheet(ctx, s) {
  const card = cardFor(s);
  let inner;
  if (s.outdoor) {
    inner = `<p class="svp-sheet__k">Lighting services</p>
          <ol class="svp-sheet__nav" role="list">${outdoor.panels.map((p, i) => `<li><a href="#ol-${p.id}"><span class="svp-sheet__n">${pad(i + 1)}</span><span>${esc(p.title)}</span>${icon('arrow-right', { size: 16 })}</a></li>`).join('')}</ol>
          <ul class="svp-sheet__chips" role="list" aria-label="Lighting system features">${outdoor.features.map(f => `<li>${esc(f.title)}</li>`).join('')}</ul>`;
  } else {
    const pts = sheetPoints(s);
    inner = `${card ? `<p class="svp-sheet__blurb">${esc(card.blurb)}</p>` : ''}
          ${pts ? `<div class="svp-sheet__pts"><p class="svp-sheet__k">${esc(pts.label)}</p><ul class="svp-sheet__list svp-sheet__list--${pts.kind}" role="list">${pts.items.map(t => t.href
            ? `<li><a href="${t.href}"><span>${esc(t.text)}</span>${icon('arrow-right', { size: 16 })}</a></li>`
            : `<li>${icon('bolt', { size: 14 })}<span>${esc(t.text)}</span></li>`).join('')}</ul></div>` : ''}`;
  }
  return `<div class="svp-hero__media svp-hero__media--sheet">
      <div class="svp-hero__frame">
        <div class="svp-crest"><div class="svp-crest__mat"><div class="svp-sheet${s.outdoor ? ' svp-sheet--ol' : ''}">
          <div class="svp-sheet__top"><span class="svp-sheet__ic" aria-hidden="true">${icon(s.icon, { size: 30 })}</span><span class="svp-sheet__badge">${badge(ctx, 'Colonial Electric', 'eager')}</span></div>
          ${inner}
        </div></div></div>
      </div>
    </div>`;
}

function heroMedia(ctx, s) {
  const key = heroPhotoKey(s);
  if (!key) return heroSheet(ctx, s);
  const soft = images[key].w < 600 ? ' svp-hero__media--soft' : '';
  return `<figure class="svp-hero__media svp-hero__media--photo${soft}">
      <div class="svp-hero__frame">
        <div class="svp-crest"><div class="svp-crest__mat">${picture(ctx, key, { alt: s.heroAlt || `${s.h1} by Colonial Electric`, sizes: HERO_SIZES, priority: true, imgCls: 'svp-hero__img', style: s.heroFocus ? `object-position: ${s.heroFocus}` : '' })}</div></div>
      </div>
      <figcaption class="svp-hero__sign">${badge(ctx, 'Colonial Electric', 'eager')}</figcaption>
    </figure>`;
}

/* ---------- hero ---------- */
function hero(ctx, s, idx, { lead = '' } = {}) {
  const crumbs = [{ label: 'Home', href: '' }, { label: 'Services', href: 'services/' }, { label: s.h1 }];
  ctx.jsonld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) });
  return `<section class="svp-hero on-dark stars-bg" aria-labelledby="svp-h1">
  <div class="container svp-hero__grid">
    <div class="svp-hero__copy">
      <nav class="crumbs svp-hero__crumbs" aria-label="Breadcrumb"><ol role="list">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<li><a href="${ctx.r(c.href)}">${esc(c.label)}</a></li>` : `<li><span aria-current="page">${esc(c.label)}</span></li>`).join('')}</ol></nav>
      <p class="svp-hero__kicker"><span class="svp-hero__ic">${icon(s.icon, { size: 22 })}</span><span class="svp-hero__idx">Service ${pad(idx + 1)} <span aria-hidden="true">/</span> ${pad(services.length)}</span></p>
      <h1 class="svp-hero__h1" id="svp-h1">${esc(s.h1).replace(/\//g, '/<wbr>')}</h1>
      <p class="svp-hero__line">${esc(s.heroLine)}</p>
      ${lead ? `<p class="svp-hero__lead">${esc(lead)}</p>` : ''}
      <div class="svp-hero__ctas">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a>
        <a class="btn btn--ghost btn--lg" href="${ctx.r('contact-us/')}"><span>Contact Us Today</span>${icon('arrow-right', { size: 18 })}</a>
      </div>
      <ul class="svp-hero__facts" role="list">
        <li>${icon('shield', { size: 18 })}<span>Licensed &amp; Insured</span></li>
        <li><span class="svp-hero__lic">${esc(site.license)}</span></li>
        <li>${icon('pin', { size: 18 })}<span>Weymouth &amp; the South Shore</span></li>
      </ul>
    </div>
    ${heroMedia(ctx, s)}
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

/* ---------- overview: intro + block A with sticky rail ---------- */
function overview(ctx, s) {
  const toc = [['svp-intro', 'Overview'], s.a && ['svp-a', s.a.h2], s.b && ['svp-b', s.b.h2], s.faqs?.length && ['svp-faqs', 'FAQs']].filter(Boolean);
  const rail = `<aside class="svp-rail" aria-label="On this page">
      <div class="svp-rail__in">
        <p class="svp-rail__label">On this page</p>
        <ol class="svp-toc" role="list">${toc.map(([id, t], i) => `<li><a href="#${id}"><span class="svp-toc__n">${pad(i + 1)}</span><span>${esc(t)}</span></a></li>`).join('')}</ol>
        <div class="svp-callcard">
          <p class="svp-callcard__k">Call Us Today!</p>
          <a class="svp-callcard__tel" href="${site.tel}">${site.phone}</a>
          <a class="btn btn--red btn--block" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a>
          <p class="svp-callcard__lic">${icon('shield', { size: 14 })}<span>Licensed &amp; Insured · <span class="nowrap">${esc(site.license)}</span></span></p>
        </div>
      </div>
    </aside>`;
  return `<section class="svp-over" aria-label="Overview">
  <div class="container svp-over__grid">
    ${rail}
    <div class="svp-over__main">
      <div class="svp-intro" id="svp-intro">
        <p class="svp-intro__k label-wide">${icon('bolt', { size: 14 })}Overview</p>
        <p class="svp-intro__p">${esc(serviceIntro)}</p>
      </div>
      ${s.a ? `<article class="svp-a svp-reveal" id="svp-a" aria-labelledby="svp-a-h">
        <header class="svp-sechead"><span class="svp-sechead__n" aria-hidden="true">01</span><h2 class="svp-h2" id="svp-a-h">${esc(s.a.h2)}</h2></header>
        <div class="svp-copy">${body(s.a.body)}</div>
      </article>` : ''}
    </div>
  </div>
</section>`;
}

/* ---------- block B media ----------
   A second real Colonial job photo where one truthfully shows this service (photos/library, keys 'photos/<name>'),
   framed like the hero. The service's homepage blurb (verbatim, brief §4.4) rides on the photo as a note, or stands
   alone as a navy statement card when there is no second photo. Services whose hero is the typographic sheet already
   carry the blurb up top, so their block B runs as a two-column text spread instead. */
// ar: the frame's aspect ratio (w/h; omitted = the photo's own). A portrait crop of a landscape photo is used only
// where the subject sits in that slice, and the frame is never wider than the pixels it shows (no upscaling).
const B_PHOTOS = {
  'electrical-panel-upgrade': { key: 'photos/panel-branch-circuits', ar: 4 / 5, focus: '46% 50%', alt: 'New breaker panel with branch circuits landed and the cover off, on a diamond-plate backboard' },
  'generator': { key: 'photos/generator-transfer-switch-panels', alt: 'Generac transfer switch beside two breaker panels on a diamond-plate backboard' },
  'surge-protection': { key: 'photos/panel-surge-protector', alt: 'Breaker panel with a plug-in surge protective device at the top of the breaker column' },
  'recessed-lighting': { key: 'photos/shower-rain-head-recessed-light', alt: 'Marble-tiled shower with a ceiling rain head and a recessed shower light' },
  'remodels': { key: 'photos/walk-in-shower-recessed-light', alt: 'Subway-tiled walk-in shower with a frameless glass door and a recessed ceiling light' },
  'lighting-additions': { key: 'photos/deck-railing-post-lights', ar: 4 / 5, focus: '88% 50%', alt: 'Lit post-cap and post-side lights on a white deck railing at dusk' },
  'electrical-outlets': { key: 'photos/kitchen-backsplash-outlets', alt: 'Remodeled kitchen with a tiled backsplash, outlets and a switch beside the window over the sink' },
};
const bPhoto = s => { const p = B_PHOTOS[s.slug]; return p && images[p.key] ? p : null; };

function blockBMedia(ctx, s) {
  const card = heroPhotoKey(s) ? cardFor(s) : null; // sheet heroes already show the blurb
  const note = card ? `<div class="svp-b__note"><span class="svp-b__badge" aria-hidden="true">${icon(s.icon, { size: 22 })}</span><p>${esc(card.blurb)}</p></div>` : '';
  const p = bPhoto(s);
  if (p) {
    const im = images[p.key];
    const ar = p.ar || im.w / im.h;
    const max = Math.min(Math.round(Math.min(im.w, im.h * ar)), 640); // CSS px the visible slice can fill 1:1
    return `<div class="svp-b__media svp-b__media--photo${ar < 1.2 ? ' svp-b__media--tall' : ''}" style="--b-max: ${max}px">
      <figure class="svp-b__fig"><div class="svp-b__frame" style="aspect-ratio: ${+ar.toFixed(4)}"><div class="svp-crest"><div class="svp-crest__mat">${picture(ctx, p.key, { alt: p.alt, sizes: `(min-width: 960px) ${max}px, 92vw`, imgCls: 'svp-b__img', style: p.focus ? `object-position: ${p.focus}` : '' })}</div></div></div></figure>
      ${note}
    </div>`;
  }
  if (!card) return '';
  return `<div class="svp-b__media svp-b__media--card">
      <div class="svp-b__stmt">
        <span class="svp-b__stmt-ic" aria-hidden="true">${icon(s.icon, { size: 26 })}</span>
        <p class="svp-b__stmt-p">${esc(card.blurb)}</p>
        <span class="svp-b__stmt-badge">${badge(ctx, 'Colonial Electric')}</span>
      </div>
    </div>`;
}

/* ---------- block B: the Colonial block ---------- */
function blockB(ctx, s) {
  const b = s.b;
  const hasSteps = b.body.some(x => x.list && x.list.every(i => i.term));
  const media = blockBMedia(ctx, s);
  return `<section class="svp-b${media ? '' : ' svp-b--solo'}" id="svp-b" aria-labelledby="svp-b-h">
  <div class="container svp-b__grid">
    ${media}
    <div class="svp-b__copy">
      <header class="svp-sechead">${s.a ? '<span class="svp-sechead__n" aria-hidden="true">02</span>' : '<span class="svp-sechead__n" aria-hidden="true">01</span>'}<div>${b.eyebrow ? `<p class="eyebrow svp-b__eyebrow">${esc(b.eyebrow)}</p>` : ''}<h2 class="svp-h2" id="svp-b-h">${esc(b.h2)}</h2></div></header>
      <div class="svp-copy">${body(b.body, { steps: hasSteps })}</div>
      ${s.products ? `<ul class="svp-products" role="list">${s.products.map((p, i) => `<li class="svp-product"><span class="svp-product__ic">${icon(i ? 'bolt' : 'generator', { size: 26 })}</span><h3 class="svp-product__t">${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`).join('')}</ul>` : ''}
      <p class="svp-b__cta"><a class="btn btn--navy" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a><a class="svp-textlink" href="${ctx.r('contact-us/')}">Contact Us Today ${icon('arrow-right', { size: 16 })}</a></p>
    </div>
  </div>
</section>`;
}

/* ---------- trust strip (shared items, verbatim) ---------- */
const trust = () => `<section class="svp-trust" aria-label="Why homeowners trust us">
  <div class="container"><ul class="svp-trust__list" role="list">${trustItems.map(t => `<li>${icon('bolt', { size: 18 })}<span>${esc(t)}</span></li>`).join('')}</ul></div>
</section>`;

/* ---------- why choose ---------- */
const WHY_ICONS = ['check', 'star', 'shield'];
const why = () => `<section class="svp-why" aria-labelledby="svp-why-h">
  <div class="container">
    <header class="svp-why__head">
      <h2 class="svp-h2 svp-why__h" id="svp-why-h">${esc(whyChoose.h2)}</h2>
      <p class="svp-why__intro">${esc(whyIntro)}</p>
    </header>
    <ol class="svp-why__list" role="list">${whyChoose.cards.map((c, i) => `<li class="svp-why__card svp-reveal" style="--i:${i}">
        <div class="svp-why__top"><span class="svp-why__ic">${icon(WHY_ICONS[i], { size: 24 })}</span><span class="svp-why__n" aria-hidden="true">${pad(i + 1)}</span></div>
        <h3 class="svp-why__t">${esc(c.title)}</h3>
        <p>${esc(c.body)}</p>
      </li>`).join('')}</ol>
  </div>
</section>`;

/* ---------- booking process (service-template step names, brief §5.9) ---------- */
const STEP_ICONS = ['phone', 'mail', 'calendar', 'check'];
const process = () => `<section class="svp-proc on-dark stars-bg" aria-labelledby="svp-proc-h">
  <div class="container">
    <header class="svp-proc__head"><p class="eyebrow">How It Works</p><h2 class="svp-h2 svp-proc__h" id="svp-proc-h">${esc(bookingH2)}</h2>
      <p class="svp-proc__cta"><span class="svp-proc__cta-k">Step 01 starts here</span><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a></p></header>
    <ol class="svp-proc__list" role="list">${processSteps.map((p, i) => `<li class="svp-proc__step svp-reveal" style="--i:${i}">
        <div class="svp-proc__mark"><span class="svp-proc__ic">${icon(STEP_ICONS[i], { size: 22 })}</span><span class="svp-proc__line" aria-hidden="true"></span></div>
        <p class="svp-proc__n">Step ${pad(p.n)}</p>
        <h3 class="svp-proc__t">${esc(p.short)}</h3>
        <p class="svp-proc__b">${esc(p.body)}</p>
      </li>`).join('')}</ol>
  </div>
</section>`;

/* ---------- quote + service-area band ---------- */
const quoteTowns = ctx => `<section class="svp-qt" aria-labelledby="svp-qt-h">
  <div class="container svp-qt__grid">
    <figure class="svp-qt__quote">
      <blockquote><p>${quote.map((q, i) => `<span class="svp-qt__l svp-qt__l--${i + 1}">${esc(i === 0 ? '“' + q : i === quote.length - 1 ? q + '”' : q)}</span>`).join(' ')}</p></blockquote>
      <figcaption class="svp-qt__by">Colonial Electric</figcaption>
    </figure>
    <div class="svp-qt__towns">
      <h2 class="svp-qt__h" id="svp-qt-h"><span class="label-wide">${icon('pin', { size: 16 })}Service Area</span></h2>
      <ul class="svp-towns" role="list">${towns.map(t => `<li><a href="${ctx.r('service-area/' + t.slug + '/')}"><span>${esc(t.name)}</span>${icon('arrow-up-right', { size: 14 })}</a></li>`).join('')}</ul>
      <a class="svp-textlink svp-qt__all" href="${ctx.r('service-area/')}">Service Area ${icon('arrow-right', { size: 16 })}</a>
    </div>
  </div>
</section>`;

/* ---------- FAQs ---------- */
function faqs(ctx, s) {
  if (!s.faqs?.length) return '';
  ctx.jsonld.push(faqJsonLd(s.faqs));
  return `<section class="svp-faq" id="svp-faqs" aria-labelledby="svp-faq-h">
  <div class="container svp-faq__grid">
    <header class="svp-faq__head">
      <div class="svp-faq__sticky">
        <p class="eyebrow">${esc(s.h1)}</p>
        <h2 class="svp-faq__h" id="svp-faq-h">FAQs</h2>
        <div class="svp-faq__call">
          <p class="svp-faq__k">Call Us Today!</p>
          <a class="tel-lg" href="${site.tel}">${icon('phone', { size: 20 })}${site.phone}</a>
        </div>
      </div>
    </header>
    <div class="svp-faq__list">${s.faqs.map((f, i) => `<details class="svp-q" id="svp-q-${i + 1}" name="svp-faq"${i === 0 ? ' open' : ''}>
        <summary><span class="svp-q__n" aria-hidden="true">${pad(i + 1)}</span><span class="svp-q__t">${esc(f.q)}</span><span class="svp-q__ic" aria-hidden="true"></span></summary>
        <div class="svp-q__a svp-copy">${body(f.a, { plainLeads: true })}</div>
      </details>`).join('')}</div>
  </div>
</section>
<script>(function(){function o(){var h=location.hash;if(!/^#svp-q-[0-9]+$/.test(h))return;var d=document.getElementById(h.slice(1));if(!d)return;d.open=true;requestAnimationFrame(function(){d.scrollIntoView({block:'start'})})}addEventListener('hashchange',o);o()})();</script>`;
}

/* ---------- outdoor-lighting variant ---------- */
const FEATURE_ICONS = ['wiring', 'clock', 'sparkle', 'bulb', 'bolt', 'star', 'shield', 'remodel'];
function outdoorPanels(ctx) {
  return `<section class="svp-ol" aria-labelledby="svp-ol-h">
  <div class="container">
    <header class="svp-ol__head">
      <h2 class="svp-h2" id="svp-ol-h">${esc(outdoor.panels.map(p => p.title.replace(/ Lighting$/, '')).join(', ').replace(/, (?=[^,]*$)/, ' & '))} Lighting</h2>
      <nav class="svp-ol__nav" aria-label="Lighting services"><ol role="list">${outdoor.panels.map((p, i) => `<li><a href="#ol-${p.id}"><span class="svp-ol__navn">${pad(i + 1)}</span><span>${esc(p.title)}</span>${icon('arrow-right', { size: 14 })}</a></li>`).join('')}</ol></nav>
    </header>
    ${outdoor.panels.map((p, i) => `<article class="svp-olp svp-reveal" id="ol-${p.id}" aria-labelledby="ol-${p.id}-h">
      <div class="svp-olp__side">
        <p class="svp-olp__n" aria-hidden="true">${pad(i + 1)}</p>
        <h3 class="svp-olp__h" id="ol-${p.id}-h">${esc(p.title)}</h3>
        <p class="svp-olp__lead">${esc(p.lead)}</p>
      </div>
      <div class="svp-olp__main">${p.groups.map(g => g.services
        ? `<div class="svp-olp__g"><h4 class="svp-olp__gh">${esc(g.h)}</h4><ul class="svp-olp__svc" role="list">${g.items.map(it => `<li><strong>${esc(it.term)}</strong><span>${esc(it.text)}</span></li>`).join('')}</ul></div>`
        : `<div class="svp-olp__g"><h4 class="svp-olp__gh">${esc(g.h)}</h4><ul class="svp-olp__why" role="list">${g.items.map(it => `<li>${icon('bolt', { size: 16 })}<div><strong>${esc(it.term)}</strong><p>${esc(it.text)}</p></div></li>`).join('')}</ul></div>`).join('')}
        <div class="svp-olp__foot"><p class="svp-olp__close">${esc(p.close)}</p><a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a></div>
      </div>
    </article>`).join('\n    ')}
  </div>
</section>`;
}
const outdoorFeatures = () => `<section class="svp-feat on-dark stars-bg" aria-label="Lighting system features">
  <div class="container">
    <ul class="svp-feat__grid" role="list">${outdoor.features.map((f, i) => `<li class="svp-feat__i svp-reveal" style="--i:${i % 4}"><span class="svp-feat__ic">${icon(FEATURE_ICONS[i], { size: 24 })}</span><h3 class="svp-feat__t">${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join('')}</ul>
  </div>
</section>`;

/* one-shot reveal: content is fully visible without JS or with reduced motion */
const revealScript = `<script>(function(){var d=document;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var els=d.querySelectorAll('.svp-reveal');d.documentElement.classList.add('svp-io');var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});els.forEach(function(el){io.observe(el)})})();</script>`;

/* ---------- render ---------- */
export function render(ctx) {
  const s = ctx.page.service;
  const idx = services.findIndex(x => x.slug === s.slug);
  ctx.jsonld = [{ '@context': 'https://schema.org', '@type': 'Service', name: s.h1, serviceType: s.h1, provider: { '@id': site.origin + '/#business' }, areaServed: towns.map(t => ({ '@type': 'City', name: `${t.name}, MA` })) }];
  if (heroPhotoKey(s)) { ctx.preloadImage = heroPhotoKey(s); ctx.preloadSizes = HERO_SIZES; }

  if (s.outdoor) {
    return [
      hero(ctx, s, idx, { lead: outdoor.lead }),
      outdoorPanels(ctx),
      outdoorFeatures(),
      why(),
      contactCta(ctx),
      process(),
      reviews(ctx),
      quoteTowns(ctx),
      revealScript,
    ].join('\n');
  }
  return [
    hero(ctx, s, idx),
    overview(ctx, s),
    blockB(ctx, s),
    trust(),
    guarantee(ctx),
    s.slug === 'generator' ? servicesGrid(ctx, { cls: 'svp-grid' }) : why(),
    contactCta(ctx),
    process(),
    reviews(ctx),
    quoteTowns(ctx),
    contactForm(ctx),
    faqs(ctx, s),
    revealScript,
  ].join('\n');
}
