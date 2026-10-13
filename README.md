# Colonial Electric: site rebuild (pitch build)

Static multi-page rebuild of colonial-electric.com. Built site lives in `docs/` (served by GitHub Pages). Brief: `colonial-electric-rebuild-prompt.md`.

## Cut-over notes

Steps for when colonial-electric.com moves from the live WordPress site to this build:

- Switch the og:image / twitter:image / JSON-LD image and logo origin back to colonial-electric.com: set `site.assetOrigin` in `src/data/site.mjs` to `site.origin` (it points at the GitHub Pages pitch host until then). This is the production switch: it also adds the Google Tag Manager `<noscript>` fallback after `<body>`, and turns on the build guard that fails if any page still points at github.io or vercel.app or lacks the GTM container.
- Delete `src/data/lastmod.json` before the production build, so every sitemap `<lastmod>` starts at the cut-over date. After that it only moves when a page's `<main>` changes.
- Swap the preview contact form for the live GoHighLevel widget `wVkjdlLGFrTr6qBocTaL` (brief §11, item 7).
- Host production on Vercel, not GitHub Pages: `vercel.json` carries the 301s for the old WordPress URLs (`/home/`, `/feed/`, `/*/feed/`, `/index.php`, `/page-sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`, the old header logo and favicons) and the security and cache headers. GitHub Pages can send neither. `/wp-admin/`, `/wp-login.php`, `/wp-json/`, `/author/*` and `/category/*` are left to 404 on purpose.
- Add `colonial-electric.com` in Vercel Domains with `www.colonial-electric.com` as a redirect to it. Then add a 301 from the `*.vercel.app` alias to `https://colonial-electric.com/:path*` in `vercel.json` (`has: host`), and disable GitHub Pages (or give it a CNAME) so the pitch copy stops being served. Until then every `*.vercel.app` response carries `X-Robots-Tag: noindex`.
- Google: in the GTM container `GTM-562VCKQ5`, confirm a GA4 / Google tag fires (if GA4 only came from WordPress Site Kit, `GT-T5MFXM5H`, add it as a Google Tag inside GTM rather than hard-coding gtag.js). Add tel: click and form-submit events. In Search Console, check Settings > Ownership verification and add a DNS-verified Domain property before the switch; then resubmit `/sitemap.xml`.
- Bing: verify the site in Bing Webmaster Tools (import from Search Console) and submit `/sitemap.xml` (Bing's index feeds ChatGPT search and Copilot).

## Search and AI crawler files

Written by `src/build.mjs` from the data files (`src/lib/seo-files.mjs`), never by hand:

- `robots.txt`: allow-all, with every search and AI crawler named in its own group (search engines, AI answer assistants, AI training). To opt out of AI training, change that group to `Disallow: /`. A crawler that has its own group ignores `*`, so any future `Disallow` must be repeated in every group.
- `sitemap.xml`: the 45 canonical URLs, each with its real `<lastmod>` and its main photos as `<image:image>` entries.
- `llms.txt` and `llms-full.txt` (llmstxt.org format): the business summary, services, towns, contact details and policies, plus the full service text and FAQs, all verbatim from the site. The build fails if either ever contains an em dash, a `$` price or "24/7".
- Google Tag Manager loads only on colonial-electric.com and www (an inline hostname check in `<head>`), so the pitch hosts never send data to the client's analytics.

## Titles and meta descriptions

`src/data/seo.mjs` sets every page's `<title>` and meta description, keyed by slug. `src/partials/head.mjs` copies both into og:title, og:description, twitter:title and twitter:description, and the JSON-LD `WebPage` uses them as its name and description. This is a declared exception to brief §2 and §9 that the client asked for. Visible copy is unchanged: H1s, H2s and body text stay verbatim, and `page.title` in `src/data/pages.mjs` (the live title) still feeds breadcrumbs.

- Each title leads with the primary keyword plus the place and ends with ` | Colonial Electric`. Aim for 60 characters or fewer (65 at most).
- Each description is 130 to 158 characters and ends with the phone number. It may only use facts already on that page.
- Keyword map:
  - Home: "electrician Weymouth MA" and South Shore.
  - Weymouth town page: "electrical services in Weymouth".
  - `/services/`: "electrical services South Shore MA".
  - Each service page: "<service> Weymouth MA".
  - Each town page: "electrician <Town> MA".
- The build fails if a page has no entry, an entry has no page, a title or description repeats, or any of them contains an em or en dash, a `$` or "24/7". A length outside the target only prints a warning.

## Structured data (JSON-LD)

One `<script type="application/ld+json">` per page, at the end of `<body>`, holding a connected schema.org `@graph` (`src/lib/schema.mjs`; page modules add their own nodes to `ctx.jsonld`):

- Every page: the single business entity, `Electrician` `https://colonial-electric.com/#business` (name, GBP name as `alternateName`, phone, email, P.O. Box address, geo, GBP map link, hours, the 21 towns as `City` nodes, the license as a credential, the 13 services as an `OfferCatalog`, `sameAs`), plus `WebSite` `#website`, the logo and main photo `ImageObject`s, and the founder `Person` `#founder` (full profile on the About page).
- Each page: a `WebPage` `<url>#webpage` (`AboutPage`, `ContactPage` or `CollectionPage` where it fits, plus `FAQPage` wherever FAQs render, with the visible questions and answers). Its name and description are the page's `<title>` and meta description, `dateModified` is the sitemap `<lastmod>`, and it links its `BreadcrumbList` `#breadcrumb`. Service pages add a `Service` `#service`. Town pages add a `Service` "Electrical services in {Town}, MA" offered in that town's `City`, never a second business.
- The build fails a page if its graph has an unresolved or duplicate `@id`, more than one business node, a telephone other than the main line, `priceRange`, `aggregateRating`, `review`, `SearchAction` or an em dash.
- Confirm with the client, then add: the GBP hours and days (the schema says Monday to Friday, 08:00 to 16:00), the license holder and issuing board (`recognizedBy`), the legal name (`legalName`), the canonical Yelp and Facebook page URLs (`sameAs`), and one public address (the privacy policy shows 12 Bell Rd, every other page shows P.O. Box 403).

## Internal links and answer-engine blocks

- Service cards (homepage, `/services/`, the shared grid on town pages, `/service-area/` and `/generator/`) link only the card title, so each link's anchor text is the service name. A stretched `::after` on the title link keeps the whole card clickable. The shared grid also links Permanent Outdoor Lighting as an "Also Available" bar, so every town page links all 13 services.
- Service pages: a "Related Services" link row inside block B (pairings in `RELATED`, `src/pages/service.mjs`, labelled with the menu names). The service-area band links each town as "Electrician in {Town}, MA".
- Town-list index numerals (01 to 21) are a CSS counter, so the link text is the town name alone.
- "At a glance" (`src/blocks/glance.mjs`) sits under the hero of every service and town page. It is a definition list of the service, Colonial Electric, the license, the service area, the phone and the hours, all taken from the data files. The hours come from `site.openHours`, which also feeds the JSON-LD and `llms.txt`. Confirm the days against the GBP before the cut-over.
- FAQ answers: when a term is shown as a label above its text, the label is not a heading, and the FAQPage answer text puts a line break where the page does (`faqJsonLd(items, { listTerm | blockTerm })`). The visible text and the schema text then match exactly on all 55 questions.

## Performance

- Each template links only its own minified stylesheet, `assets/site-<template>.css` (11 to 26 KB gzip instead of the 82 KB `site.css`). `src/lib/css-split.mjs` keeps every `src/css` file that could style any page of that template, in the original cascade order, so nothing renders differently. `assets/site.css` (everything, minified) is still written: the GitHub workflows poll it to detect a deploy.
- `.github/workflows/lighthouse.yml` runs Lighthouse 12 (mobile) on five pages after each Pages deploy and posts the scores to the job summary. It is report only.
