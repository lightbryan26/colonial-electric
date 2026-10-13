import { serviceCards, servicesIntro, services } from '../data/services.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// 12 service cards (verbatim titles + blurbs), plus Permanent Outdoor Lighting as the "Also Available" link (brief §4.4
// allows it as a 13th card or a feature link; /services/ does the same), so every page with the grid links all 13
// service pages. h2 overridable (town pages use servicesH2).
// Link anchor = the service name only: the <a> wraps the card title and a stretched ::after makes the whole card
// clickable (src/css/blocks.css), so search engines read "Generators", not the title + blurb + "Learn more".
const outdoor = services.find(s => s.outdoor);
export function servicesGrid(ctx, { id = '', cls = '', h2 = servicesIntro.h2, intro = true, extraOutdoor = true } = {}) {
  return `<section class="block block--services ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'services'}-h">
  <div class="container">
    <header class="block__head"><h2 class="h2" id="${id || 'services'}-h">${esc(h2)}</h2>${intro ? `<p class="lead">${esc(servicesIntro.body)}</p>` : ''}</header>
    <ul class="svc-grid" role="list">
      ${serviceCards.map(s => `<li><div class="svc-card"><span class="svc-card__ic">${icon(s.icon, { size: 28 })}</span><h3 class="svc-card__t"><a class="svc-card__a" href="${ctx.r(s.href)}">${esc(s.title)}</a></h3><p>${esc(s.blurb)}</p><span class="svc-card__go" aria-hidden="true">Learn more ${icon('arrow-right', { size: 16 })}</span></div></li>`).join('')}
    </ul>
    ${extraOutdoor && outdoor ? `<p class="svc-extra"><span class="svc-extra__ic">${icon(outdoor.icon, { size: 22 })}</span><span class="svc-extra__txt"><span class="svc-extra__k">Also Available</span><a class="svc-extra__a" href="${ctx.r(outdoor.slug + '/')}">${esc(outdoor.h1)}</a><span class="svc-extra__s">${esc(outdoor.heroLine)}</span></span><span class="svc-extra__go" aria-hidden="true">${icon('arrow-right', { size: 20 })}</span></p>` : ''}
  </div>
</section>`;
}
