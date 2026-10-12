import { site } from '../data/site.mjs';
import { trustItems } from '../data/shared.mjs';
import { esc, claimVan } from '../lib/html.mjs';
import { icon } from '../partials/icons.mjs';
// Shared contact form block (brief §4 "Contact form"; option b = front end only, NEVER submits).
// Behaviour lives in src/js/base.js ([data-cform]): it validates, writes errors into #<field-id>-err,
// updates [data-count] and, once valid, un-hides + focuses [data-cform-status]. That status must say plainly
// the message was NOT sent (brief §4, §10). Class names are cf-* so this block owns its look outright.
// Everything renders visible by default: no lazy photo, no opacity-gated reveals. The photo decodes
// synchronously: with decoding="async" Chromium paints it blank in full-page captures taken from the top.
// The photo is the owner-van crop, shown only when the page has not used the van photo yet (claimVan: once per page);
// otherwise the aside opens with the crest variant: the real logo lockup on the navy star field.
let n = 0;

// Trust points above the submit button: verbatim from the brief's shared trust strip (§4).
const formTrust = ['Licensed, Bonded & Insured', 'Locally Owned', 'Family-run Business'].filter((t) => trustItems.includes(t));

export function contactForm(ctx, { id = '', cls = '', heading = 'Contact Us' } = {}) {
  const u = 'cf' + (++n);
  const req = '<span class="cf-req" aria-hidden="true">*</span>';

  const field = (name, label, type = 'text', { auto = '', mode = '', span = '' } = {}) => `
          <div class="cf-field${span ? ` cf-field--${span}` : ''}">
            <label class="cf-label" for="${u}-${name}">${label} ${req}</label>
            <div class="cf-control">
              <input class="cf-input" id="${u}-${name}" name="${name}" type="${type}" required${auto ? ` autocomplete="${auto}"` : ''}${mode ? ` inputmode="${mode}"` : ''} aria-describedby="${u}-${name}-err">
            </div>
            <p class="cf-err" id="${u}-${name}-err" aria-live="polite"></p>
          </div>`;

  const photo = ctx.asset('img/cf-van');
  const withPhoto = claimVan(ctx);
  const lockup = ctx.asset('img/logo-lockup');
  const sizes = '(min-width: 1200px) 520px, (min-width: 960px) 40vw, 92vw';

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
          <div class="cf-grid cf-grid--3">${field('name', 'Name', 'text', { auto: 'name', span: 'name' })}${field('email', 'Email', 'email', { auto: 'email', mode: 'email' })}${field('phone', 'Phone', 'tel', { auto: 'tel', mode: 'tel' })}
          </div>
        </fieldset>

        <fieldset class="cf-set">
          <legend class="cf-legend"><span class="cf-legend__n" aria-hidden="true">02</span>Your Message</legend>
          <div class="cf-grid">${field('subject', 'Subject', 'text', { span: 'wide' })}
            <div class="cf-field cf-field--wide">
              <div class="cf-labelrow">
                <label class="cf-label" for="${u}-message">Message ${req}</label>
                <p class="cf-count"><span class="sr-only">Characters used: </span><span id="${u}-message-count" data-count>0 / 180</span></p>
              </div>
              <div class="cf-control">
                <textarea class="cf-input cf-input--area" id="${u}-message" name="message" rows="4" maxlength="180" required aria-describedby="${u}-message-count ${u}-message-err"></textarea>
              </div>
              <p class="cf-err" id="${u}-message-err" aria-live="polite"></p>
            </div>
          </div>
        </fieldset>

        <div class="cf-consent">
          <input class="cf-check" id="${u}-consent" name="consent" type="checkbox" required aria-describedby="${u}-consent-err">
          <label class="cf-consent__label" for="${u}-consent"><span class="cf-consent__h">Consent ${req}</span>${esc(site.smsConsent)}</label>
          <p class="cf-err" id="${u}-consent-err" aria-live="polite"></p>
        </div>

        <div class="cf-actions">
          <ul class="cf-trust" aria-label="Why Colonial Electric">${formTrust.map((t) => `<li>${icon(t.startsWith('Licensed') ? 'shield' : 'check', { size: 16 })}${esc(t)}</li>`).join('')}</ul>
          <button class="btn btn--red btn--lg cf-submit" type="submit"><span>Send Message</span>${icon('arrow-right', { size: 20 })}</button>
          <p class="cf-alt">Prefer to talk? Call <a href="${site.tel}">${site.phone}</a></p>
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

    <aside class="cf__aside" aria-label="Other ways to reach Colonial Electric">
      ${withPhoto ? `<figure class="cf-photo">
        <picture>
          <source type="image/webp" srcset="${photo}-640.webp 640w, ${photo}-1000.webp 1000w" sizes="${sizes}">
          <img src="${photo}-1000.jpg" srcset="${photo}-640.jpg 640w, ${photo}-1000.jpg 1000w" sizes="${sizes}" width="1000" height="900" alt="Scott Hays, founder of Colonial Electric, standing in front of the Colonial Electric van" loading="eager" decoding="sync">
        </picture>
        <figcaption class="cf-photo__cap"><span class="cf-photo__role">Founder</span><span class="cf-photo__name">${esc(site.founder)}</span></figcaption>
      </figure>` : `<div class="cf-crest">
        <picture class="cf-crest__logo"><source type="image/webp" srcset="${lockup}-320.webp 320w, ${lockup}-621.webp 621w" sizes="15rem"><img src="${lockup}-320.png" srcset="${lockup}-320.png 320w, ${lockup}-621.png 621w" sizes="15rem" width="320" height="332" alt="Colonial Electric" loading="lazy" decoding="async"></picture>
      </div>`}

      <div class="cf-direct">
        <p class="cf-direct__k">Call Us Today!</p>
        <a class="cf-direct__tel" href="${site.tel}">${icon('phone', { size: 22 })}<span>${site.phone}</span></a>
        <dl class="cf-facts">
          <div class="cf-fact"><dt>${icon('clock', { size: 16 })}Operating Hours</dt><dd>${esc(site.hours)}</dd></div>
          <div class="cf-fact"><dt>${icon('pin', { size: 16 })}Service Area</dt><dd>Weymouth &amp; the South Shore</dd></div>
          <div class="cf-fact"><dt>${icon('shield', { size: 16 })}Licensed &amp; Insured</dt><dd>${esc(site.license)}</dd></div>
          <div class="cf-fact"><dt>${icon('mail', { size: 16 })}Email</dt><dd><a href="mailto:${site.email}">${esc(site.email)}</a></dd></div>
        </dl>
      </div>
    </aside>
  </div>
</section>`;
}
