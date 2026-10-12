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
  if (VAN_KEYS.has(key) && !claimVan(ctx)) throw new Error(`/${ctx.page?.slug ?? ''}: the van photo is already on this page (one per page; see claimVan)`);
  const base = ctx.asset('img/' + key);
  const set = ext => im.widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');
  const largest = im.widths.at(-1);
  const h = Math.round(im.h * (largest / im.w));
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${base}-${largest}.${im.fallback}" srcset="${set(im.fallback)}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(alt)}" loading="${priority ? 'eager' : loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''}${imgCls ? ` class="${imgCls}"` : ''}${style ? ` style="${style}"` : ''}></picture>`;
}

/**
 * The owner + van photo (owner-van) and its crops (cf-van, gx-scott-van, cf-scott-van) appear at most ONCE per page,
 * so the site never reads as one photo on repeat. Pages render top to bottom, so the first caller is the topmost use.
 * claimVan(ctx) → true for that first caller; every later block renders its non-photo (crest) variant instead.
 * picture() throws if a van key is requested after the page has already shown it.
 */
export const VAN_KEYS = new Set(['owner-van', 'cf-van', 'gx-scott-van', 'cf-scott-van']);
export function claimVan(ctx) {
  if (ctx.vanShown) return false;
  ctx.vanShown = true;
  return true;
}

/** Escaped text with any licence number kept on one line (never breaks at the hyphen in "8720-A1"). Text unchanged. */
export const escLic = (s = '') => esc(s).replace(/\(?MA Lic# [0-9A-Z-]+\)?/g, m => `<span class="nowrap">${m}</span>`);

/** Phone link (always tel:+17812878729). */
export const telHref = 'tel:+17812878729';
