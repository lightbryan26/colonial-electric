import { pageHero } from '../blocks/page-hero.mjs';
import { townList } from '../blocks/town-list.mjs';
import { icon } from '../partials/icons.mjs';
// /we-offer-financing/ (brief §7) — PRICE-STRIPPED. Never refill from source.
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'We Offer Financing', ctas: false, crumbs: [{ label: 'Home', href: '' }, { label: 'We Offer Financing' }] }),
    `<section class="block"><div class="container container--narrow">
      <p class="lead">We’ve partnered with Wisetack to offer our customers flexible financing options, so you can pay over time rather than all at once. The application takes about a minute to complete, and checking your options does not impact your credit score.</p>
      <ul class="check-list" role="list"><li>${icon('check', { size: 20 })}No hidden fees or compounding interest</li><li>${icon('check', { size: 20 })}Terms from 3 to 120 months*</li></ul>
      <p>Prequalify today with no impact to your credit and contact us to learn about financing your next project!</p>
      <p class="btn-row"><a class="btn btn--red" href="https://wisetack.us/#/t8ixrfe/prequalify" target="_blank" rel="noopener">Prequalify Now${icon('arrow-up-right', { size: 18 })}</a></p>
      <p class="fineprint">*All financing is subject to credit approval. Your terms may vary. Payment options through Wisetack are provided by our lending partners. State interest rate caps may apply. No other financing charges or participation fees. See additional terms at https://wisetack.com/faqs.</p>
    </div></section>`,
    `<section class="block block--alt"><div class="container">${townList(ctx)}</div></section>`,
  ].join('\n');
}
