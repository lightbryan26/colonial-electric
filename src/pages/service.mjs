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
    return `<ul class="sv-signs" role="list">${list.map(i => `<li>${icon('bolt', { size: 16 })}<span>${esc(i.text ?? i)}</span></li>`).join('')}</ul>`;
  }
  if (steps) {
    return `<ol class="sv-steps" role="list">${list.map((i, k) => `<li class="sv-steps__i"><span class="sv-steps__n" aria-hidden="true">${pad(k + 1)}</span><div><h3 class="sv-steps__t">${esc(i.term)}</h3><p>${esc(i.text)}</p></div></li>`).join('')}</ol>`;
  }
  return `<ul class="sv-points" role="list">${list.map((i, k) => `<li class="sv-point"><span class="sv-point__n" aria-hidden="true">${pad(k + 1)}</span><h3 class="sv-point__t">${esc(i.term)}</h3><p>${esc(i.text)}</p></li>`).join('')}</ul>`;
}
function body(blocks, opts) {
  let out = '';
  blocks.forEach((b, i) => {
    if (typeof b === 'string') {
      const next = blocks[i + 1];
      out += isLead(b) && next && next.list ? `<p class="sv-listlead">${esc(b.replace(/:\s*$/, ''))}</p>` : `<p>${esc(b)}</p>`;
    } else if (b.list) out += points(b.list, opts);
  });
  return out;
}

/* ---------- hero ---------- */
function hero(ctx, s, idx, { lead = '' } = {}) {
  const crumbs = [{ label: 'Home', href: '' }, { label: 'Services', href: 'services/' }, { label: s.h1 }];
  ctx.jsonld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) });
  return `<section class="sv-hero on-dark stars-bg" aria-labelledby="sv-h1">
  <div class="container sv-hero__grid">
    <div class="sv-hero__copy">
      <nav class="crumbs sv-hero__crumbs" aria-label="Breadcrumb"><ol role="list">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<li><a href="${ctx.r(c.href)}">${esc(c.label)}</a></li>` : `<li><span aria-current="page">${esc(c.label)}</span></li>`).join('')}</ol></nav>
      <p class="sv-hero__kicker"><span class="sv-hero__ic">${icon(s.icon, { size: 22 })}</span><span class="sv-hero__idx">Service ${pad(idx + 1)} <span aria-hidden="true">/</span> ${pad(services.length)}</span></p>
      <h1 class="sv-hero__h1" id="sv-h1">${esc(s.h1)}</h1>
      <p class="sv-hero__line">${esc(s.heroLine)}</p>
      ${lead ? `<p class="sv-hero__lead">${esc(lead)}</p>` : ''}
      <div class="sv-hero__ctas">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a>
        <a class="btn btn--ghost btn--lg" href="${ctx.r('contact-us/')}"><span>Contact Us Today</span>${icon('arrow-right', { size: 18 })}</a>
      </div>
      <ul class="sv-hero__facts" role="list">
        <li>${icon('shield', { size: 18 })}<span>Licensed &amp; Insured</span></li>
        <li><span class="sv-hero__lic">${esc(site.license)}</span></li>
        <li>${icon('pin', { size: 18 })}<span>Weymouth &amp; the South Shore</span></li>
      </ul>
    </div>
    <figure class="sv-hero__media">
      <div class="sv-hero__frame">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 960px) 30rem, 92vw', priority: true, imgCls: 'sv-hero__img' })}</div>
      <figcaption class="sv-hero__cap"><span class="sv-hero__cap-n">${esc(site.founder)}</span><span class="sv-hero__cap-r">Founder, Colonial Electric</span></figcaption>
    </figure>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

/* ---------- overview: intro + block A with sticky rail ---------- */
function overview(ctx, s) {
  const toc = [['sv-intro', 'Overview'], s.a && ['sv-a', s.a.h2], s.b && ['sv-b', s.b.h2], s.faqs?.length && ['sv-faqs', 'FAQs']].filter(Boolean);
  const rail = `<aside class="sv-rail" aria-label="On this page">
      <div class="sv-rail__in">
        <p class="sv-rail__label">On this page</p>
        <ol class="sv-toc" role="list">${toc.map(([id, t], i) => `<li><a href="#${id}"><span class="sv-toc__n">${pad(i + 1)}</span><span>${esc(t)}</span></a></li>`).join('')}</ol>
        <div class="sv-callcard">
          <p class="sv-callcard__k">Call Us Today!</p>
          <a class="sv-callcard__tel" href="${site.tel}">${site.phone}</a>
          <a class="btn btn--red btn--block" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a>
          <p class="sv-callcard__lic">${icon('shield', { size: 14 })}<span>Licensed &amp; Insured · ${esc(site.license)}</span></p>
        </div>
      </div>
    </aside>`;
  return `<section class="sv-over" aria-label="Overview">
  <div class="container sv-over__grid">
    ${rail}
    <div class="sv-over__main">
      <div class="sv-intro" id="sv-intro">
        <p class="sv-intro__k label-wide">${icon('bolt', { size: 14 })}Colonial Electric · ${esc(s.h1)}</p>
        <p class="sv-intro__p">${esc(serviceIntro)}</p>
      </div>
      ${s.a ? `<article class="sv-a sv-reveal" id="sv-a" aria-labelledby="sv-a-h">
        <header class="sv-sechead"><span class="sv-sechead__n" aria-hidden="true">01</span><h2 class="sv-h2" id="sv-a-h">${esc(s.a.h2)}</h2></header>
        <div class="sv-copy">${body(s.a.body)}</div>
      </article>` : ''}
    </div>
  </div>
</section>`;
}

/* ---------- block B: the Colonial block with the van photo ---------- */
function blockB(ctx, s) {
  const b = s.b;
  const hasSteps = b.body.some(x => x.list && x.list.every(i => i.term));
  return `<section class="sv-b" id="sv-b" aria-labelledby="sv-b-h">
  <div class="container sv-b__grid">
    <figure class="sv-b__media">
      <div class="sv-b__frame">${picture(ctx, 'owner-van', { alt: 'Scott Hays standing beside the Colonial Electric service van', sizes: '(min-width: 960px) 40vw, 92vw', imgCls: 'sv-b__img' })}</div>
      <figcaption class="sv-b__cap"><span class="sv-b__badge">${icon(s.icon, { size: 22 })}</span><span><strong>${esc(s.h1)}</strong><span>Residential &amp; Commercial · Weymouth, MA</span></span></figcaption>
    </figure>
    <div class="sv-b__copy">
      <header class="sv-sechead">${s.a ? '<span class="sv-sechead__n" aria-hidden="true">02</span>' : '<span class="sv-sechead__n" aria-hidden="true">01</span>'}<div>${b.eyebrow ? `<p class="eyebrow sv-b__eyebrow">${esc(b.eyebrow)}</p>` : ''}<h2 class="sv-h2" id="sv-b-h">${esc(b.h2)}</h2></div></header>
      <div class="sv-copy">${body(b.body, { steps: hasSteps })}</div>
      ${s.products ? `<ul class="sv-products" role="list">${s.products.map((p, i) => `<li class="sv-product"><span class="sv-product__ic">${icon(i ? 'bolt' : 'generator', { size: 26 })}</span><h3 class="sv-product__t">${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`).join('')}</ul>` : ''}
      <p class="sv-b__cta"><a class="btn btn--navy" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a><a class="sv-textlink" href="${ctx.r('contact-us/')}">Contact Us Today ${icon('arrow-right', { size: 16 })}</a></p>
    </div>
  </div>
</section>`;
}

/* ---------- trust strip (shared items, verbatim) ---------- */
const trust = () => `<section class="sv-trust" aria-label="Why homeowners trust us">
  <div class="container"><ul class="sv-trust__list" role="list">${trustItems.map(t => `<li>${icon('bolt', { size: 18 })}<span>${esc(t)}</span></li>`).join('')}</ul></div>
</section>`;

/* ---------- why choose ---------- */
const WHY_ICONS = ['check', 'star', 'shield'];
const why = () => `<section class="sv-why" aria-labelledby="sv-why-h">
  <div class="container">
    <header class="sv-why__head">
      <h2 class="sv-h2 sv-why__h" id="sv-why-h">${esc(whyChoose.h2)}</h2>
      <p class="sv-why__intro">${esc(whyIntro)}</p>
    </header>
    <ol class="sv-why__list" role="list">${whyChoose.cards.map((c, i) => `<li class="sv-why__card sv-reveal" style="--i:${i}">
        <div class="sv-why__top"><span class="sv-why__ic">${icon(WHY_ICONS[i], { size: 24 })}</span><span class="sv-why__n" aria-hidden="true">${pad(i + 1)}</span></div>
        <h3 class="sv-why__t">${esc(c.title)}</h3>
        <p>${esc(c.body)}</p>
      </li>`).join('')}</ol>
  </div>
</section>`;

/* ---------- booking process (service-template step names, brief §5.9) ---------- */
const STEP_ICONS = ['phone', 'mail', 'calendar', 'check'];
const process = () => `<section class="sv-proc on-dark stars-bg" aria-labelledby="sv-proc-h">
  <div class="container">
    <header class="sv-proc__head"><p class="eyebrow">How It Works</p><h2 class="sv-h2 sv-proc__h" id="sv-proc-h">${esc(bookingH2)}</h2></header>
    <ol class="sv-proc__list" role="list">${processSteps.map((p, i) => `<li class="sv-proc__step sv-reveal" style="--i:${i}">
        <div class="sv-proc__mark"><span class="sv-proc__ic">${icon(STEP_ICONS[i], { size: 22 })}</span><span class="sv-proc__line" aria-hidden="true"></span></div>
        <p class="sv-proc__n">Step ${pad(p.n)}</p>
        <h3 class="sv-proc__t">${esc(p.short)}</h3>
        <p class="sv-proc__b">${esc(p.body)}</p>
      </li>`).join('')}</ol>
    <p class="sv-proc__cta"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a></p>
  </div>
</section>`;

/* ---------- quote + service-area band ---------- */
const quoteTowns = ctx => `<section class="sv-qt" aria-labelledby="sv-qt-h">
  <div class="container sv-qt__grid">
    <figure class="sv-qt__quote">
      <span class="sv-qt__mark" aria-hidden="true">${icon('quote', { size: 48 })}</span>
      <blockquote><p>${quote.map((q, i) => `<span class="sv-qt__l sv-qt__l--${i + 1}">${esc(i === 0 ? '“' + q : i === quote.length - 1 ? q + '”' : q)}</span>`).join(' ')}</p></blockquote>
      <figcaption class="sv-qt__by"><span class="flag-rule" aria-hidden="true"></span><span>Colonial Electric</span></figcaption>
    </figure>
    <div class="sv-qt__towns">
      <h2 class="sv-qt__h" id="sv-qt-h"><span class="label-wide">${icon('pin', { size: 16 })}Service Area</span></h2>
      <ul class="sv-towns" role="list">${towns.map(t => `<li><a href="${ctx.r('service-area/' + t.slug + '/')}"><span>${esc(t.name)}</span>${icon('arrow-up-right', { size: 14 })}</a></li>`).join('')}</ul>
      <a class="sv-textlink sv-qt__all" href="${ctx.r('service-area/')}">Service Area ${icon('arrow-right', { size: 16 })}</a>
    </div>
  </div>
</section>`;

/* ---------- FAQs ---------- */
function faqs(ctx, s) {
  if (!s.faqs?.length) return '';
  ctx.jsonld.push(faqJsonLd(s.faqs));
  return `<section class="sv-faq" id="sv-faqs" aria-labelledby="sv-faq-h">
  <div class="container sv-faq__grid">
    <header class="sv-faq__head">
      <div class="sv-faq__sticky">
        <p class="eyebrow">${esc(s.h1)}</p>
        <h2 class="sv-faq__h" id="sv-faq-h">FAQs</h2>
        <div class="sv-faq__call">
          <p class="sv-faq__k">Call Us Today!</p>
          <a class="tel-lg" href="${site.tel}">${icon('phone', { size: 20 })}${site.phone}</a>
        </div>
      </div>
    </header>
    <div class="sv-faq__list">${s.faqs.map((f, i) => `<details class="sv-q" name="sv-faq"${i === 0 ? ' open' : ''}>
        <summary><span class="sv-q__n" aria-hidden="true">${pad(i + 1)}</span><span class="sv-q__t">${esc(f.q)}</span><span class="sv-q__ic" aria-hidden="true"></span></summary>
        <div class="sv-q__a sv-copy">${body(f.a)}</div>
      </details>`).join('')}</div>
  </div>
</section>`;
}

/* ---------- outdoor-lighting variant ---------- */
const FEATURE_ICONS = ['wiring', 'clock', 'sparkle', 'bulb', 'bolt', 'star', 'shield', 'remodel'];
function outdoorPanels(ctx) {
  return `<section class="sv-ol" aria-labelledby="sv-ol-h">
  <div class="container">
    <header class="sv-ol__head">
      <h2 class="sv-h2" id="sv-ol-h">${esc(services[0].h1)}</h2>
      <nav class="sv-ol__nav" aria-label="Lighting services"><ol role="list">${outdoor.panels.map((p, i) => `<li><a href="#ol-${p.id}"><span class="sv-ol__navn">${pad(i + 1)}</span><span>${esc(p.title)}</span>${icon('arrow-right', { size: 14 })}</a></li>`).join('')}</ol></nav>
    </header>
    ${outdoor.panels.map((p, i) => `<article class="sv-olp sv-reveal" id="ol-${p.id}" aria-labelledby="ol-${p.id}-h">
      <div class="sv-olp__side">
        <p class="sv-olp__n" aria-hidden="true">${pad(i + 1)}</p>
        <h3 class="sv-olp__h" id="ol-${p.id}-h">${esc(p.title)}</h3>
        <p class="sv-olp__lead">${esc(p.lead)}</p>
        <p class="sv-olp__close">${esc(p.close)}</p>
        <a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 16 })}<span>Call Now</span></a>
      </div>
      <div class="sv-olp__main">${p.groups.map(g => g.services
        ? `<div class="sv-olp__g"><h4 class="sv-olp__gh">${esc(g.h)}</h4><ul class="sv-olp__svc" role="list">${g.items.map(it => `<li><strong>${esc(it.term)}</strong><span>${esc(it.text)}</span></li>`).join('')}</ul></div>`
        : `<div class="sv-olp__g"><h4 class="sv-olp__gh">${esc(g.h)}</h4><ul class="sv-olp__why" role="list">${g.items.map(it => `<li>${icon('bolt', { size: 16 })}<div><strong>${esc(it.term)}</strong><p>${esc(it.text)}</p></div></li>`).join('')}</ul></div>`).join('')}</div>
    </article>`).join('\n    ')}
  </div>
</section>`;
}
const outdoorFeatures = () => `<section class="sv-feat on-dark stars-bg" aria-label="Lighting system features">
  <div class="container">
    <ul class="sv-feat__grid" role="list">${outdoor.features.map((f, i) => `<li class="sv-feat__i sv-reveal" style="--i:${i % 4}"><span class="sv-feat__ic">${icon(FEATURE_ICONS[i], { size: 24 })}</span><h3 class="sv-feat__t">${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join('')}</ul>
  </div>
</section>`;

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
    ].join('\n');
  }
  return [
    hero(ctx, s, idx),
    overview(ctx, s),
    blockB(ctx, s),
    trust(),
    guarantee(ctx),
    s.slug === 'generator' ? servicesGrid(ctx, { cls: 'sv-grid' }) : why(),
    contactCta(ctx),
    process(),
    reviews(ctx),
    quoteTowns(ctx),
    contactForm(ctx),
    faqs(ctx, s),
  ].join('\n');
}
