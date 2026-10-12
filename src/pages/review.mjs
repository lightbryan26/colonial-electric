import { pageHero } from '../blocks/page-hero.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
// /leave-us-a-review/ (brief §7). Hard-coded live hrefs; Facebook = search (live defect flagged).
const platforms = [
  { name: 'Google', blurb: 'Share your experience with Colonial Electric on Google and help others find a trusted local electrician.', cta: 'Leave a Google Review', href: 'https://g.page/r/CTOOPMS8J1jqEBM/review' },
  { name: 'Facebook', blurb: 'Tell your friends and neighbors about your experience by leaving us a recommendation on Facebook.', cta: 'Leave a Facebook Review', href: 'https://www.facebook.com/search/top?q=Colonial%20Electric%20Weymouth%20MA' },
  { name: 'Nextdoor', blurb: 'Help your local community discover reliable electrical services by recommending us on Nextdoor.', cta: 'Recommend Us on Nextdoor', href: 'https://nextdoor.com/page/scott-hays-electrician-weymouth-ma/' },
  { name: 'Yelp', blurb: 'Help others in our community find trusted electrical services by sharing your experience on Yelp.', cta: 'Leave a Yelp Review', href: 'https://www.yelp.com/writeareview/biz/nWomuLCv0oADHJr8aMAcag' },
];
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'Leave Us a Review', lead: 'Your feedback helps our team continue delivering the reliable electrical service our community depends on.', ctas: false, crumbs: [{ label: 'Home', href: '' }, { label: 'Leave Us a Review' }] }),
    `<section class="block"><div class="container container--narrow prose"><p>We truly appreciate the trust our customers place in Colonial Electric. If you’ve recently worked with our team, we’d love to hear about your experience. Your review not only helps us improve, but it also helps other homeowners and businesses feel confident choosing our services.</p><p>Please take a moment to share your experience on one of the platforms below.</p></div></section>`,
    `<section class="block block--alt"><div class="container"><h2 class="h2">Choose Your Preferred Platform</h2><ul class="card-grid" role="list">${platforms.map(p => `<li class="card"><h3 class="h3">${p.name}</h3><p>${p.blurb}</p><p><a class="btn btn--navy btn--sm" href="${p.href}" target="_blank" rel="noopener">${p.cta}${icon('arrow-up-right', { size: 16 })}</a></p></li>`).join('')}</ul></div></section>`,
    `<section class="block"><div class="container">${townList(ctx)}</div></section>`,
  ].join('\n');
}
