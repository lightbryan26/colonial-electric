import { about } from '../../data/home.mjs';
import { esc, picture } from '../../lib/html.mjs';
export function render(ctx) {
  return `<section id="s-about" class="block" aria-labelledby="s-about-h">
  <div class="container block__split">
    <div>${picture(ctx, 'scott-portrait', { alt: 'Colonial Electric founder Scott Hays', sizes: '(min-width: 960px) 40vw, 100vw', cls: 'media-frame' })}</div>
    <div><h2 class="h2" id="s-about-h">${esc(about.h2)}</h2><div class="prose">${about.paras.map(p => `<p>${esc(p)}</p>`).join('')}</div></div>
  </div>
</section>`;
}
