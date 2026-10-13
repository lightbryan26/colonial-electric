import { towns } from '../data/towns.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// 21 towns, live order (brief §4 "Town list"), each linked to service-area/{slug}/; current town gets aria-current.
// cls: '' (ruled grid, light or .on-dark), 'town-list--grid' (roomier index grid), 'tl--index' (large type, used in the CTA).
// attrs(t, i) lets a caller add data-* attributes to each link (the CTA uses it for its landmark photo swap).
// The index numeral (01-21) is a CSS counter on the empty .tl__n (src/css/block-contact-cta.css), so it is not part of the
// link text: the anchor text is the town name alone ("Weymouth", not "08 Weymouth").
export function townList(ctx, { current = '', cls = '', label = 'Towns we serve', attrs = null } = {}) {
  const variant = cls.replace(/\btown-list--grid\b/, 'tl--grid');
  return `<ul class="tl ${variant}" role="list" aria-label="${esc(label)}">${towns.map((t, i) => {
    const on = current === t.slug;
    return `<li><a href="${ctx.r('service-area/' + t.slug + '/')}"${on ? ' aria-current="page"' : ''}${attrs ? ' ' + attrs(t, i) : ''}><span class="tl__n" aria-hidden="true"></span><span class="tl__name">${esc(t.name)}</span>${icon('arrow-up-right', { size: 16, cls: 'tl__go' })}</a></li>`;
  }).join('')}</ul>`;
}
