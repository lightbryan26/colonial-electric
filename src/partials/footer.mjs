import { site, usefulLinks, legalLinks } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { towns } from '../data/towns.mjs';
import { icon } from './icons.mjs';
import { esc } from '../lib/html.mjs';

export function footer(ctx) {
  const L = (arr) => arr.map(l => `<li><a href="${ctx.r(l.href)}">${esc(l.label)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="site-footer__sweep" aria-hidden="true"></div>
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <a class="site-footer__logo" href="${ctx.r('')}" aria-label="Colonial Electric — Home">
        <picture><source type="image/webp" srcset="${ctx.asset('img/logo-lockup-320.webp')} 320w, ${ctx.asset('img/logo-lockup-621.webp')} 621w" sizes="180px"><img src="${ctx.asset('img/logo-lockup-320.png')}" width="320" height="332" alt="Colonial Electric" loading="lazy" decoding="async"></picture>
      </a>
      <p class="site-footer__blurb">${esc(site.aboutBlurb)}</p>
      <ul class="site-footer__contact" role="list">
        <li><a href="${site.tel}">${icon('phone', { size: 18 })}<span>${site.phone}</span></a></li>
        <li><span class="site-footer__mail">${icon('mail', { size: 18 })}<span>${site.email}</span></span> <a class="site-footer__mailto" href="mailto:${site.email}">Email us</a></li>
        <li><a href="${site.instagram}" target="_blank" rel="noopener">${icon('instagram', { size: 18 })}<span>${site.instagramHandle}</span></a></li>
      </ul>
    </div>
    <nav class="site-footer__col" aria-label="Useful links"><h2 class="site-footer__h">Useful Links</h2><ul role="list">${L(usefulLinks)}</ul></nav>
    <nav class="site-footer__col" aria-label="Services"><h2 class="site-footer__h">Services</h2><ul role="list">${services.map(s => `<li><a href="${ctx.r(s.slug + '/')}">${esc(s.nav)}</a></li>`).join('')}</ul></nav>
    <nav class="site-footer__col site-footer__col--towns" aria-label="Service area"><h2 class="site-footer__h">Service Area</h2><ul role="list">${towns.map(t => `<li><a href="${ctx.r('service-area/' + t.slug + '/')}">${t.name}</a></li>`).join('')}</ul></nav>
  </div>
  <div class="container site-footer__lic">
    <p>${icon('shield', { size: 18 })}<span>${esc(site.licenseLine)}</span></p>
  </div>
  <div class="container site-footer__legal">
    <ul role="list">${L(legalLinks)}</ul>
    <p>© Colonial Electric</p>
  </div>
</footer>`;
}
