import { introBodies } from '../data/towns.mjs';
import { safety } from '../data/shared.mjs';
import { site } from '../data/site.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { townList } from '../blocks/town-list.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';
// Town template (brief §6). Functional stub; town piece refines the design.
export function render(ctx) {
  const t = ctx.page.town, T = t.name;
  ctx.jsonld = [{ '@context': 'https://schema.org', '@type': 'Electrician', name: site.name, telephone: site.phoneSchema, url: site.origin + '/' + ctx.page.slug, areaServed: { '@type': 'City', name: `${T}, MA` }, parentOrganization: { '@id': site.origin + '/#business' } }];
  const paras = [
    'When it comes to electrical systems, having someone you can trust is essential. At Colonial Electric, we prioritize your safety and satisfaction above all else. With our team of experienced electricians, you can rest assured that your electrical systems are in capable hands.',
    `We understand the importance of having a reliable electrical system, whether it’s in your home or business in ${T}, MA. That’s why we go above and beyond to provide top-notch service and expertise in every project we undertake.`,
    'From routine maintenance and repairs to complex installations and upgrades, Colonial Electric is equipped to handle it all. We stay up-to-date on the latest industry standards and best practices to ensure that your electrical systems are not only functional but also safe and efficient.',
    `Whether you’re in ${T}, MA. or the surrounding areas, Colonial Electric is your trusted partner for all your electrical needs.`,
    'When you choose Colonial Electric, you’re not only choosing peace of mind, but also choosing a long-term partner dedicated to your electrical needs.',
  ];
  return [
    pageHero(ctx, { h1: ctx.page.h1, sub: `Electrician in ${T} MA`, crumbs: [{ label: 'Home', href: '' }, { label: 'Service Area', href: 'service-area/' }, { label: T }] }),
    `<section class="block"><div class="container container--narrow">${t.introH2 ? `<h2 class="h2">${esc(t.introH2)}</h2>` : ''}<p class="lead">${esc(introBodies[t.introVariant](T))}</p></div></section>`,
    `<section class="block block--alt"><div class="container block__split"><div><p class="eyebrow">${esc(safety.eyebrow)}</p><h2 class="h2">${esc(safety.h2)}</h2><div class="prose">${paras.map(p => `<p>${esc(p)}</p>`).join('')}</div></div>
      <aside class="callbox"><p>${esc(safety.callBox.line)}</p><a class="tel-lg" href="${site.tel}">${icon('phone', { size: 22 })}${site.phone}</a>${t.callBoxLine ? `<p>${esc(t.callBoxLine)}</p>` : ''}<p class="callbox__cta"><a href="${site.tel}">${esc(safety.callBox.cta)}</a></p></aside></div></section>`,
    contactForm(ctx),
    servicesGrid(ctx, { h2: t.servicesH2 }),
    `<section class="block"><div class="container">${townList(ctx, { current: t.slug })}</div></section>`,
    reviews(ctx),
    `<section class="block block--alt"><div class="container"><h2 class="h2">About ${T}, MA</h2><h3 class="h3">Top Sites and Things to Do</h3>
      <ul class="sites" role="list">${t.topSites.map(s => `<li class="site-card">${picture(ctx, s.img, { alt: s.name, sizes: '(min-width: 960px) 300px, 50vw' })}<p>${esc(s.name)}</p></li>`).join('')}</ul></div></section>`,
    contactCta(ctx),
  ].join('\n');
}
