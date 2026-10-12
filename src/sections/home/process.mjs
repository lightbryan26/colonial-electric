// Homepage §4.8 — Process: four booking steps (titles verbatim; service-template bodies verbatim) + the process quote,
// set against a wide crop of the real Colonial van photo. No live H2 on the homepage, so the H2 is visually hidden.
import { processSteps, quote } from '../../data/shared.mjs';
import { esc, picture, telHref } from '../../lib/html.mjs';
import { icon } from '../../partials/icons.mjs';

const stepIcons = ['phone', 'quote', 'calendar', 'check'];
const pad = n => String(n).padStart(2, '0');

export function render(ctx) {
  const steps = processSteps.map((s, i) => `
      <li class="proc__step" style="--i:${i}">
        <div class="proc__num" aria-hidden="true"><span class="proc__digits">${pad(s.n)}</span></div>
        <div class="proc__main">
          <p class="proc__kicker"><span class="proc__ic">${icon(stepIcons[i], { size: 16 })}</span><span>Step ${s.n}</span></p>
          <h3 class="proc__title">${esc(s.title)}</h3>
        </div>
        <div class="proc__body">
          <p>${esc(s.body)}</p>
          ${i === 0 ? `<a class="proc__tel" href="${telHref}">${icon('phone', { size: 18 })}<span>(781) 287-8729</span></a>` : ''}
        </div>
        <span class="proc__rule" aria-hidden="true"></span>
      </li>`).join('');

  const [q1, ...qRest] = quote;
  return `<section id="s-process" class="proc" aria-labelledby="s-process-h">
  <div class="container">
    <header class="proc__head">
      <p class="eyebrow">How it works</p>
      <h2 class="sr-only" id="s-process-h">How booking with Colonial Electric works</h2>
      <p class="proc__count" aria-hidden="true"><span>01</span><i></i><span>04</span></p>
    </header>
    <ol class="proc__steps" role="list">${steps}
    </ol>

    <figure class="proc__feature">
      <div class="proc__photo">
        ${picture(ctx, 'owner-van', { alt: 'The Colonial Electric van parked on a tree-lined residential street, with founder Scott Hays standing beside it', sizes: '(min-width: 1360px) 1280px, 100vw', imgCls: 'proc__img' })}
      </div>
      <blockquote class="proc__quote">
        <span class="proc__mark" aria-hidden="true">“</span>
        <p class="proc__q1">${esc(q1.replace(/^“/, ''))}</p>
        <p class="proc__q2">${qRest.map(esc).join(' ')}”</p>
        <span class="proc__flag" aria-hidden="true"></span>
      </blockquote>
    </figure>
  </div>
</section>`;
}
