// /premium-membership/ — Flash Pass Membership (brief §7). NO price anywhere.
// Copy verbatim from source/pages/premium-membership.md. Allowed fixes only: "all-acess" → all-access,
// "electriciann" → electrician, "We've got your covered" → you covered, and the duplicated
// "Our exclusive access pass isn't just about" in Save Big. Benefit titles = captions baked into the
// live perk images (verified live copy, brief §7); the perk cards are rebuilt in HTML, not reused images.
// Styles: src/css/page-premium-membership.css (all classes .pm-*). Interaction: the inline script at the
// end of the bolt section (tabs pattern: hover / tap / arrow keys; works as a plain list without JS).
import { site } from '../data/site.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const pullQuote = 'Our customers only deserve the best';

const intro = {
  h2: 'Experience Platinum Privileges That’s Unlike Any Other',
  paras: [
    'When we say “Our customers only deserve the best” we mean it, and thats exactly what sets us apart from the rest. With Colonial Electric, customers can enjoy an EXCLUSIVE ACCESS PASS that ensures they get unparalleled experience and benefits. Our program goes beyond just providing exceptional service; it’s about elevating your entire experience with Colonial Electric to a level of luxury and convenience that’s unmatched in the industry.',
    'We always strive to exceed your expectations, and our Exclusive Access Pass is a testament to that commitment. Our team is not just here to complete tasks; we’re here to build relationships. When you become a part of our Exclusive Access Pass program, you’ll have a dedicated point of contact who will guide you through every step of your electrical journey.',
    'From priority customer support, to waived diagnostic fees, these are just some of the exclusive benefits members can expect with our program. Don’t miss out on the opportunity to streamline your electrical needs and elevate your experience with Colonial Electric!',
  ],
};

const bolt = {
  eyebrow: 'Colonial Electric',
  h2: '“Where Quality Comes Standard”',
  hint: 'Hover over the BOLT to see the benefits that await you!',
};

// Node positions are % of the bolt artboard (viewBox 0 0 400 600); lvl = how far the charge fills (0–1).
const benefits = [
  { t: 'Front-of-the-Line Pass', ic: 'bolt', x: 59.25, y: 15, lvl: .24,
    p: 'Electrical issues are a part of the daily life, but with our Exclusive Access Pass, waiting in line becomes a thing of the past. Our “Front of the Line Pass” guarantees immediate attention from our expert technicians for all repairs, services, and upgrades. No more long waits, just efficient solutions tailored to your needs.' },
  { t: 'After-Hours Emergency Assistance', ic: 'clock', x: 44.5, y: 35, lvl: .43,
    p: 'Our regular business hours is from 8:00 AM to 4:00 PM, but we understand that electrical issues don’t adhere to schedules. That’s why our exclusive all-access pass extends beyond standard hours to provide emergency support when you need it most. With our after-hours assistance, customers can rest assured knowing that help is available even during critical after-hours moments, ensuring peace of mind and timely resolution to any electrical concerns.' },
  { t: 'Waived Diagnostic & Service Fees', ic: 'shield', x: 57.75, y: 57.5, lvl: .64,
    p: 'Unlike many electrical companies that charge customers for service estimates, Colonial Electric takes a customer-first approach. With our exclusive all-access pass, there’s no need for concern about additional fees when requesting an electrician to assess your home for electrical issues. We prioritize transparency and customer satisfaction, ensuring that our visit to identify the cause of a problem or provide a price estimate is a complimentary service for our valued members.' },
  { t: 'Annual Whole Home Electrical Safety Inspections', ic: 'inspect', x: 44, y: 80, lvl: 1,
    p: 'Regular inspections of a home’s electrical system is crucial for ensuring safety and efficiency. With our exclusive all-access pass, Colonial Electric goes the extra mile by offering comprehensive annual whole-home electrical safety inspections. Say goodbye to the hassle of searching for an electrician to handle these essential check-ups! We’ve got you covered.' },
];

const saveBig = {
  h2: ['Save Big…', 'And Enjoy', 'BIGGER'],
  p: 'Our exclusive access pass isn’t just about saving money; it’s a ticket to a world of enhanced experiences and greater enjoyment. With our exclusive access pass, you’re not just making a smart financial choice – you’re unlocking a door of unparalleled opportunities that enhances quality of life and enriches your every moment.',
};

const pad = n => String(n).padStart(2, '0');
const BOLT_PTS = '232,8 62,334 182,334 132,592 338,246 214,246 322,8';

function hero(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Flash Pass Membership', item: site.origin + '/' + ctx.page.slug },
    ],
  }];
  return `<section class="pm-hero on-dark stars-bg" aria-labelledby="pm-h1">
  <svg class="pm-hero__ghost" viewBox="0 0 400 600" aria-hidden="true" focusable="false"><polygon points="${BOLT_PTS}"/></svg>
  <div class="container pm-hero__grid">
    <div class="pm-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Flash Pass Membership</span></li></ol></nav>
      <p class="eyebrow pm-hero__eyebrow">Exclusive Access Pass</p>
      <h1 class="pm-hero__h1" id="pm-h1"><span class="pm-hero__h1-a">Flash Pass</span> <span class="pm-hero__h1-b">Membership</span></h1>
      <p class="pm-hero__quote"><span aria-hidden="true">“</span>${esc(pullQuote)}<span aria-hidden="true">”</span></p>
      <p class="btn-row pm-hero__ctas"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}${site.phone}</a><a class="btn btn--ghost btn--lg" href="#pm-benefits">See the Benefits${icon('arrow-right', { size: 16 })}</a></p>
    </div>
    <figure class="pm-hero__media">
      <div class="pm-hero__frame">${picture(ctx, 'owner-van', { alt: 'Founder Scott Hays standing beside the Colonial Electric service van', sizes: '(min-width: 1440px) 560px, (min-width: 960px) 42vw, 92vw', priority: true })}</div>
      <figcaption class="pm-pass" aria-hidden="true">
        <span class="pm-pass__top"><img src="${ctx.asset('img/logo-badge-250.png')}" width="250" height="150" alt="" decoding="async"><span class="pm-pass__chip label-wide">Member</span></span>
        <span class="pm-pass__name">Flash Pass${icon('bolt', { size: 22 })}</span>
        <span class="pm-pass__lic label-wide">${esc(site.license)}</span>
      </figcaption>
    </figure>
  </div>
  <div class="container"><ol class="pm-hero__index" role="list" aria-label="Membership benefits">
    ${benefits.map((b, i) => `<li><a href="#pm-tab-${i}" data-pm-jump="${i}"><span class="pm-hero__n" aria-hidden="true">${pad(i + 1)}</span><span>${esc(b.t)}</span></a></li>`).join('')}
  </ol></div>
</section>`;
}

function introSection(ctx) {
  const [p1, p2, p3] = intro.paras;
  return `<section class="pm-intro" aria-labelledby="pm-intro-h">
  <div class="container">
    <p class="pm-index"><span class="pm-index__n">01</span><span class="pm-index__l">The Pass</span></p>
    <h2 class="pm-intro__h" id="pm-intro-h">Experience <em>Platinum Privileges</em> That’s Unlike Any Other</h2>
    <div class="pm-intro__grid">
      <figure class="pm-intro__media">
        <div class="pm-intro__frame">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 1440px) 440px, (min-width: 960px) 34vw, 92vw' })}</div>
        <figcaption class="pm-intro__cap"><span class="label-wide">Founder</span><span class="pm-intro__name">Scott Hays</span></figcaption>
      </figure>
      <div class="pm-intro__text">
        <p class="pm-intro__lead">${esc(p1)}</p>
        <div class="pm-intro__cols">
          <p>${esc(p2)}</p>
          <p>${esc(p3)}</p>
        </div>
        <div class="pm-intro__cta">
          <a class="btn btn--navy btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}Call Now</a>
          <a class="tel-lg pm-intro__tel" href="${site.tel}">${site.phone}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function boltSection() {
  const nodes = benefits.map((b, i) => `<button class="pm-node${i % 2 ? ' pm-node--l' : ''}" type="button" role="tab" id="pm-tab-${i}" aria-controls="pm-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}" data-lvl="${b.lvl}" style="--x:${b.x}%;--y:${b.y}%">
          <span class="pm-node__dot" aria-hidden="true">${pad(i + 1)}</span><span class="pm-node__t">${esc(b.t)}</span>
        </button>`).join('\n        ');
  const panels = benefits.map((b, i) => `<article class="pm-panel" role="tabpanel" id="pm-panel-${i}" aria-labelledby="pm-tab-${i}" data-i="${i}"${i ? ' data-off' : ''}>
          <p class="pm-panel__k"><span class="pm-panel__n" aria-hidden="true">${pad(i + 1)}</span><span class="pm-panel__ic">${icon(b.ic, { size: 22 })}</span><span class="label-wide">Benefit ${i + 1} of ${benefits.length}</span></p>
          <h3 class="pm-panel__h">${esc(b.t)}</h3>
          <p class="pm-panel__p">${esc(b.p)}</p>
        </article>`).join('\n        ');
  return `<section class="pm-bolt on-dark stars-bg" id="pm-benefits" aria-labelledby="pm-bolt-h">
  <div class="container pm-bolt__grid">
    <header class="pm-bolt__head">
      <p class="pm-index pm-index--dark"><span class="pm-index__n">02</span><span class="pm-index__l">The Benefits</span></p>
      <p class="eyebrow">${esc(bolt.eyebrow)}</p>
      <h2 class="pm-bolt__h" id="pm-bolt-h">${esc(bolt.h2)}</h2>
      <p class="pm-bolt__hint">${icon('bolt', { size: 16 })}<span>${esc(bolt.hint)}</span></p>
    </header>
    <div class="pm-stage" data-pm-stage style="--lvl:${benefits[0].lvl}">
      <svg class="pm-stage__svg" viewBox="0 0 400 600" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="pm-bolt-clip"><polygon points="${BOLT_PTS}"/></clipPath>
          <pattern id="pm-pin" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="1.4" fill="rgba(255,255,255,.07)"/></pattern>
          <pattern id="pm-pin-r" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="1.4" fill="rgba(255,255,255,.14)"/></pattern>
        </defs>
        <polygon class="pm-stage__halo" points="${BOLT_PTS}"/>
        <g clip-path="url(#pm-bolt-clip)">
          <rect class="pm-stage__base" width="400" height="600"/>
          <rect width="400" height="600" fill="url(#pm-pin)"/>
          <g class="pm-stage__charge"><rect class="pm-stage__fill" width="400" height="600"/><rect width="400" height="600" fill="url(#pm-pin-r)"/></g>
        </g>
        <polygon class="pm-stage__line" points="${BOLT_PTS}" pathLength="1"/>
      </svg>
      <div class="pm-stage__nodes" role="tablist" aria-label="Flash Pass benefits" aria-orientation="vertical">
        ${nodes}
      </div>
    </div>
    <div class="pm-panels" data-pm-panels>
        ${panels}
    </div>
  </div>
  <script>
  (function () {
    var s = document.getElementById('pm-benefits'); if (!s) return;
    var tabs = [].slice.call(s.querySelectorAll('[role=tab]')), panels = [].slice.call(s.querySelectorAll('[role=tabpanel]'));
    var stage = s.querySelector('[data-pm-stage]'), cur = 0;
    s.classList.add('pm-js');
    function set(i, focus) {
      if (i < 0) i = tabs.length - 1; if (i >= tabs.length) i = 0;
      cur = i;
      tabs.forEach(function (t, k) { var on = k === i; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; t.classList.toggle('is-done', k < i); });
      panels.forEach(function (p, k) { if (k === i) p.removeAttribute('data-off'); else p.setAttribute('data-off', ''); });
      stage.style.setProperty('--lvl', tabs[i].getAttribute('data-lvl'));
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { set(k); });
      t.addEventListener('keydown', function (e) {
        var m = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (m) { e.preventDefault(); set(cur + m, true); }
        else if (e.key === 'Home') { e.preventDefault(); set(0, true); }
        else if (e.key === 'End') { e.preventDefault(); set(tabs.length - 1, true); }
      });
    });
    // "Hover over the BOLT": with a mouse, the pointer's height over the bolt picks the benefit.
    stage.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = stage.getBoundingClientRect(), y = (e.clientY - r.top) / r.height, k = 0;
      tabs.forEach(function (t, j) { if (y > (j ? (parseFloat(tabs[j - 1].style.getPropertyValue('--y')) + parseFloat(t.style.getPropertyValue('--y'))) / 200 : -1)) k = j; });
      if (k !== cur) set(k);
    });
    document.querySelectorAll('[data-pm-jump]').forEach(function (a) {
      a.addEventListener('click', function () { set(+a.getAttribute('data-pm-jump')); });
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { s.classList.add('pm-live'); io.disconnect(); } }); }, { threshold: .15 });
      io.observe(stage);
    } else s.classList.add('pm-live');
  })();
  </script>
</section>`;
}

function saveBigSection() {
  const [a, b, c] = saveBig.h2;
  return `<section class="pm-save" aria-labelledby="pm-save-h">
  <div class="container">
    <p class="pm-index"><span class="pm-index__n">03</span><span class="pm-index__l">The Payoff</span></p>
    <div class="pm-save__grid">
    <h2 class="pm-save__h" id="pm-save-h"><span class="pm-save__a">${esc(a)}</span> <span class="pm-save__b">${esc(b)}</span> <span class="pm-save__c">${esc(c)}</span></h2>
    <div class="pm-save__row">
      <span class="flag-rule" aria-hidden="true"></span>
      <p class="pm-save__p">${esc(saveBig.p)}</p>
      <div class="pm-save__cta">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}Call Now</a>
        <a class="tel-lg" href="${site.tel}">${site.phone}</a>
      </div>
    </div>
    </div>
  </div>
</section>`;
}

export function render(ctx) {
  return [
    hero(ctx),
    introSection(ctx),
    boltSection(),
    guarantee(ctx, { id: 'pm-guarantee' }),
    reviews(ctx, { id: 'pm-reviews' }),
    trustStrip(ctx),
    contactCta(ctx, { id: 'pm-cta', withTowns: true }),
    saveBigSection(),
  ].join('\n');
}
