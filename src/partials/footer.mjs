import { site, usefulLinks, legalLinks } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { towns } from '../data/towns.mjs';
import { icon } from './icons.mjs';
import { esc } from '../lib/html.mjs';

// Site footer (brief §2 footer). Every string comes from src/data; no invented claims.
export function footer(ctx) {
  const here = ctx.page?.slug ?? '';
  const cur = href => (href === here ? ' aria-current="page"' : '');
  const link = (href, label) => `<li><a href="${ctx.r(href)}"${cur(href)}>${esc(label)}</a></li>`;
  const bolt = icon('bolt', { size: 12 });

  return `<footer class="site-footer" aria-labelledby="site-footer-title">
  <h2 class="sr-only" id="site-footer-title">Colonial Electric site footer</h2>
  <div class="site-footer__sweep" aria-hidden="true"><i></i><i></i><i></i></div>

  <div class="container site-footer__mast">
    <a class="site-footer__logo" href="${ctx.r('')}" aria-label="Colonial Electric, home">
      <picture><source type="image/webp" srcset="${ctx.asset('img/logo-lockup-320.webp')} 320w, ${ctx.asset('img/logo-lockup-621.webp')} 621w" sizes="(min-width: 1080px) 176px, 136px"><img src="${ctx.asset('img/logo-lockup-320.png')}" width="320" height="332" alt="Colonial Electric" loading="lazy" decoding="async"></picture>
    </a>
    <div class="site-footer__call">
      <p class="site-footer__eyebrow">Call Us Today!</p>
      <a class="site-footer__phone" href="${site.tel}">${esc(site.phone)}<span class="site-footer__phone-ico" aria-hidden="true">${icon('arrow-up-right', { size: 22 })}</span></a>
    </div>
    <dl class="site-footer__facts">
      <div class="site-footer__fact">
        <dt>${icon('mail', { size: 16 })}Email</dt>
        <dd><a href="mailto:${site.email}">${esc(site.email)}</a></dd>
      </div>
      <div class="site-footer__fact">
        <dt>${icon('clock', { size: 16 })}Operating Hours</dt>
        <dd>${esc(site.hours)}</dd>
      </div>
      <div class="site-footer__fact">
        <dt>${icon('pin', { size: 16 })}Location</dt>
        <dd>${esc(site.address.po)}, ${esc(site.address.city)} ${esc(site.address.region)} ${esc(site.address.zip)}</dd>
      </div>
      <div class="site-footer__fact">
        <dt>${icon('instagram', { size: 16 })}Instagram</dt>
        <dd><a href="${site.instagram}" target="_blank" rel="noopener">${esc(site.instagramHandle)}<span class="sr-only"> (opens in a new tab)</span></a></dd>
      </div>
    </dl>
  </div>

  <div class="container site-footer__grid">
    <div class="site-footer__about">
      <p class="site-footer__blurb">${esc(site.aboutBlurb)}</p>
      <p class="site-footer__lic">
        <span class="site-footer__lic-ico" aria-hidden="true">${icon('shield', { size: 20 })}</span>
        <span>${esc(site.licenseLine)}</span>
      </p>
    </div>
    <nav class="site-footer__col" aria-label="Useful links">
      <h3 class="site-footer__h"><span class="site-footer__h-bolt" aria-hidden="true">${bolt}</span>Useful Links</h3>
      <ul role="list">${usefulLinks.map(l => link(l.href, l.label)).join('')}</ul>
    </nav>
    <nav class="site-footer__col" aria-label="Services">
      <h3 class="site-footer__h"><span class="site-footer__h-bolt" aria-hidden="true">${bolt}</span>Services</h3>
      <ul role="list">${services.map(s => link(s.slug + '/', s.nav)).join('')}</ul>
    </nav>
    <nav class="site-footer__col site-footer__col--towns" aria-label="Service area">
      <h3 class="site-footer__h"><span class="site-footer__h-bolt" aria-hidden="true">${bolt}</span>Service Area</h3>
      <ul role="list">${towns.map(t => link('service-area/' + t.slug + '/', t.name)).join('')}</ul>
      <a class="site-footer__all" href="${ctx.r('service-area/')}">Service Area${icon('arrow-right', { size: 16 })}</a>
    </nav>
  </div>

  <div class="container site-footer__legal">
    <p>© Colonial Electric</p>
    <ul role="list">${legalLinks.map(l => link(l.href, l.label)).join('')}</ul>
  </div>
</footer>`;
}
