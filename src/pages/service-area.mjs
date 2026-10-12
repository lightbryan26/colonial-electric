import { towns } from '../data/towns.mjs';
import { site } from '../data/site.mjs';
import { servicesGrid } from '../blocks/services-grid.mjs';
import { reviews } from '../blocks/reviews.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture, images, escLic } from '../lib/html.mjs';

// /service-area/ index (brief §6): hero · town grid (+ schematic South Shore map) · services · reviews · CTA.
// Copy is verbatim (brief §6 + src/data). The map plots each town centre at its real lat/long; no coastline,
// distances or other facts are drawn. Styles: src/css/page-service-area.css (every class prefixed .sa).

const pad = n => String(n).padStart(2, '0');
const HQ = 'weymouth-ma'; // site.address.city — Colonial is based in Weymouth

// Approximate town-centre coordinates [lat, lon] and label side (r | l | t | b).
const geo = {
  'hanover-ma': [42.113, -70.812, 'r'], 'milton-ma': [42.250, -71.066, 'l'], 'norwell-ma': [42.161, -70.794, 'r'],
  'randolph-ma': [42.162, -71.041, 't'], 'scituate-ma': [42.196, -70.726, 'r'], 'whitman-ma': [42.082, -70.936, 'l'],
  'pembroke-ma': [42.062, -70.804, 'r'], 'weymouth-ma': [42.221, -70.940, 'b'], 'abington-ma': [42.105, -70.945, 'l'],
  'braintree-ma': [42.222, -71.000, 'l'], 'hingham-ma': [42.242, -70.890, 't'], 'quincy-ma': [42.253, -71.002, 't'],
  'rockland-ma': [42.131, -70.916, 'r'], 'hull-ma': [42.302, -70.908, 'r'], 'plymouth-ma': [41.958, -70.668, 'l'],
  'holbrook-ma': [42.155, -71.009, 'b'], 'marshfield-ma': [42.092, -70.706, 'r'], 'hanson-ma': [42.075, -70.880, 'b'],
  'canton-ma': [42.158, -71.145, 'b'], 'carver-ma': [41.883, -70.763, 'r'], 'cohasset-ma': [42.242, -70.804, 'r'],
};
const W = 720, H = 700, P = 64;
const lats = Object.values(geo).map(g => g[0]), lons = Object.values(geo).map(g => g[1]);
const [minLat, maxLat, minLon, maxLon] = [Math.min(...lats), Math.max(...lats), Math.min(...lons), Math.max(...lons)];
const k = Math.min((H - 2 * P) / (maxLat - minLat), (W - 2 * P) / ((maxLon - minLon) * Math.cos(42.1 * Math.PI / 180)));
const proj = ([lat, lon]) => [
  +(P + 20 + (lon - minLon) * Math.cos(42.1 * Math.PI / 180) * k).toFixed(1),
  +(P + (maxLat - lat) * k).toFixed(1),
];

function heroMap(ctx) {
  const [hx, hy] = proj(geo[HQ]);
  const pts = towns.map((t, i) => ({ t, i, xy: proj(geo[t.slug]), side: geo[t.slug][2] }));
  const lab = ({ xy: [x, y], side }) => side === 'r' ? { x: x + 14, y: y + 6, a: 'start' }
    : side === 'l' ? { x: x - 14, y: y + 6, a: 'end' }
    : side === 't' ? { x, y: y - 16, a: 'middle' } : { x, y: y + 30, a: 'middle' };
  // graticule ticks — a quiet survey grid behind the plot
  const grid = [];
  for (let gx = 40; gx < W; gx += 40) for (let gy = 40; gy < H; gy += 40) grid.push(`M${gx - 3} ${gy}h6M${gx} ${gy - 3}v6`);
  // Decorative (aria-hidden): the town grid below lists every link, so the map's mouse-only links (tabindex=-1) stay out of AT and the tab order.
  return `<div class="sa-map" data-sa-map>
    <svg class="sa-map__svg" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
      <path class="sa-map__grid" d="${grid.join('')}"/>
      <g class="sa-map__wires">${pts.filter(p => p.t.slug !== HQ).map(({ xy: [x, y], i }) => {
        const mx = (hx + x) / 2, my = (hy + y) / 2 - Math.hypot(x - hx, y - hy) * .12;
        return `<path d="M${hx} ${hy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${y}" pathLength="1" style="--i:${i}"/>`;
      }).join('')}</g>
      <g class="sa-map__towns">${pts.map(p => {
        const l = lab(p), hq = p.t.slug === HQ, [x, y] = p.xy;
        return `<a href="${ctx.r('service-area/' + p.t.slug + '/')}" tabindex="-1" class="sa-map__town${hq ? ' is-hq' : ''}" data-town="${p.t.slug}" style="--i:${p.i}">
        <circle class="sa-map__halo" cx="${x}" cy="${y}" r="${hq ? 22 : 15}"/>
        <circle class="sa-map__dot" cx="${x}" cy="${y}" r="${hq ? 9 : 6}"/>
        <text x="${l.x}" y="${l.y}" text-anchor="${l.a}">${esc(p.t.name)}</text>
      </a>`;
      }).join('')}</g>
    </svg>
    <figure class="sa-map__peek" aria-hidden="true" hidden><img alt="" width="400" height="400" decoding="async"><figcaption><span class="sa-map__peek-k"></span><span class="sa-map__peek-n"></span></figcaption></figure>
    <p class="sa-map__key label-wide" aria-hidden="true"><span class="sa-map__key-hq"></span>Weymouth, MA<span class="sa-map__key-sep"></span><span class="sa-map__key-dot"></span>Towns we serve</p>
  </div>`;
}

function hero(ctx) {
  const crumbs = [{ label: 'Home', href: '' }, { label: 'Service Area' }];
  ctx.jsonld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: site.origin + '/' + (c.href ?? ctx.page.slug) })) });
  return `<section class="sa-hero on-dark stars-bg" aria-labelledby="sa-h1">
  <div class="container sa-hero__grid">
    <div class="sa-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Service Area</span></li></ol></nav>
      <p class="eyebrow sa-hero__eyebrow">Service Area</p>
      <h1 class="sa-hero__h1" id="sa-h1"><span class="sa-hero__brand">Colonial Electric <span class="sa-hero__dash">—</span></span> <span class="sa-hero__big">Your <span class="nw">One-stop</span> Solution</span> <span class="sa-hero__red">For All Things Electrical!</span></h1>
      <p class="sa-hero__lead">Don’t let electrical issues disrupt your life. We provide fast, reliable electrical services to keep your home or business running smoothly. From troubleshooting electrical problems to installing new fixtures, we’re your one-stop shop for all your electrical needs.</p>
      <p class="btn-row sa-hero__ctas"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}<span>${site.phone}</span></a><a class="btn btn--ghost btn--lg" href="#sa-towns">Find Your Town</a></p>
      <p class="sa-hero__lic label-wide">${icon('shield', { size: 16 })}<span>${site.license}</span></p>
    </div>
    ${heroMap(ctx)}
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

function townGrid(ctx) {
  return `<section class="sa-towns" id="sa-towns" aria-labelledby="sa-towns-h">
  <div class="container">
    <header class="sa-towns__head">
      <div class="sa-towns__title">
        <p class="eyebrow">Weymouth &amp; the South Shore</p>
        <h2 class="sa-towns__h" id="sa-towns-h">Towns We Serve</h2>
      </div>
      <p class="sa-towns__aside">${escLic(site.licenseLine)}</p>
    </header>
    <ol class="sa-grid" role="list">
      ${towns.map((t, i) => {
        const s = t.topSites[t.lead ?? 0];
        return `<li class="sa-card${t.slug === HQ ? ' is-hq' : ''}" style="--i:${i}">
        <a class="sa-card__link" href="${ctx.r('service-area/' + t.slug + '/')}" data-town="${t.slug}" data-img="${ctx.asset('img/' + s.img + '-' + images[s.img].widths[0] + '.webp')}" data-site="${esc(s.name)}">
          <span class="sa-card__img">${picture(ctx, s.img, { alt: '', sizes: '(min-width: 1200px) 180px, (min-width: 640px) 31vw, 46vw' })}</span>
          <span class="sa-card__n" aria-hidden="true">${pad(i + 1)}</span>
          ${icon('arrow-up-right', { size: 18, cls: 'sa-card__go' })}
          <span class="sa-card__body">
            <span class="sa-card__name">${esc(t.name)}</span>
            <span class="sa-card__site">${esc(s.name)}</span>
          </span>
        </a>
      </li>`;
      }).join('\n      ')}
      <li class="sa-card sa-card--call">
        <a class="sa-card__link" href="${site.tel}">
          <span class="sa-card__call-k label-wide">Call Now</span>
          <span class="sa-card__call-n">${site.phone}</span>
          ${icon('phone', { size: 22, cls: 'sa-card__call-i' })}
        </a>
      </li>
    </ol>
  </div>
</section>`;
}

// Map ↔ photo peek: hovering a town on the map shows that town's landmark photo (from its card).
const script = `<script>(function(){var m=document.querySelector('[data-sa-map]');if(!m)return;var f=m.querySelector('.sa-map__peek'),im=f.querySelector('img'),k=f.querySelector('.sa-map__peek-k'),n=f.querySelector('.sa-map__peek-n'),h;
function show(a){var c=document.querySelector('.sa-card__link[data-town="'+a.getAttribute('data-town')+'"]');if(!c)return;clearTimeout(h);im.src=c.getAttribute('data-img');k.textContent=a.textContent.trim()+', MA';n.textContent=c.getAttribute('data-site');var r=m.getBoundingClientRect(),d=a.querySelector('.sa-map__dot').getBoundingClientRect(),x=d.left-r.left+d.width/2,y=d.top-r.top;f.style.setProperty('--x',x+'px');f.style.setProperty('--y',y+'px');f.classList.toggle('is-left',x>r.width*.55);f.hidden=false;requestAnimationFrame(function(){f.classList.add('is-on')});m.classList.add('is-peek');m.querySelectorAll('.sa-map__town').forEach(function(t){t.classList.toggle('is-active',t===a)})}
function hide(){f.classList.remove('is-on');m.classList.remove('is-peek');m.querySelectorAll('.is-active').forEach(function(t){t.classList.remove('is-active')});h=setTimeout(function(){f.hidden=true},250)}
m.querySelectorAll('.sa-map__town').forEach(function(a){a.addEventListener('mouseenter',function(){show(a)});a.addEventListener('mouseleave',hide)});})();</script>`;

export function render(ctx) {
  ctx.jsonld = ctx.jsonld || [];
  return [
    hero(ctx),
    townGrid(ctx),
    servicesGrid(ctx, { cls: 'sa-svc' }),
    reviews(ctx, { cls: 'sa-reviews' }),
    contactCta(ctx, { cls: 'sa-cta' }),
    script,
  ].join('\n');
}


