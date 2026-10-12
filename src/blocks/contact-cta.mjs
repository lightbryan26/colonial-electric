import { contactCta as c } from '../data/shared.mjs';
import { site } from '../data/site.mjs';
import { towns } from '../data/towns.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, images } from '../lib/html.mjs';
import { townList } from './town-list.mjs';

// "Contact Us Today" CTA (brief §4 homepage 10 + shared block): verbatim H2/body, Call Now (tel).
// withTowns adds the 21-town service-area index, paired with a real landmark photo per town
// (the live town pages' own "Top Sites" photos). Hover/focus a town to swap the photo.

// Which of each town's four live Top Sites photos represents it here (index into topSites).
const PICK = {
  'hanover-ma': 2, 'milton-ma': 2, 'norwell-ma': 1, 'randolph-ma': 2, 'scituate-ma': 0, 'whitman-ma': 2,
  'pembroke-ma': 1, 'weymouth-ma': 0, 'abington-ma': 0, 'braintree-ma': 3, 'hingham-ma': 0, 'quincy-ma': 1,
  'rockland-ma': 2, 'hull-ma': 2, 'plymouth-ma': 2, 'holbrook-ma': 3, 'marshfield-ma': 2, 'hanson-ma': 2,
  'canton-ma': 1, 'carver-ma': 1, 'cohasset-ma': 2,
};
const HOME_TOWN = 'weymouth-ma';
const siteOf = t => t.topSites[PICK[t.slug] ?? 0];
const pad = n => String(n).padStart(2, '0');

function photo(ctx, t, i, { first = false } = {}) {
  const s = siteOf(t), im = images[s.img];
  const base = ctx.asset('img/' + s.img);
  const set = ext => im.widths.map(w => `${base}-${w}.${ext} ${w}w`).join(', ');
  const sizes = '(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 92vw';
  return `<picture class="cc__img${first ? ' is-on' : ''}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${base}-${im.widths.at(-1)}.${im.fallback}" srcset="${set(im.fallback)}" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(s.name)}, ${esc(t.name)} MA" loading="lazy" decoding="async"></picture>`;
}

function serviceArea(ctx, id) {
  const hi = towns.findIndex(t => t.slug === HOME_TOWN);
  const home = towns[hi];
  const attrs = (t, i) => {
    const s = siteOf(t), im = images[s.img];
    return `data-cc-town="${esc(t.name)}" data-cc-site="${esc(s.name)}" data-cc-n="${pad(i + 1)}" data-cc-img="${ctx.asset('img/' + s.img)}" data-cc-w="${im.widths.join(',')}" data-cc-fb="${im.fallback}"`;
  };
  return `<div class="cc__area">
    <figure class="cc__frame" data-cc-frame>
      <div class="cc__stage" data-cc-stage>${photo(ctx, home, hi, { first: true })}</div>
      <figcaption class="cc__cap" aria-live="polite">
        <span class="cc__cap-n"><span data-cc-n>${pad(hi + 1)}</span><span aria-hidden="true"> / ${pad(towns.length)}</span></span>
        <span class="cc__cap-town" data-cc-town>${esc(home.name)}, MA</span>
        <span class="cc__cap-site" data-cc-site>${esc(siteOf(home).name)}</span>
      </figcaption>
    </figure>
    <div class="cc__index">
      <div class="cc__index-head">
        <h3 class="cc__index-h" id="${id}-area">Service Area</h3>
        <a class="cc__index-all" href="${ctx.r('service-area/')}">All ${towns.length} towns${icon('arrow-right', { size: 16 })}</a>
      </div>
      ${townList(ctx, { cls: 'tl--index', label: 'Service area towns', attrs })}
    </div>
  </div>`;
}

// Progressive enhancement for the photo swap + entrance. Inline so it ships only with the towns variant.
const SCRIPT = `<script>(function(){var r=document.currentScript.parentNode,st=r.querySelector('[data-cc-stage]');if(!st)return;
var cap={n:r.querySelector('[data-cc-n]'),t:r.querySelector('[data-cc-town]'),s:r.querySelector('[data-cc-site]')},cur=null,tm;
var sizes='(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 92vw';
function show(a){if(!a||a===cur)return;cur=a;var b=a.dataset.ccImg,w=a.dataset.ccW.split(','),fb=a.dataset.ccFb;
var img=new Image();img.decoding='async';img.alt=a.dataset.ccSite+', '+a.dataset.ccTown+' MA';img.sizes=sizes;
img.srcset=w.map(function(x){return b+'-'+x+'.webp '+x+'w'}).join(', ');img.src=b+'-'+w[w.length-1]+'.'+fb;
var p=document.createElement('picture');p.className='cc__img';p.appendChild(img);
var go=function(){if(cur!==a)return;st.appendChild(p);requestAnimationFrame(function(){requestAnimationFrame(function(){p.classList.add('is-on');
[].forEach.call(st.children,function(c){if(c!==p){c.classList.remove('is-on');c.classList.add('is-off');setTimeout(function(){c.remove()},700)}})})});
cap.n.textContent=a.dataset.ccN;cap.t.textContent=a.dataset.ccTown+', MA';cap.s.textContent=a.dataset.ccSite;};
img.decode?img.decode().then(go,go):(img.onload=go)}
r.querySelectorAll('[data-cc-town]').forEach(function(a){if(a.tagName!=='A')return;
a.addEventListener('pointerenter',function(){clearTimeout(tm);tm=setTimeout(function(){show(a)},70)});
a.addEventListener('pointerleave',function(){clearTimeout(tm)});a.addEventListener('focus',function(){show(a)})});
if('IntersectionObserver' in window){r.classList.add('is-armed');var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){r.classList.add('is-in');io.disconnect()}},{threshold:.18});io.observe(r)}})();</script>`;

export function contactCta(ctx, { id = '', cls = '', withTowns = false, button = c.button } = {}) {
  const hid = (id || 'cta') + '-h';
  const [w1, w2, w3] = c.h2.split(' '); // "Contact Us Today"
  return `<section class="cc on-dark${withTowns ? ' cc--towns' : ''} ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${hid}">
  <div class="cc__rule" aria-hidden="true"></div>
  <div class="container cc__inner">
    <div class="cc__head">
      <p class="cc__eyebrow"><span class="cc__dot" aria-hidden="true"></span>Weymouth &amp; the South Shore</p>
      <h2 class="cc__h" id="${hid}"><span class="cc__line"><span>${esc(w1)} ${esc(w2)}</span></span> <span class="cc__line"><span class="cc__accent">${esc(w3)}</span></span></h2>
    </div>
    <div class="cc__body">
      <p class="cc__lead">${esc(c.body)}</p>
      <div class="cc__actions">
        <a class="btn btn--red btn--lg cc__btn" href="${site.tel}">${icon('phone', { size: 18 })}${esc(button)}</a>
        <a class="cc__dial" href="${site.tel}" aria-label="Call Us Today! ${site.phone}"><span class="cc__dial-k">Call Us Today!</span><span class="cc__dial-n">${site.phone}</span></a>
      </div>
      <ul class="cc__meta" role="list">
        <li>${icon('clock', { size: 16 })}<span>${esc(site.hours)}</span></li>
        <li>${icon('shield', { size: 16 })}<span>${esc(site.license)}</span></li>
      </ul>
    </div>
    ${withTowns ? serviceArea(ctx, id || 'cta') : ''}
  </div>
  ${withTowns ? SCRIPT : ''}
</section>`;
}
