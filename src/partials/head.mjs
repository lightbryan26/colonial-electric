import { site } from '../data/site.mjs';
import { graphFor } from '../lib/schema.mjs';
import { esc, images } from '../lib/html.mjs';

// Self-hosted Google Fonts (@font-face in src/css/base.css). Preload the faces of the hero H1s and eyebrows so they are
// usually in before first paint; the rest swap in over metric-matched fallbacks (brief §9).
export const PRELOAD_FONTS = ['barlow-condensed-900-latin.woff2', 'barlow-condensed-800-latin.woff2', 'archivo-wdth125-600-700-latin.woff2'];

/** The <title> (also og:title, twitter:title, WebPage.name): src/data/seo.mjs, else the live title + brand. */
export function pageTitle(page) {
  return page.seoTitle || (page.fullTitle ? page.title : `${page.title} | Colonial Electric`);
}
/** The meta description; the JSON-LD WebPage.description reuses it, so the two can never drift. */
export const pageDescription = page => page.description || site.homeDescription;

const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/**
 * Structured data: ONE connected schema.org @graph per page (src/lib/schema.mjs: business, website, page, breadcrumb,
 * service, FAQ and founder nodes linked by stable @ids). Pages add their own nodes to ctx.jsonld while rendering.
 * layout.mjs prints it at the end of <body>: Google reads JSON-LD anywhere in the document, and there its ~15 KB never
 * sits between the stylesheet and the hero in the first network round trips.
 */
export function jsonLd(ctx) {
  return ld(graphFor(ctx, { title: pageTitle(ctx.page), description: pageDescription(ctx.page) }));
}

/**
 * Google Tag Manager (the live site's container, so analytics and conversion tracking continue through the cut-over).
 * The standard async GTM snippet, run only when the page is served from the client's own domain: the pitch hosts
 * (github.io, vercel.app) and local previews never load GTM, so they never send data into the client's reports.
 * It sits after the stylesheet, so it never competes with the render-critical CSS. The <noscript> half is in layout.mjs.
 */
export function gtmHead() {
  if (!site.gtm) return '';
  return `<script>if(${JSON.stringify(site.gtmHosts)}.indexOf(location.hostname)>-1){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(site.gtm)});}</script>\n`;
}

/**
 * ctx.preloadImage: image key to preload (hero); ctx.preloadSizes: its sizes attr.
 * ctx.jsonld: this page's own schema.org nodes (merged into the page @graph by jsonLd(), printed by layout.mjs).
 */
export function head(ctx) {
  const { page } = ctx;
  const title = pageTitle(page);
  const canonical = site.origin + '/' + page.slug;
  const desc = pageDescription(page);
  const ogImg = site.assetOrigin + '/assets/img/owner-van-1280.jpg';
  let preload = '';
  if (ctx.preloadImage) {
    const im = images[ctx.preloadImage];
    const base = ctx.asset('img/' + ctx.preloadImage);
    preload = `<link rel="preload" as="image" type="image/webp" imagesrcset="${im.widths.map(w => `${base}-${w}.webp ${w}w`).join(', ')}" imagesizes="${ctx.preloadSizes || '100vw'}" fetchpriority="high">`;
  }
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${ctx.baseTag || ''}<title>${esc(title)}</title>
<meta name="robots" content="max-image-preview:large">
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
${PRELOAD_FONTS.map(f => `<link rel="preload" as="font" type="font/woff2" href="${ctx.asset('fonts/' + f)}" crossorigin>`).join('\n')}
${preload}
<link rel="stylesheet" href="${ctx.asset(ctx.css || 'site.css')}?v=${ctx.version}">
<script>document.documentElement.classList.add('js')</script>
${gtmHead()}`;
}
