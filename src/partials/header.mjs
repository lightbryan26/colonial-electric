import { site, mainNav, membershipLink } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { icon } from './icons.mjs';
import { esc } from '../lib/html.mjs';

const svcIcon = { 'permanent-outdoor-lighting': 'sparkle', 'electrical-outlets': 'outlet', 'electrical-panel-upgrade': 'panel', 'surge-protection': 'surge', 'ceiling-fan-installation': 'fan', 'ev-charger-installation': 'ev', 'whole-house-wiring-or-rewiring': 'wiring', 'electrical-inspections': 'inspect', 'recessed-lighting': 'recessed', 'remodels': 'remodel', 'lighting-additions': 'bulb', 'whole-home-battery-back-up': 'battery', 'generator': 'generator' };
export const serviceIcon = slug => svcIcon[slug] || 'bolt';

export function financingBar(ctx) {
  return `<aside class="finbar" aria-label="Financing">
  <div class="finbar__in container">
    <p class="finbar__line"><span class="finbar__tag" aria-hidden="true">${icon('bolt', { size: 12 })}</span>${esc(site.financing.line)}</p>
    <a class="finbar__link" href="${ctx.r(site.financing.href)}">${esc(site.financing.cta)}${icon('arrow-right', { size: 14 })}</a>
  </div>
</aside>`;
}

// aria-current="page" only on the link to this very page; "true" on the parent section link of a service or town page.
function current(ctx, href) {
  const s = ctx.page.slug;
  if (s === href) return ' aria-current="page"';
  if (href === 'services/' && services.some(x => x.slug + '/' === s)) return ' aria-current="true"';
  if (href === 'service-area/' && s.startsWith('service-area/')) return ' aria-current="true"';
  return '';
}

function dropdown(ctx) {
  return `<div class="nav-drop" id="nav-services" data-drop-panel>
    <div class="nav-drop__in">
      <div class="nav-drop__head">
        <p class="eyebrow">Services</p>
        <a class="nav-drop__all" href="${ctx.r('services/')}">View Our Services ${icon('arrow-right', { size: 16 })}</a>
      </div>
      <ul class="nav-drop__list" role="list">
        ${services.map(s => `<li><a href="${ctx.r(s.slug + '/')}"${ctx.page.slug === s.slug + '/' ? ' aria-current="page"' : ''}><span class="nav-drop__ic">${icon(serviceIcon(s.slug), { size: 20 })}</span><span>${esc(s.nav)}</span></a></li>`).join('')}
      </ul>
    </div>
  </div>`;
}

export function header(ctx) {
  const items = mainNav.map(n => {
    const cur = current(ctx, n.href);
    if (n.dropdown) return `<li class="nav__item nav__item--drop" data-drop>
      <a class="nav__link" href="${ctx.r(n.href)}"${cur}>${n.label}</a>
      <button class="nav__caret" type="button" aria-expanded="false" aria-controls="nav-services" aria-label="Show services menu">${icon('chevron-down', { size: 16 })}</button>
      ${dropdown(ctx)}
    </li>`;
    return `<li class="nav__item"><a class="nav__link" href="${ctx.r(n.href)}"${cur}>${n.label}</a></li>`;
  }).join('');

  const mobileItems = mainNav.map(n => n.dropdown
    ? `<li class="mnav__item"><div class="mnav__row"><a class="mnav__link" href="${ctx.r(n.href)}"${current(ctx, n.href)}>${n.label}</a><button class="mnav__toggle" type="button" aria-expanded="false" aria-controls="mnav-services" aria-label="Show services">${icon('chevron-down', { size: 22 })}</button></div>
        <ul class="mnav__sub" id="mnav-services" role="list" hidden>${services.map(s => `<li><a href="${ctx.r(s.slug + '/')}"${ctx.page.slug === s.slug + '/' ? ' aria-current="page"' : ''}>${esc(s.nav)}</a></li>`).join('')}</ul></li>`
    : `<li class="mnav__item"><a class="mnav__link" href="${ctx.r(n.href)}"${current(ctx, n.href)}>${n.label}</a></li>`).join('');

  return `${financingBar(ctx)}
<header class="site-header" data-header>
  <div class="site-header__in container">
    <a class="brand" href="${ctx.r('')}" aria-label="Colonial Electric — Home">
      <picture><source type="image/webp" srcset="${ctx.asset('img/logo-badge-250.webp')}"><img src="${ctx.asset('img/logo-badge-250.png')}" width="250" height="150" alt="Colonial Electric"></picture>
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list" role="list">${items}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="hcall" href="${site.tel}">
        <span class="hcall__ic">${icon('phone', { size: 18 })}</span>
        <span class="hcall__txt"><span class="hcall__label">Call Us Today!</span><span class="hcall__num">${site.phone}</span></span>
      </a>
      <a class="btn btn--ghost btn--sm hflash" href="${ctx.r(membershipLink.href)}">${icon('star', { size: 14 })}<span>Flash Pass<span class="hflash__more"> Membership</span></span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" data-menu-open><span class="sr-only">Open menu</span>${icon('menu', { size: 26 })}</button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" role="dialog" aria-modal="true" aria-label="Menu" hidden data-menu>
  <div class="mnav__top container">
    <a class="brand" href="${ctx.r('')}" aria-label="Colonial Electric — Home"><picture><source type="image/webp" srcset="${ctx.asset('img/logo-badge-250.webp')}"><img src="${ctx.asset('img/logo-badge-250.png')}" width="250" height="150" alt="Colonial Electric"></picture></a>
    <button class="mnav__close" type="button" data-menu-close><span class="sr-only">Close menu</span>${icon('close', { size: 28 })}</button>
  </div>
  <nav class="mnav__body container" aria-label="Mobile">
    <ul class="mnav__list" role="list">${mobileItems}
      <li class="mnav__item"><a class="mnav__link" href="${ctx.r(membershipLink.href)}"${ctx.page.slug === membershipLink.href ? ' aria-current="page"' : ''}>${membershipLink.label}</a></li>
    </ul>
    <div class="mnav__foot">
      <a class="btn btn--red btn--block" href="${site.tel}">${icon('phone', { size: 18 })}Call ${site.phone}</a>
      <a class="btn btn--ghost btn--block" href="${ctx.r('contact-us/')}">Contact Us Today</a>
      <p class="mnav__lic">${esc(site.license)} · <a href="mailto:${site.email}">${site.email}</a></p>
    </div>
  </nav>
</div>`;
}
