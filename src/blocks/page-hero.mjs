import { site } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
/**
 * Inner-page hero. crumbs: [{label, href}] (last = current page, no href). Adds BreadcrumbList JSON-LD.
 * opts: { eyebrow, h1, sub (h2 text), lead, ctas: true|false, cls }
 */
export function pageHero(ctx, { eyebrow = '', h1, sub = '', lead = '', crumbs = [], ctas = true, cls = '' }) {
  if (crumbs.length) {
    ctx.jsonld = [...(ctx.jsonld || []), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) }];
  }
  return `<section class="page-hero on-dark stars-bg ${cls}">
  <div class="container">
    ${crumbs.length ? `<nav class="crumbs" aria-label="Breadcrumb"><ol role="list">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<li><a href="${ctx.r(c.href)}">${esc(c.label)}</a></li>` : `<li><span aria-current="page">${esc(c.label)}</span></li>`).join('')}</ol></nav>` : ''}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1 class="h1">${esc(h1)}</h1>
    ${sub ? `<p class="page-hero__sub">${esc(sub)}</p>` : ''}
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
    ${ctas ? `<p class="btn-row"><a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 18 })}${site.phone}</a><a class="btn btn--ghost" href="${ctx.r('contact-us/')}">Contact Us Today</a></p>` : ''}
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}
