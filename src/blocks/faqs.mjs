import { esc } from '../lib/html.mjs';
// Accordion of FAQs. items: [{q, a:[string | {term,text} | {list:[...]}]}]
const block = b => typeof b === 'string' ? `<p>${esc(b)}</p>`
  : b.list ? `<ul>${b.list.map(i => `<li>${i.term ? `<strong>${esc(i.term)}:</strong> ` : ''}${esc(i.text ?? i)}</li>`).join('')}</ul>`
  : `<p><strong>${esc(b.term)}:</strong> ${esc(b.text)}</p>`;
const plain = b => typeof b === 'string' ? b : b.list ? b.list.map(i => (i.term ? i.term + ': ' : '') + (i.text ?? i)).join(' ') : `${b.term}: ${b.text}`;
export function faqJsonLd(items) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.map(plain).join('\n\n') } })) };
}
export function faqs(ctx, items, { id = '', cls = '', h2 = 'FAQs' } = {}) {
  ctx.jsonld = [...(ctx.jsonld || []), faqJsonLd(items)];
  return `<section class="block block--faqs ${cls}"${id ? ` id="${id}"` : ''} aria-labelledby="${id || 'faqs'}-h">
  <div class="container container--narrow">
    <h2 class="h2" id="${id || 'faqs'}-h">${esc(h2)}</h2>
    <div class="faq-list">${items.map(f => `<details class="faq"><summary><span>${esc(f.q)}</span><span class="faq__ic" aria-hidden="true"></span></summary><div class="faq__a">${f.a.map(block).join('')}</div></details>`).join('')}</div>
  </div>
</section>`;
}
