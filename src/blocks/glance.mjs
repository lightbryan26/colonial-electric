import { site } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';

// "At a glance" (service + town pages): the page's key facts as one definition list right under the hero: what, who,
// licence, where, phone, hours. Built for visitors and for answer engines that quote a page passage by passage.
// Every value is data the site already shows (site.mjs, services.mjs, towns.mjs); the labels are UI microcopy and make
// no claim. Styles: src/css/block-glance.css (classes prefixed .glance).
//
// title: what the page is about ("Electrical Outlets", "Electrician in Quincy, MA"); heading = "{title} at a glance".
// service: the Service row value (HTML-safe string or { html }); area: the Service area row text (links to the hub).
export const hoursLine = () => `${site.openHours.days}, ${site.openHours.from} to ${site.openHours.to}`;
const hoursHtml = () => `${esc(site.openHours.days)}, <span class="nowrap">${esc(site.openHours.from)} to ${esc(site.openHours.to)}</span>`;

export function glance(ctx, { title, service, serviceIcon = 'bolt', area, id = 'glance' }) {
  const rows = [
    { k: 'Service', ic: serviceIcon, v: typeof service === 'string' ? esc(service) : service.html },
    { k: 'Provided by', ic: 'check', v: `<a href="${ctx.r('about-colonial-electric/')}">${esc(site.name)}</a>` },
    { k: 'License', ic: 'shield', v: `Licensed &amp; Insured, <span class="nowrap">${esc(site.license)}</span>` },
    { k: 'Service area', ic: 'pin', v: `<a href="${ctx.r('service-area/')}">${esc(area)}</a>` },
    { k: 'Phone', ic: 'phone', v: `<a class="nowrap" href="${site.tel}">${esc(site.phone)}</a>` },
    { k: 'Hours', ic: 'clock', v: hoursHtml() },
  ];
  return `<section class="glance" aria-labelledby="${id}-h">
  <div class="container glance__grid">
    <h2 class="glance__h" id="${id}-h"><span class="glance__t">${esc(title)}</span> <span class="glance__k">at a glance</span></h2>
    <dl class="glance__dl">${rows.map(r => `
      <div class="glance__row"><dt>${icon(r.ic, { size: 18 })}<span>${esc(r.k)}</span></dt><dd>${r.v}</dd></div>`).join('')}
    </dl>
  </div>
</section>`;
}
