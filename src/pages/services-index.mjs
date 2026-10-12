import { bookingH2 } from '../data/shared.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { process, quoteBlock } from '../blocks/process.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { townList } from '../blocks/town-list.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { esc } from '../lib/html.mjs';
// STUB /services/ (brief §7). Residential + category blocks + FAQs filled by its piece.
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'Services', crumbs: [{ label: 'Home', href: '' }, { label: 'Services' }] }),
    `<section class="block"><div class="container container--narrow"><h2 class="h2">For a Job Done Right, Call Colonial!</h2><p class="lead">${esc('No more spending countless hours searching the web for an electrician, all the expertise you need is right here at Colonial Electric. With a commitment to excellence and a passion for service, we are your one-stop shop for all things electrical. Our range of services is perfect for all types of homeowners, whether you’re looking to upgrade your home’s lighting fixtures, install a state-of-the-art security system, or troubleshoot electrical issues, we have you covered.')}</p></div></section>`,
    trustStrip(ctx), guarantee(ctx), servicesGrid(ctx, { extraOutdoor: true }), contactCta(ctx),
    process(ctx, { h2: bookingH2, withBodies: true }), reviews(ctx),
    `<section class="block block--alt"><div class="container">${quoteBlock()}${townList(ctx)}</div></section>`,
    contactForm(ctx),
  ].join('\n');
}
