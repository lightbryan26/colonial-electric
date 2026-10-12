import { membership as m } from '../../data/home.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';
export function render(ctx) {
  return `<section id="s-membership" class="block block--alt" aria-labelledby="s-membership-h">
  <div class="container container--narrow center">
    <p class="eyebrow">${esc(m.eyebrow)}</p><h2 class="h2" id="s-membership-h">${esc(m.h2)}</h2><p class="lead">${esc(m.body)}</p>
    <p class="btn-row btn-row--center"><a class="btn btn--navy" href="${ctx.r(m.cta.href)}">${esc(m.cta.label)}${icon('arrow-right', { size: 18 })}</a></p>
  </div>
</section>`;
}
