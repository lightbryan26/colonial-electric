import { pageHero } from '../blocks/page-hero.mjs';
import { contactCta } from '../blocks/contact-cta.mjs';
import { trustStrip } from '../blocks/trust-strip.mjs';
import { townList } from '../blocks/town-list.mjs';
import { esc, picture } from '../lib/html.mjs';
// STUB /about-colonial-electric/ (brief §7). Founder, Mission/Vision, pillars filled by its piece.
const intro = [
  'Welcome to Colonial Electric, an electrical company that not only delivers unparalleled expertise but also prioritizes customer satisfaction above all else. Founded by Scott Hays, his journey embodies the essence of determination and community spirit.',
  'Scott’s aspirations reached beyond just mastering the craft of electrical work; he envisioned a company that would blend exceptional service with genuine connections, anchored in trust and integrity. With each electrical job he handled, his vision of Colonial Electric took shape. It wasn’t merely about fixing electrical problems but about enriching lives and empowering spaces with safety, reliability, and innovation.',
  'Here at Colonial Electric, we stand on the pillars of our founder’s vision. Our mission goes beyond providing electrical services; we aim to empower homes and businesses alike with the assurance of safety, the promise of reliability, and the touch of innovation',
];
export function render(ctx) {
  return [
    pageHero(ctx, { h1: 'About Us', crumbs: [{ label: 'Home', href: '' }, { label: 'About Us' }] }),
    `<section class="block"><div class="container block__split"><div><h2 class="h2">Colonial Electric: The Dependable Source For Premium Electrical Service</h2><div class="prose">${intro.map(p => `<p>${esc(p)}</p>`).join('')}</div></div><div>${picture(ctx, 'owner-van', { alt: 'Founder Scott Hays with the Colonial Electric van', sizes: '(min-width: 960px) 45vw, 100vw', cls: 'media-frame' })}</div></div></section>`,
    `<section class="block block--alt"><div class="container container--narrow"><h2 class="h2">Meet the Man Behind the Magic</h2><p class="lead">The success of any electrical company lies in the vision and dedication of its founder, and Colonial Electric is no exception. Meet the driving force behind this thriving business, the man who embodies innovation, integrity, and excellence.</p></div></section>`,
    contactCta(ctx), trustStrip(ctx), `<section class="block"><div class="container">${townList(ctx)}</div></section>`,
  ].join('\n');
}
