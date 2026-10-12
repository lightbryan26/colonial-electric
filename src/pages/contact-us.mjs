// /contact-us/ — Contact Us (brief §7). Copy verbatim from source/pages/contact-us.md.
// Order (brief §7): hero (H1 + direct line + founder portrait) → intro (H2 + 2 paragraphs)
// → info ledger (Location / Email / Phone / Operating Hours) → shared contact form → find-us band (Google Maps link + town list).
// Styles: src/css/page-contact-us.css (all selectors .cu-*). New microcopy only labels actions; no factual claims.
import { site } from '../data/site.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
import { esc, picture } from '../lib/html.mjs';

const intro = {
  h2: ['Let Us Take the Weight', 'Off Your Shoulders!'],
  paras: [
    'Our representatives are always on standby to help you with any problems or concerns you may have. We understand the importance of reliable electrical services, which is why we prioritize prompt and efficient assistance for all our customers. Whether you’re facing a sudden outage, need advice on energy-efficient solutions, or want to schedule maintenance for your electrical systems, our team is here to support you every step of the way.',
    'Feel free to reach out to us via phone, email, or by filling out the contact form. We’ll get back to you as soon as possible to address your inquiries and ensure that your electrical needs are met with the highest level of professionalism and expertise.',
  ],
};

// Google Maps place named on the live page (brief §7 item 5: link, no iframe).
const mapsHref = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Colonial Electric inc, Weymouth, MA');
const pad = n => String(n).padStart(2, '0');

function hero(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.origin + '/' },
      { '@type': 'ListItem', position: 2, name: 'Contact Us', item: site.origin + '/' + ctx.page.slug },
    ],
  }];
  const [area, code, line] = site.phone.match(/\((\d{3})\) (\d{3})-(\d{4})/).slice(1);
  return `<section class="cu-hero on-dark stars-bg" aria-labelledby="cu-h1">
  <div class="container cu-hero__grid">
    <div class="cu-hero__copy">
      <nav class="crumbs" aria-label="Breadcrumb"><ol role="list"><li><a href="${ctx.r('')}">Home</a></li><li><span aria-current="page">Contact Us</span></li></ol></nav>
      <p class="eyebrow cu-hero__eyebrow">${esc(site.address.city)}, ${esc(site.address.region)} · South Shore</p>
      <h1 class="cu-hero__h1" id="cu-h1"><span class="cu-hero__w cu-hero__w--1">Contact</span> <span class="cu-hero__w cu-hero__w--2">Us</span></h1>

      <div class="cu-dial">
        <p class="cu-dial__k">${icon('bolt', { size: 14 })}Call Us Today!</p>
        <a class="cu-dial__num" href="${site.tel}" aria-label="Call ${esc(site.name)} at ${esc(site.phone)}">
          <span class="cu-dial__ic" aria-hidden="true">${icon('phone', { size: 26 })}</span>
          <span class="cu-dial__digits"><span class="cu-dial__area">(${area})</span> <span>${code}</span><span class="cu-dial__dash">-</span><span>${line}</span></span>
        </a>
        <p class="cu-dial__alt">
          <a class="cu-link" href="mailto:${site.email}">${icon('mail', { size: 16 })}Email Us</a>
          <a class="cu-link" href="#cu-form">${icon('arrow-right', { size: 16 })}Send a Message</a>
        </p>
      </div>
    </div>

    <figure class="cu-hero__media">
      <div class="cu-hero__frame">
        ${picture(ctx, 'scott-portrait', { alt: 'Scott Hays, founder of Colonial Electric, in a Colonial Electric polo shirt', sizes: '(min-width: 1440px) 480px, (min-width: 960px) 34vw, (min-width: 640px) 60vw, 88vw', priority: true })}
      </div>
      <figcaption class="cu-tag"><span class="cu-tag__role">Founder</span><span class="cu-tag__name">${esc(site.founder)}</span><span class="cu-tag__lic">${esc(site.license)}</span></figcaption>
    </figure>
  </div>
  <div class="sweep" aria-hidden="true"></div>
</section>`;
}

function ledger(ctx) {
  const items = [
    { ic: 'pin', h: 'Location', body: `<address class="cu-card__v">${esc(site.name)}<br>${esc(site.address.po)}<br>${esc(site.address.city)} ${esc(site.address.region)} ${esc(site.address.zip)}</address>`,
      act: `<a class="cu-card__act" href="${mapsHref}" target="_blank" rel="noopener">View on Google Maps${icon('arrow-up-right', { size: 16 })}<span class="sr-only"> (opens in a new tab)</span></a>` },
    { ic: 'mail', h: 'Email', body: `<p class="cu-card__v cu-card__v--email">${esc(site.email)}</p>`,
      act: `<a class="cu-card__act" href="mailto:${site.email}">Send an Email${icon('arrow-right', { size: 16 })}</a>` },
    { ic: 'phone', h: 'Phone', body: `<p class="cu-card__v cu-card__v--tel"><a href="${site.tel}">${esc(site.phone)}</a></p>`,
      act: `<a class="cu-card__act" href="${site.tel}">Call Now${icon('arrow-right', { size: 16 })}</a>` },
    { ic: 'clock', h: 'Operating Hours', body: `<p class="cu-card__v cu-card__v--hours">${esc(site.hours)}</p>`,
      act: `<a class="cu-card__act" href="#cu-form">Send a Message${icon('arrow-right', { size: 16 })}</a>` },
  ];
  return `<section class="cu-ledger" aria-label="Contact details">
  <div class="container">
    <div class="cu-ledger__head"><p class="cu-index"><span class="cu-index__n">02</span><span>Contact Details</span></p><p class="cu-ledger__lic">${icon('shield', { size: 16 })}${esc(site.license)}</p></div>
    <ul class="cu-ledger__list" role="list">
      ${items.map((it, i) => `<li class="cu-card" style="--i:${i}"><div class="cu-card__in">
        <div class="cu-card__top"><span class="cu-card__ic" aria-hidden="true">${icon(it.ic, { size: 22 })}</span><span class="cu-card__n" aria-hidden="true">${pad(i + 1)}</span></div>
        <h2 class="cu-card__h">${esc(it.h)}</h2>
        ${it.body}
        ${it.act}
      </div></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

function introSection() {
  const [lead, rest] = intro.paras;
  return `<section class="cu-intro" aria-labelledby="cu-intro-h">
  <div class="container cu-intro__grid">
    <div class="cu-intro__head">
      <p class="cu-index"><span class="cu-index__n">01</span><span>We’re Here to Help</span></p>
      <h2 class="cu-intro__h" id="cu-intro-h"><span>${esc(intro.h2[0])}</span> <span class="cu-intro__h2">${esc(intro.h2[1])}</span></h2>
    </div>
    <div class="cu-intro__body">
      <p class="cu-intro__lead">${esc(lead)}</p>
      <p class="cu-intro__p">${esc(rest)}</p>
    </div>
  </div>
</section>`;
}

function findUs(ctx) {
  return `<section class="cu-find on-dark stars-bg" aria-labelledby="cu-find-h">
  <div class="container cu-find__grid">
    <div class="cu-find__head">
      <p class="cu-index"><span class="cu-index__n">03</span><span>Service Area</span></p>
      <h2 class="cu-find__h" id="cu-find-h">Serving Weymouth <span>&amp; the South Shore</span></h2>
      <div class="cu-find__addr">
        <span class="cu-find__pin" aria-hidden="true">${icon('pin', { size: 22 })}</span>
        <address>${esc(site.name)}<br>${esc(site.address.po)}, ${esc(site.address.city)} ${esc(site.address.region)} ${esc(site.address.zip)}</address>
      </div>
      <p class="btn-row"><a class="btn btn--red btn--lg" href="${site.tel}">${icon('phone', { size: 18 })}${esc(site.phone)}</a><a class="btn btn--ghost btn--lg" href="${mapsHref}" target="_blank" rel="noopener">Google Maps${icon('arrow-up-right', { size: 16 })}<span class="sr-only"> (opens in a new tab)</span></a></p>
    </div>
    <div class="cu-find__towns">
      ${townList(ctx, { cls: 'cu-tl' })}
      <a class="cu-find__all label-wide" href="${ctx.r('service-area/')}">View Service Area${icon('arrow-right', { size: 16 })}</a>
    </div>
  </div>
</section>`;
}

export function render(ctx) {
  return [
    hero(ctx),
    introSection(),
    ledger(ctx),
    contactForm(ctx, { id: 'cu-form', cls: 'cu-form', heading: 'Get in Touch' }),
    findUs(ctx),
  ].join('\n');
}
