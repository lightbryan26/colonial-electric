import { safety } from '../../data/shared.mjs';
import { safetyParas } from '../../data/home.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';
export function render(ctx) {
  return `<section id="s-safety" class="block" aria-labelledby="s-safety-h">
  <div class="container block__split">
    <div><p class="eyebrow">${esc(safety.eyebrow)}</p><h2 class="h2" id="s-safety-h">${esc(safety.h2)}</h2><div class="prose">${safetyParas.map(p => `<p>${esc(p)}</p>`).join('')}</div></div>
    <aside class="callbox"><p>${esc(safety.callBox.line)}</p><a class="tel-lg" href="${site.tel}">${icon('phone', { size: 22 })}${site.phone}</a><p class="callbox__cta"><a href="${site.tel}">${esc(safety.callBox.cta)}</a></p></aside>
  </div>
</section>`;
}
