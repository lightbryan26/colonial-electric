// Media plate: the brand's stand-in wherever a layout wants a photo but no real Colonial photo exists (brief §8:
// real photos only, no framed live stock, no CSS fakes). It is an emblem, not a picture: navy field with the van
// wrap's tone-on-tone star field (or the badge pinstripe on the blue tone), the service glyph from icons.mjs set
// large as a keyline watermark, and a red octagonal crest chip with the badge's white inner border at its center.
// Decorative only (aria-hidden): the visible title/copy beside it carries the meaning.
// When src/data/service-photos.mjs maps the plate id to a real photo, the same slot renders that <picture> instead.
import { icon } from '../partials/icons.mjs';
import { esc, picture, images } from '../lib/html.mjs';
import { photoFor } from '../data/service-photos.mjs';

/**
 * opts: id (photo slot id, e.g. the service slug) · ic (icon name) · tone ('navy' | 'ink' | 'blue') · num (optional
 * numeral shown top-left) · cls · photo sizes / loading (used only when a real photo is mapped).
 */
export function plate(ctx, { id = '', ic = 'bolt', tone = 'navy', num = '', cls = '', sizes = '100vw', loading = 'lazy' } = {}) {
  const photo = id ? photoFor(id, images) : null;
  if (photo) {
    return `<span class="plate plate--photo${cls ? ' ' + cls : ''}" data-plate="${esc(id)}">${picture(ctx, photo.key, { alt: photo.alt, sizes, loading, imgCls: 'plate__img' })}</span>`;
  }
  return `<span class="plate plate--${tone}${cls ? ' ' + cls : ''}"${id ? ` data-plate="${esc(id)}"` : ''} aria-hidden="true">
            <span class="plate__ghost">${icon(ic, { size: 240 })}</span>
            <span class="plate__chip"><span class="plate__chip-in">${icon(ic, { size: 40 })}</span></span>${num ? `
            <span class="plate__num">${esc(num)}</span>` : ''}
          </span>`;
}
