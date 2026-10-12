// Homepage §4.13 — FAQs. Editorial split: sticky masthead + call card (left), exclusive native accordion (right).
// Content is verbatim from src/data/home.mjs (pages/home.md). FAQPage JSON-LD from the shared block helper.
import { faqJsonLd } from '../../blocks/faqs.mjs';
import { faqs as items } from '../../data/home.mjs';
import { site } from '../../data/site.mjs';
import { esc } from '../../lib/html.mjs';

const pad = n => String(n).padStart(2, '0');

const bolt = `<svg class="hfaq__bolt" viewBox="0 0 12 20" aria-hidden="true" focusable="false"><path d="M7.4 0 0 11.3h4.9L3.6 20 12 7.9H6.9L7.4 0Z" fill="currentColor"/></svg>`;
const phoneIc = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>`;
const arrow = `<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>`;

function answer(a) {
  return a.map(b => {
    if (typeof b === 'string') return `<p>${esc(b)}</p>`;
    if (b.list) return `<ol class="hfaq__steps">${b.list.map((i, n) => `<li><span class="hfaq__step-n" aria-hidden="true">${pad(n + 1)}</span><p>${i.term ? `<strong>${esc(i.term)}:</strong> ` : ''}${esc(i.text ?? i)}</p></li>`).join('')}</ol>`;
    return `<div class="hfaq__term"><h3 class="hfaq__term-h">${bolt}${esc(b.term)}</h3><p>${esc(b.text)}</p></div>`;
  }).join('');
}

export function render(ctx) {
  ctx.jsonld = [...(ctx.jsonld || []), faqJsonLd(items)];
  return `<section class="block hfaq" id="s-faqs" aria-labelledby="s-faqs-h">
  <div class="container hfaq__grid">
    <header class="hfaq__head">
      <p class="eyebrow">Questions &amp; Answers</p>
      <h2 class="hfaq__title" id="s-faqs-h">FAQs</h2>
      <p class="hfaq__count label-wide" aria-hidden="true"><span>${pad(items.length)}</span> Questions</p>
      <aside class="hfaq__call" aria-label="Call Colonial Electric">
        <div class="hfaq__call-in stars-bg">
          <p class="hfaq__call-k label-wide">Still have a question?</p>
          <a class="hfaq__tel" href="${site.tel}">${phoneIc}<span>${esc(site.phone)}</span></a>
          <a class="hfaq__link" href="${ctx.r('contact-us/')}"><span>Contact Us</span>${arrow}</a>
        </div>
      </aside>
    </header>
    <div class="hfaq__list">
      ${items.map((f, i) => `<details class="hfaq__item" id="faq-${i + 1}" name="home-faq"${i === 0 ? ' open' : ''}>
        <summary class="hfaq__q"><span class="hfaq__n" aria-hidden="true">${pad(i + 1)}</span><span class="hfaq__qt">${esc(f.q)}</span><span class="hfaq__ic" aria-hidden="true"></span></summary>
        <div class="hfaq__a">${answer(f.a)}</div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}
