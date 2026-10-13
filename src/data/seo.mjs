// Search metadata for every page, keyed by slug ('' = home): the <title> and the meta description. src/partials/head.mjs
// mirrors both into og:title / og:description and twitter:title / twitter:description, and src/lib/schema.mjs reuses
// them as the WebPage name and description, so this file is the only place they are set.
//
// Declared, client-requested exception to brief §2 ("<title> exact") and §9 ("first verbatim sentence"): the client
// asked for the best search setup, so head metadata is written for search. Visible copy (H1, H2, body) is untouched and
// page.title in src/data/pages.mjs still feeds breadcrumbs and labels.
// Rules (checked by validateSeo() on every build): one entry per page; every title and description unique; no em dash;
// no "$" price; no "24/7". Aim for titles of 60 characters or fewer (65 at most), primary keyword first, place where
// natural; descriptions of 130 to 158 characters ending in a call to action. Every fact must already be on that page:
// service names, the license number, the phone, the address and hours, the review sites. Nothing new.
// Keyword map: home owns "electrician Weymouth MA" + South Shore; the Weymouth town page owns "electrical services in
// Weymouth"; /services/ owns "electrical services South Shore MA"; each service page owns "<service> Weymouth MA";
// each town page owns "electrician <Town> MA".
export const seo = {
  '': {
    title: 'South Shore Electrician in Weymouth, MA | Colonial Electric',
    description: 'Licensed, insured Weymouth electrician serving the South Shore: panels, generators, EV chargers, lighting and rewiring. Call Colonial Electric (781) 287-8729.',
  },
  'about-colonial-electric/': {
    title: 'About Colonial Electric & Founder Scott Hays, Weymouth MA',
    description: 'Meet Scott Hays, the master electrician behind Colonial Electric in Weymouth, MA, with over a decade of experience. MA Lic# 8720-A1. Call (781) 287-8729.',
  },
  'services/': {
    title: 'Electrical Services in South Shore MA | Colonial Electric',
    description: 'Electrical repairs, installations and upgrades for South Shore homes and businesses: outlets, panels, EV chargers, fans and rewiring. Call (781) 287-8729.',
  },

  // Service pages
  'permanent-outdoor-lighting/': {
    title: 'Permanent Outdoor Lighting, Weymouth MA | Colonial Electric',
    description: 'Permanent, holiday, landscape and event lighting with app control, timers and animations. Ask Colonial Electric for a free consultation: (781) 287-8729.',
  },
  'electrical-outlets/': {
    title: 'Outlet Installation & Repair, Weymouth MA | Colonial Electric',
    description: 'Sparking, loose or intermittent outlets? Colonial Electric installs, repairs and replaces outlets for South Shore homes and businesses. Call (781) 287-8729.',
  },
  'electrical-panel-upgrade/': {
    title: 'Electrical Panel Upgrade in Weymouth, MA | Colonial Electric',
    description: 'Panel outdated or struggling with demand? Colonial Electric upgrades electrical panels on the South Shore, from consultation to final testing. (781) 287-8729.',
  },
  'surge-protection/': {
    title: 'Whole-House Surge Protection, Weymouth MA | Colonial Electric',
    description: 'Guard electronics and appliances against voltage spikes. Colonial Electric installs whole-house and point-of-use surge protection. Call (781) 287-8729.',
  },
  'ceiling-fan-installation/': {
    title: 'Ceiling Fan Installation in Weymouth, MA | Colonial Electric',
    description: 'Skip risky DIY. Colonial Electric installs ceiling fans on the South Shore after assessing ceiling height, room dimensions and wiring. Call (781) 287-8729.',
  },
  'ev-charger-installation/': {
    title: 'EV Charger Installation in Weymouth, MA | Colonial Electric',
    description: 'Charge your EV at home or at your business. Colonial Electric installs residential and commercial EV chargers across the South Shore. Call (781) 287-8729.',
  },
  'whole-house-wiring-or-rewiring/': {
    title: 'House Wiring & Rewiring in Weymouth, MA | Colonial Electric',
    description: 'Two-prong outlets, tripping breakers or a burning smell? Colonial Electric replaces outdated wiring in Weymouth and South Shore homes. Call (781) 287-8729.',
  },
  'electrical-inspections/': {
    title: 'Home Electrical Inspection, Weymouth MA | Colonial Electric',
    description: 'Colonial Electric inspects your wiring, panel and components against the NEC, then hands you a detailed, prioritized checklist. Call (781) 287-8729.',
  },
  'recessed-lighting/': {
    title: 'Recessed Light Installation, Weymouth MA | Colonial Electric',
    description: 'Flush can lights and LED downlights, from fixture choice to placement and wiring. Colonial Electric serves Weymouth and the South Shore. (781) 287-8729.',
  },
  'remodels/': {
    title: 'Electrical Remodeling in Weymouth, MA | Colonial Electric',
    description: 'Renovating a room or a whole property? Colonial Electric plans and handles rewiring, new outlets, fixtures and panel upgrades. Call (781) 287-8729.',
  },
  'lighting-additions/': {
    title: 'Lighting Installation in Weymouth, MA | Colonial Electric',
    description: 'Add ambient, task, accent or decorative lighting, from chandeliers to under-cabinet lights, with Colonial Electric on the South Shore. Call (781) 287-8729.',
  },
  'whole-home-battery-back-up/': {
    title: 'Whole Home Battery Backup, Weymouth MA | Colonial Electric',
    description: 'Backup power without generator noise or carbon monoxide risk. Colonial Electric installs, maintains and fixes whole home battery systems. (781) 287-8729.',
  },
  'generator/': {
    title: 'Generator Installation in Weymouth, MA | Colonial Electric',
    description: 'Whole home and portable generator installation, repair and maintenance by Colonial Electric for Weymouth and the South Shore. Call (781) 287-8729.',
  },

  // Service area and town pages. Town descriptions rotate four patterns down the list; each names services the page
  // links to and facts the page shows (licensed and insured, locally owned, family-run, the license number).
  'service-area/': {
    title: 'South Shore MA Electrician Service Area | Colonial Electric',
    description: 'Colonial Electric serves Weymouth, Quincy, Braintree, Hingham, Plymouth, Marshfield and more South Shore towns. Find your town or call (781) 287-8729.',
  },
  'service-area/hanover-ma/': {
    title: 'Licensed Electrician in Hanover, MA | Colonial Electric',
    description: 'Need a licensed electrician in Hanover, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },
  'service-area/milton-ma/': {
    title: 'Licensed Electrician in Milton, MA | Colonial Electric',
    description: 'Colonial Electric is your electrician in Milton, MA: outlets, surge protection, rewiring and inspections by a licensed, insured team. Call (781) 287-8729.',
  },
  'service-area/norwell-ma/': {
    title: 'Licensed Electrician in Norwell, MA | Colonial Electric',
    description: 'Licensed, insured electrician serving Norwell, MA. Ceiling fans, recessed lighting, remodels and battery backup from Colonial Electric. (781) 287-8729.',
  },
  'service-area/randolph-ma/': {
    title: 'Licensed Electrician in Randolph, MA | Colonial Electric',
    description: 'Electrical repairs, installs and upgrades in Randolph, MA from Colonial Electric, a locally owned, family-run business. MA Lic# 8720-A1. (781) 287-8729.',
  },
  'service-area/scituate-ma/': {
    title: 'Licensed Electrician in Scituate, MA | Colonial Electric',
    description: 'Need a licensed electrician in Scituate, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },
  'service-area/whitman-ma/': {
    title: 'Licensed Electrician in Whitman, MA | Colonial Electric',
    description: 'Colonial Electric is your electrician in Whitman, MA: outlets, surge protection, rewiring and inspections by a licensed, insured team. Call (781) 287-8729.',
  },
  'service-area/pembroke-ma/': {
    title: 'Licensed Electrician in Pembroke, MA | Colonial Electric',
    description: 'Licensed, insured electrician serving Pembroke, MA. Ceiling fans, recessed lighting, remodels and battery backup from Colonial Electric. (781) 287-8729.',
  },
  // Home owns "electrician Weymouth MA"; this page takes its own H1's phrase so the two do not compete.
  'service-area/weymouth-ma/': {
    title: 'Electrical Services in Weymouth, MA | Colonial Electric',
    description: 'Electrical services in Weymouth, MA from your local Colonial Electric team: outlets, panels, generators, EV chargers and lighting. Call (781) 287-8729.',
  },
  'service-area/abington-ma/': {
    title: 'Licensed Electrician in Abington, MA | Colonial Electric',
    description: 'Need a licensed electrician in Abington, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },
  'service-area/braintree-ma/': {
    title: 'Licensed Electrician in Braintree, MA | Colonial Electric',
    description: 'Colonial Electric is your electrician in Braintree, MA: outlets, surge protection, rewiring and inspections by a licensed, insured team. Call (781) 287-8729.',
  },
  'service-area/hingham-ma/': {
    title: 'Licensed Electrician in Hingham, MA | Colonial Electric',
    description: 'Licensed, insured electrician serving Hingham, MA. Ceiling fans, recessed lighting, remodels and battery backup from Colonial Electric. (781) 287-8729.',
  },
  'service-area/quincy-ma/': {
    title: 'Licensed Electrician in Quincy, MA | Colonial Electric',
    description: 'Electrical repairs, installs and upgrades in Quincy, MA from Colonial Electric, a locally owned, family-run business. MA Lic# 8720-A1. (781) 287-8729.',
  },
  'service-area/rockland-ma/': {
    title: 'Licensed Electrician in Rockland, MA | Colonial Electric',
    description: 'Need a licensed electrician in Rockland, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },
  'service-area/hull-ma/': {
    title: 'Licensed Electrician in Hull, MA | Colonial Electric',
    description: 'Colonial Electric is your electrician in Hull, MA: outlets, surge protection, rewiring and inspections by a licensed, insured team. Call (781) 287-8729.',
  },
  'service-area/plymouth-ma/': {
    title: 'Licensed Electrician in Plymouth, MA | Colonial Electric',
    description: 'Licensed, insured electrician serving Plymouth, MA. Ceiling fans, recessed lighting, remodels and battery backup from Colonial Electric. (781) 287-8729.',
  },
  'service-area/holbrook-ma/': {
    title: 'Licensed Electrician in Holbrook, MA | Colonial Electric',
    description: 'Electrical repairs, installs and upgrades in Holbrook, MA from Colonial Electric, a locally owned, family-run business. MA Lic# 8720-A1. (781) 287-8729.',
  },
  'service-area/marshfield-ma/': {
    title: 'Licensed Electrician in Marshfield, MA | Colonial Electric',
    description: 'Need a licensed electrician in Marshfield, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },
  'service-area/hanson-ma/': {
    title: 'Licensed Electrician in Hanson, MA | Colonial Electric',
    description: 'Colonial Electric is your electrician in Hanson, MA: outlets, surge protection, rewiring and inspections by a licensed, insured team. Call (781) 287-8729.',
  },
  'service-area/canton-ma/': {
    title: 'Licensed Electrician in Canton, MA | Colonial Electric',
    description: 'Licensed, insured electrician serving Canton, MA. Ceiling fans, recessed lighting, remodels and battery backup from Colonial Electric. (781) 287-8729.',
  },
  'service-area/carver-ma/': {
    title: 'Licensed Electrician in Carver, MA | Colonial Electric',
    description: 'Electrical repairs, installs and upgrades in Carver, MA from Colonial Electric, a locally owned, family-run business. MA Lic# 8720-A1. (781) 287-8729.',
  },
  'service-area/cohasset-ma/': {
    title: 'Licensed Electrician in Cohasset, MA | Colonial Electric',
    description: 'Need a licensed electrician in Cohasset, MA? Colonial Electric handles panel upgrades, EV chargers, generators and lighting. Call (781) 287-8729.',
  },

  // Company and utility pages
  'contact-us/': {
    title: 'Contact a Weymouth, MA Electrician | Colonial Electric',
    description: 'Call (781) 287-8729, email admin@colonial-electric.com or send a message. Colonial Electric, P.O. Box 403, Weymouth MA 02188. Hours 8:00 AM to 4:00 PM.',
  },
  'premium-membership/': {
    title: 'Flash Pass Electrical Membership | Colonial Electric',
    description: 'Flash Pass members get front-of-the-line service, after-hours emergency assistance, waived diagnostic fees and annual safety inspections. (781) 287-8729.',
  },
  'we-offer-financing/': {
    title: 'Electrical Work Financing with Wisetack | Colonial Electric',
    description: 'Pay over time for your next electrical project. Prequalify with Wisetack in about a minute with no impact on your credit score. Call (781) 287-8729.',
  },
  'leave-us-a-review/': {
    title: 'Leave a Review for Colonial Electric, Weymouth MA',
    description: 'Worked with Colonial Electric? Share your experience on Google, Facebook, Nextdoor or Yelp and help South Shore neighbors find a trusted local electrician.',
  },
  'calendar/': {
    title: 'Book an Electrician Appointment Online | Colonial Electric',
    description: 'Pick a time that suits you on the Colonial Electric scheduling calendar, or call (781) 287-8729. Licensed electrician serving Weymouth and the South Shore.',
  },
  'terms/': {
    title: 'Terms & Conditions | Colonial Electric',
    description: 'Terms and conditions for the Colonial Electric website and SMS program, covering opt-in consent, opt-out steps, message and data rates, and contact details.',
  },
  'privacy/': {
    title: 'Privacy Policy | Colonial Electric',
    description: 'How Colonial Electric collects, uses, shares and protects your personal information, including cookies, data retention and your privacy rights.',
  },
};

export const TITLE_MAX = 65, DESC_MIN = 130, DESC_MAX = 158;

/**
 * Build guard: throws if a page has no entry, an entry has no page, a title or description repeats, or any string
 * breaks the copy rules. Lengths outside the targets only warn (Google truncates by pixel width, not characters).
 */
export function validateSeo(slugs) {
  const errors = [], warnings = [];
  const keys = Object.keys(seo);
  for (const s of slugs) if (!seo[s]) errors.push(`no seo entry for /${s}`);
  for (const k of keys) if (!slugs.includes(k)) errors.push(`seo entry for unknown page /${k}`);
  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const k of keys) {
      const v = seo[k][field];
      if (!v || typeof v !== 'string') { errors.push(`/${k}: missing ${field}`); continue; }
      if (seen.has(v)) errors.push(`/${k}: ${field} duplicates /${seen.get(v)}`);
      seen.set(v, k);
      if (/[\u2014\u2013]/.test(v)) errors.push(`/${k}: ${field} contains an em or en dash`);
      if (/\s-\s/.test(v)) errors.push(`/${k}: ${field} uses a spaced hyphen as a dash`);
      if (/\$|24\/7/.test(v)) errors.push(`/${k}: ${field} contains a price or "24/7"`);
      if (v !== v.trim() || /\s{2}/.test(v)) errors.push(`/${k}: ${field} has stray whitespace`);
    }
  }
  for (const k of keys) {
    const { title = '', description = '' } = seo[k];
    if (title.length > TITLE_MAX) warnings.push(`/${k}: title ${title.length} chars (max ${TITLE_MAX})`);
    if (description.length < DESC_MIN || description.length > DESC_MAX) warnings.push(`/${k}: description ${description.length} chars (target ${DESC_MIN}-${DESC_MAX})`);
  }
  if (errors.length) throw new Error('src/data/seo.mjs:\n  ' + errors.join('\n  '));
  for (const w of warnings) console.warn('seo.mjs: ' + w);
}
