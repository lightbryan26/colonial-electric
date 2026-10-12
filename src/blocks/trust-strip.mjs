import { trustItems } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
// Trust strip (brief §4 shared blocks): four verbatim items, each with a crest-framed glyph.
const glyphs = ['pin', 'shield', 'check', 'remodel'];
export function trustStrip(ctx, { cls = '' } = {}) {
  return `<section class="ts ${cls}" aria-label="Why homeowners trust us"><div class="container"><ul class="ts__list" role="list">${trustItems.map((t, i) => `<li class="ts__item"><span class="ts__glyph">${icon(glyphs[i] || 'bolt', { size: 20 })}</span><span class="ts__label">${esc(t)}</span></li>`).join('')}</ul></div></section>`;
}
