import { introBodies, towns } from '../data/towns.mjs';
import { safety } from '../data/shared.mjs';
import { site } from '../data/site.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { townList } from '../blocks/town-list.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';
import { businessJsonLd } from '../partials/head.mjs';

// Town template (brief §6) — one data-driven template for all 21 town pages.
// Section order is fixed by the brief: hero · intro · safety · call box + form · services · town list · reviews · about/top sites · CTA.
// All copy is verbatim from src/data (towns.mjs / shared.mjs). Microcopy added here makes no factual claims.
// Styles: src/css/tpl-town.css (every class prefixed .tw).

const pad = n => String(n).padStart(2, '0');

function hero(ctx, t) {
  const T = t.name;
  const h1 = ctx.page.h1; // "{Town} MA, Electrical Services"
  const rest = h1.startsWith(T) ? h1.slice(T.length) : '';
  const [ma, ...svc] = rest.trim().split(' ');
  const lead = t.topSites[t.lead ?? 0]; // data: the town's most recognisable landmark photo
  const crumbs = [{ label: 'Home', href: '' }, { label: 'Service Area', href: 'service-area/' }, { label: T }];
  ctx.jsonld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) });
  return `<section class="tw-hero on-dark stars-bg" aria-labelledby="tw-h1">
  <div class="container tw-hero__grid">
    <div class="tw-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<li><a href="${ctx.r(c.href)}">${esc(c.label)}</a></li>` : `<li><span aria-current="page">${esc(c.label)}</span></li>`).join('')}</ol></nav>
      <h1 class="tw-hero__h1" id="tw-h1" style="--len:${Math.max(T.length, 6)}">${rest
        ? `<span class="tw-hero__town">${esc(T)}</span> <span class="tw-hero__rest"><span class="tw-hero__ma">${esc(ma)}</span> ${esc(svc.join(' '))}</span>`
        : esc(h1)}</h1>
      <h2 class="tw-hero__sub">${icon('bolt', { size: 18 })}<span>Electrician in ${esc(T)} MA</span></h2>
      <p class="btn-row tw-hero__ctas"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>${site.phone}</span></a><a class="btn btn--ghost btn--lg" href="#tw-call">Get a Call Back</a></p>
      <p class="tw-hero__lic label-wide">${icon('shield', { size: 16 })}<span>${site.license}</span></p>
    </div>
    <div class="tw-hero__media">
      <div class="tw-hero__photo">${picture(ctx, 'owner-van', { alt: 'Founder Scott Hays standing in front of the red, white and blue Colonial Electric van', sizes: '(min-width: 1200px) 640px, (min-width: 900px) 50vw, 100vw', priority: true })}</div>
      <figure class="tw-postcard">
        <div class="tw-postcard__img">${picture(ctx, lead.img, { alt: `${lead.name} in ${T}, MA`, sizes: '(min-width: 900px) 220px, 150px', loading: 'eager' })}</div>
        <figcaption><span class="tw-postcard__k">${esc(T)}, MA</span><span class="tw-postcard__n">${esc(lead.name)}</span></figcaption>
      </figure>
    </div>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

// Town map (client request: a Google Maps embed on every town page, for local SEO). The iframe shows the town itself;
// the link opens Colonial Electric's Google Business Profile. Microcopy only, no claims.
function townMap(t) {
  const T = t.name;
  return `<figure class="tw-map">
      <div class="tw-map__frame"><div class="tw-map__mat">
        <iframe src="${esc(site.townMapEmbed(T))}" title="Map of ${esc(T)}, MA" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div></div>
      <figcaption class="tw-map__cap">
        <h3 class="tw-map__h">${icon('pin', { size: 20 })}<span>Serving ${esc(T)}, MA</span></h3>
        <a class="tw-link tw-map__link" href="${site.gbp.link}" target="_blank" rel="noopener"><span>Find Us on Google Maps</span>${icon('arrow-up-right', { size: 18 })}<span class="sr-only"> (opens in a new tab)</span></a>
      </figcaption>
    </figure>`;
}

function intro(t) {
  const body = introBodies[t.introVariant](t.name);
  return `<section class="tw-intro block"${t.introH2 ? ' aria-labelledby="tw-intro-h"' : ' aria-label="Introduction"'}>
  <div class="container tw-intro__grid${t.introH2 ? '' : ' tw-intro__grid--solo'}">
    <div class="tw-intro__text">
      <p class="tw-intro__tag label-wide" aria-hidden="true"><span class="tw-intro__dot"></span>${esc(t.name)}, MA</p>
      ${t.introH2 ? `<h2 class="tw-intro__h" id="tw-intro-h">${esc(t.introH2)}</h2>` : ''}
      <div class="tw-intro__body">
        <p>${esc(body)}</p>
        <a class="tw-link" href="${site.tel}">${icon('phone', { size: 18 })}<span>${site.phone}</span>${icon('arrow-right', { size: 18 })}</a>
      </div>
    </div>
    ${townMap(t)}
  </div>
</section>`;
}

function safetyBlock(ctx, t) {
  const T = t.name;
  const paras = [
    'When it comes to electrical systems, having someone you can trust is essential. At Colonial Electric, we prioritize your safety and satisfaction above all else. With our team of experienced electricians, you can rest assured that your electrical systems are in capable hands.',
    `We understand the importance of having a reliable electrical system, whether it’s in your home or business in ${T}, MA. That’s why we go above and beyond to provide top-notch service and expertise in every project we undertake.`,
    'From routine maintenance and repairs to complex installations and upgrades, Colonial Electric is equipped to handle it all. We stay up-to-date on the latest industry standards and best practices to ensure that your electrical systems are not only functional but also safe and efficient.',
    `Whether you’re in ${T}, MA. or the surrounding areas, Colonial Electric is your trusted partner for all your electrical needs.`,
    'When you choose Colonial Electric, you’re not only choosing peace of mind, but also choosing a long-term partner dedicated to your electrical needs.',
  ];
  const [p1, p2, p3, p4, p5] = paras;
  return `<section class="tw-safe block" aria-labelledby="tw-safe-h">
  <div class="container tw-safe__grid">
    <figure class="tw-safe__fig">
      <div class="tw-safe__pic">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 1200px) 460px, (min-width: 900px) 38vw, 92vw' })}</div>
      <figcaption class="tw-safe__cap"><span class="tw-safe__name">${esc(site.founder)}</span><span class="label-wide">Founder, Colonial Electric</span></figcaption>
    </figure>
    <div class="tw-safe__copy">
      <p class="eyebrow">${esc(safety.eyebrow)}</p>
      <h2 class="tw-safe__h" id="tw-safe-h">${esc(safety.h2)}</h2>
      <p class="tw-safe__lead">${esc(p1)}</p>
      <div class="tw-safe__cols"><p>${esc(p2)}</p><p>${esc(p3)}</p></div>
      <p class="tw-safe__p4">${esc(p4)}</p>
      <blockquote class="tw-safe__close"><p>${esc(p5)}</p></blockquote>
    </div>
  </div>
</section>`;
}

function callAndForm(ctx, t) {
  return `<section class="tw-call on-dark stars-bg" id="tw-call" aria-label="Call Colonial Electric or request a call back">
  <div class="container tw-call__grid">
    <div class="tw-call__box">
      <div class="tw-call__crest">
        <picture class="tw-call__badge"><source type="image/webp" srcset="${ctx.asset('img/logo-badge-250.webp')}"><img src="${ctx.asset('img/logo-badge-250.png')}" width="250" height="150" alt="Colonial Electric" loading="lazy" decoding="async"></picture>
        <p class="tw-call__line label-wide">${esc(safety.callBox.line)}</p>
        <a class="tw-call__tel" href="${site.tel}"><span class="sr-only">Call </span>${site.phone}</a>
        ${t.callBoxLine ? `<p class="tw-call__town">${esc(t.callBoxLine)}</p>` : ''}
        <a class="btn btn--red btn--lg tw-call__btn" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call Now</span></a>
      </div>
      <p class="tw-call__meta label-wide">${icon('clock', { size: 16 })}<span>${esc(site.hours)}</span><span class="tw-call__sep" aria-hidden="true"></span><span>${site.license}</span></p>
    </div>
    <div class="tw-call__form">
      ${contactForm(ctx, { heading: safety.callBox.cta, cls: 'tw-form' })}
    </div>
  </div>
</section>`;
}

function townsBlock(ctx, t) {
  return `<section class="tw-towns block on-dark stars-bg" aria-labelledby="tw-towns-h">
  <div class="container">
    <header class="tw-towns__head">
      <p class="eyebrow">Service Area</p>
      <h2 class="tw-towns__h" id="tw-towns-h">Towns We Serve</h2>
      <a class="tw-link" href="${ctx.r('service-area/')}"><span>View the service area</span>${icon('arrow-right', { size: 18 })}</a>
    </header>
    ${townList(ctx, { current: t.slug, cls: 'town-list--grid tw-townlist', label: 'Towns we serve' })}
  </div>
</section>`;
}

function about(ctx, t) {
  const T = t.name;
  return `<section class="tw-about block" aria-labelledby="tw-about-h">
  <div class="container">
    <header class="tw-about__head">
      <h2 class="tw-about__h" id="tw-about-h">About ${esc(T)}, MA</h2>
      <h3 class="tw-about__sub">${icon('pin', { size: 18 })}<span>Top Sites and Things to Do</span></h3>
    </header>
    <ol class="tw-sites" role="list">
      ${t.topSites.map((s, i) => `<li class="tw-site" style="--i:${i}">
        <figure>
          <div class="tw-site__img">${picture(ctx, s.img, { alt: `${s.name}, ${T}, MA`, sizes: '(min-width: 1200px) 300px, (min-width: 768px) 45vw, 46vw', loading: 'eager' })}</div>
          <figcaption><span class="tw-site__n" aria-hidden="true">${pad(i + 1)}</span><span class="tw-site__name">${esc(s.name)}</span></figcaption>
        </figure>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
}

export function render(ctx) {
  const t = ctx.page.town;
  ctx.preloadImage = 'owner-van';
  ctx.preloadSizes = '(min-width: 1200px) 640px, (min-width: 900px) 50vw, 100vw';
  const biz = businessJsonLd();
  ctx.jsonld = [{
    '@context': 'https://schema.org', '@type': 'Electrician', '@id': site.origin + '/' + ctx.page.slug + '#electrician',
    name: site.name, telephone: site.phoneSchema, url: site.origin + '/' + ctx.page.slug,
    image: biz.image, logo: biz.logo, address: biz.address,
    hasMap: site.gbp.link,
    areaServed: { '@type': 'City', name: `${t.name}, MA`, hasMap: 'https://maps.google.com/maps?q=' + encodeURIComponent(`${t.name}, MA`) },
    parentOrganization: { '@id': biz['@id'] },
  }];
  return [
    hero(ctx, t),
    intro(t),
    safetyBlock(ctx, t),
    callAndForm(ctx, t),
    servicesGrid(ctx, { h2: t.servicesH2, cls: 'tw-svc' }),
    townsBlock(ctx, t),
    reviews(ctx, { cls: 'tw-reviews' }),
    about(ctx, t),
    contactCta(ctx, { cls: 'tw-cta' }),
  ].join('\n');
}

export { towns };
