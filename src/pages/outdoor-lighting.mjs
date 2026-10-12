import { towns } from '../data/towns.mjs';
import { site } from '../data/site.mjs';
import { bookingH2 } from '../data/shared.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { process, quoteBlock } from '../blocks/process.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { townList } from '../blocks/town-list.mjs';
// STUB /permanent-outdoor-lighting/ variant (brief §5). Tabs + feature grid filled by its piece.
export function render(ctx) {
  const s = ctx.page.service;
  ctx.jsonld = [{ '@context': 'https://schema.org', '@type': 'Service', name: s.h1, provider: { '@id': site.origin + '/#business' }, areaServed: towns.map(t => ({ '@type': 'City', name: `${t.name}, MA` })) }];
  return [
    pageHero(ctx, { h1: s.h1, sub: 'Advanced LED Lighting Control for Outdoor Spaces', lead: 'Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere.', crumbs: [{ label: 'Home', href: '' }, { label: 'Services', href: 'services/' }, { label: s.h1 }] }),
    contactCta(ctx),
    process(ctx, { h2: bookingH2, withBodies: true }),
    reviews(ctx),
    `<section class="block block--alt"><div class="container">${quoteBlock()}${townList(ctx)}</div></section>`,
  ].join('\n');
}
