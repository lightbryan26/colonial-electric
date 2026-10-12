// Homepage §4.8 — Process: four booking steps (titles verbatim; service-template bodies verbatim) + the process quote,
// set as a white crest card on the navy band (pinstripe, ghost bolt). No photo here: the owner-van photo is used once per
// page and the homepage hero has it. H2 is the brief's verbatim booking-process heading (brief §8 item 9).
import { processSteps, quote } from '../../data/shared.mjs';
import { esc, telHref } from '../../lib/html.mjs';
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
  return `<section id="s-process" class="proc on-dark stars-bg" aria-labelledby="s-process-h">
  <div class="container">
    <header class="proc__head">
      <div class="proc__head-a">
        <p class="eyebrow">How It Works</p>
        <h2 class="h2 proc__h" id="s-process-h">A Booking Process That Feels Like a&nbsp;Breeze</h2>
      </div>
      <p class="proc__count" aria-hidden="true"><span>01</span><i></i><span>04</span></p>
    </header>
    <ol class="proc__steps" role="list">${steps}
    </ol>

    <figure class="proc__feature">
      <span class="proc__ghost" aria-hidden="true">${icon('bolt', { size: 240 })}</span>
      <blockquote class="proc__quote">
        <span class="proc__mark" aria-hidden="true">“</span>
        <p class="proc__q1">${esc(q1.replace(/^“/, ''))}</p>
        <p class="proc__q2">${qRest.map(esc).join(' ')}”</p>
        <span class="proc__flag" aria-hidden="true"></span>
      </blockquote>
      <div class="proc__cta">
        <a class="btn btn--red btn--lg" href="${telHref}">${icon('phone', { size: 18 })}<span>Call Now</span></a>
        <p class="proc__lic"><b>Licensed &amp; Insured</b><span aria-hidden="true">·</span><wbr><b>MA Lic# 8720-A1</b></p>
      </div>
    </figure>
  </div>
</section>`;
}
