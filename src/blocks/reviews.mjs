import { reviews as data, reviewsIntro } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// Shared reviews block (brief §4 "Shared blocks"). Real Google reviews only, verbatim.
// No aggregate rating, no review count, initials avatars only (no hotlinked photos).
// Layout: editorial header → featured story (navy) → masonry of the rest (stacked on phones).
// Styles: src/css/block-reviews.css (all classes prefixed .rv to stay independent of blocks.css).

export const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

// Typographic emphasis only; the wording itself is untouched (verbatim).
const FEATURED = 'Joseph Smith';
const HIGHLIGHT = { 'Joseph Smith': 'he weathered the storm (literally)' };
const mark = (name, s) => {
  const h = HIGHLIGHT[name];
  const t = esc(s);
  return h && s.includes(h) ? t.replace(esc(h), `<mark class="rv-mark">${esc(h)}</mark>`) : t;
};

const stars = (size = 16) => `<span class="rv-stars" role="img" aria-label="Rated 5 out of 5 stars">${icon('star', { size }).repeat(5)}</span>`;
const source = `<span class="rv-src"><span class="rv-src__g" aria-hidden="true">G</span>Posted on Google</span>`;

function card(r, i) {
  const words = r.text.join(' ').length;
  const size = words < 60 ? 'short' : words < 150 ? 'mid' : 'long';
  return `<li class="rv-card rv-card--${size}" style="--i:${i}">
        <figure class="rv-card__fig">
          <div class="rv-card__top">${stars(15)}${source}</div>
          <blockquote class="rv-card__quote">${r.text.map(t => `<p>${mark(r.name, t)}</p>`).join('')}</blockquote>
          <figcaption class="rv-who"><span class="rv-avatar" aria-hidden="true">${initials(r.name)}</span><span class="rv-who__name">${esc(r.name)}</span></figcaption>
        </figure>
      </li>`;
}

export function reviews(ctx, { id = '', cls = '', includeOptional = false } = {}) {
  const list = data.filter(r => includeOptional || !r.optional);
  const feat = list.find(r => r.name === FEATURED);
  const rest = list.filter(r => r !== feat);
  const hid = `${id || 'reviews'}-h`;
  const onReviewPage = ctx.page && ctx.page.slug === 'leave-us-a-review/';
  return `<section class="rv ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${hid}">
  <div class="container">
    <header class="rv-head">
      <div class="rv-head__title">
        <p class="eyebrow">Customer Reviews</p>
        <h2 class="rv-h2" id="${hid}">${esc(reviewsIntro.h2)}</h2>
      </div>
      <div class="rv-head__aside">
        <p class="rv-lead">${esc(reviewsIntro.body)}</p>
        ${onReviewPage ? '' : `<a class="rv-link" href="${ctx.r('leave-us-a-review/')}"><span>Leave Us a Review</span>${icon('arrow-right', { size: 18 })}</a>`}
      </div>
    </header>
    ${feat ? `<figure class="rv-feature">
      <div class="rv-feature__mark" aria-hidden="true">${icon('quote', { size: 64 })}</div>
      <blockquote class="rv-feature__quote">${feat.text.map((t, i) => `<p${i === 0 ? ' class="rv-feature__lede"' : ''}>${mark(feat.name, t)}</p>`).join('')}</blockquote>
      <figcaption class="rv-feature__by">
        <span class="rv-feature__badge" aria-hidden="true"><span>${initials(feat.name)}</span></span>
        <span class="rv-feature__meta"><span class="rv-feature__name">${esc(feat.name)}</span>${stars(18)}${source}</span>
      </figcaption>
    </figure>` : ''}
    <div class="rv-wall">
      <ul class="rv-list" role="list" aria-label="More customer reviews">
      ${rest.map(card).join('\n      ')}
      </ul>
    </div>
  </div>
</section>`;
}
