import { site } from '../data/site.mjs';
import { icon } from './icons.mjs';
// Sticky mobile "Call Now" bar (brief §2.3). Visible < 768px only (header.css).
export function callbar(ctx) {
  return `<div class="callbar" data-callbar>
  <a class="callbar__call" href="${site.tel}"><span class="callbar__ic">${icon('phone', { size: 20 })}</span><span><span class="callbar__label">Call Now</span><span class="callbar__num">${site.phone}</span></span></a>
  <a class="callbar__alt" href="${ctx.r('contact-us/')}">${icon('mail', { size: 20 })}<span>Contact</span></a>
</div>`;
}
