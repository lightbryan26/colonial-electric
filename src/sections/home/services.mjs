import { serviceCards, servicesIntro, services } from '../../data/services.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';

// Homepage §4.4 services grid. Copy verbatim (brief §4.4); Permanent Outdoor Lighting as a feature panel
// (allowed per §4.4 note; copy verbatim from /permanent-outdoor-lighting/, brief §5 variant).
// No service photography exists un-framed, so this is a typographic/iconographic index (brief §8 policy):
// a chamfered "crest" ledger of 12 ruled cells, each a full-card link, then a navy feature crest.
const outdoor = {
  title: 'Permanent Outdoor Lighting',
  sub: services.find(s => s.slug === 'permanent-outdoor-lighting')?.heroLine || 'Advanced LED Lighting Control for Outdoor Spaces',
  lead: 'Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere.',
  kinds: ['Holiday Lighting', 'Landscape Lighting', 'Permanent Lighting', 'Event Lighting'],
  href: 'permanent-outdoor-lighting/',
};

const pad = n => String(n).padStart(2, '0');

export function render(ctx) {
  // Split the verbatim H2 so the closing phrase can carry the accent colour.
  const h2 = servicesIntro.h2; // "Your One-stop Solution For All Things Electrical"
  const k = h2.indexOf('For All Things');
  const h2Html = k > 0
    ? `<span class="hsvc__h-a">${esc(h2.slice(0, k).trim())}</span> <span class="hsvc__h-b">${esc(h2.slice(k))}</span>`
    : esc(h2);

  const cells = serviceCards.map((s, i) => `
      <li class="hsvc__cell" style="--i:${i % 4};--r:${Math.floor(i / 4)}">
        <a class="hsvc__card" href="${ctx.r(s.href)}">
          <span class="hsvc__top" aria-hidden="true">
            <span class="hsvc__num">${pad(i + 1)}</span>
            <span class="hsvc__go">${icon('arrow-up-right', { size: 18 })}</span>
          </span>
          <span class="hsvc__ic" aria-hidden="true">${icon(s.icon, { size: 30 })}</span>
          <h3 class="hsvc__t">${esc(s.title)}</h3>
          <p class="hsvc__p">${esc(s.blurb)}</p>
        </a>
      </li>`).join('');

  return `<section id="s-services" class="hsvc" aria-labelledby="s-services-h">
  <div class="container">
    <header class="hsvc__head">
      <div class="hsvc__head-a">
        <p class="eyebrow">Our Services</p>
        <h2 class="hsvc__h" id="s-services-h">${h2Html}</h2>
      </div>
      <div class="hsvc__head-b">
        <p class="hsvc__lead">${esc(servicesIntro.body)}</p>
        <div class="hsvc__actions">
          <a class="btn btn--navy" href="${ctx.r('services/')}">View Our Services ${icon('arrow-right', { size: 16 })}</a>
          <a class="hsvc__tel" href="${site.tel}">${icon('phone', { size: 18 })}<span>${esc(site.phone)}</span></a>
        </div>
      </div>
    </header>

    <ul class="hsvc__grid" role="list">${cells}
    </ul>

    <aside class="hsvc__feat stars-bg" aria-labelledby="s-services-feat-h">
      <span class="hsvc__feat-sweep" aria-hidden="true"></span>
      <div class="hsvc__feat-a">
        <p class="hsvc__feat-tag"><span class="hsvc__feat-ic" aria-hidden="true">${icon('sparkle', { size: 18 })}</span>Featured Service</p>
        <h3 class="hsvc__feat-h" id="s-services-feat-h">${esc(outdoor.title)}</h3>
        <p class="hsvc__feat-sub">${esc(outdoor.sub)}</p>
      </div>
      <div class="hsvc__feat-b">
        <p class="hsvc__feat-p">${esc(outdoor.lead)}</p>
        <ul class="hsvc__kinds" role="list">${outdoor.kinds.map(k => `<li>${icon('bolt', { size: 14 })}${esc(k)}</li>`).join('')}</ul>
        <a class="btn btn--red hsvc__feat-cta" href="${ctx.r(outdoor.href)}">Explore Outdoor Lighting ${icon('arrow-right', { size: 16 })}</a>
      </div>
    </aside>
  </div>
</section>`;
}
