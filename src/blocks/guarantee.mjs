// Shared block: Lifetime Craftsmanship Guarantee — rendered as a keylined "certificate" on a paper ground.
// Copy is verbatim from src/data/shared.mjs (brief: Shared blocks). Seal = the real Colonial logo lockup
// inside a slowly turning type ring (decorative, aria-hidden). No prices, no invented claims.
import { guarantee as g } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, telHref } from '../lib/html.mjs';

// Split the verbatim H2 so the guarantee name can carry the accent; the text itself is unchanged.
function headline(h2) {
  const i = h2.indexOf('Lifetime');
  if (i < 0) return esc(h2);
  return `${esc(h2.slice(0, i))}<span class="gx__accent">${esc(h2.slice(i))}</span>`;
}

function seal(ctx, uid) {
  const ring = 'Lifetime Craftsmanship Guarantee ★ Colonial Electric ★ ';
  return `<div class="gx__seal" aria-hidden="true">
      <svg class="gx__ring" viewBox="0 0 200 200" focusable="false">
        <defs><path id="${uid}-arc" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"/></defs>
        <circle cx="100" cy="100" r="97" class="gx__ring-o"/>
        <circle cx="100" cy="100" r="68" class="gx__ring-i"/>
        <text><textPath href="#${uid}-arc" textLength="512" lengthAdjust="spacing">${esc(ring)}</textPath></text>
      </svg>
      <picture class="gx__logo"><source type="image/webp" srcset="${ctx.asset('img/logo-lockup-320.webp')} 320w, ${ctx.asset('img/logo-lockup-621.webp')} 621w" sizes="(min-width: 64em) 11rem, 7.5rem"><img src="${ctx.asset('img/logo-lockup-320.png')}" srcset="${ctx.asset('img/logo-lockup-320.png')} 320w, ${ctx.asset('img/logo-lockup-621.png')} 621w" sizes="(min-width: 64em) 11rem, 7.5rem" width="320" height="332" alt="" loading="lazy" decoding="async"></picture>
    </div>`;
}

export function guarantee(ctx, { id = '', cls = '' } = {}) {
  const uid = id || 'guarantee';
  const [p1, ...rest] = g.paras;
  return `<section class="block block--guarantee gx ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${uid}-h">
  <div class="container">
    <article class="gx__cert">
      <div class="gx__paper">
        <header class="gx__meta">
          <span class="gx__tag">${icon('shield', { size: 18 })}<span>Lifetime Craftsmanship Guarantee</span></span>
          <span class="gx__lic">MA Lic# 8720-A1</span>
        </header>
        <div class="gx__top">
          <h2 class="h2 gx__h" id="${uid}-h">${headline(g.h2)}</h2>
          ${seal(ctx, uid)}
        </div>
        <p class="gx__lead">${esc(p1)}</p>
        <div class="gx__cols">
          ${rest.map((p, i) => `<div class="gx__col"><span class="gx__num" aria-hidden="true">${icon('bolt', { size: 14 })}0${i + 2}</span><p>${esc(p)}</p></div>`).join('\n          ')}
        </div>
        <footer class="gx__sign">
          <div class="gx__sig">
            <span class="gx__sig-line" aria-hidden="true"></span>
            <span class="gx__sig-name">Scott Hays</span>
            <span class="gx__sig-role">Founder, Colonial Electric</span>
          </div>
          <div class="gx__cta">
            <a class="btn btn--red btn--lg" href="${telHref}">${icon('phone', { size: 18 })}<span>Call Now</span></a>
            <a class="tel-lg gx__tel" href="${telHref}">(781) 287-8729</a>
          </div>
        </footer>
      </div>
    </article>
  </div>
</section>`;
}
