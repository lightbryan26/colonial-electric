import { pageHero } from '../blocks/page-hero.mjs';
import { legalDoc } from '../lib/md.mjs';
import { esc } from '../lib/html.mjs';
// /terms/ and /privacy/ — verbatim from source md, numbered headings, sticky TOC on desktop.
export function render(ctx) {
  const { html, toc } = legalDoc(ctx.page.source);
  return [
    pageHero(ctx, { h1: ctx.page.h1, ctas: false, crumbs: [{ label: 'Home', href: '' }, { label: ctx.page.h1 }] }),
    `<section class="block"><div class="container legal"><nav class="legal__toc" aria-label="On this page"><p class="eyebrow">On this page</p><ol role="list">${toc.map(t => `<li><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ol></nav><article class="legal__body prose">${html}</article></div></section>`,
  ].join('\n');
}
