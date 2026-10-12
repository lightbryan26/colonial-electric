import { trustItems } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
export function trustStrip(ctx, { cls = '' } = {}) {
  return `<section class="trust-strip ${cls}" aria-label="Why homeowners trust us"><ul class="container" role="list">${trustItems.map(t => `<li>${icon('bolt', { size: 16 })}<span>${t}</span></li>`).join('')}</ul></section>`;
}
