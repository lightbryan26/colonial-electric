// Shared block: Lifetime Craftsmanship Guarantee — a keylined, chamfered "certificate" split 5/7:
// a real job-site photo of founder Scott Hays at the Colonial van (signed + call CTA on the photo),
// and the verbatim guarantee copy set as a numbered warranty document. Seal = the real Colonial logo
// lockup inside a turning type ring (decorative, aria-hidden). Copy verbatim from src/data/shared.mjs.
// No prices, no invented claims. Photo = a crop of the client's own owner-van photo (gx-scott-van-*), shown only when
// the page has not used the van photo yet (claimVan: once per page). Otherwise the column becomes the crest variant:
// the seal set large on the navy star field, with the same signature + call CTA.
import { guarantee as g } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, telHref, claimVan } from '../lib/html.mjs';
import { starRing } from '../lib/ring.mjs';

// Split the verbatim H2 so the guarantee name can carry the accent; the text itself is unchanged.
function headline(h2) {
  const i = h2.indexOf('Lifetime');
  if (i < 0) return esc(h2);
  return `${esc(h2.slice(0, i))}<span class="gx__accent">${esc(h2.slice(i))}</span>`;
}

function seal(ctx, uid) {
  return `<div class="gx__seal" aria-hidden="true">
        <svg class="gx__ring" viewBox="0 0 200 200" focusable="false">
          <defs><path id="${uid}-arc" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs>
          <circle cx="100" cy="100" r="98" class="gx__ring-o"/>
          <circle cx="100" cy="100" r="64" class="gx__ring-i"/>
          ${starRing({ href: `${uid}-arc`, cx: 100, cy: 100, r: 80, length: 500, phrases: ['Lifetime Craftsmanship Guarantee', 'Colonial Electric'], size: 4.2, lift: 4.3 })}
        </svg>
        <picture class="pic-contents"><source type="image/webp" srcset="${ctx.asset('img/logo-lockup-320.webp')}"><img class="gx__logo" src="${ctx.asset('img/logo-lockup-320.png')}" width="320" height="332" alt="" loading="eager" decoding="async"></picture>
      </div>`;
}

function photo(ctx) {
  const b = ctx.asset('img/gx-scott-van');
  const sizes = '(min-width: 56em) 28rem, 100vw';
  return `<picture class="gx__pic"><source type="image/webp" srcset="${b}-480.webp 480w, ${b}-660.webp 660w" sizes="${sizes}"><img src="${b}-660.jpg" srcset="${b}-480.jpg 480w, ${b}-660.jpg 660w" sizes="${sizes}" width="660" height="960" alt="Founder Scott Hays standing in front of the Colonial Electric van" loading="eager" decoding="async"></picture>`;
}

export function guarantee(ctx, { id = '', cls = '' } = {}) {
  const uid = id || 'guarantee';
  const [p1, ...rest] = g.paras;
  const num = n => `<span class="gx__num" aria-hidden="true">${icon('bolt', { size: 13 })}0${n}</span>`;
  const withPhoto = claimVan(ctx);
  return `<section class="block block--guarantee gx ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${uid}-h">
  <div class="container">
    <article class="gx__cert">
      <div class="gx__paper">
        <figure class="gx__media${withPhoto ? '' : ' gx__media--crest'}">
          ${withPhoto ? photo(ctx) : ''}
          ${seal(ctx, uid)}
          <figcaption class="gx__sign">
            <span class="gx__sig">
              <span class="gx__sig-name">Scott Hays</span>
              <span class="gx__sig-role">Founder, Colonial Electric</span>
            </span>
            <a class="gx__call" href="${telHref}">
              <span class="gx__call-ic">${icon('phone', { size: 20 })}</span>
              <span class="gx__call-t"><span class="gx__call-k">Call Now</span><span class="gx__call-n">(781) 287-8729</span></span>
            </a>
          </figcaption>
        </figure>
        <div class="gx__body">
          <header class="gx__meta">
            <span class="gx__tag">${icon('shield', { size: 17 })}<span>Lifetime Craftsmanship Guarantee</span></span>
            <span class="gx__lic">MA Lic# 8720-A1</span>
          </header>
          <h2 class="h2 gx__h" id="${uid}-h">${headline(g.h2)}</h2>
          <div class="gx__lead">${num(1)}<p>${esc(p1)}</p></div>
          <div class="gx__cols">
            ${rest.map((p, i) => `<div class="gx__col">${num(i + 2)}<p>${esc(p)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </div>
    </article>
  </div>
</section>`;
}
