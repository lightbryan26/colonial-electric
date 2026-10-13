import { serviceCards, servicesIntro, services, outdoor as outdoorData } from '../../data/services.mjs';
import { site } from '../../data/site.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc, images, picture } from '../../lib/html.mjs';
import { cardPhotoFor } from '../../data/card-photos.mjs';

// Homepage §4.4 services grid. Copy verbatim (brief §4.4); Permanent Outdoor Lighting as a feature panel
// (allowed per §4.4 note; copy verbatim from /permanent-outdoor-lighting/, brief §5 variant).
// Media: a real Colonial job photo where one truthfully shows that service (src/data/card-photos.mjs: Colonial's own
// media library, renamed by service). A service with no such photo gets a typographic tile instead: the whole card on
// navy, led by its outlined index numeral and service glyph, so photo cards and type tiles alternate through the grid.
// The outdoor feature leads with a typographic index of its four lighting services (verbatim panel titles, linked).
// Each card's only link is its title (anchor text = the service name); a stretched ::after keeps the card clickable.

const outdoor = {
  title: 'Permanent Outdoor Lighting',
  sub: services.find(s => s.slug === 'permanent-outdoor-lighting')?.heroLine || 'Advanced LED Lighting Control for Outdoor Spaces',
  lead: 'Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere.',
  href: 'permanent-outdoor-lighting/',
};

const pad = n => String(n).padStart(2, '0');
// Hyphenated words ("Whole-house", "Whole-home") never break at the hyphen in the narrow phone title column.
const keepHyphens = t => esc(t).replace(/\S+-\S+/g, w => `<span class="hsvc__nw">${w}</span>`);

export function render(ctx) {
  const h2 = servicesIntro.h2; // "Your One-stop Solution For All Things Electrical"
  const k = h2.indexOf('For All Things');
  const h2Html = k > 0
    ? `<span class="hsvc__h-a">${esc(h2.slice(0, k).trim())}</span> <span class="hsvc__h-b">${esc(h2.slice(k))}</span>`
    : esc(h2);

  // Card media width: 4-up inside the 1280px container (≈300px), 2-up from 640px, a ≈38vw thumbnail on phones.
  const cardSizes = '(min-width: 1100px) 300px, (min-width: 640px) 46vw, 38vw';
  const cells = serviceCards.map((s, i) => {
    const n = pad(i + 1);
    const photo = cardPhotoFor(s.href, images);
    const media = photo
      ? `<span class="hsvc__media" style="--pos:${photo.pos};--pos-m:${photo.posM}">
            ${picture(ctx, photo.key, { alt: photo.alt, sizes: cardSizes, imgCls: 'hsvc__img' })}
            <span class="hsvc__num" aria-hidden="true">${n}</span>
          </span>`
      : `<span class="hsvc__media hsvc__media--type" aria-hidden="true">
            <span class="hsvc__ghost">${icon(s.icon, { size: 240 })}</span>
            <span class="hsvc__glyph">${icon(s.icon, { size: 30 })}</span>
            <span class="hsvc__big">${n}</span>
          </span>`;
    return `
      <li class="hsvc__cell" style="--i:${i % 4}">
        <div class="hsvc__card ${photo ? 'hsvc__card--photo' : 'hsvc__card--type'}">
          ${media}
          <span class="hsvc__body">
            ${photo ? `<span class="hsvc__ic" aria-hidden="true">${icon(s.icon, { size: 22 })}</span>` : ''}
            <h3 class="hsvc__t"><a class="hsvc__a" href="${ctx.r(s.href)}">${keepHyphens(s.title)}</a><span class="hsvc__arr" aria-hidden="true">${icon('arrow-right', { size: 18 })}</span></h3>
            <p class="hsvc__p">${esc(s.blurb)}</p>
          </span>
        </div>
      </li>`;
  }).join('');

  return `<section id="s-services" class="hsvc" aria-labelledby="s-services-h">
  <div class="container">
    <header class="hsvc__head">
      <div class="hsvc__head-a">
        <p class="eyebrow">Our Services</p>
        <h2 class="hsvc__h" id="s-services-h">${h2Html}</h2>
      </div>
      <div class="hsvc__head-b">
        <p class="hsvc__lead">${esc(servicesIntro.body)}</p>
        <ul class="hsvc__proof" role="list">
          <li><span class="hsvc__stars" aria-hidden="true">${icon('star', { size: 15 }).repeat(5)}</span><span>5-Star Rated Electrician on Google</span></li>
          <li>${icon('shield', { size: 17 })}<span>Licensed &amp; Insured · ${esc(site.license)}</span></li>
          <li>${icon('pin', { size: 17 })}<span>Serving the South Shore</span></li>
        </ul>
        <div class="hsvc__actions">
          <a class="btn btn--red hsvc__call" href="${site.tel}">${icon('phone', { size: 20 })}<span>${esc(site.phone)}</span></a>
          <a class="btn btn--outline btn--lg" href="${ctx.r('services/')}">View Our Services ${icon('arrow-right', { size: 16 })}</a>
        </div>
      </div>
    </header>

    <ul class="hsvc__grid" role="list">${cells}
    </ul>

    <aside class="hsvc__feat" aria-labelledby="s-services-feat-h">
      <div class="hsvc__feat-body">
        <p class="hsvc__feat-tag"><span class="hsvc__feat-ic" aria-hidden="true">${icon('sparkle', { size: 16 })}</span>Featured Service</p>
        <h3 class="hsvc__feat-h" id="s-services-feat-h">${esc(outdoor.title)}</h3>
        <p class="hsvc__feat-sub">${esc(outdoor.sub)}</p>
        <p class="hsvc__feat-p">${esc(outdoor.lead)}</p>
        <a class="btn btn--red btn--lg hsvc__feat-cta" href="${ctx.r(outdoor.href)}">Explore Outdoor Lighting ${icon('arrow-right', { size: 16 })}</a>
      </div>
      <div class="hsvc__feat-media">
        <span class="hsvc__feat-glyph" aria-hidden="true">${icon('sparkle', { size: 240 })}</span>
        <p class="hsvc__feat-cap"><span class="hsvc__feat-chip" aria-hidden="true">${icon('sparkle', { size: 18 })}</span>Lighting Services</p>
        <ol class="hsvc__feat-list" role="list" aria-label="${esc(outdoor.title)} services">${outdoorData.panels.map((p, i) => `
          <li><a href="${ctx.r(outdoor.href + '#ol-' + p.id)}"><span class="hsvc__feat-n" aria-hidden="true">${pad(i + 1)}</span><span class="hsvc__feat-t">${esc(p.title)}</span>${icon('arrow-up-right', { size: 20 })}</a></li>`).join('')}
        </ol>
      </div>
    </aside>
  </div>
</section>`;
}
