// /services/ — Services index (brief §7). All copy verbatim from source/pages/services.md.
// Section order (brief §7): hero (H1, H2 + paragraph, founder/van photo) → residential → 3 categories → trust strip →
// guarantee → services catalogue (+ Permanent Outdoor Lighting) → Contact CTA → booking process →
// reviews + quote → town list → contact form → FAQs.
// Styles: src/css/page-services.css (all classes prefixed .sv-). No prices, no invented claims.
import { site } from '../data/site.mjs';
import { services, serviceCards, servicesIntro } from '../data/services.mjs';
import { bookingH2, trustItems, processSteps } from '../data/shared.mjs';
import { hero as homeHero } from '../data/home.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { quoteBlock } from '../blocks/process.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { townList } from '../blocks/town-list.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { faqJsonLd } from '../blocks/faqs.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture, images } from '../lib/html.mjs';
import { plate } from '../blocks/plate.mjs';
import { cardPhotoFor } from '../data/card-photos.mjs';

const pad = n => String(n).padStart(2, '0');

// ---------- verbatim copy (source/pages/services.md) ----------
const intro = {
  h2: 'For a Job Done Right, Call Colonial!',
  body: 'No more spending countless hours searching the web for an electrician, all the expertise you need is right here at Colonial Electric. With a commitment to excellence and a passion for service, we are your one-stop shop for all things electrical. Our range of services is perfect for all types of homeowners, whether you’re looking to upgrade your home’s lighting fixtures, install a state-of-the-art security system, or troubleshoot electrical issues, we have you covered.',
};

const residential = {
  h2: 'Premium Residential Electrical Services Made Simple',
  paras: [
    'Your home isn’t just a place you return to at the end of the day – it’s your sanctuary, your haven of comfort and security. It’s where your loved ones gather, where memories are made, and where you find peace from the outside world. As such, it’s only right to have the BEST premium residential electrical services ensuring its safety, functionality, and aesthetics.',
    'At Colonial Electric, we understand the profound significance of your home and the importance of ensuring that its electrical systems meet the highest standards of quality and reliability. We treat your home as if it were ours, and we prioritize its safety, functionality, and aesthetics above all else.',
  ],
  checks: ['Comprehensive Safety Solutions', 'Customized Offers', 'Top-of-the-line Materials', 'Guaranteed Satisfaction'],
};

// [[label|href]] marks a linked service name inside verbatim text.
// Each category is the verbatim services.md copy, set for scanning without changing a word or its order:
// lead = the opening sentence; intro + items = the next sentence, broken at its own commas into a run-in list
// (or, for Installation, its three service sentences); note = the closing paragraph.
// Media = a real Colonial job photo where one truthfully shows the category (photo: library key + alt + crop), else a
// brand plate (src/blocks/plate.mjs: crest chip + the category glyph on the badge-blue pinstripe). Only Electrical
// Upgrades has one (a new service entrance and meter bank); repairs and installation keep the plate rather than borrow
// a picture of some other job.
const categories = [
  {
    h2: 'Electrical Repairs', ic: 'inspect', plate: 'services-electrical-repairs',
    lead: 'Electrical repairs involve fixing any issues or malfunctions within an existing electrical system.',
    intro: 'This could include',
    items: ['repairing faulty wiring,', 'addressing power outages,', 'replacing damaged outlets or switches,', 'troubleshooting circuit breakers,', 'or fixing any other electrical components that are not functioning correctly.'],
    note: 'An [[Electrical Inspection|electrical-inspections/]] is often necessary to identify these issues and ensure that all repairs are addressed properly.',
  },
  {
    h2: 'Electrical Installation', ic: 'ev', plate: 'services-electrical-installation',
    lead: 'Our Electrical installation services cover a wide range of needs to ensure your home is fully equipped with the latest electrical solutions.',
    items: [
      'We specialize in [[EV Charger Installation|ev-charger-installation/]], providing you with the convenience and efficiency of charging your electric vehicle at home.',
      'Additionally, our [[Ceiling Fan Installation|ceiling-fan-installation/]] service helps enhance your comfort and air circulation.',
      'We also handle the installation of [[Electrical Outlets|electrical-outlets/]] to ensure you have sufficient and strategically placed access points for all your electrical devices.',
    ],
  },
  {
    h2: 'Electrical Upgrades', ic: 'panel', plate: 'services-electrical-upgrades',
    photo: { key: 'photos/service-entrance-meter-bank', alt: 'Service conduit running down to a new two-meter bank on a blue clapboard wall' },
    lead: 'Electrical upgrades involve enhancing or modernizing an existing electrical system to improve its performance, efficiency, or safety.',
    intro: 'This could include',
    items: [
      'an [[Electrical Panel Upgrade|electrical-panel-upgrade/]] to accommodate increased power demands,',
      '[[Whole House Rewiring|whole-house-wiring-or-rewiring/]] to replace outdated wiring with newer, more energy-efficient materials,',
      'or [[Lighting Additions|lighting-additions/]] to upgrade lighting fixtures and enhance aesthetics and functionality.',
    ],
    note: 'When considering electrical upgrades, it’s crucial to assess the current state of the system and identify areas that need improvement.',
  },
];

const faqItems = [
  { q: 'Should you hire an electrician for home repairs?', a: ['Yes, it is highly recommended to hire a qualified electrician for home repairs involving electrical systems. Attempting DIY electrical repairs can be dangerous and may result in serious injury or property damage. Fortunately, Colonial Electric offers professional electrical repair services to ensure the safety and functionality of your home’s electrical systems.'] },
  { q: 'How do you know if you need an electrician?', a: [
    'You may need to hire an electrician if you experience any of the following issues:',
    { list: ['Frequent power outages', 'Flickering lights', 'Tripping circuit breakers', 'Burning smells from outlets or switches', 'If you notice exposed wiring.'] },
    'It’s always best to err on the side of caution and consult with our professionals to assess and address any electrical concerns.',
  ] },
  { q: 'What are the 3 most common causes of electrical problems?', a: [
    'The three most common causes of electrical problems include:',
    { term: 'Faulty Wiring', text: 'Improperly installed or old wiring can lead to electrical problems such as short circuits, power outages, and even electrical fires. Faulty wiring is often a result of poor installation, wear and tear, or damage over time.' },
    { term: 'Overloaded Circuits', text: 'When too many appliances or devices are connected to a single circuit, it can lead to overloading. Overloaded circuits can cause circuit breakers to trip frequently, flickering lights, or even overheating of electrical components, increasing the risk of electrical hazards.' },
    { term: 'Electrical Surges', text: 'Electrical surges are sudden spikes in voltage that can damage electronic devices and appliances connected to the power supply. Surges can be caused by lightning strikes, power grid fluctuations, or faulty wiring within the home. Using surge protectors and ensuring proper grounding can help mitigate the risk of damage from electrical surges.' },
  ] },
];

// ---------- helpers ----------
const linkify = (ctx, text) => esc(text).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, label, href) => `<a class="sv-inlink" href="${ctx.r(href)}">${label}</a>`);
const linksIn = text => [...text.matchAll(/\[\[([^|\]]+)\|([^\]]+)\]\]/g)].map(m => ({ label: m[1], href: m[2] }));
const boltSvg = cls => `<svg class="${cls}" viewBox="0 0 12 20" aria-hidden="true" focusable="false"><path d="M7.4 0 0 11.3h4.9L3.6 20 12 7.9H6.9L7.4 0Z" fill="currentColor"/></svg>`;

// ---------- sections ----------
function hero(ctx) {
  const crumbs = [{ label: 'Home', href: '' }, { label: 'Services' }];
  ctx.jsonld = [...(ctx.jsonld || []), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) }];
  // Rendered width runs wider than the frame (object-fit: cover on a tall frame), so sizes reflect the scaled image.
  const sizes = '(min-width: 1024px) 80vw, (min-width: 640px) 96vw, 120vw';
  ctx.preloadImage = 'owner-van';
  ctx.preloadSizes = sizes;
  // One verbatim paragraph; its first sentence is set as the lead line (same words, same order).
  const cut = intro.body.indexOf('. ') + 1;
  const [first, rest] = [intro.body.slice(0, cut), intro.body.slice(cut)];
  return `<section class="sv-hero on-dark stars-bg" aria-labelledby="sv-h1">
  <div class="container sv-hero__grid">
    <div class="sv-hero__head">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Services</span></li></ol></nav>
      <h1 class="sv-hero__h1" id="sv-h1"><span class="sv-hero__h1-in">Services</span></h1>
      <div class="sv-hero__rule" aria-hidden="true"><span></span>${boltSvg('sv-hero__bolt')}<span></span></div>
      <h2 class="sv-hero__h2">For a Job Done Right, Call <em>Colonial!</em></h2>
    </div>
    <figure class="sv-hero__media">
      <div class="sv-hero__frame">${picture(ctx, 'owner-van', { alt: 'Scott Hays, founder of Colonial Electric, standing beside the wrapped Colonial Electric service van', sizes, priority: true })}</div>
      <figcaption class="sv-hero__cap">
        <span class="sv-hero__cap-k">${boltSvg('sv-hero__cap-b')}Colonial Electric · Weymouth, MA</span>
        <span class="sv-hero__cap-n">Scott Hays, Founder</span>
        <span class="sv-hero__cap-l">${esc(site.license)}</span>
      </figcaption>
    </figure>
    <div class="sv-hero__body">
      <p class="sv-hero__lead"><span class="sv-hero__lead-1">${esc(first)}</span>${esc(rest)}</p>
      <div class="sv-hero__ctas">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a>
        <a class="btn btn--ghost btn--lg" href="#sv-catalog-h"><span>Browse Services</span>${icon('arrow-right', { size: 16 })}</a>
      </div>
      <p class="sv-rating"><span class="sv-rating__stars" aria-hidden="true">${'<svg viewBox="0 0 20 20" focusable="false"><path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" fill="currentColor"/></svg>'.repeat(5)}</span><span class="sv-rating__t">${esc(homeHero.eyebrow)}</span></p>
    </div>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

// Trust bar: the 4 verbatim shared items, each with a one-line proof drawn from real site facts.
function trustBar() {
  const glyphs = ['pin', 'shield', 'check', 'remodel'];
  const proofs = ['Weymouth, MA · South Shore', site.license, site.financing.line, `Founded by ${site.founder}`];
  return `<section class="sv-trust" aria-label="Why homeowners trust us"><div class="container"><ul class="sv-trust__list" role="list">${trustItems.map((t, i) => `<li class="sv-trust__item"><span class="sv-trust__glyph">${icon(glyphs[i], { size: 22 })}</span><span class="sv-trust__txt"><span class="sv-trust__label">${esc(t)}</span><span class="sv-trust__proof">${esc(proofs[i])}</span></span></li>`).join('')}</ul></div></section>`;
}

function residentialBlock(ctx) {
  return `<section class="block sv-res" aria-labelledby="sv-res-h">
  <div class="container sv-res__grid">
    <figure class="sv-res__fig">
      <div class="sv-res__photo">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric', sizes: '(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 92vw' })}</div>
      <figcaption class="sv-res__cap"><span class="sv-res__cap-k">Founder</span><span class="sv-res__cap-n">Scott Hays</span></figcaption>
      <span class="sv-res__badge" aria-hidden="true">${boltSvg('')}</span>
    </figure>
    <div class="sv-res__copy">
      <p class="eyebrow">Residential</p>
      <h2 class="h2 sv-res__h" id="sv-res-h">${esc(residential.h2)}</h2>
      <p class="sv-res__lead">${esc(residential.paras[0])}</p>
      <p class="sv-res__p">${esc(residential.paras[1])}</p>
      <ul class="sv-checks" role="list">${residential.checks.map((c, i) => `<li><span class="sv-checks__n" aria-hidden="true">${pad(i + 1)}</span>${icon('check', { size: 20 })}<span class="sv-checks__t">${esc(c)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

// Category frame: the real photo when the category has one (same .plate--photo markup as a mapped plate), else the plate.
function catMedia(ctx, c) {
  const sizes = '(min-width: 1024px) 28rem, (min-width: 640px) 17rem, 92vw';
  if (c.photo && images[c.photo.key]) {
    return `<span class="plate plate--photo" data-plate="${esc(c.plate)}">${picture(ctx, c.photo.key, { alt: c.photo.alt, sizes, imgCls: 'plate__img' })}</span>`;
  }
  return plate(ctx, { id: c.plate, ic: c.ic, tone: 'blue', sizes });
}

function categoriesBlock(ctx) {
  return `<section class="sv-cats on-dark stars-bg" aria-label="Electrical repairs, installation and upgrades">
  <div class="container">
    <ol class="sv-cats__list" role="list">
      ${categories.map((c, i) => {
        const links = [...c.items, c.note || ''].flatMap(linksIn);
        const id = 'sv-cat-' + (i + 1);
        return `<li class="sv-cat${i % 2 ? ' sv-cat--flip' : ''}${c.photo && images[c.photo.key] ? ' sv-cat--photo' : ''}" aria-labelledby="${id}">
        <figure class="sv-cat__fig">
          <div class="sv-cat__ph">${catMedia(ctx, c)}</div>
          <span class="sv-cat__n" aria-hidden="true">${pad(i + 1)}</span>
        </figure>
        <div class="sv-cat__head">
          <span class="sv-cat__ic">${icon(c.ic, { size: 24 })}</span>
          <h2 class="sv-cat__h" id="${id}">${esc(c.h2)}</h2>
        </div>
        <div class="sv-cat__body">
          <p class="sv-cat__lead">${esc(c.lead)}</p>
          <div class="sv-cat__inc${c.intro ? '' : ' sv-cat__inc--s'}">
            ${c.intro ? `<p class="sv-cat__intro">${esc(c.intro)}</p>\n            ` : ''}<ul class="sv-cat__ul" role="list">
              ${c.items.map(t => `<li>${boltSvg('sv-cat__b')} <span>${linkify(ctx, t)}</span></li>`).join('\n              ')}
            </ul>
          </div>
          ${c.note ? `<p class="sv-cat__note">${linkify(ctx, c.note)}</p>` : ''}
        </div>
        <div class="sv-cat__side">
          <p class="sv-cat__k">Explore</p>
          <ul class="sv-cat__links" role="list">${links.map(l => `<li><a href="${ctx.r(l.href)}"><span>${esc(l.label)}</span>${icon('arrow-up-right', { size: 16 })}</a></li>`).join('')}</ul>
        </div>
      </li>`;
      }).join('\n      ')}
    </ol>
  </div>
</section>`;
}

// Catalogue card. Every card has a 16:10 media zone over its copy, so titles line up across each row:
// a real Colonial job photo where one truthfully shows the service (src/data/card-photos.mjs), otherwise a typographic
// zone (outlined index numeral + the service glyph). Same verbatim title + blurb either way.
const cardSizes = '(min-width: 1100px) 430px, (min-width: 640px) 48vw, 38vw';
function svCard(ctx, s, i) {
  const n = pad(i + 1);
  const photo = cardPhotoFor(s.href, images);
  const media = photo
    ? `<span class="sv-card__media" style="--pos:${photo.pos};--pos-m:${photo.posM}">${picture(ctx, photo.key, { alt: photo.alt, sizes: cardSizes, imgCls: 'sv-card__img' })}<span class="sv-card__tag" aria-hidden="true">${n}</span></span>`
    : `<span class="sv-card__media sv-card__media--type" aria-hidden="true"><span class="sv-card__ghost">${icon(s.icon, { size: 240 })}</span><span class="sv-card__big">${n}</span></span>`;
  // The title is the card's only link (anchor text = the service name); its stretched ::after keeps the whole card clickable.
  return `<li class="sv-card ${photo ? 'sv-card--photo' : 'sv-card--type'}" style="--i:${i}"><div class="sv-card__in">
        ${media}
        <span class="sv-card__body">
          <span class="sv-card__ic" aria-hidden="true">${icon(s.icon, { size: 24 })}</span>
          <h3 class="sv-card__t"><a class="sv-card__a" href="${ctx.r(s.href)}">${esc(s.title).replace(/\S+-\S+/g, w => `<span class="sv-nw">${w}</span>`)}</a></h3>
          <p class="sv-card__p">${esc(s.blurb)}</p>
          <span class="sv-card__go" aria-hidden="true"><span>Learn More</span>${icon('arrow-right', { size: 16 })}</span>
        </span>
      </div></li>`;
}

function catalog(ctx) {
  const outdoor = services.find(s => s.slug === 'permanent-outdoor-lighting');
  return `<section class="block sv-cat-grid" id="sv-catalog" aria-labelledby="sv-catalog-h">
  <div class="container">
    <header class="sv-cg__head">
      <div><p class="eyebrow">All Services</p><h2 class="h2 sv-cg__h" id="sv-catalog-h">${esc(servicesIntro.h2)}</h2></div>
      <p class="sv-cg__lead">${esc(servicesIntro.body)}</p>
    </header>
    <ul class="sv-cards" role="list">
      ${serviceCards.map((s, i) => svCard(ctx, s, i)).join('\n      ')}
    </ul>
    <div class="sv-feature">
      <span class="sv-feature__ic">${icon('sparkle', { size: 28 })}</span>
      <span class="sv-feature__txt"><span class="sv-feature__k">Also Available</span><a class="sv-feature__t" href="${ctx.r(outdoor.slug + '/')}">${esc(outdoor.h1)}</a><span class="sv-feature__s">${esc(outdoor.heroLine)}</span></span>
      <span class="sv-feature__go" aria-hidden="true">${icon('arrow-right', { size: 22 })}</span>
    </div>
  </div>
</section>`;
}

// Booking process: the four step names exactly as services.md sets them (Call / Share / Schedule / Relax),
// each with its verbatim body. Own markup so this page never inherits the homepage step titles.
function bookingBlock(ctx) {
  const glyphs = ['phone', 'quote', 'calendar', 'check'];
  const [h2a, h2b] = ['A Booking Process That', 'Feels Like a Breeze'];
  const h2 = bookingH2 === `${h2a} ${h2b}` ? `${esc(h2a)} <span class="sv-book__h-2">${esc(h2b)}</span>` : esc(bookingH2);
  return `<section class="block sv-book" aria-labelledby="sv-book-h">
  <div class="container">
    <header class="sv-book__head">
      <h2 class="h2 sv-book__h" id="sv-book-h">${h2}</h2>
      <a class="btn btn--red btn--lg sv-book__cta" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a>
    </header>
    <ol class="sv-steps" role="list">
      ${processSteps.map((s, i) => `<li class="sv-step">
        <div class="sv-step__top"><span class="sv-step__ic">${icon(glyphs[i] || 'bolt', { size: 22 })}</span><span class="sv-step__n">Step ${s.n}</span></div>
        <h3 class="sv-step__t">${esc(s.short)}</h3>
        <p class="sv-step__p">${esc(s.body)}</p>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
}

function townsBlock(ctx) {
  return `<section class="block block--alt sv-towns" aria-labelledby="sv-towns-h">
  <div class="container sv-towns__grid">
    <div class="sv-towns__q">${quoteBlock()}</div>
    <div class="sv-towns__list">
      <h2 class="sv-towns__h label-wide" id="sv-towns-h">${icon('pin', { size: 18 })}<span>Service Area</span></h2>
      ${townList(ctx)}
      <a class="sv-towns__more" href="${ctx.r('service-area/')}"><span>View Service Area</span>${icon('arrow-right', { size: 16 })}</a>
    </div>
  </div>
</section>`;
}

function faqBlock(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), faqJsonLd(faqItems, { blockTerm: '\n' })]; // defined terms render as a label above the text
  const ans = a => a.map(b => typeof b === 'string' ? `<p>${esc(b)}</p>`
    : b.list ? `<ul class="sv-faq__ul">${b.list.map(x => `<li>${boltSvg('sv-faq__b')}<span>${esc(x)}</span></li>`).join('')}</ul>`
    : `<div class="sv-faq__term"><p class="sv-faq__term-h">${esc(b.term)}</p><p>${esc(b.text)}</p></div>`).join('');
  return `<section class="block sv-faq" aria-labelledby="sv-faq-h">
  <div class="container sv-faq__grid">
    <header class="sv-faq__head">
      <p class="eyebrow">Questions</p>
      <h2 class="sv-faq__title" id="sv-faq-h">FAQs</h2>
      <a class="sv-faq__call" href="${site.tel}">${icon('phone', { size: 20 })}<span><span class="sv-faq__call-k">Call Us Today!</span><span class="sv-faq__call-n">${site.phone}</span></span></a>
    </header>
    <div class="sv-faq__list">
      ${faqItems.map((f, i) => `<details class="sv-faq__item" name="services-faq"${i === 0 ? ' open' : ''}>
        <summary><span class="sv-faq__n" aria-hidden="true">${pad(i + 1)}</span><span class="sv-faq__q">${esc(f.q)}</span><span class="sv-faq__ic" aria-hidden="true"></span></summary>
        <div class="sv-faq__a">${ans(f.a)}</div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function render(ctx) {
  return [
    hero(ctx),
    residentialBlock(ctx),
    categoriesBlock(ctx),
    trustBar(),
    guarantee(ctx, { cls: 'sv-gx' }),
    catalog(ctx),
    contactCta(ctx),
    bookingBlock(ctx),
    reviews(ctx),
    townsBlock(ctx),
    contactForm(ctx),
    faqBlock(ctx),
  ].join('\n');
}
