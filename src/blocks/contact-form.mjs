import { site } from '../data/site.mjs';
import { esc } from '../lib/html.mjs';
// Front-end-only contact form (brief §4: option b). Never submits; post-validation state says the preview does not send.
let n = 0;
export function contactForm(ctx, { id = '', cls = '', heading = 'Contact Us' } = {}) {
  const u = 'cf' + (++n);
  const f = (name, label, type = 'text', auto = '') => `<div class="field"><label for="${u}-${name}">${label} <span aria-hidden="true">*</span></label><input id="${u}-${name}" name="${name}" type="${type}" required${auto ? ` autocomplete="${auto}"` : ''} aria-describedby="${u}-${name}-err"><p class="field__err" id="${u}-${name}-err" aria-live="polite"></p></div>`;
  return `<section class="block block--form ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${u}-h">
  <div class="container container--narrow">
    <h2 class="h2" id="${u}-h">${esc(heading)}</h2>
    <form class="cform" novalidate data-cform>
      <div class="cform__grid">
        ${f('name', 'Name', 'text', 'name')}
        ${f('email', 'Email', 'email', 'email')}
        ${f('phone', 'Phone', 'tel', 'tel')}
        ${f('subject', 'Subject')}
      </div>
      <div class="field"><label for="${u}-message">Message <span aria-hidden="true">*</span></label><textarea id="${u}-message" name="message" rows="5" maxlength="180" required aria-describedby="${u}-message-count ${u}-message-err"></textarea><p class="field__meta"><span class="field__err" id="${u}-message-err" aria-live="polite"></span><span class="field__count" id="${u}-message-count" data-count>0 / 180</span></p></div>
      <div class="field field--check"><input id="${u}-consent" name="consent" type="checkbox" required aria-describedby="${u}-consent-err"><label for="${u}-consent"><span class="field__consent-h">Consent <span aria-hidden="true">*</span></span> ${esc(site.smsConsent)}</label><p class="field__err" id="${u}-consent-err" aria-live="polite"></p></div>
      <button class="btn btn--red" type="submit">Send Message</button>
      <div class="cform__status" role="status" aria-live="polite" tabindex="-1" hidden data-cform-status>This is a preview site, so this form does not send messages. Please call us at <a href="${site.tel}">${site.phone}</a>.</div>
    </form>
  </div>
</section>`;
}
