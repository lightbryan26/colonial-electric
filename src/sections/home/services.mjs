import { serviceCards, servicesIntro, services } from '../../data/services.mjs';
import { site } from '../../data/site.mjs';
import { towns } from '../../data/towns.mjs';
import { icon } from '../../partials/icons.mjs';
import { esc } from '../../lib/html.mjs';

// Homepage §4.4 services grid. Copy verbatim (brief §4.4); Permanent Outdoor Lighting as a feature panel
// (allowed per §4.4 note; copy verbatim from /permanent-outdoor-lighting/, brief §5 variant).
// Photos: the live site's own service photos (wp-content/uploads/2024/04-05 "Untitled-design-*" and the
// 2024/11 permanent-lighting tiles), with the baked-in red/navy frame cropped away to the clean photo
// (brief §8), recompressed to WebP + JPEG in assets/img/home-services/.
const IMG = 'assets/img/home-services/';
// key -> [alt, max width available (px)]
const photo = {
  outlets:   ['Close-up of a duplex electrical outlet being wired into a wall box', 800],
  panel:     ['Open residential electrical panel with breakers and wiring', 800],
  generator: ['Standby generator installed beside a white clapboard home', 800],
  battery:   ['Battery backup unit for home power', 440],
  surge:     ['Surge-protected power strip with devices plugged in', 440],
  fan:       ['Electrician on a ladder installing a ceiling fan', 440],
  lighting:  ['Pendant light fixtures glowing over a living room', 800],
  ev:        ['EV charging connector plugged into an electric car', 800],
  wiring:    ['Coils of blue and red electrical wire', 800],
  remodel:   ['Remodel in progress with new drywall and staircase', 800],
  inspect:   ['Electrician testing a wall control during an electrical inspection', 440],
  recessed:  ['Recessed lights set into a curved ceiling', 800],
};
const keyFor = { outlet: 'outlets', panel: 'panel', generator: 'generator', battery: 'battery', surge: 'surge', fan: 'fan', bulb: 'lighting', ev: 'ev', wiring: 'wiring', remodel: 'remodel', inspect: 'inspect', recessed: 'recessed' };

const outdoor = {
  title: 'Permanent Outdoor Lighting',
  sub: services.find(s => s.slug === 'permanent-outdoor-lighting')?.heroLine || 'Advanced LED Lighting Control for Outdoor Spaces',
  lead: 'Create the perfect ambiance for your outdoor space with our versatile and intelligent outdoor lighting system. Enjoy personalized lighting schedules, adjustable brightness, and the freedom to control your lights from anywhere.',
  kinds: [
    ['Holiday Lighting', 'pol-holiday', 'Home outlined in multicolor permanent holiday lights at night'],
    ['Landscape Lighting', 'pol-landscape', 'Garden and walkway lit with landscape lighting at dusk'],
    ['Event Lighting', 'pol-event', 'Edison-bulb string lights glowing over an evening event'],
  ],
  href: 'permanent-outdoor-lighting/',
};

const pad = n => String(n).padStart(2, '0');

function pic(ctx, key, alt, max, { sizes, w, h, cls = '' }) {
  const r = p => ctx.r(IMG + p);
  const set = (ext) => max >= 800
    ? `${r(`${key}-480.${ext}`)} 480w, ${r(`${key}-800.${ext}`)} 800w`
    : `${r(`${key}-480.${ext}`)} ${max}w`;
  return `<picture class="${cls}">
            <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
            <img src="${r(`${key}-480.jpg`)}" srcset="${set('jpg')}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">
          </picture>`;
}

export function render(ctx) {
  const h2 = servicesIntro.h2; // "Your One-stop Solution For All Things Electrical"
  const k = h2.indexOf('For All Things');
  const h2Html = k > 0
    ? `<span class="hsvc__h-a">${esc(h2.slice(0, k).trim())}</span> <span class="hsvc__h-b">${esc(h2.slice(k))}</span>`
    : esc(h2);

  const cardSizes = '(min-width: 1100px) 300px, (min-width: 640px) 46vw, 92vw';
  const cells = serviceCards.map((s, i) => {
    const key = keyFor[s.icon];
    const [alt, max] = photo[key];
    return `
      <li class="hsvc__cell" style="--i:${i % 4}">
        <a class="hsvc__card" href="${ctx.r(s.href)}">
          <span class="hsvc__media">
            ${pic(ctx, key, alt, max, { sizes: cardSizes, w: 480, h: 300, cls: 'hsvc__pic' })}
            <span class="hsvc__num" aria-hidden="true">${pad(i + 1)}</span>
          </span>
          <span class="hsvc__body">
            <span class="hsvc__ic" aria-hidden="true">${icon(s.icon, { size: 22 })}</span>
            <h3 class="hsvc__t">${esc(s.title)}<span class="hsvc__arr" aria-hidden="true">${icon('arrow-right', { size: 18 })}</span></h3>
            <p class="hsvc__p">${esc(s.blurb)}</p>
          </span>
        </a>
      </li>`;
  }).join('');

  const r = p => ctx.r(IMG + p);
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
          <li>${icon('pin', { size: 17 })}<span>Serving ${towns.length} South Shore towns</span></li>
        </ul>
        <div class="hsvc__actions">
          <a class="btn btn--red hsvc__call" href="${site.tel}">${icon('phone', { size: 20 })}<span>${esc(site.phone)}</span></a>
          <a class="btn btn--outline" href="${ctx.r('services/')}">View Our Services ${icon('arrow-right', { size: 16 })}</a>
        </div>
      </div>
    </header>

    <ul class="hsvc__grid" role="list">${cells}
    </ul>

    <aside class="hsvc__feat" aria-labelledby="s-services-feat-h">
      <div class="hsvc__feat-media">
        <picture>
          <source type="image/webp" srcset="${r('pol-permanent-640.webp')} 640w, ${r('pol-permanent-960.webp')} 912w" sizes="(min-width: 960px) 46vw, 100vw">
          <img src="${r('pol-permanent-960.jpg')}" srcset="${r('pol-permanent-640.jpg')} 640w, ${r('pol-permanent-960.jpg')} 912w" sizes="(min-width: 960px) 46vw, 100vw" width="912" height="942" alt="Two-story home at dusk with permanent warm-white lights along every roofline" loading="eager" fetchpriority="low" decoding="async">
        </picture>
        <p class="hsvc__feat-cap" aria-hidden="true">${icon('sparkle', { size: 14 })}Permanent Lighting</p>
      </div>
      <div class="hsvc__feat-body">
        <p class="hsvc__feat-tag"><span class="hsvc__feat-ic" aria-hidden="true">${icon('sparkle', { size: 16 })}</span>Featured Service</p>
        <h3 class="hsvc__feat-h" id="s-services-feat-h">${esc(outdoor.title)}</h3>
        <p class="hsvc__feat-sub">${esc(outdoor.sub)}</p>
        <p class="hsvc__feat-p">${esc(outdoor.lead)}</p>
        <ul class="hsvc__kinds" role="list">${outdoor.kinds.map(([label, key, alt]) => `
          <li class="hsvc__kind">
            <picture>
              <source type="image/webp" srcset="${r(key + '-480.webp')}">
              <img src="${r(key + '-480.jpg')}" width="480" height="480" alt="${esc(alt)}" loading="eager" fetchpriority="low" decoding="async">
            </picture>
            <span>${esc(label)}</span>
          </li>`).join('')}
        </ul>
        <a class="btn btn--red hsvc__feat-cta" href="${ctx.r(outdoor.href)}">Explore Outdoor Lighting ${icon('arrow-right', { size: 16 })}</a>
      </div>
    </aside>
  </div>
</section>`;
}
