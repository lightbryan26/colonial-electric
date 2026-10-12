// Homepage §4.11 — Flash Pass membership teaser. NO price anywhere.
// Copy: eyebrow / H2 / body / CTA from data/home.mjs (verbatim live copy).
// Perk phrases: quoted exactly from source/pages/premium-membership.md (lines 22, 24, 14, 28).
import { membership as m } from '../../data/home.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';

const perks = [
  'Front of the Line Pass',
  'after-hours assistance',
  'waived diagnostic fees',
  'annual whole-home electrical safety inspections',
];

// Split the H2 so the last two words carry the accent ("Access Pass").
function headline(t) {
  const w = t.split(' ');
  const tail = w.splice(-2).join(' ');
  return `<span class="mship__h-a">${esc(w.join(' '))}</span> <span class="mship__h-b">${esc(tail)}</span>`;
}

export function render(ctx) {
  const a = p => ctx.asset(p);
  return `<section id="s-membership" class="block mship" aria-labelledby="s-membership-h">
  <div class="container mship__grid">
    <div class="mship__copy">
      <p class="eyebrow">${esc(m.eyebrow)}</p>
      <h2 class="mship__h" id="s-membership-h">${headline(m.h2)}</h2>
      <p class="lead mship__lead">${esc(m.body)}</p>
      <div class="mship__cta">
        <a class="btn btn--red btn--lg" href="${ctx.r(m.cta.href)}">${esc(m.cta.label)}<span class="sr-only"> about the Flash Pass Membership</span>${icon('arrow-right', { size: 18 })}</a>
        <span class="mship__tag label-wide">${icon('bolt', { size: 14 })}Flash Pass Membership</span>
      </div>
    </div>

    <div class="mship__stage stars-bg">
      <div class="mship__emblem" aria-hidden="true"><img src="${a('img/emblem-512.png')}" width="512" height="512" alt="" decoding="async"></div>
      <div class="mship__deck">
      <div class="mship__ghost" aria-hidden="true"></div>
      <a class="mship__card" href="${ctx.r(m.cta.href)}" aria-label="Flash Pass Membership benefits">
        <span class="mship__card-in">
          <span class="mship__card-top">
            <picture><source type="image/webp" srcset="${a('img/logo-badge-250.webp')}"><img class="mship__badge" src="${a('img/logo-badge-250.png')}" width="250" height="150" alt="" loading="lazy" decoding="async"></picture>
          </span>
          <span class="mship__name">
            <span class="mship__name-v">Flash Pass${icon('bolt', { size: 40, cls: 'mship__name-bolt' })}</span>
          </span>
          <span class="mship__rule" aria-hidden="true"></span>
          <span class="mship__perks" role="list">
            ${perks.map((p, i) => `<span class="mship__perk" role="listitem"><span class="mship__perk-n" aria-hidden="true">0${i + 1}</span><span>${esc(p)}</span></span>`).join('\n            ')}
          </span>
          <span class="mship__card-foot">
            <span class="label-wide">Colonial Electric</span>
            <span class="mship__go" aria-hidden="true">${icon('arrow-up-right', { size: 20 })}</span>
          </span>
        </span>
      </a>
      </div>
    </div>
  </div>
</section>`;
}
