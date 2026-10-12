import { pageHero } from '../blocks/page-hero.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { townList } from '../blocks/town-list.mjs';
import { esc } from '../lib/html.mjs';
// STUB /premium-membership/ (brief §7). Bolt benefits + Save Big filled by its piece. NO price anywhere.
const intro = [
  'When we say “Our customers only deserve the best” we mean it, and thats exactly what sets us apart from the rest. With Colonial Electric, customers can enjoy an EXCLUSIVE ACCESS PASS that ensures they get unparalleled experience and benefits. Our program goes beyond just providing exceptional service; it’s about elevating your entire experience with Colonial Electric to a level of luxury and convenience that’s unmatched in the industry.',
  'We always strive to exceed your expectations, and our Exclusive Access Pass is a testament to that commitment. Our team is not just here to complete tasks; we’re here to build relationships. When you become a part of our Exclusive Access Pass program, you’ll have a dedicated point of contact who will guide you through every step of your electrical journey.',
  'From priority customer support, to waived diagnostic fees, these are just some of the exclusive benefits members can expect with our program. Don’t miss out on the opportunity to streamline your electrical needs and elevate your experience with Colonial Electric!',
];
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'Flash Pass Membership', crumbs: [{ label: 'Home', href: '' }, { label: 'Flash Pass Membership' }] }),
    `<section class="block"><div class="container container--narrow"><h2 class="h2">Experience Platinum Privileges That’s Unlike Any Other</h2><div class="prose">${intro.map(p => `<p>${esc(p)}</p>`).join('')}</div></div></section>`,
    guarantee(ctx), reviews(ctx), trustStrip(ctx), contactCta(ctx), `<section class="block"><div class="container">${townList(ctx)}</div></section>`,
  ].join('\n');
}
