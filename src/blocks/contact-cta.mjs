import { contactCta as c } from '../data/shared.mjs';
import { site } from '../data/site.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
import { townList } from './town-list.mjs';
// "Contact Us Today" CTA band with Call Now (tel). withTowns adds the 21-town list.
export function contactCta(ctx, { id = '', cls = '', withTowns = false, button = c.button } = {}) {
  return `<section class="block block--cta on-dark ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'cta'}-h">
  <div class="container block__split">
    <div><h2 class="h2" id="${id || 'cta'}-h">${esc(c.h2)}</h2><p class="lead">${esc(c.body)}</p>
      <p class="btn-row"><a class="btn btn--red" href="${site.tel}">${icon('phone', { size: 18 })}${esc(button)}</a><a class="tel-lg" href="${site.tel}">${site.phone}</a></p></div>
    ${withTowns ? `<div>${townList(ctx)}</div>` : ''}
  </div>
</section>`;
}
