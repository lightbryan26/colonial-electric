import { site } from '../data/site.mjs';
import { esc } from '../lib/html.mjs';
import { icon } from '../partials/icons.mjs';
// Shared contact form block (brief §4 "Contact form"; option b = front end only, NEVER submits).
// Behaviour lives in src/js/base.js ([data-cform]): it validates, writes errors into #<field-id>-err,
// updates [data-count] and, once valid, un-hides + focuses [data-cform-status]. That status must say plainly
// the message was NOT sent (brief §4, §10). Class names are cf-* so this block owns its look outright.
let n = 0;

export function contactForm(ctx, { id = '', cls = '', heading = 'Contact Us' } = {}) {
  const u = 'cf' + (++n);
  const req = '<span class="cf-req" aria-hidden="true">*</span>';

  const field = (name, label, type = 'text', { auto = '', mode = '', wide = false } = {}) => `
          <div class="cf-field${wide ? ' cf-field--wide' : ''}">
            <label class="cf-label" for="${u}-${name}">${label} ${req}</label>
            <div class="cf-control">
              <input class="cf-input" id="${u}-${name}" name="${name}" type="${type}" required${auto ? ` autocomplete="${auto}"` : ''}${mode ? ` inputmode="${mode}"` : ''} aria-describedby="${u}-${name}-err">
              <span class="cf-line" aria-hidden="true"></span>
            </div>
            <p class="cf-err" id="${u}-${name}-err" aria-live="polite"></p>
          </div>`;

  const photo = ctx.asset('img/cf-scott-van');

  return `<section class="block cf ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${u}-h">
  <div class="container cf__wrap">
    <div class="cf__main">
      <header class="cf__head">
        <p class="eyebrow">Send Us a Message</p>
        <h2 class="cf__h" id="${u}-h">${esc(heading)}</h2>
        <p class="cf__note">Fields marked <span class="cf-req" aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required.</p>
      </header>

      <form class="cf-form" novalidate data-cform aria-labelledby="${u}-h">
        <fieldset class="cf-set">
          <legend class="cf-legend"><span class="cf-legend__n" aria-hidden="true">01</span>Your Details</legend>
          <div class="cf-grid">${field('name', 'Name', 'text', { auto: 'name', wide: true })}${field('email', 'Email', 'email', { auto: 'email', mode: 'email' })}${field('phone', 'Phone', 'tel', { auto: 'tel', mode: 'tel' })}
          </div>
        </fieldset>

        <fieldset class="cf-set">
          <legend class="cf-legend"><span class="cf-legend__n" aria-hidden="true">02</span>Your Message</legend>
          <div class="cf-grid">${field('subject', 'Subject', 'text', { wide: true })}
            <div class="cf-field cf-field--wide">
              <label class="cf-label" for="${u}-message">Message ${req}</label>
              <div class="cf-control">
                <textarea class="cf-input cf-input--area" id="${u}-message" name="message" rows="5" maxlength="180" required aria-describedby="${u}-message-count ${u}-message-err"></textarea>
                <span class="cf-line" aria-hidden="true"></span>
              </div>
              <div class="cf-meta">
                <p class="cf-err" id="${u}-message-err" aria-live="polite"></p>
                <p class="cf-count"><span class="sr-only">Characters used: </span><span id="${u}-message-count" data-count>0 / 180</span></p>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="cf-consent">
          <input class="cf-check" id="${u}-consent" name="consent" type="checkbox" required aria-describedby="${u}-consent-err">
          <label class="cf-consent__label" for="${u}-consent"><span class="cf-consent__h">Consent ${req}</span>${esc(site.smsConsent)}</label>
          <p class="cf-err" id="${u}-consent-err" aria-live="polite"></p>
        </div>

        <div class="cf-actions">
          <button class="btn btn--red btn--lg cf-submit" type="submit">Send Message ${icon('arrow-right', { size: 18 })}</button>
          <p class="cf-alt">Or call <a href="${site.tel}">${site.phone}</a></p>
        </div>

        <div class="cf-status" role="status" aria-live="polite" tabindex="-1" hidden data-cform-status>
          <span class="cf-status__ic" aria-hidden="true">${icon('phone', { size: 22 })}</span>
          <div class="cf-status__body">
            <p class="cf-status__h">Preview only: your message has not been sent</p>
            <p>This is a preview site, so this form does not send messages. Please call us at <a href="${site.tel}">${site.phone}</a>.</p>
          </div>
        </div>
      </form>
    </div>

    <aside class="cf__aside stars-bg" aria-label="Other ways to reach Colonial Electric">
      <figure class="cf-photo">
        <picture>
          <source type="image/webp" srcset="${photo}-420.webp 420w, ${photo}-580.webp 580w" sizes="(min-width: 960px) 30vw, (min-width: 640px) 40vw, 92vw">
          <img src="${photo}-580.jpg" srcset="${photo}-420.jpg 420w, ${photo}-580.jpg 580w" sizes="(min-width: 960px) 30vw, (min-width: 640px) 40vw, 92vw" width="580" height="840" alt="Scott Hays, founder of Colonial Electric, standing in front of the Colonial Electric van" loading="lazy" decoding="async">
        </picture>
        <figcaption class="cf-photo__cap"><span class="cf-photo__role">Founder</span><span class="cf-photo__name">${esc(site.founder)}</span></figcaption>
      </figure>

      <div class="cf-direct">
        <p class="cf-direct__k">Call Us Today!</p>
        <a class="cf-direct__tel" href="${site.tel}">${icon('phone', { size: 22 })}<span>${site.phone}</span></a>
        <dl class="cf-facts">
          <div class="cf-fact"><dt>${icon('mail', { size: 18 })}Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
          <div class="cf-fact"><dt>${icon('clock', { size: 18 })}Operating Hours</dt><dd>${esc(site.hours)}</dd></div>
          <div class="cf-fact"><dt>${icon('shield', { size: 18 })}Licensed &amp; Insured</dt><dd>${esc(site.license)}</dd></div>
        </dl>
      </div>
    </aside>
  </div>
</section>`;
}
