// Homepage §4.6 "Why Choose Us?" — navy editorial index: sticky headline column + four numbered pillars.
import { why } from '../../data/home.mjs';
import { whyIntro } from '../../data/shared.mjs';
import { esc, telHref } from '../../lib/html.mjs';

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
  const items = why.pillars.map((p, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `<li class="why__item" style="--i:${i}">
        <span class="why__num" aria-hidden="true">${n}</span>
        <div class="why__body">
          <div class="why__title-row">
            <span class="why__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${ICONS[i]}</svg></span>
            <h3 class="why__title">${esc(p.title)}</h3>
          </div>
          <p class="why__text">${esc(p.body)}</p>
        </div>
      </li>`;
  }).join('\n      ');

  return `<section id="s-why" class="why on-dark stars-bg" aria-labelledby="s-why-h">
  <div class="container why__grid">
    <header class="why__head">
      <div class="why__sticky">
        <p class="why__kicker label-wide" aria-hidden="true"><span class="why__flag"></span>Colonial Electric</p>
        <h2 class="why__h2" id="s-why-h">${esc(why.h2).replace(/\s(\S+)$/, '<br> $1')}</h2>
        <p class="why__lead">${esc(whyIntro)}</p>
        <div class="why__cta">
          <a class="btn btn--red" href="${telHref}">Call (781) 287-8729</a>
        </div>
      </div>
    </header>
    <ol class="why__list" role="list">
      ${items}
    </ol>
  </div>
</section>`;
}
