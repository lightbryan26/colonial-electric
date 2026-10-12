// The 45 pages (brief §2 table). slug '' = home. template -> src/pages/<template>.mjs
import { services } from './services.mjs';
import { towns } from './towns.mjs';
import descriptions from './descriptions.json' with { type: 'json' };

const P = (slug, title, h1, template, extra = {}) => ({ slug, title, h1, template, description: descriptions[slug], ...extra });

export const pages = [
  P('', 'Top-notch electrical services in South Shore Massachusetts.', 'Your Trusted Local Electrician in Weymouth, MA', 'home', { fullTitle: true }),
  P('about-colonial-electric/', 'About Us', 'About Us', 'about'),
  P('services/', 'Services', 'Services', 'services-index'),
  ...services.map(s => P(s.slug + '/', s.title, s.h1, s.variant ? 'outdoor-lighting' : 'service', { service: s })),
  P('service-area/', 'Service Area', 'Colonial Electric — Your One-stop Solution For All Things Electrical!', 'service-area'),
  ...towns.map(t => P(`service-area/${t.slug}/`, `${t.name} MA, Electrical Services`, `${t.name} MA, Electrical Services`, 'town', { town: t })),
  P('contact-us/', 'Contact Us', 'Contact Us', 'contact'),
  P('premium-membership/', 'Flash Pass Membership', 'Flash Pass Membership', 'membership'),
  P('we-offer-financing/', 'We Offer Financing', 'We Offer Financing', 'financing'),
  P('leave-us-a-review/', 'Leave Us a Review', 'Leave Us a Review', 'review'),
  P('calendar/', 'Calendar', 'Calendar', 'calendar'),
  P('terms/', 'Terms & Conditions', 'Terms & Conditions', 'legal', { source: 'terms' }),
  P('privacy/', 'Privacy Policy', 'Privacy Policy', 'legal', { source: 'privacy' }),
];
