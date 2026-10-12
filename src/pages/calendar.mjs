import { site } from '../data/site.mjs';
import { pageHero } from '../blocks/page-hero.mjs';
// /calendar/ (brief §7): live GoHighLevel booking widget; call card only as fallback.
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'Calendar', ctas: false, crumbs: [{ label: 'Home', href: '' }, { label: 'Calendar' }] }),
    `<section class="block"><div class="container container--narrow"><h2 class="h2">Scheduling Calendar</h2>
      <div class="booking-embed"><iframe src="https://link.colonial-electric.com/widget/booking/vm1WWPnUuFiEePldaora" style="width:100%;border:none;overflow:hidden;" scrolling="no" title="Book an appointment with Colonial Electric" loading="lazy"></iframe></div>
      <script src="https://link.colonial-electric.com/js/form_embed.js" defer></script>
      <noscript><div class="callbox"><p>Prefer to talk it through?</p><a class="btn btn--red" href="${site.tel}">Call Now</a> <a class="btn btn--navy" href="${ctx.r('contact-us/')}">Contact Us</a></div></noscript>
    </div></section>`,
  ].join('\n');
}
