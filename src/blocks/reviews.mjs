import { reviews as data, reviewsIntro } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// Shared reviews block (brief §4 Shared blocks). No aggregate rating, initials avatars only.
export const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
export function reviews(ctx, { id = '', cls = '', includeOptional = false } = {}) {
  const list = data.filter(r => includeOptional || !r.optional);
  return `<section class="block block--reviews ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'reviews'}-h">
  <div class="container">
    <header class="block__head">
      <h2 class="h2" id="${id || 'reviews'}-h">${esc(reviewsIntro.h2)}</h2>
      <p class="lead">${esc(reviewsIntro.body)}</p>
    </header>
    <ul class="review-list" role="list">
      ${list.map(r => `<li class="review">
        <div class="review__top"><span class="avatar" aria-hidden="true">${initials(r.name)}</span><div><p class="review__name">${esc(r.name)}</p><p class="review__src">Posted on Google</p></div></div>
        <p class="review__stars" aria-label="5 out of 5 stars">${icon('star', { size: 16 }).repeat(5)}</p>
        ${r.text.map(t => `<p>${esc(t)}</p>`).join('')}
      </li>`).join('')}
    </ul>
  </div>
</section>`;
}
