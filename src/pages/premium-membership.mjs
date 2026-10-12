// /premium-membership/ — Flash Pass Membership (brief §7). NO price anywhere.
// Copy verbatim from source/pages/premium-membership.md. Allowed fixes only: "all-acess" → all-access,
// "electriciann" → electrician, "We've got your covered" → you covered, and the duplicated
// "Our exclusive access pass isn't just about" in Save Big. Benefit titles = captions baked into the
// live perk images (verified live copy, brief §7); the perk cards are rebuilt in HTML, not reused images.
// Styles: src/css/page-premium-membership.css (all classes .pm-*). Interaction: the inline script at the
// end of the bolt section (all four cards always visible; bolt nodes are buttons — hover, tap, focus or
// keyboard light the matching card and charge the bolt; no JS = static cards).
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
// img = the live site's own clean service photo for that benefit (assets/img/home-services/, brief §8).
const benefits = [
  { t: 'Front-of-the-Line Pass', ic: 'bolt', x: 59.25, y: 15, lvl: .24,
    img: ['outlets', 637, 398, 'Close-up of a duplex electrical outlet being wired into a wall box', '50% 50%'],
    p: 'Electrical issues are a part of the daily life, but with our Exclusive Access Pass, waiting in line becomes a thing of the past. Our “Front of the Line Pass” guarantees immediate attention from our expert technicians for all repairs, services, and upgrades. No more long waits, just efficient solutions tailored to your needs.' },
  { t: 'After-Hours Emergency Assistance', ic: 'clock', x: 44.5, y: 35, lvl: .43,
    img: ['lighting', 684, 428, 'Filament bulbs glowing against a dark brick wall', '50% 40%'],
    p: 'Our regular business hours is from 8:00 AM to 4:00 PM, but we understand that electrical issues don’t adhere to schedules. That’s why our exclusive all-access pass extends beyond standard hours to provide emergency support when you need it most. With our after-hours assistance, customers can rest assured knowing that help is available even during critical after-hours moments, ensuring peace of mind and timely resolution to any electrical concerns.' },
  { t: 'Waived Diagnostic & Service Fees', ic: 'shield', x: 57.75, y: 57.5, lvl: .64,
    img: ['panel', 684, 428, 'Open residential electrical panel with breakers and wiring', '50% 45%'],
    p: 'Unlike many electrical companies that charge customers for service estimates, Colonial Electric takes a customer-first approach. With our exclusive all-access pass, there’s no need for concern about additional fees when requesting an electrician to assess your home for electrical issues. We prioritize transparency and customer satisfaction, ensuring that our visit to identify the cause of a problem or provide a price estimate is a complimentary service for our valued members.' },
  { t: 'Annual Whole Home Electrical Safety Inspections', ic: 'inspect', x: 44, y: 80, lvl: 1,
    img: ['generator', 684, 428, 'Standby generator installed beside a white clapboard home', '50% 60%'],
    p: 'Regular inspections of a home’s electrical system is crucial for ensuring safety and efficiency. With our exclusive all-access pass, Colonial Electric goes the extra mile by offering comprehensive annual whole-home electrical safety inspections. Say goodbye to the hassle of searching for an electrician to handle these essential check-ups! We’ve got you covered.' },
];
// The verbatim paragraph's first sentence is set as its lead (same <p>, same words; typographic emphasis only).
const splitLead = p => { const i = p.indexOf('. '); return i < 0 ? [p, ''] : [p.slice(0, i + 1), p.slice(i + 2)]; };

const saveBig = {
  h2: ['Save Big…', 'And Enjoy', 'BIGGER'],
  p: 'Our exclusive access pass isn’t just about saving money; it’s a ticket to a world of enhanced experiences and greater enjoyment. With our exclusive access pass, you’re not just making a smart financial choice – you’re unlocking a door of unparalleled opportunities that enhances quality of life and enriches your every moment.',
};

const pad = n => String(n).padStart(2, '0');
// Bold a phrase that is already in the verbatim sentence (emphasis only; the words are unchanged).
const emph = (p, phrase) => { const i = p.indexOf(phrase); if (i < 0) throw new Error('emph: phrase not found: ' + phrase); return esc(p.slice(0, i)) + '<strong>' + esc(phrase) + '</strong>' + esc(p.slice(i + phrase.length)); };
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
</section>`;
}

function introSection(ctx) {
  const [p1, p2, p3] = intro.paras;
  return `<section class="pm-intro" aria-labelledby="pm-intro-h">
  <div class="container">
    <p class="pm-index"><span class="pm-index__n">01</span><span class="pm-index__l">The Pass</span></p>
    <h2 class="pm-intro__h" id="pm-intro-h"><span>Experience <em>Platinum Privileges</em></span> <span>That’s Unlike Any Other</span></h2>
    <div class="pm-intro__grid">
      <figure class="pm-intro__media">
        <div class="pm-intro__frame">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 1440px) 440px, (min-width: 960px) 34vw, 92vw', loading: 'eager' })}</div>
        <figcaption class="pm-intro__cap"><span class="label-wide">Founder</span><span class="pm-intro__name">Scott Hays</span></figcaption>
      </figure>
      <div class="pm-intro__text">
        <p class="pm-intro__lead">${esc(p1)}</p>
        <div class="pm-intro__cols">
          <p>${emph(p2, 'you’ll have a dedicated point of contact')}</p>
          <p>${emph(p3, 'From priority customer support, to waived diagnostic fees')}</p>
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

// Join panel straight under the hero: the sign-up path (by phone; NO price on this site, brief §7).
function joinSection(ctx) {
  return `<section class="pm-join" aria-labelledby="pm-join-h">
  <div class="container">
    <div class="pm-join__shell"><div class="pm-join__frame"><div class="pm-join__card">
      <div class="pm-join__id">
        <p class="eyebrow pm-join__eyebrow">Exclusive Access Pass</p>
        <h2 class="pm-join__h" id="pm-join-h">Flash Pass <span>Membership</span></h2>
        <p class="pm-join__lic label-wide">${esc(site.license)}</p>
      </div>
      <ul class="pm-join__list" role="list" aria-label="What membership includes">
        ${benefits.map((b, i) => `<li><a href="#pm-card-${i}" data-pm-jump="${i}"><span class="pm-join__tick" aria-hidden="true">${icon('check', { size: 14 })}</span><span>${esc(b.t)}</span></a></li>`).join('\n        ')}
      </ul>
      <div class="pm-join__act">
        <a class="btn btn--red pm-join__btn" href="${site.tel}">${icon('bolt', { size: 18 })}Join Flash Pass</a>
        <a class="pm-join__tel" href="${site.tel}">${icon('phone', { size: 16 })}${site.phone}</a>
        <p class="pm-join__fine">${icon('clock', { size: 14 })}<span>Operating Hours: 8:00 AM – 4:00 PM</span></p>
      </div>
    </div></div></div>
  </div>
</section>`;
}

function boltSection(ctx) {
  const IMG = ctx.asset('img/home-services/');
  const tabs = benefits.map((b, i) => `<button class="pm-node" type="button" role="tab" id="pm-tab-${i}" aria-selected="${i === 0}" aria-controls="pm-card-${i}" tabindex="${i === 0 ? 0 : -1}" data-lvl="${b.lvl}" style="--x:${b.x};--y:${b.y}">
          <span class="pm-node__dot" aria-hidden="true">${pad(i + 1)}</span><span class="pm-node__lead" aria-hidden="true"></span><span class="pm-node__t">${esc(b.t)}</span>
        </button>`).join('\n        ');
  const cards = benefits.map((b, i) => {
    const [key, w, h, alt, pos] = b.img;
    const [lead, rest] = splitLead(b.p);
    return `<article class="pm-card${i === 0 ? ' is-on' : ''}" id="pm-card-${i}" role="tabpanel" aria-labelledby="pm-tab-${i}" tabindex="0">
          <div class="pm-card__media"><picture><source type="image/webp" srcset="${IMG}${key}-480.webp 480w, ${IMG}${key}-800.webp ${w}w" sizes="(min-width: 1440px) 44rem, (min-width: 1024px) 56vw, 92vw"><img src="${IMG}${key}-800.jpg" srcset="${IMG}${key}-480.jpg 480w, ${IMG}${key}-800.jpg ${w}w" sizes="(min-width: 1440px) 44rem, (min-width: 1024px) 56vw, 92vw" width="${w}" height="${h}" alt="${esc(alt)}" loading="eager" fetchpriority="low" decoding="sync" style="object-position:${pos}"></picture><span class="pm-card__n" aria-hidden="true">${pad(i + 1)}</span></div>
          <div class="pm-card__body">
            <p class="pm-card__k"><span class="pm-card__ic" aria-hidden="true">${icon(b.ic, { size: 22 })}</span><span class="pm-card__count label-wide" aria-hidden="true">${pad(i + 1)} / ${pad(benefits.length)}</span></p>
            <h3 class="pm-card__h">${esc(b.t)}</h3>
            <p class="pm-card__p"><span class="pm-card__lead">${esc(lead)}</span> ${esc(rest)}</p>
          </div>
        </article>`;
  }).join('\n        ');
  return `<section class="pm-bolt on-dark stars-bg" id="pm-benefits" aria-labelledby="pm-bolt-h">
  <div class="container">
    <header class="pm-bolt__head">
      <div class="pm-bolt__title">
        <p class="pm-index pm-index--dark"><span class="pm-index__n">02</span><span class="pm-index__l">The Benefits</span></p>
        <p class="eyebrow">${esc(bolt.eyebrow)}</p>
        <h2 class="pm-bolt__h" id="pm-bolt-h">${esc(bolt.h2)}</h2>
      </div>
      <p class="pm-bolt__hint"><span class="pm-bolt__hint-ic" aria-hidden="true">${icon('bolt', { size: 20 })}</span><span>${esc(bolt.hint)}</span></p>
    </header>
    <div class="pm-bolt__body">
      <div class="pm-stage" data-pm-stage style="--lvl:${benefits[0].lvl}">
        <div class="pm-stage__bolt">
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
        </div>
        <div class="pm-stage__nodes" role="tablist" aria-orientation="vertical" aria-label="Flash Pass benefits">
        ${tabs}
        </div>
      </div>
      <div class="pm-panels">
        ${cards}
      </div>
      <div class="pm-bolt__join">
        <a class="btn btn--red btn--lg" href="${site.tel}">${icon('bolt', { size: 18 })}Join Flash Pass</a>
        <a class="pm-bolt__tel" href="${site.tel}">${icon('phone', { size: 18 })}${site.phone}</a>
      </div>
    </div>
  </div>
  <script>
  (function () {
    var s = document.getElementById('pm-benefits'); if (!s) return;
    s.classList.add('pm-js');
    var tabs = [].slice.call(s.querySelectorAll('.pm-node')), cards = [].slice.call(s.querySelectorAll('.pm-card'));
    var stage = s.querySelector('[data-pm-stage]'), cur = 0, n = tabs.length;
    var rm = matchMedia('(prefers-reduced-motion: reduce)');
    function set(i, focus) {
      cur = i;
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; t.classList.toggle('is-done', k < i); });
      cards.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
      stage.style.setProperty('--lvl', tabs[i].getAttribute('data-lvl'));
      if (focus) tabs[i].focus();
    }
    function reveal(i) { // on a narrow screen the panel sits under the bolt: bring its top into view
      var r = cards[i].getBoundingClientRect();
      if (r.top > innerHeight * .7 || r.top < 0) scrollBy({ top: r.top - 96, behavior: rm.matches ? 'auto' : 'smooth' });
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { set(k); if (matchMedia('(max-width: 1023px)').matches) reveal(k); });
      t.addEventListener('keydown', function (e) {
        var j = { ArrowDown: k + 1, ArrowRight: k + 1, ArrowUp: k - 1, ArrowLeft: k - 1, Home: 0, End: n - 1 }[e.key];
        if (j === undefined) return;
        e.preventDefault(); set((j + n) % n, true);
      });
    });
    // "Hover over the BOLT": with a mouse, the pointer's height over the bolt picks the benefit.
    stage.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = stage.getBoundingClientRect(), y = (e.clientY - r.top) / r.height * 100, k = 0;
      tabs.forEach(function (t, j) { if (j && y > (parseFloat(tabs[j - 1].style.getPropertyValue('--y')) + parseFloat(t.style.getPropertyValue('--y'))) / 2) k = j; });
      if (k !== cur) set(k);
    });
    document.querySelectorAll('[data-pm-jump]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); set(+a.getAttribute('data-pm-jump')); s.scrollIntoView({ behavior: rm.matches ? 'auto' : 'smooth' }); });
    });
    // Replay the charge when the bolt scrolls into view (resting state is already charged: nothing is ever hidden).
    if ('IntersectionObserver' in window && !rm.matches) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { io.disconnect(); stage.classList.add('pm-reset'); void stage.offsetWidth; requestAnimationFrame(function () { stage.classList.remove('pm-reset'); }); } }); }, { threshold: .3 });
      io.observe(stage);
    }
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

// Every image on this page decodes synchronously: with decoding="async", Chromium's full-page capture
// intermittently paints a below-the-fold photo (e.g. the CTA's town photo) as an empty frame.
// The page's own two below-the-fold photos load eagerly (low priority) so a quick scroll-through or a
// full-page capture never finds them unloaded.
const syncDecode = s => s.replace(/decoding="async"/g, 'decoding="sync"');

export function render(ctx) {
  return syncDecode([
    hero(ctx),
    joinSection(ctx),
    introSection(ctx),
    boltSection(ctx),
    guarantee(ctx, { id: 'pm-guarantee' }),
    reviews(ctx, { id: 'pm-reviews' }),
    trustStrip(ctx),
    contactCta(ctx, { id: 'pm-cta', withTowns: true }),
    saveBigSection(),
  ].join('\n'));
}
