// Homepage §4.6 "Why Choose Us?" — light breather between the navy founder band and the reviews.
// Split head (statement H2 | intro + call) over a four-up pillar row: crest icon chip, index, title, verbatim body.
import { why } from '../../data/home.mjs';
import { whyIntro } from '../../data/shared.mjs';
import { esc, telHref } from '../../lib/html.mjs';
import { icon } from '../../partials/icons.mjs';

// One consistent stroke icon set (Lucide-style, 24px grid, 1.75 stroke).
const ICONS = [
  // Transparent Pricing — itemised invoice
  '<path d="M6 2.75h9.5L19 6.25V21.25l-2.25-1.5-2.25 1.5-2.25-1.5-2.25 1.5-2.25-1.5L5.5 21.25V3.25z"/><path d="M15 2.75v3.75h4"/><path d="M8.75 9.5h6.5M8.75 13h6.5M8.75 16.5h4"/>',
  // Local & Reliable Service — home with pin
  '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v11.5h13V9"/><path d="M12 19.25s-3-2.6-3-4.9a3 3 0 0 1 6 0c0 2.3-3 4.9-3 4.9z"/><circle cx="12" cy="14.3" r=".9"/>',
  // Professional Workmanship — wrench + screwdriver crossed
  '<path d="M14.7 6.3a4 4 0 0 0 5.2 5.2l-8.6 8.6a2.1 2.1 0 0 1-3-3l8.6-8.6a4 4 0 0 1-2.2-2.2z"/><path d="m4 4 5.5 5.5"/><path d="m3 7 4-4"/>',
  // Clean, Safe Installations — shield with bolt
  '<path d="M12 2.75 4.5 5.5v6c0 4.7 3.2 8.3 7.5 9.75 4.3-1.45 7.5-5.05 7.5-9.75v-6z"/><path d="m12.9 7.25-3.4 5h3l-1 4.5 3.5-5.25h-3z"/>',
];

export function render(ctx) {
  const items = why.pillars.map((p, i) => `<li class="why__item" style="--i:${i}">
        <div class="why__top">
          <span class="why__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[i]}</svg></span>
          <span class="why__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <h3 class="why__title">${esc(p.title)}</h3>
        <p class="why__text">${esc(p.body)}</p>
      </li>`).join('\n      ');

  return `<section id="s-why" class="why" aria-labelledby="s-why-h">
  <div class="container">
    <header class="why__head">
      <div class="why__head-a">
        <p class="eyebrow">Colonial Electric</p>
        <h2 class="why__h2" id="s-why-h">${esc(why.h2).replace(/\s(\S+)$/, ' <span class="why__h2-b">$1</span>')}</h2>
      </div>
      <div class="why__head-b">
        <p class="why__lead">${esc(whyIntro)}</p>
        <div class="why__cta">
          <a class="btn btn--red btn--lg" href="${telHref}">${icon('phone', { size: 18 })}<span>Call (781) 287-8729</span></a>
        </div>
      </div>
    </header>
    <ol class="why__list" role="list">
      ${items}
    </ol>
  </div>
</section>`;
}
