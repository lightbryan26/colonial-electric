import { why } from '../../data/home.mjs';
import { whyIntro } from '../../data/shared.mjs';
import { esc } from '../../lib/html.mjs';
export function render(ctx) {
  return `<section id="s-why" class="block block--alt" aria-labelledby="s-why-h">
  <div class="container">
    <header class="block__head"><h2 class="h2" id="s-why-h">${esc(why.h2)}</h2><p class="lead">${esc(whyIntro)}</p></header>
    <ul class="card-grid" role="list">${why.pillars.map(p => `<li class="card"><h3 class="h3">${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`).join('')}</ul>
  </div>
</section>`;
}
