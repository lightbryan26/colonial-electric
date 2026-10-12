// Text set around a seal ring, with the brand star drawn as an SVG shape between phrases.
// The ★ glyph (U+2605) is not in Archivo or Barlow, so as text it falls back to a system font
// that differs per OS; a polygon renders identically everywhere.
import { esc } from './html.mjs';

// Five-point star, outer radius 1, pointing up (scaled per ring).
const STAR = Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? .4 : 1;
  return `${(r * Math.cos(a)).toFixed(3)},${(r * Math.sin(a)).toFixed(3)}`;
}).join(' ');

/**
 * Ring text for a circular path that starts at the circle's leftmost point and runs clockwise (over the top),
 * e.g. `M{cx},{cy} m-{r},0 a{r},{r} 0 1,1 {2r},0 a{r},{r} 0 1,1 -{2r},0`.
 * Each phrase is followed by a star; space is shared out by character count, as the old single string did.
 * @param {object} o
 * @param {string} o.href   id of the <path>
 * @param {number} o.cx, o.cy, o.r  circle geometry (user units)
 * @param {number} o.length total text length along the path (was the textLength of the single string)
 * @param {string[]} o.phrases
 * @param {number} o.gap    characters of space each star occupies (was " ★ " = 3)
 * @param {number} o.size   star outer radius
 * @param {number} o.lift   distance from the path to the star centre (≈ half the cap height)
 */
export function starRing({ href, cx, cy, r, length, phrases, gap = 3, size, lift }) {
  const u = length / phrases.reduce((n, p) => n + p.length + gap, 0);
  let off = 0, text = '', stars = '';
  for (const p of phrases) {
    text += `<text><textPath href="#${href}" startOffset="${off.toFixed(2)}" textLength="${(p.length * u).toFixed(2)}" lengthAdjust="spacing">${esc(p)}</textPath></text>`;
    off += p.length * u;
    const phi = (off + gap * u / 2) / r;
    const x = cx - (r + lift) * Math.cos(phi), y = cy - (r + lift) * Math.sin(phi);
    stars += `<polygon class="ring-star" points="${STAR}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(phi * 180 / Math.PI - 90).toFixed(2)}) scale(${size})"/>`;
    off += gap * u;
  }
  return text + stars;
}
