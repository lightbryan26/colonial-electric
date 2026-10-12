import { guarantee as g } from '../data/shared.mjs';
import { icon } from '../partials/icons.mjs';
import { esc } from '../lib/html.mjs';
export function guarantee(ctx, { id = '', cls = '' } = {}) {
  return `<section class="block block--guarantee on-dark stars-bg ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'guarantee'}-h">
  <div class="container block__split">
    <div><span class="seal" aria-hidden="true">${icon('shield', { size: 40 })}</span><h2 class="h2" id="${id || 'guarantee'}-h">${esc(g.h2)}</h2></div>
    <div class="prose">${g.paras.map(p => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
</section>`;
}
