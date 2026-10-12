import { safety } from '../../data/shared.mjs';
import { safetyParas } from '../../data/home.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';
import { starRing } from '../../lib/ring.mjs';

// Homepage §4.3 "Safety & Satisfaction Guaranteed". Copy verbatim from the live page.
// Composition: oversized two-line headline → editorial split (lead + crest call card | numbered points).
// Motifs: crest (call card, chamfered), tone-on-tone star field, bolt, flag-stripe rule. Real logo emblem only.
export function render(ctx) {
  const [lead, ...points] = safetyParas;
  const h2 = safety.h2; // "For a Job Done Right, Call Colonial!"
  const cut = h2.indexOf(', ');
  const line1 = cut > -1 ? h2.slice(0, cut + 1) : h2;
  const line2 = cut > -1 ? h2.slice(cut + 2) : '';
  const l2 = line2.replace(/^(Call )(Colonial!)$/, (m, a, b) => `${esc(a)}<em class="safety__em">${esc(b)}</em>`);

  return `<section id="s-safety" class="safety" aria-labelledby="s-safety-h">
  <div class="container safety__grid">
    <header class="safety__head">
      <p class="eyebrow">${esc(safety.eyebrow)}</p>
      <h2 class="safety__title" id="s-safety-h"><span class="safety__line">${esc(line1)}</span>${line2 ? ` <span class="safety__line safety__line--2">${l2 === line2 ? esc(line2) : l2}</span>` : ''}</h2>
    </header>

    <div class="safety__intro">
      <span class="safety__rule" aria-hidden="true"></span>
      <p class="safety__lead">${esc(lead)}</p>
      ${seal(ctx)}
    </div>

    <ol class="safety__points" role="list">
      ${points.map((p, i) => `<li class="safety__point" style="--i:${i}">
        <span class="safety__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <p>${esc(p)}</p>
      </li>`).join('\n      ')}
    </ol>

    <aside class="safety__call" aria-label="${esc(safety.callBox.line)}">
      <div class="safety__call-in">
        <div class="safety__call-top">
          <p class="safety__call-line">${esc(safety.callBox.line)}</p>
          <picture class="pic-contents"><source type="image/webp" srcset="${ctx.asset('img/emblem-256.webp')}"><img class="safety__call-mark" src="${ctx.asset('img/emblem-256.png')}" width="256" height="256" alt="" loading="lazy" decoding="async"></picture>
        </div>
        <a class="safety__tel" href="${site.tel}"><span class="safety__tel-ico">${icon('phone', { size: 22 })}</span><span class="safety__tel-num">${esc(site.phone)}</span></a>
        <a class="btn btn--red btn--lg safety__cta" href="#s-contact-form">${esc(safety.callBox.cta)}${icon('arrow-right', { size: 18 })}</a>
      </div>
    </aside>
  </div>
</section>`;
}

// Octagonal crest seal: the eyebrow set on a ring around the real minuteman emblem. Decorative (copy is already in the eyebrow).
function seal(ctx) {
  const oct = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 8) + (i * Math.PI / 4), r = 118 / Math.cos(Math.PI / 8);
    return `${(120 + r * Math.cos(a)).toFixed(2)},${(120 + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  return `<div class="safety__seal" aria-hidden="true">
        <svg viewBox="0 0 240 240" width="240" height="240" focusable="false">
          <defs><path id="safety-ring" d="M120,120 m-93,0 a93,93 0 1,1 186,0 a93,93 0 1,1 -186,0"/></defs>
          <polygon points="${oct}" class="safety__seal-oct"/>
          <polygon points="${oct}" class="safety__seal-key" transform="translate(120 120) scale(.93) translate(-120 -120)"/>
          <g class="safety__seal-ring">${starRing({ href: 'safety-ring', cx: 120, cy: 120, r: 93, length: 580, phrases: [safety.eyebrow.toUpperCase()], size: 5.2, lift: 5.6 })}</g>
          <circle cx="120" cy="120" r="74" class="safety__seal-disc"/>
          <image href="${ctx.asset('img/emblem-256.webp')}" x="66" y="66" width="108" height="108"/>
        </svg>
      </div>`;
}
