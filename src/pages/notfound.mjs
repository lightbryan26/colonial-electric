// 404.html — brief §7: brand styling, Call Now, link home. Rendered by build.mjs at depth 0 behind a base-path-detecting
// <base> tag, so every href from ctx.r() resolves from the site root at any depth. Styles: src/css/page-terms.css (.nf-*).
import { site, mainNav } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

export function render(ctx) {
  const links = mainNav.filter(l => l.href);
  return `<section class="nf on-dark stars-bg">
  <div class="container nf__grid">
    <div class="nf__text">
      <p class="eyebrow">Error 404</p>
      <h1 class="h1 nf__h1">Page Not Found</h1>
      <p class="lead">The page you’re looking for has moved or no longer exists. Head back home, or give us a call.</p>
      <p class="btn-row"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}Call Now</a><a class="btn btn--ghost btn--lg" href="${ctx.r('')}">Back to Home${icon('arrow-right', { size: 18 })}</a></p>
      <nav class="nf__links" aria-label="Popular pages"><p class="label-wide">Or try</p><ul role="list">${links.map(l => `<li><a href="${ctx.r(l.href)}">${esc(l.label)}${icon('arrow-up-right', { size: 16 })}</a></li>`).join('')}</ul></nav>
    </div>
    <div class="nf__art" aria-hidden="true">
      <span class="nf__num">4<span class="nf__bolt">${icon('bolt', { size: 120 })}</span>4</span>
      <div class="nf__seal">${picture(ctx, 'emblem', { alt: '', sizes: '160px', loading: 'eager' })}</div>
    </div>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}
