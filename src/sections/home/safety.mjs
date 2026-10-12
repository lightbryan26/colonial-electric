import { safety } from '../../data/shared.mjs';
import { safetyParas } from '../../data/home.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';

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
      <p class="safety__eyebrow">${icon('shield', { size: 16 })}<span>${esc(safety.eyebrow)}</span></p>
      <h2 class="safety__title" id="s-safety-h"><span class="safety__line">${esc(line1)}</span>${line2 ? ` <span class="safety__line safety__line--2">${l2 === line2 ? esc(line2) : l2}</span>` : ''}</h2>
    </header>

    <div class="safety__intro">
      <span class="safety__rule" aria-hidden="true"></span>
      <p class="safety__lead">${esc(lead)}</p>
    </div>

    <ol class="safety__points" role="list">
      ${points.map((p, i) => `<li class="safety__point" style="--i:${i}">
        <span class="safety__n" aria-hidden="true">${String(i + 2).padStart(2, '0')}</span>
        <p>${esc(p)}</p>
      </li>`).join('\n      ')}
    </ol>

    <aside class="safety__call" aria-label="${esc(safety.callBox.line)}">
      <div class="safety__call-in">
        <div class="safety__call-top">
          <p class="safety__call-line">${esc(safety.callBox.line)}</p>
          <img class="safety__call-mark" src="${ctx.asset('img/emblem-256.png')}" width="256" height="256" alt="" loading="lazy" decoding="async">
        </div>
        <a class="safety__tel" href="${site.tel}"><span class="safety__tel-ico">${icon('phone', { size: 22 })}</span><span class="safety__tel-num">${esc(site.phone)}</span></a>
        <a class="btn btn--red btn--lg safety__cta" href="#s-contact-form">${esc(safety.callBox.cta)}${icon('arrow-right', { size: 18 })}</a>
      </div>
    </aside>
  </div>
</section>`;
}
