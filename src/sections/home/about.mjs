// Homepage §5 — About / founder. Copy verbatim from src/data/home.mjs (brief §4.5).
// Portrait: real owner photo (DSC_6221-Ev). Name/role caption mirrors the live About page ("Founder" / "Scott Hays").
import { about } from '../../data/home.mjs';
import { esc, picture, telHref } from '../../lib/html.mjs';
import { icon } from '../../partials/icons.mjs';

// Split the final paragraph so its closing line can be set as the section's sign-off.
// Text stays verbatim and is not duplicated.
const KICKER = 'At Colonial Electric, we';
function splitClose(p) {
  const i = p.lastIndexOf(KICKER);
  return i > 0 ? [p.slice(0, i).trim(), p.slice(i).trim()] : [p, ''];
}

export function render(ctx) {
  const [p1, p2, p3raw] = about.paras;
  const [p3, closing] = splitClose(p3raw);
  return `<section id="s-about" class="block habout on-dark stars-bg" aria-labelledby="s-about-h">
  <div class="container habout__grid">
    <figure class="habout__media">
      <div class="habout__frame">
        ${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo', sizes: '(min-width: 1280px) 520px, (min-width: 900px) 42vw, 92vw', cls: 'habout__pic' })}
      </div>
      <figcaption class="habout__plate">
        <span class="habout__role">Founder</span>
        <span class="habout__name">Scott Hays</span>
      </figcaption>
    </figure>

    <div class="habout__body">
      <p class="eyebrow">About Us</p>
      <h2 class="h2 habout__h" id="s-about-h">${esc(about.h2)}</h2>
      <p class="habout__lead">${esc(p1)}</p>
      <div class="habout__cols">
        <p>${esc(p2)}</p>
        <p>${esc(p3)}</p>
      </div>
    </div>

    <div class="habout__foot">
      ${closing ? `<p class="habout__close"><span class="habout__bolt" aria-hidden="true">${icon('bolt', { size: 22 })}</span><span>${esc(closing)}</span></p>` : ''}
      <div class="habout__actions">
        <a class="btn btn--red btn--lg" href="${ctx.r('about-colonial-electric/')}">About Us${icon('arrow-right', { size: 18 })}</a>
        <a class="habout__tel" href="${telHref}">${icon('phone', { size: 18 })}<span>(781) 287-8729</span></a>
      </div>
    </div>
  </div>
</section>`;
}
