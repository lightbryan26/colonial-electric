// Sitewide constants (brief §1, §2, §9). Generate everything from here; never hand-type the phone or license.
export const site = {
  name: 'Colonial Electric',
  origin: 'https://colonial-electric.com',
  // Host for og:image / twitter:image / JSON-LD image+logo. Until DNS cut-over colonial-electric.com is still the WordPress
  // site (no /assets/img/), so share previews load from the deployed pitch host. Cut-over: set this back to `origin`.
  assetOrigin: 'https://lightbryan26.github.io/colonial-electric',
  phone: '(781) 287-8729',
  tel: 'tel:+17812878729',
  phoneSchema: '+1-781-287-8729',
  email: 'admin@colonial-electric.com',
  license: 'MA Lic# 8720-A1',
  licenseLine: 'Licensed & Insured Massachusetts Electrician – Serving Weymouth & the South Shore. (MA Lic# 8720-A1)',
  aboutBlurb: 'At Colonial Electric, we’re committed to providing top-notch electrical services throughout the South Shore. We prioritize delivering excellent service and strive to forge lasting relationships with our customers. Count on us to meet your electrical needs with the utmost quality and care.',
  instagram: 'https://instagram.com/colonialhomeservices',
  instagramHandle: '@colonialhomeservices',
  founder: 'Scott Hays',
  address: { po: 'P.O. Box 403', city: 'Weymouth', region: 'MA', zip: '02188', country: 'US' },
  hours: '8:00 AM – 4:00 PM',
  financing: { line: 'Pay over time with monthly financing', cta: 'Check Monthly Payment Options', href: 'we-offer-financing/' },
  homeDescription: 'Colonial Electric - Top-notch electrical services in South Shore Massachusetts. Count on us to meet your electrical needs with the utmost quality and care.',
  // Google Business Profile "Colonial Electric inc" (client: map embeds for local SEO in the footer + town pages).
  // link = canonical place URL (buttons + JSON-LD hasMap); embed = keyless Maps iframe (footer map).
  gbp: {
    name: 'Colonial Electric inc',
    cid: '16886290494525312563',
    lat: 42.2178209,
    lng: -70.9520107,
    link: 'https://maps.google.com/?cid=16886290494525312563',
    embed: 'https://maps.google.com/maps?q=Colonial%20Electric%20inc%2C%20Weymouth%2C%20MA&ll=42.2178209,-70.9520107&z=11&output=embed',
  },
  /** Keyless Google Maps iframe URL for a town, e.g. townMapEmbed('Weymouth'). */
  townMapEmbed: town => `https://maps.google.com/maps?q=${encodeURIComponent(`${town}, MA`)}&z=12&output=embed`,
  smsConsent:'I Consent to Receive SMS Notifications & Occasional Marketing Communication from Colonial Electric. Message frequency varies. Message & data rates may apply. Text HELP to +1 (781) 630-5360 for assistance. You can reply STOP to unsubscribe at any time.',
};

// Main nav (brief §2 header). Services dropdown is filled from services.mjs.
export const mainNav = [
  { label: 'Home', href: '' },
  { label: 'About Us', href: 'about-colonial-electric/' },
  { label: 'Services', href: 'services/', dropdown: true },
  { label: 'Service Area', href: 'service-area/' },
  { label: 'Contact Us', href: 'contact-us/' },
];
export const membershipLink = { label: 'Flash Pass Membership', href: 'premium-membership/' };

export const usefulLinks = [
  { label: 'Home', href: '' },
  { label: 'About Us', href: 'about-colonial-electric/' },
  { label: 'Services', href: 'services/' },
  { label: 'Contact Us', href: 'contact-us/' },
  { label: 'We Offer Financing', href: 'we-offer-financing/' },
  { label: 'Service Area', href: 'service-area/' },
  { label: 'Flash Pass Membership', href: 'premium-membership/' },
  { label: 'Leave Us A Review', href: 'leave-us-a-review/' },
];
export const legalLinks = [
  { label: 'Privacy Policy', href: 'privacy/' },
  { label: 'Terms & Conditions', href: 'terms/' },
];
