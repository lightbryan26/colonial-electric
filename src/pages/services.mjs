// /services/ — Services index (brief §7). All copy verbatim from source/pages/services.md.
// Section order (brief §7): hero + "For a Job Done Right" → residential → 3 categories → trust strip →
// guarantee → services catalogue (+ Permanent Outdoor Lighting) → Contact CTA → booking process →
// reviews + quote → town list → contact form → FAQs.
// Styles: src/css/page-services.css (all classes prefixed .sv-). No prices, no invented claims.
import { site } from '../data/site.mjs';
import { services, serviceCards, servicesIntro } from '../data/services.mjs';
import { bookingH2 } from '../data/shared.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { process, quoteBlock } from '../blocks/process.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { townList } from '../blocks/town-list.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { faqJsonLd } from '../blocks/faqs.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

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
const categories = [
  {
    h2: 'Electrical Repairs', ic: 'inspect',
    paras: [
      'Electrical repairs involve fixing any issues or malfunctions within an existing electrical system. This could include repairing faulty wiring, addressing power outages, replacing damaged outlets or switches, troubleshooting circuit breakers, or fixing any other electrical components that are not functioning correctly.',
      'An [[Electrical Inspection|electrical-inspections/]] is often necessary to identify these issues and ensure that all repairs are addressed properly.',
    ],
  },
  {
    h2: 'Electrical Installation', ic: 'ev',
    paras: [
      'Our Electrical installation services cover a wide range of needs to ensure your home is fully equipped with the latest electrical solutions. We specialize in [[EV Charger Installation|ev-charger-installation/]], providing you with the convenience and efficiency of charging your electric vehicle at home. Additionally, our [[Ceiling Fan Installation|ceiling-fan-installation/]] service helps enhance your comfort and air circulation.',
      'We also handle the installation of [[Electrical Outlets|electrical-outlets/]] to ensure you have sufficient and strategically placed access points for all your electrical devices.',
    ],
  },
  {
    h2: 'Electrical Upgrades', ic: 'panel',
    paras: [
      'Electrical upgrades involve enhancing or modernizing an existing electrical system to improve its performance, efficiency, or safety. This could include an [[Electrical Panel Upgrade|electrical-panel-upgrade/]] to accommodate increased power demands, [[Whole House Rewiring|whole-house-wiring-or-rewiring/]] to replace outdated wiring with newer, more energy-efficient materials, or [[Lighting Additions|lighting-additions/]] to upgrade lighting fixtures and enhance aesthetics and functionality.',
      'When considering electrical upgrades, it’s crucial to assess the current state of the system and identify areas that need improvement.',
    ],
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
  const [a, b] = [services.slice(0, 7), services.slice(7)];
  const breaker = (s, i) => `<li class="sv-brk" style="--i:${i}"><a href="${ctx.r(s.slug + '/')}"><span class="sv-brk__n">${pad(i + 1)}</span><span class="sv-brk__t">${esc(s.nav)}</span><span class="sv-brk__sw" aria-hidden="true"><span></span></span></a></li>`;
  return `<section class="sv-hero on-dark stars-bg" aria-labelledby="sv-h1">
  <div class="container sv-hero__grid">
    <div class="sv-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Services</span></li></ol></nav>
      <h1 class="sv-hero__h1" id="sv-h1"><span class="sv-hero__h1-in">Services</span></h1>
      <div class="sv-hero__rule" aria-hidden="true"><span></span>${boltSvg('sv-hero__bolt')}<span></span></div>
      <h2 class="sv-hero__h2">For a Job Done Right, Call <em>Colonial!</em></h2>
      <p class="sv-hero__lead">${esc(intro.body)}</p>
      <div class="sv-hero__ctas">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>Call ${site.phone}</span></a>
        <a class="btn btn--ghost btn--lg" href="#sv-catalog-h"><span>Browse Services</span>${icon('arrow-right', { size: 16 })}</a>
      </div>
    </div>
    <nav class="sv-panel" aria-label="All services">
      <div class="sv-panel__frame">
        <header class="sv-panel__head">
          <span class="sv-panel__k">Service Directory</span>
          <span class="sv-panel__lic">${esc(site.license)}</span>
        </header>
        <div class="sv-panel__cols">
          <ol class="sv-panel__col" role="list">${a.map((s, i) => breaker(s, i)).join('')}</ol>
          <ol class="sv-panel__col" role="list" start="8">${b.map((s, i) => breaker(s, i + 7)).join('')}</ol>
        </div>
        <footer class="sv-panel__foot"><span class="sv-panel__dot" aria-hidden="true"></span><span>Colonial Electric · Weymouth, MA</span></footer>
      </div>
    </nav>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
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

function categoriesBlock(ctx) {
  return `<section class="sv-cats on-dark stars-bg" aria-label="Electrical repairs, installation and upgrades">
  <div class="container">
    <ol class="sv-cats__list" role="list">
      ${categories.map((c, i) => {
        const links = c.paras.flatMap(linksIn);
        const id = 'sv-cat-' + (i + 1);
        return `<li class="sv-cat" aria-labelledby="${id}">
        <div class="sv-cat__top"><span class="sv-cat__n" aria-hidden="true">${pad(i + 1)}</span><span class="sv-cat__ic">${icon(c.ic, { size: 26 })}</span></div>
        <h2 class="sv-cat__h" id="${id}">${esc(c.h2)}</h2>
        <div class="sv-cat__body">${c.paras.map(p => `<p>${linkify(ctx, p)}</p>`).join('')}</div>
        <ul class="sv-cat__links" role="list">${links.map(l => `<li><a href="${ctx.r(l.href)}"><span>${esc(l.label)}</span>${icon('arrow-up-right', { size: 16 })}</a></li>`).join('')}</ul>
      </li>`;
      }).join('\n      ')}
    </ol>
  </div>
</section>`;
}

function catalog(ctx) {
  const outdoor = services.find(s => s.variant);
  return `<section class="block sv-cat-grid" id="sv-catalog" aria-labelledby="sv-catalog-h">
  <div class="container">
    <header class="sv-cg__head">
      <div><p class="eyebrow">All Services</p><h2 class="h2 sv-cg__h" id="sv-catalog-h">${esc(servicesIntro.h2)}</h2></div>
      <p class="sv-cg__lead">${esc(servicesIntro.body)}</p>
    </header>
    <ul class="sv-cards" role="list">
      ${serviceCards.map((s, i) => `<li class="sv-card" style="--i:${i}"><a href="${ctx.r(s.href)}">
        <span class="sv-card__row"><span class="sv-card__ic">${icon(s.icon, { size: 26 })}</span><span class="sv-card__n" aria-hidden="true">${pad(i + 1)}</span></span>
        <h3 class="sv-card__t">${esc(s.title)}</h3>
        <p class="sv-card__p">${esc(s.blurb)}</p>
        <span class="sv-card__go"><span>Learn More</span>${icon('arrow-right', { size: 16 })}</span>
      </a></li>`).join('\n      ')}
    </ul>
    <a class="sv-feature" href="${ctx.r(outdoor.slug + '/')}">
      <span class="sv-feature__ic">${icon('sparkle', { size: 28 })}</span>
      <span class="sv-feature__txt"><span class="sv-feature__k">Also Available</span><span class="sv-feature__t">${esc(outdoor.h1)}</span><span class="sv-feature__s">${esc(outdoor.heroLine)}</span></span>
      <span class="sv-feature__go" aria-hidden="true">${icon('arrow-right', { size: 22 })}</span>
    </a>
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
  ctx.jsonld = [...(ctx.jsonld || []), faqJsonLd(faqItems)];
  const ans = a => a.map(b => typeof b === 'string' ? `<p>${esc(b)}</p>`
    : b.list ? `<ul class="sv-faq__ul">${b.list.map(x => `<li>${boltSvg('sv-faq__b')}<span>${esc(x)}</span></li>`).join('')}</ul>`
    : `<div class="sv-faq__term"><h4>${esc(b.term)}</h4><p>${esc(b.text)}</p></div>`).join('');
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
    trustStrip(ctx),
    guarantee(ctx),
    catalog(ctx),
    contactCta(ctx),
    process(ctx, { h2: bookingH2, withBodies: true }),
    reviews(ctx),
    townsBlock(ctx),
    contactForm(ctx),
    faqBlock(ctx),
  ].join('\n');
}
