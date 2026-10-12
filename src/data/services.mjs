// 13 service pages in Services-dropdown order (brief §2), plus the 12 homepage cards (brief §4.4, verbatim).
export const services = [
  { slug: 'permanent-outdoor-lighting', nav: 'Permanent Outdoor Lighting', title: 'Permanent Outdoor Lighting', h1: 'Permanent Outdoor Lighting', heroLine: 'Advanced LED Lighting Control for Outdoor Spaces', variant: true },
  { slug: 'electrical-outlets', nav: 'Electrical Outlets', title: 'Electrical Outlets', h1: 'Electrical Outlets', heroLine: 'Residential & Commercial Electrical Outlet Installation & Repair in Weymouth' },
  { slug: 'electrical-panel-upgrade', nav: 'Electrical Panel Upgrade', title: 'Electrical Panel Upgrade', h1: 'Electrical Panel Upgrade', heroLine: 'Residential & Commercial Electrical Panel Upgrade in Weymouth' },
  { slug: 'surge-protection', nav: 'Surge Protection', title: 'Surge Protection', h1: 'Surge Protection', heroLine: 'Residential & Commercial Surge Protection in Weymouth' },
  { slug: 'ceiling-fan-installation', nav: 'Ceiling Fan Installation', title: 'Ceiling Fan Installation', h1: 'Ceiling Fan Installation', heroLine: 'Residential & Commercial Ceiling Fan Installation in Weymouth' },
  { slug: 'ev-charger-installation', nav: 'EV Charger Installation', title: 'EV Charger Installation', h1: 'EV Charger Installation', heroLine: 'Residential & Commercial EV Charger Installation in Weymouth' },
  { slug: 'whole-house-wiring-or-rewiring', nav: 'Whole House Wiring or Rewiring', title: 'Whole House Wiring or Rewiring', h1: 'Whole House Wiring/Rewiring', heroLine: 'Whole House Wiring/Rewiring in Weymouth' },
  { slug: 'electrical-inspections', nav: 'Electrical Inspections', title: 'Electrical Inspections', h1: 'Electrical Inspection', heroLine: 'Residential & Commercial Electrical Inspection in Weymouth' },
  { slug: 'recessed-lighting', nav: 'Recessed Lighting', title: 'Recessed Lighting', h1: 'Recessed Lighting', heroLine: 'Residential & Commercial Recessed Lighting in Weymouth' },
  { slug: 'remodels', nav: 'Remodels', title: 'Remodels', h1: 'Remodels', heroLine: 'Residential & Commercial Remodels in Weymouth' },
  { slug: 'lighting-additions', nav: 'Lighting Additions', title: 'Lighting Additions', h1: 'Lighting Additions', heroLine: 'Residential & Commercial Lighting Additions in Weymouth' },
  { slug: 'whole-home-battery-back-up', nav: 'Whole Home Battery Back Up', title: 'Whole Home Battery Back Up', h1: 'Whole Home Battery Back Up', heroLine: 'Residential & Commercial Whole Home Battery Back Up in Weymouth' },
  { slug: 'generator', nav: 'Generators', title: 'Generator', h1: 'Generators', heroLine: 'Residential & Commercial Generator Services in Weymouth' },
];

export const servicesIntro = {
  h2: 'Your One-stop Solution For All Things Electrical',
  body: 'If you’re looking for a premium electrical service that offers everything you need, then you’re in the right place. From quality installations to expert repairs, we pride ourselves on delivering top-notch electrical services tailored to meet your specific requirements.',
};

// icon = key in src/partials/icons.mjs
export const serviceCards = [
  { title: 'Electrical Outlets', href: 'electrical-outlets/', icon: 'outlet', blurb: 'No more messy cords or limited access to power sources! Our electrical outlet services ensure that you have convenient access to electricity wherever you need it. Whether it’s for your home or business!' },
  { title: 'Electrical Panel Upgrades', href: 'electrical-panel-upgrade/', icon: 'panel', blurb: 'Our team specializes in upgrading outdated panels to meet current safety standards and accommodate increased electrical loads. Enjoy safe, and energy-efficient power!' },
  { title: 'Generators', href: 'generator/', icon: 'generator', blurb: 'Never be left in the dark again! Our generator services provide reliable backup power for your home or business, ensuring uninterrupted electricity during outages. Stay powered up and worry-free.' },
  { title: 'Whole-home Battery Backup', href: 'whole-home-battery-back-up/', icon: 'battery', blurb: 'Embrace reliability with our whole-home battery backup services. Keep your place running smoothly, even during power outages, while reducing your carbon footprint.' },
  { title: 'Surge Protection', href: 'surge-protection/', icon: 'surge', blurb: 'Shield your valuable electronics from harmful power surges with our surge protection services. Safeguard your appliances and devices against voltage spikes, ensuring their longevity and reliability.' },
  { title: 'Ceiling Fan Installation', href: 'ceiling-fan-installation/', icon: 'fan', blurb: 'Enhance comfort and energy efficiency in any room with our professional ceiling fan installation services. Enjoy improved air circulation, reduced energy costs, and added aesthetic appeal.' },
  { title: 'Lighting', href: 'lighting-additions/', icon: 'bulb', blurb: 'Brighten up your surroundings with our lighting services. From elegant chandeliers to practical under-cabinet lighting, we offer custom solutions tailored to your needs!' },
  { title: 'EV Charger Installation', href: 'ev-charger-installation/', icon: 'ev', blurb: 'Join the revolution with our E.V. charger installation services. Experience the convenience of charging your electric vehicle at home, ensuring you’re always ready to hit the road.' },
  { title: 'Whole-house Wiring', href: 'whole-house-wiring-or-rewiring/', icon: 'wiring', blurb: 'Upgrade your property’s electrical system with our whole-house wiring or rewiring services. From outdated systems to new construction projects, our team can handle it.' },
  { title: 'Remodels', href: 'remodels/', icon: 'remodel', blurb: 'Transform your home or business with professional electrical remodeling. Whether you’re updating a single room or renovating your entire property, you can trust our expert electricians.' },
  { title: 'Electrical Inspection', href: 'electrical-inspections/', icon: 'inspect', blurb: 'Ensure the safety and reliability of your electrical system with our comprehensive electrical inspection services. Our team will meticulously assess wiring, outlets, panels, and more!' },
  { title: 'Recessed Lighting', href: 'recessed-lighting/', icon: 'recessed', blurb: 'Illuminate your space with style and sophistication using recessed lighting services. Achieve a sleek and modern look while maximizing light distribution and energy efficiency.' },
];

// Shared service-template intro (brief §5.2, verbatim)
export const serviceIntro = 'Whether you need it for your home, or business, Colonial Electric is your trusted partner for all your electrical service needs in Weymouth and the surrounding areas. Our team of experienced electricians is dedicated to providing top-notch residential and commercial electrical services tailored to meet your specific requirements. From simple repairs and installations to complex electrical projects, we handle it all with precision and expertise. Our commitment to quality and customer satisfaction sets us apart in the industry. When you choose Colonial Electric, you can rest assured that your electrical needs are in capable hands.';
