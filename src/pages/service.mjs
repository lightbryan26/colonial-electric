// SERVICE template (brief §5) — one template for all 13 service pages, incl. the /permanent-outdoor-lighting/ variant.
// Content: src/data/services.mjs (verbatim). Styles: src/css/tpl-service.css (every class prefixed .sv).
// Section order (brief §5): hero · intro · block A · block B · trust strip · guarantee · why choose (generator: services grid)
//   · contact CTA · booking process · reviews · quote + towns · contact form · FAQs.
// Variant (outdoor): hero+lead · 4 lighting panels · 8 features · why choose · CTA · booking · reviews · quote + towns.
import { services, serviceIntro, outdoor, whyChoose } from '../data/services.mjs';
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
import { esc, picture } from '../lib/html.mjs';

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
      out += isLead(b) && next && next.list ? `<p class="svp-listlead">${esc(b.replace(/:\s*$/, ''))}</p>` : `<p>${esc(b)}</p>`;
    } else if (b.list) out += points(b.list, opts);
  });
  return out;
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
      <h1 class="svp-hero__h1" id="svp-h1">${esc(s.h1)}</h1>
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
    <figure class="svp-hero__media">
      <div class="svp-hero__frame">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 960px) 30rem, 92vw', priority: true, imgCls: 'svp-hero__img' })}</div>
      <figcaption class="svp-hero__cap"><span class="svp-hero__cap-n">${esc(site.founder)}</span><span class="svp-hero__cap-r">Founder, Colonial Electric</span></figcaption>
    </figure>
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
          <p class="svp-callcard__lic">${icon('shield', { size: 14 })}<span>Licensed &amp; Insured · ${esc(site.license)}</span></p>
        </div>
      </div>
    </aside>`;
  return `<section class="svp-over" aria-label="Overview">
  <div class="container svp-over__grid">
    ${rail}
    <div class="svp-over__main">
      <div class="svp-intro" id="svp-intro">
        <p class="svp-intro__k label-wide">${icon('bolt', { size: 14 })}Colonial Electric · ${esc(s.h1)}</p>
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

/* ---------- block B: the Colonial block with the van photo ---------- */
function blockB(ctx, s) {
  const b = s.b;
  const hasSteps = b.body.some(x => x.list && x.list.every(i => i.term));
  return `<section class="svp-b" id="svp-b" aria-labelledby="svp-b-h">
  <div class="container svp-b__grid">
    <figure class="svp-b__media">
      <div class="svp-b__frame">${picture(ctx, 'owner-van', { alt: 'Scott Hays standing beside the Colonial Electric service van', sizes: '(min-width: 960px) 40vw, 92vw', imgCls: 'svp-b__img' })}</div>
      <figcaption class="svp-b__cap"><span class="svp-b__badge">${icon(s.icon, { size: 22 })}</span><span><strong>${esc(s.h1)}</strong><span>Residential &amp; Commercial · Weymouth, MA</span></span></figcaption>
    </figure>
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
    <header class="svp-proc__head"><p class="eyebrow">How It Works</p><h2 class="svp-h2 svp-proc__h" id="svp-proc-h">${esc(bookingH2)}</h2></header>
    <ol class="svp-proc__list" role="list">${processSteps.map((p, i) => `<li class="svp-proc__step svp-reveal" style="--i:${i}">
        <div class="svp-proc__mark"><span class="svp-proc__ic">${icon(STEP_ICONS[i], { size: 22 })}</span><span class="svp-proc__line" aria-hidden="true"></span></div>
        <p class="svp-proc__n">Step ${pad(p.n)}</p>
        <h3 class="svp-proc__t">${esc(p.short)}</h3>
        <p class="svp-proc__b">${esc(p.body)}</p>
      </li>`).join('')}</ol>
    <p class="svp-proc__cta"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a></p>
  </div>
</section>`;

/* ---------- quote + service-area band ---------- */
const quoteTowns = ctx => `<section class="svp-qt" aria-labelledby="svp-qt-h">
  <div class="container svp-qt__grid">
    <figure class="svp-qt__quote">
      <span class="svp-qt__mark" aria-hidden="true">${icon('quote', { size: 48 })}</span>
      <blockquote><p>${quote.map((q, i) => `<span class="svp-qt__l svp-qt__l--${i + 1}">${esc(i === 0 ? '“' + q : i === quote.length - 1 ? q + '”' : q)}</span>`).join(' ')}</p></blockquote>
      <figcaption class="svp-qt__by"><span class="flag-rule" aria-hidden="true"></span><span>Colonial Electric</span></figcaption>
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
    <div class="svp-faq__list">${s.faqs.map((f, i) => `<details class="svp-q" name="svp-faq"${i === 0 ? ' open' : ''}>
        <summary><span class="svp-q__n" aria-hidden="true">${pad(i + 1)}</span><span class="svp-q__t">${esc(f.q)}</span><span class="svp-q__ic" aria-hidden="true"></span></summary>
        <div class="svp-q__a svp-copy">${body(f.a)}</div>
      </details>`).join('')}</div>
  </div>
</section>`;
}

/* ---------- outdoor-lighting variant ---------- */
const FEATURE_ICONS = ['wiring', 'clock', 'sparkle', 'bulb', 'bolt', 'star', 'shield', 'remodel'];
function outdoorPanels(ctx) {
  return `<section class="svp-ol" aria-labelledby="svp-ol-h">
  <div class="container">
    <header class="svp-ol__head">
      <h2 class="svp-h2" id="svp-ol-h">${esc(services[0].h1)}</h2>
      <nav class="svp-ol__nav" aria-label="Lighting services"><ol role="list">${outdoor.panels.map((p, i) => `<li><a href="#ol-${p.id}"><span class="svp-ol__navn">${pad(i + 1)}</span><span>${esc(p.title)}</span>${icon('arrow-right', { size: 14 })}</a></li>`).join('')}</ol></nav>
    </header>
    ${outdoor.panels.map((p, i) => `<article class="svp-olp svp-reveal" id="ol-${p.id}" aria-labelledby="ol-${p.id}-h">
      <div class="svp-olp__side">
        <p class="svp-olp__n" aria-hidden="true">${pad(i + 1)}</p>
        <h3 class="svp-olp__h" id="ol-${p.id}-h">${esc(p.title)}</h3>
        <p class="svp-olp__lead">${esc(p.lead)}</p>
        <p class="svp-olp__close">${esc(p.close)}</p>
        <a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a>
      </div>
      <div class="svp-olp__main">${p.groups.map(g => g.services
        ? `<div class="svp-olp__g"><h4 class="svp-olp__gh">${esc(g.h)}</h4><ul class="svp-olp__svc" role="list">${g.items.map(it => `<li><strong>${esc(it.term)}</strong><span>${esc(it.text)}</span></li>`).join('')}</ul></div>`
        : `<div class="svp-olp__g"><h4 class="svp-olp__gh">${esc(g.h)}</h4><ul class="svp-olp__why" role="list">${g.items.map(it => `<li>${icon('bolt', { size: 16 })}<div><strong>${esc(it.term)}</strong><p>${esc(it.text)}</p></div></li>`).join('')}</ul></div>`).join('')}</div>
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
