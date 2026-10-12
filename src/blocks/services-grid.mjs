import { serviceCards, servicesIntro } from '../data/services.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// 12 linked service cards (verbatim blurbs). h2 overridable (town pages use servicesH2).
export function servicesGrid(ctx, { id = '', cls = '', h2 = servicesIntro.h2, intro = true, extraOutdoor = false } = {}) {
  return `<section class="block block--services ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'services'}-h">
  <div class="container">
    <header class="block__head"><h2 class="h2" id="${id || 'services'}-h">${esc(h2)}</h2>${intro ? `<p class="lead">${esc(servicesIntro.body)}</p>` : ''}</header>
    <ul class="svc-grid" role="list">
      ${serviceCards.map(s => `<li><a class="svc-card" href="${ctx.r(s.href)}"><span class="svc-card__ic">${icon(s.icon, { size: 28 })}</span><h3 class="svc-card__t">${esc(s.title)}</h3><p>${esc(s.blurb)}</p><span class="svc-card__go">Learn more ${icon('arrow-right', { size: 16 })}</span></a></li>`).join('')}
    </ul>
    ${extraOutdoor ? `<p class="svc-extra"><a href="${ctx.r('permanent-outdoor-lighting/')}">Permanent Outdoor Lighting ${icon('arrow-right', { size: 16 })}</a></p>` : ''}
  </div>
</section>`;
}
