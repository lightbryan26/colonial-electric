import { processSteps, quote, bookingH2 } from '../data/shared.mjs';
import { esc } from '../lib/html.mjs';
// Booking process steps. withBodies: service-template step bodies (verbatim). h2 optional (home has none on live).
export function processSteps_(ctx, { id = '', cls = '', h2 = '', withBodies = false, withQuote = false } = {}) {
  return `<section class="block block--process ${cls}"${id ? ` id="${id}"` : ''}${h2 ? ` aria-labelledby="${id || 'process'}-h"` : ' aria-label="How it works"'}>
  <div class="container">
    ${h2 ? `<header class="block__head"><h2 class="h2" id="${id || 'process'}-h">${esc(h2)}</h2></header>` : ''}
    <ol class="steps" role="list">${processSteps.map(s => `<li class="step"><span class="step__n">Step ${s.n}</span><h3 class="step__t">${esc(s.title)}</h3>${withBodies ? `<p>${esc(s.body)}</p>` : ''}</li>`).join('')}</ol>
    ${withQuote ? quoteBlock() : ''}
  </div>
</section>`;
}
export const quoteBlock = () => `<blockquote class="pull-quote"><p>“${quote.map(esc).join(' ')}”</p></blockquote>`;
export { processSteps_ as process, bookingH2 };
