// /calendar/ — Calendar (brief §7). H1 "Calendar", H2 "Scheduling Calendar".
// Primary content = the live GoHighLevel booking widget (no invented calendar UI).
// The Call Now / Contact Us card is a fallback only: inside <noscript>, and revealed by script
// if the widget fails to load. Styles: src/css/page-calendar.css (all selectors .cal-*).
import { site } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const WIDGET = 'https://link.colonial-electric.com/widget/booking/vm1WWPnUuFiEePldaora';
const EMBED_JS = 'https://link.colonial-electric.com/js/form_embed.js';

function fallback(ctx) {
  return `<div class="cal-fallback__card">
      <p class="cal-fallback__k">${icon('phone', { size: 16 })}Call Us Today!</p>
      <a class="cal-fallback__num" href="${site.tel}">${esc(site.phone)}</a>
      <p class="btn-row"><a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 18 })}Call Now</a><a class="btn btn--outline" href="${ctx.r('contact-us/')}">Contact Us${icon('arrow-right', { size: 18 })}</a></p>
    </div>`;
}

export function render(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Calendar', item: site.origin + '/' + ctx.page.slug },
    ],
  }];

  const hero = `<section class="cal-hero on-dark stars-bg" aria-labelledby="cal-h1">
  <div class="container cal-hero__grid">
    <div class="cal-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Calendar</span></li></ol></nav>
      <p class="eyebrow cal-hero__eyebrow">${esc(site.name)} · ${esc(site.address.city)}, ${esc(site.address.region)}</p>
      <h1 class="cal-hero__h1" id="cal-h1"><span class="cal-hero__word">Calendar</span></h1>
      <p class="cal-hero__lic">${icon('shield', { size: 16 })}${esc(site.license)}</p>
    </div>
    <figure class="cal-hero__media" aria-hidden="false">
      <div class="cal-hero__frame">${picture(ctx, 'owner-van', { alt: 'Colonial Electric service van', sizes: '(min-width: 1440px) 720px, (min-width: 960px) 50vw, 100vw', priority: true })}</div>
    </figure>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;

  const booking = `<section class="cal-book" aria-labelledby="cal-h2">
  <div class="container cal-book__grid">
    <div class="cal-panel">
      <header class="cal-panel__head">
        <span class="cal-panel__ic" aria-hidden="true">${icon('calendar', { size: 22 })}</span>
        <h2 class="cal-panel__h2" id="cal-h2">Scheduling Calendar</h2>
      </header>
      <div class="cal-embed" data-cal-embed>
        <div class="cal-embed__skeleton" aria-hidden="true"><span></span><span></span><span></span></div>
        <iframe src="${WIDGET}" style="width:100%;border:none;overflow:hidden;" scrolling="no" title="Book an appointment with Colonial Electric" id="cal-widget"></iframe>
      </div>
      <script src="${EMBED_JS}" defer onerror="document.documentElement.classList.add('cal-failed')"></script>
      <noscript><div class="cal-fallback cal-fallback--static">${fallback(ctx)}</div></noscript>
      <div class="cal-fallback cal-fallback--js" hidden data-cal-fallback>${fallback(ctx)}</div>
    </div>
    <aside class="cal-aside" aria-label="About Colonial Electric">
      <figure class="cal-founder">
        <div class="cal-founder__frame">${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric', sizes: '(min-width: 960px) 360px, (min-width: 640px) 50vw, 90vw' })}</div>
        <figcaption class="cal-founder__tag"><span class="cal-founder__role">Founder</span><span class="cal-founder__name">${esc(site.founder)}</span></figcaption>
      </figure>
      <p class="cal-aside__line">${esc(site.licenseLine)}</p>
    </aside>
  </div>
</section>
<script>(function(){var f=document.querySelector('[data-cal-fallback]'),w=document.querySelector('[data-cal-embed]'),i=document.getElementById('cal-widget');if(!f||!i)return;var ok=false;function fail(){if(ok)return;f.hidden=false;w.classList.add('is-failed');}i.addEventListener('load',function(){ok=true;w.classList.add('is-loaded');});i.addEventListener('error',fail);if(document.documentElement.classList.contains('cal-failed'))fail();var t=setInterval(function(){if(document.documentElement.classList.contains('cal-failed')){clearInterval(t);fail();}},500);setTimeout(function(){clearInterval(t);fail();},12000);})();</script>`;

  return [hero, booking].join('\n');
}
