import { pageHero } from '../blocks/page-hero.mjs';
import { townList } from '../blocks/town-list.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
// STUB /service-area/ index (brief §6).
export function render(ctx) {
  return [
    pageHero(ctx, { eyebrow: 'Service Area', h1: ctx.page.h1, lead: 'Don’t let electrical issues disrupt your life. We provide fast, reliable electrical services to keep your home or business running smoothly. From troubleshooting electrical problems to installing new fixtures, we’re your one-stop shop for all your electrical needs.', crumbs: [{ label: 'Home', href: '' }, { label: 'Service Area' }] }),
    `<section class="block"><div class="container">${townList(ctx, { cls: 'town-list--grid' })}</div></section>`,
    servicesGrid(ctx), reviews(ctx), contactCta(ctx),
  ].join('\n');
}
