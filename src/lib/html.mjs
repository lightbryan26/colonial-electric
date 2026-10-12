// Shared render helpers. Every piece imports from here.
import imagesJson from '../data/images.json' with { type: 'json' };
export const images = imagesJson;

/** Escape text for HTML. Typographic quotes pass through untouched. */
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Tagged template that joins arrays and drops null/false. */
export const html = (strings, ...vals) => strings.reduce((out, s, i) => out + s + (i < vals.length ? flat(vals[i]) : ''), '');
const flat = v => Array.isArray(v) ? v.map(flat).join('') : (v === null || v === undefined || v === false ? '' : String(v));

/**
 * <picture> for a key in src/data/images.json. Emits WebP srcset + JPEG/PNG fallback with width/height.
 * opts: { alt, sizes, cls, imgCls, loading ('lazy'|'eager'), priority (bool → fetchpriority=high), style }
 */
export function picture(ctx, key, { alt = '', sizes = '100vw', cls = '', imgCls = '', loading = 'lazy', priority = false, style = '' } = {}) {
  const im = images[key];
  if (!im) throw new Error('Unknown image key: ' + key);
  const base = ctx.asset('img/' + key);
  const set = ext => im.widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');
  const largest = im.widths.at(-1);
  const h = Math.round(im.h * (largest / im.w));
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${base}-${largest}.${im.fallback}" srcset="${set(im.fallback)}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(alt)}" loading="${priority ? 'eager' : loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''}${imgCls ? ` class="${imgCls}"` : ''}${style ? ` style="${style}"` : ''}></picture>`;
}

/** Phone link (always tel:+17812878729). */
export const telHref = 'tel:+17812878729';
