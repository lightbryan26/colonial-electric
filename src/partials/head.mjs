import { site } from '../data/site.mjs';
import { towns } from '../data/towns.mjs';
import { esc, images } from '../lib/html.mjs';

export const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,600;125,700&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,800&family=Barlow:wght@400;500;600;700&display=swap';

export function pageTitle(page) {
  return page.fullTitle ? page.title : `${page.title} | Colonial Electric`;
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': site.origin + '/#business',
    name: site.name,
    url: site.origin + '/',
    telephone: site.phoneSchema,
    email: site.email,
    image: site.origin + '/assets/img/owner-van-1280.jpg',
    logo: site.origin + '/assets/img/logo-lockup-621.png',
    address: { '@type': 'PostalAddress', postOfficeBoxNumber: site.address.po, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.zip, addressCountry: site.address.country },
    areaServed: towns.map(t => ({ '@type': 'City', name: `${t.name}, MA` })),
    founder: { '@type': 'Person', name: site.founder },
    sameAs: [site.instagram],
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:00' }],
  };
}

const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/**
 * ctx.preloadImage: image key to preload (hero); ctx.preloadSizes: its sizes attr.
 * ctx.jsonld: extra JSON-LD objects for this page.
 */
export function head(ctx) {
  const { page } = ctx;
  const title = pageTitle(page);
  const canonical = site.origin + '/' + page.slug;
  const desc = page.description || site.homeDescription;
  const ogImg = site.origin + '/assets/img/owner-van-1280.jpg';
  let preload = '';
  if (ctx.preloadImage) {
    const im = images[ctx.preloadImage];
    const base = ctx.asset('img/' + ctx.preloadImage);
    preload = `<link rel="preload" as="image" type="image/webp" imagesrcset="${im.widths.map(w => `${base}-${w}.webp ${w}w`).join(', ')}" imagesizes="${ctx.preloadSizes || '100vw'}" fetchpriority="high">`;
  }
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${ctx.baseTag || ''}<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#081020">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Colonial Electric">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="786">
<meta property="og:image:alt" content="Founder Scott Hays standing beside the Colonial Electric van">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="icon" type="image/png" sizes="32x32" href="${ctx.asset('img/favicon-32.png')}">
<link rel="icon" type="image/png" sizes="192x192" href="${ctx.asset('img/favicon-192.png')}">
<link rel="apple-touch-icon" sizes="180x180" href="${ctx.asset('img/favicon-180.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS_URL}">
${preload}
<link rel="stylesheet" href="${ctx.asset('site.css')}?v=${ctx.version}">
<script>document.documentElement.classList.add('js')</script>
${ld(businessJsonLd())}
${(ctx.jsonld || []).map(ld).join('\n')}`;
}
