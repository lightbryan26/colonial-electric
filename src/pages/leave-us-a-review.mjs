// /leave-us-a-review/ — Leave Us a Review (brief §7). Copy verbatim from source/pages/leave-us-a-review.md.
// Platform hrefs are hard-coded live captures; Facebook uses a search URL because the live href duplicates
// the Google link (live defect, flagged to client). Styles: src/css/page-leave-us-a-review.css (.lr-*).
import { site } from '../data/site.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const copy = {
  h1: 'Leave Us a Review',
  sub: 'Your feedback helps our team continue delivering the reliable electrical service our community depends on.',
  intro: 'We truly appreciate the trust our customers place in Colonial Electric. If you’ve recently worked with our team, we’d love to hear about your experience. Your review not only helps us improve, but it also helps other homeowners and businesses feel confident choosing our services.',
  ask: 'Please take a moment to share your experience on one of the platforms below.',
  h2: 'Choose Your Preferred Platform',
};

const platforms = [
  { id: 'google', name: 'Google', blurb: 'Share your experience with Colonial Electric on Google and help others find a trusted local electrician.', cta: 'Leave a Google Review', href: 'https://g.page/r/CTOOPMS8J1jqEBM/review' },
  { id: 'facebook', name: 'Facebook', blurb: 'Tell your friends and neighbors about your experience by leaving us a recommendation on Facebook.', cta: 'Leave a Facebook Review', href: 'https://www.facebook.com/search/top?q=Colonial%20Electric%20Weymouth%20MA' },
  { id: 'nextdoor', name: 'Nextdoor', blurb: 'Help your local community discover reliable electrical services by recommending us on Nextdoor.', cta: 'Recommend Us on Nextdoor', href: 'https://nextdoor.com/page/scott-hays-electrician-weymouth-ma/' },
  { id: 'yelp', name: 'Yelp', blurb: 'Help others in our community find trusted electrical services by sharing your experience on Yelp.', cta: 'Leave a Yelp Review', href: 'https://www.yelp.com/writeareview/biz/nWomuLCv0oADHJr8aMAcag' },
];

function hero(ctx) {
  const crumbs = [{ label: 'Home', href: '' }, { label: copy.h1 }];
  ctx.jsonld = [...(ctx.jsonld || []), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) }];
  return `<section class="page-hero lr-hero on-dark stars-bg" aria-labelledby="lr-h1">
  <div class="container lr-hero__grid">
    <div class="lr-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">${esc(copy.h1)}</span></li></ol></nav>
      <h1 class="lr-hero__h1" id="lr-h1"><span class="lr-hero__l1">Leave Us</span> <span class="lr-hero__l2">a Review</span></h1>
      <p class="lr-hero__sub">${esc(copy.sub)}</p>
      <ul class="lr-hero__jump" role="list" aria-label="${esc(copy.h2)}">
        ${platforms.map(p => `<li><a href="#lr-${p.id}">${esc(p.name)}</a></li>`).join('')}
      </ul>
    </div>
    <figure class="lr-hero__media">
      ${picture(ctx, 'owner-van', { alt: 'Colonial Electric founder Scott Hays beside the Colonial Electric service van', sizes: '(min-width: 1440px) 640px, (min-width: 960px) 46vw, 100vw', imgCls: 'lr-hero__img', priority: true })}
      <figcaption class="lr-hero__cap"><span class="label-wide">Scott Hays</span><span>Founder, Colonial Electric</span></figcaption>
    </figure>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

function intro(ctx) {
  return `<section class="lr-intro" aria-label="Thank you">
  <div class="container lr-intro__grid">
    <figure class="lr-intro__media">
      ${picture(ctx, 'scott-portrait', { alt: 'Scott Hays of Colonial Electric', sizes: '(min-width: 1440px) 460px, (min-width: 960px) 34vw, 100vw', imgCls: 'lr-intro__img' })}
    </figure>
    <div class="lr-intro__body">
      <div class="lr-intro__mark" aria-hidden="true">${icon('quote', { size: 56 })}</div>
      <p class="lr-intro__lead">${esc(copy.intro)}</p>
      <p class="lr-intro__ask"><a href="#lr-platforms">${esc(copy.ask)}${icon('arrow-right', { size: 18 })}</a></p>
    </div>
  </div>
</section>`;
}

// One row per platform (rendered once). The <a> is unclipped so its ::after can stretch over the whole row
// as the hit area; the chamfered button face is the inner span.
function row(p, i) {
  return `<li class="lr-row lr-row--${p.id}" id="lr-${p.id}">
      <span class="lr-row__n label-wide" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="lr-row__name">${esc(p.name)}</h3>
      <p class="lr-row__blurb">${esc(p.blurb)}</p>
      <a class="lr-row__cta" href="${p.href}" target="_blank" rel="noopener"><span class="lr-row__btn">${icon('star', { size: 16 })}<span class="lr-row__label">${esc(p.cta)}</span>${icon('arrow-up-right', { size: 18, cls: 'lr-row__go' })}</span><span class="sr-only"> (opens in a new tab)</span></a>
    </li>`;
}

function platformsSection() {
  return `<section class="lr-platforms on-dark stars-bg" id="lr-platforms" aria-labelledby="lr-platforms-h">
  <div class="container">
    <header class="lr-platforms__head">
      <h2 class="h2 lr-platforms__h" id="lr-platforms-h">${esc(copy.h2)}</h2>
      <span class="lr-platforms__rule" aria-hidden="true"></span>
      <p class="lr-platforms__note label-wide">${icon('arrow-up-right', { size: 16 })}<span>Links open in a new tab</span></p>
    </header>
    <ol class="lr-list" role="list">
    ${platforms.map(row).join('\n    ')}
    </ol>
  </div>
</section>`;
}

function towns(ctx) {
  return `<section class="lr-towns" aria-labelledby="lr-towns-h">
  <div class="container lr-towns__grid">
    <div class="lr-towns__head">
      <p class="lr-towns__k label-wide">${icon('pin', { size: 16 })}<span>Colonial Electric</span></p>
      <h2 class="lr-towns__h" id="lr-towns-h">Towns We Serve</h2>
      <a class="lr-towns__more label-wide" href="${ctx.r('service-area/')}"><span>Service Area</span>${icon('arrow-right', { size: 16 })}</a>
    </div>
    ${townList(ctx)}
  </div>
</section>`;
}

export function render(ctx) {
  ctx.preloadImage = 'owner-van';
  ctx.preloadSizes = '(min-width: 1440px) 640px, (min-width: 960px) 46vw, 100vw';
  return [hero(ctx), intro(ctx), platformsSection(), towns(ctx)].join('\n');
}
