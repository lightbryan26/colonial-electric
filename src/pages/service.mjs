import { serviceIntro } from '../data/services.mjs';
import { towns } from '../data/towns.mjs';
import { site } from '../data/site.mjs';
import { bookingH2 } from '../data/shared.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { guarantee } from '../blocks/guarantee.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { process, quoteBlock } from '../blocks/process.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { townList } from '../blocks/town-list.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { esc } from '../lib/html.mjs';
// STUB service template (brief §5). Blocks A/B, Why Choose cards and FAQs are filled by the service-template piece.
export function render(ctx) {
  const s = ctx.page.service;
  ctx.jsonld = [{ '@context': 'https://schema.org', '@type': 'Service', name: s.h1, serviceType: s.h1, provider: { '@id': site.origin + '/#business' }, areaServed: towns.map(t => ({ '@type': 'City', name: `${t.name}, MA` })) }];
  return [
    pageHero(ctx, { h1: s.h1, sub: s.heroLine, crumbs: [{ label: 'Home', href: '' }, { label: 'Services', href: 'services/' }, { label: s.h1 }] }),
    `<section class="block"><div class="container container--narrow prose"><p>${esc(serviceIntro)}</p></div></section>`,
    trustStrip(ctx),
    guarantee(ctx),
    s.slug === 'generator' ? servicesGrid(ctx) : '',
    contactCta(ctx),
    process(ctx, { h2: bookingH2, withBodies: true }),
    reviews(ctx),
    `<section class="block block--alt"><div class="container">${quoteBlock()}${townList(ctx)}</div></section>`,
    contactForm(ctx),
  ].join('\n');
}
