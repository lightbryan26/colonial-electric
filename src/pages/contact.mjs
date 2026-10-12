import { site } from '../data/site.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
import { contactForm } from '../blocks/contact-form.mjs';
import { icon } from '../partials/icons.mjs';
// /contact-us/ (brief §7).
export function render(ctx) {
  const card = (ic, h, body) => `<li class="card info-card"><span class="info-card__ic">${icon(ic, { size: 24 })}</span><h3 class="h3">${h}</h3>${body}</li>`;
  return [
    pageHero(ctx, { h1: 'Contact Us', crumbs: [{ label: 'Home', href: '' }, { label: 'Contact Us' }] }),
    `<section class="block"><div class="container container--narrow"><h2 class="h2">Let Us Take the Weight Off Your Shoulders!</h2><div class="prose"><p>Our representatives are always on standby to help you with any problems or concerns you may have. We understand the importance of reliable electrical services, which is why we prioritize prompt and efficient assistance for all our customers. Whether you’re facing a sudden outage, need advice on energy-efficient solutions, or want to schedule maintenance for your electrical systems, our team is here to support you every step of the way.</p><p>Feel free to reach out to us via phone, email, or by filling out the contact form. We’ll get back to you as soon as possible to address your inquiries and ensure that your electrical needs are met with the highest level of professionalism and expertise.</p></div></div></section>`,
    `<section class="block block--alt"><div class="container"><ul class="card-grid" role="list">
      ${card('pin', 'Location', `<p>Colonial Electric<br>${site.address.po}<br>Weymouth MA 02188</p>`)}
      ${card('mail', 'Email', `<p>${site.email}</p><p><a href="mailto:${site.email}">Send an email</a></p>`)}
      ${card('phone', 'Phone', `<p><a href="${site.tel}">${site.phone}</a></p>`)}
      ${card('clock', 'Operating Hours', `<p>${site.hours}</p>`)}
    </ul></div></section>`,
    contactForm(ctx),
  ].join('\n');
}
