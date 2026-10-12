// /we-offer-financing/ — We Offer Financing (brief §7), PRICE-STRIPPED.
// Every sentence below is the brief's exact text. NEVER refill from source/pages (it carries the removed $ / APR figures).
// No dollar amounts, APRs or per-month figures anywhere on this page. Styles: src/css/page-we-offer-financing.css (.fin-*).
// Social proof = real Google reviews only, verbatim from src/data/shared.mjs (brief §4 shared blocks). No aggregate rating or count.
// Photos = the live site's own clean service photos (assets/img/home-services/, brief §8), labelled only with their service names.
import { site } from '../data/site.mjs';
import { reviews } from '../data/shared.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const PREQUALIFY = 'https://wisetack.us/#/t8ixrfe/prequalify'; // captured live href (source/pages.json)
const copy = {
  h1: 'We Offer Financing',
  intro: 'We’ve partnered with Wisetack to offer our customers flexible financing options, so you can pay over time rather than all at once. The application takes about a minute to complete, and checking your options does not impact your credit score.',
  bullets: ['No hidden fees or compounding interest', 'Terms from 3 to 120 months*'],
  prequalify: 'Prequalify today with no impact to your credit and contact us to learn about financing your next project!',
  disclaimer: '*All financing is subject to credit approval. Your terms may vary. Payment options through Wisetack are provided by our lending partners. State interest rate caps may apply. No other financing charges or participation fees. See additional terms at https://wisetack.com/faqs.',
};
// Verbatim fragments of the intro, pulled out as scannable highlights.
const highlights = [
  { ic: 'calendar', t: 'Pay over time rather than all at once' },
  { ic: 'clock', t: 'The application takes about a minute to complete' },
  { ic: 'shield', t: 'Checking your options does not impact your credit score' },
];
// Service pages (live titles / nav labels) shown with the live site's own photos.
const work = [
  { key: 'panel', t: 'Electrical Panel Upgrade', href: 'electrical-panel-upgrade/', ic: 'panel', alt: 'Open residential electrical panel with breakers and wiring' },
  { key: 'ev', t: 'EV Charger Installation', href: 'ev-charger-installation/', ic: 'ev', alt: 'EV charging connector plugged into an electric car' },
  { key: 'generator', t: 'Generators', href: 'generator/', ic: 'generator', alt: 'Standby generator installed beside a white clapboard home' },
  { key: 'remodel', t: 'Remodels', href: 'remodels/', ic: 'remodel', alt: 'Remodel in progress with new drywall and staircase' },
];

const review = name => reviews.find(r => r.name === name);
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
const stars = (size = 14) => `<span class="fin-stars" role="img" aria-label="Rated 5 out of 5 stars">${icon('star', { size }).repeat(5)}</span>`;

const preBtn = (cls = 'btn--red') => `<a class="btn ${cls} btn--lg" href="${PREQUALIFY}" target="_blank" rel="noopener">Prequalify Now${icon('arrow-up-right', { size: 18 })}<span class="sr-only"> (opens Wisetack in a new tab)</span></a>`;

// Real Google review, verbatim. variant: 'hero' (on navy) | 'card' (on white)
function quote(name, variant) {
  const r = review(name);
  if (!r) return '';
  return `<figure class="fin-quote fin-quote--${variant}">
        <blockquote class="fin-quote__q">${r.text.map(t => `<p>${esc(t)}</p>`).join('')}</blockquote>
        <figcaption class="fin-quote__by"><span class="fin-quote__av" aria-hidden="true">${initials(r.name)}</span><span class="fin-quote__who"><span class="fin-quote__name">${esc(r.name)}</span><span class="fin-quote__meta">${stars()}<span class="fin-quote__src">Posted on Google</span></span></span></figcaption>
      </figure>`;
}

// Months scale: 3 → 120, ticks every 12 months; a filled track draws in on load.
function scale() {
  const ticks = [3, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
  const pos = m => ((m - 3) / 117 * 100).toFixed(2);
  return `<div class="fin-scale" aria-hidden="true">
      <div class="fin-scale__track"><span class="fin-scale__fill"></span>${ticks.map(m => `<i style="--p:${pos(m)}"></i>`).join('')}</div>
      <div class="fin-scale__ends"><span>3</span><span>120</span></div>
    </div>`;
}

function hero(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
      { '@type': 'ListItem', position: 2, name: copy.h1, item: site.origin + '/' + ctx.page.slug },
    ],
  }];
  // Real Colonial photo beside the terms card (brief §8): the site's own tight crop of the owner + wrapped-van shot.
  const ph = ctx.asset('img/cf-van');
  const photoSizes = '(min-width: 1440px) 34rem, (min-width: 1024px) 38vw, (min-width: 640px) 88vw, 92vw';
  const photo = `<picture><source type="image/webp" srcset="${ph}-640.webp 640w, ${ph}-1000.webp 1000w" sizes="${photoSizes}"><img class="fin-hero__img" src="${ph}-1000.jpg" srcset="${ph}-640.jpg 640w, ${ph}-1000.jpg 1000w" sizes="${photoSizes}" width="1000" height="900" alt="Founder Scott Hays standing in front of the red, white and blue Colonial Electric van" loading="eager" fetchpriority="high" decoding="async"></picture>`;
  return `<section class="fin-hero on-dark stars-bg" aria-labelledby="fin-h1">
  <div class="container fin-hero__grid">
    <div class="fin-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">${esc(copy.h1)}</span></li></ol></nav>
      <p class="eyebrow fin-hero__eyebrow">Pay over time</p>
      <h1 class="fin-hero__h1" id="fin-h1"><span>We Offer</span> <span class="fin-hero__h1-em">Financing</span></h1>
      <p class="fin-hero__lead">${esc(copy.intro)}</p>
      <p class="btn-row">${preBtn()}<a class="btn btn--ghost btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}${esc(site.phone)}</a></p>
    </div>
    <div class="fin-hero__visual">
      <figure class="fin-hero__photo">
        ${photo}
      </figure>
      <aside class="fin-card" aria-label="Financing at a glance">
        <div class="fin-card__inner pinstripe">
          <p class="fin-card__label label-wide">${icon('bolt', { size: 14 })}Financing with Wisetack</p>
          <ul class="fin-card__list" role="list">
            <li class="fin-term">
              <span class="sr-only">${esc(copy.bullets[1])}</span>
              <span class="fin-term__pre" aria-hidden="true">Terms from</span>
              <span class="fin-term__num" aria-hidden="true"><span>3</span><span class="fin-term__to">to</span><span>120</span></span>
              <span class="fin-term__unit" aria-hidden="true">months<sup>*</sup></span>
              ${scale()}
            </li>
            <li class="fin-fee"><span class="fin-fee__ic">${icon('shield', { size: 22 })}</span><span>${esc(copy.bullets[0])}</span></li>
          </ul>
        </div>
      </aside>
    </div>
    <div class="fin-hero__proof">
      ${quote('Charlie Robinson', 'hero')}
    </div>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

function glance() {
  return `<section class="fin-glance" aria-label="How Wisetack financing works">
  <div class="container"><ol class="fin-glance__list" role="list">${highlights.map((h, i) => `
    <li class="fin-glance__item"><span class="fin-glance__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span class="fin-glance__ic">${icon(h.ic, { size: 22 })}</span><p>${esc(h.t)}</p></li>`).join('')}
  </ol></div>
</section>`;
}

function prequalify(ctx) {
  // The H2 is the verbatim sentence; it is only split typographically into a short headline + a deck.
  const cut = 'Prequalify today';
  const h2 = copy.prequalify.startsWith(cut)
    ? `<span class="fin-pq__h2-a">${esc(cut)}</span> <span class="fin-pq__h2-b">${esc(copy.prequalify.slice(cut.length).trim())}</span>`
    : esc(copy.prequalify);
  return `<section class="fin-pq block" aria-labelledby="fin-pq-h">
  <div class="container fin-pq__grid">
    <figure class="fin-pq__media">
      ${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric', sizes: '(min-width: 960px) 30rem, (min-width: 640px) 60vw, 92vw', imgCls: 'fin-pq__img', loading: 'eager' })}
      <figcaption class="fin-pq__tag">${icon('bolt', { size: 14 })}<span>Scott Hays</span><span class="fin-pq__sep" aria-hidden="true"></span><span>Founder</span></figcaption>
    </figure>
    <div class="fin-pq__copy">
      <p class="eyebrow">Next step</p>
      <h2 class="fin-pq__h2" id="fin-pq-h">${h2}</h2>
      <p class="btn-row">${preBtn()}<a class="btn btn--outline btn--lg" href="${ctx.r('contact-us/')}">Contact Us${icon('arrow-right', { size: 16 })}</a></p>
      <p class="fin-pq__call">Or call <a class="tel-lg" href="${site.tel}">${icon('phone', { size: 20 })}${esc(site.phone)}</a></p>
      ${quote('Dottie Martin', 'card')}
      <div class="fin-fine">
        <span class="fin-fine__mark" aria-hidden="true">*</span>
        <p>${esc(copy.disclaimer).replace('https://wisetack.com/faqs', '<a href="https://wisetack.com/faqs" target="_blank" rel="noopener">https://wisetack.com/faqs</a>')}</p>
      </div>
    </div>
  </div>
</section>`;
}

function projects(ctx) {
  const IMG = 'assets/img/home-services/';
  const sizes = '(min-width: 1024px) 19rem, (min-width: 640px) 46vw, 45vw';
  return `<section class="fin-work on-dark stars-bg" aria-labelledby="fin-work-h">
  <div class="container">
    <header class="fin-work__head">
      <div><p class="eyebrow">Our Services</p><h2 class="fin-work__h" id="fin-work-h">Your Next Project</h2></div>
      <a class="fin-work__all" href="${ctx.r('services/')}"><span>View Our Services</span>${icon('arrow-right', { size: 18 })}</a>
    </header>
    <ul class="fin-work__grid" role="list">${work.map((w, i) => {
      const r = f => ctx.r(IMG + w.key + f);
      return `
      <li><a class="fin-work__tile" href="${ctx.r(w.href)}">
        <span class="fin-work__ph"><picture><source type="image/webp" srcset="${r('-480.webp')} 480w, ${r('-800.webp')} 684w" sizes="${sizes}"><img src="${r('-800.jpg')}" srcset="${r('-480.jpg')} 480w, ${r('-800.jpg')} 684w" sizes="${sizes}" width="684" height="428" alt="${esc(w.alt)}" loading="eager" fetchpriority="low" decoding="async"></picture></span>
        <span class="fin-work__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="fin-work__t"><span class="fin-work__ic" aria-hidden="true">${icon(w.ic, { size: 20 })}</span><span class="fin-work__name">${esc(w.t)}</span>${icon('arrow-up-right', { size: 18, cls: 'fin-work__go' })}</span>
      </a></li>`;
    }).join('')}
    </ul>
  </div>
</section>`;
}

function towns(ctx) {
  return `<section class="fin-towns block block--alt" aria-labelledby="fin-towns-h">
  <div class="container fin-towns__grid">
    <div class="fin-towns__head">
      <p class="eyebrow">Service Area</p>
      <h2 class="h2" id="fin-towns-h">Towns We Serve</h2>
      <a class="fin-towns__link" href="${ctx.r('service-area/')}"><span>Service Area</span>${icon('arrow-right', { size: 18 })}</a>
      <p class="fin-towns__call"><a class="tel-lg" href="${site.tel}">${icon('phone', { size: 20 })}${esc(site.phone)}</a></p>
    </div>
    ${townList(ctx)}
  </div>
</section>`;
}

export function render(ctx) {
  return [hero(ctx), glance(), prequalify(ctx), projects(ctx), towns(ctx)].join('\n');
}
