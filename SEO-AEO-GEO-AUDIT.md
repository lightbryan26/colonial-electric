# Colonial Electric: SEO, AEO and GEO Ranking Audit

**Site:** https://colonial-electric.com (live WordPress today) and the static rebuild in `docs/` (45 pages plus a 404), which replaces it at cutover.
**Business:** Colonial Electric, licensed electrician, Weymouth MA, serving the South Shore. Founder Scott Hays. (781) 287-8729. MA Lic# 8720-A1.
**Audit date:** 2026-10-13. Every claim about the rebuild was re-checked against the current `docs/` build on this date.

**How to read this audit**

- **OBSERVED** means I saw it myself in one of these places:
  - a repo file;
  - the built `docs/` output;
  - the live site, fetched 2026-10-13;
  - a web-search result snippet.
- **INFERRED** means a judgement or general industry knowledge. Every competition and intent score is INFERRED, because no keyword-volume tool was available.
- **Not verifiable from this sandbox:**
  - The Google Business Profile dashboard: categories, hours, the address it shows, review count. Maps needs JavaScript and was blocked. GBP facts quoted here come from a search snippet.
  - Search Console and GA4 data (no access).
  - The backlink profile (no link index).
  - Lighthouse (Chrome shows an interstitial here). I measured with Playwright instead.
  - The live pitch hosts `lightbryan26.github.io` and `colonial-electric-nine.vercel.app`, which the proxy blocks. Their behaviour was emulated locally.

---

## A. Executive Summary

**What is helping this site rank**

- **URL parity is exact (OBSERVED).** The live SmartCrawl `/page-sitemap.xml` lists 45 URLs, and `docs/sitemap.xml` lists the same 45. No content URL needs a redirect, so existing page-level equity carries over at cutover.
- **Real trust assets are on almost every page (OBSERVED):**
  - "MA Lic# 8720-A1" appears on all 45 pages.
  - Scott Hays is named in the body of 43.
  - The real Google reviews block (7 of the 8 reviews) appears on 39 pages.
  - Real Colonial job photos are the hero on 11 of 13 service pages.
- **The HTML is clean and crawlable (OBSERVED):**
  - One H1 per page, and a self-referencing absolute canonical on all 45 pages.
  - Every FAQ answer is in the static HTML.
  - About 7KB of JS, and CLS 0.000 on every page tested.
  - AI crawlers that do not run JavaScript see the full content.
- **The Google Business Profile may be the strongest asset (INFERRED, from a search snippet only).** The snippet shows "Colonial Electric inc", 5.0 stars from 227 reviews. If that is accurate, the GBP outweighs anything on the website for map-pack ranking.

**What is hurting this site most**

- **The 21 town pages are near-duplicates (OBSERVED, re-measured today).**
  - Five-word-shingle Jaccard similarity, with the town name masked: minimum 0.875, median 0.928, maximum 0.960.
  - Only 1.7% (Scituate) to 2.9% (Quincy) of each page's text is unique to it.
  - These pages carry the "electrician {town}" queries outside Weymouth, and Google classes this pattern as doorway or scaled content.
- **The business entity is inconsistent (OBSERVED).**
  - Three addresses:
    - P.O. Box 403 in the footer, on /contact-us/ and in the schema;
    - 12 Bell Rd on /privacy/;
    - 99 Bell Rd on the GBP, per a search snippet.
  - Several names: "Colonial Electric", "Colonial Electric inc" (GBP), "Colonial Electric Services" (live title suffix), "colonialhomeservices" (Instagram) and "scott-hays-electrician-weymouth-ma" (Nextdoor).
  - Three versions of the hours.
  - Unrelated firms share the name in Maryland, Arizona and Pennsylvania, which makes the inconsistency worse.
- **Colonial is missing from the sources AI answers draw on (OBSERVED in web-search answers).**
  - "electrician Weymouth MA" was answered from dispatchcore, BuildZoom, Porch and Levelset.
  - "panel upgrade Quincy Braintree" was answered from HomeGuide, Thumbtack and lantern.llc.
  - Colonial did not appear in either answer.
- **Measurement continuity at cutover is not yet secured (OBSERVED and INFERRED).**
  - The live site has no `google-site-verification` meta tag and runs Site Kit (`GT-T5MFXM5H`) plus `GTM-562VCKQ5`.
  - If Search Console was verified through Site Kit, GA or GTM, verification can silently break when WordPress goes away.

**Biggest missed GEO opportunities**

- **A citable local reference page.** One row per town: the permit office or wire inspector, the serving electric utility and the official program link, each verified, with an "as of" date. AI engines quote structured, sourced local facts, and none of the competitors observed has this.
- **Naming the hardware Colonial actually installs.**
  - The job photos show a Generac transfer switch, a Tesla backup gateway beside a SPAN panel, a ChargePoint charger and a Siemens panel (OBSERVED in `photos/services/` and the hero alt text).
  - The copy names no brands. The EV page says "Recommended By Top Brands" without naming one.
  - Confirmed brands and certifications make the pages quotable and open manufacturer installer-locator links.
- **Bing.**
  - There is no Bing Webmaster Tools verification, no IndexNow and no confirmed Bing Places listing.
  - INFERRED: ChatGPT search and Copilot draw heavily on Bing's index.

**Fastest wins in the next 14 days, ranked by leverage**

1. **Secure measurement before DNS changes.**
   - Add a DNS-verified Search Console Domain property.
   - Export 16 months of queries and pages as a baseline.
   - Confirm GA4 fires inside `GTM-562VCKQ5`.
2. **Sign one entity sheet** (name, public address or hidden service-area profile, phone, days and hours). Fix the GBP to match it, then change the site wherever it still differs.
3. **Cut over to Vercel with this build** (checklist below). That one deploy ships:
   - 45 rewritten titles and descriptions;
   - the connected schema graph;
   - the explicit robots.txt;
   - a sitemap with real lastmod dates;
   - llms.txt;
   - the legacy redirects.
4. **Optimise the GBP:**
   - set the categories, the 13 services and 20 service areas;
   - point the website link at the homepage;
   - upload photos;
   - start a same-day review-request text after every job.
5. **Claim directory and map listings:** BuildZoom, Bing Places, Apple Business Connect, Yelp and a real Facebook page, all with identical details. Add each URL to schema `sameAs`.

---

## B. Findings Table

Status key:
- **Fixed in this build:** the change is already in `docs/`.
- **Open: off-site:** action outside the codebase or at cutover.
- **Open: needs client input:** blocked on a fact, asset or approval from Colonial.

| Category | Issue or Opportunity | Severity (High/Medium/Low) | Evidence Found | Why It Matters | Recommended Fix | Status |
|---|---|---|---|---|---|---|
| Entity / NAP | Three different addresses are published for one business | High | OBSERVED: `docs/privacy/index.html` `<address>` reads "12 Bell Rd, Weymouth Massachusetts 02188". All 45 footers, /contact-us/ and the Electrician JSON-LD say "P.O. Box 403, Weymouth MA 02188". A search snippet for the GBP shows 99 Bell Rd (not verified in the dashboard). | Name, address and phone agreement is a core local-pack and AI entity-resolution signal. A P.O. Box is not a valid GBP address. | The client picks one public address, or a service-area profile with the address hidden. The GBP and site then match it. The privacy address is verbatim copy, so it changes only with client approval. | Open: needs client input |
| Entity / hours | The schema, visible copy, homepage FAQ and live schema give different hours | Medium | OBSERVED: schema on 45 pages says Mon to Fri 08:00 to 16:00. The footer and /contact-us/ show "8:00 AM to 4:00 PM" with no days. The new At a glance blocks say "Monday to Friday, 8:00 AM to 4:00 PM". Homepage FAQ 7 (verbatim, also in FAQPage) says "24/7 service". Live WordPress schema says 09:00 to 21:00. GBP hours could not be read. | Answer engines answer "is it open Saturday" or "open now" from exactly these fields. Contradictions produce wrong or hedged answers. | Confirm the GBP days and hours. Keep `site.openHours` in `src/data/site.mjs` identical to the GBP. Ask whether FAQ 7's "24/7" is true; if not, make a client-approved edit. | Open: needs client input |
| Content / town pages | All 21 town pages are near-duplicates | High | OBSERVED (current build, `/tmp/claude-0/seo/report/sim.py`): masked 5-shingle Jaccard is 0.875 min, 0.928 median, 0.960 max. Unique text is 1.7% to 2.9% of 1,422 to 1,475 words. The only town-specific content is the name, 4 landmark cards and a map. | Doorway and scaled-content risk. Outside Weymouth's proximity radius, these pages are the only way to rank for "electrician {town}". | Scott supplies 1 to 3 real jobs per town (service, photo, 2 or 3 sentences), the town's wire inspector or permit link and the verified serving utility. Render them through optional fields in `src/data/towns.mjs` and `src/pages/town.mjs`. Start with Quincy, Braintree, Hingham, Plymouth, Marshfield and Weymouth. Target masked Jaccard under 0.75. | Open: needs client input |
| Analytics continuity | Google Tag Manager was missing from the rebuild | High | OBSERVED: the live Weymouth page (re-fetched today) loads `GTM-562VCKQ5` and Site Kit `GT-T5MFXM5H`. The rebuild now has the GTM loader on 45 pages plus the 404, gated to `colonial-electric.com` and `www`. Playwright: 1 gtm.js request on the production hostname, 0 on github.io, vercel.app and localhost. The noscript iframe is added only in the production build. | Without it, call, form and organic tracking stop the day DNS changes, exactly when a migration needs watching. | Done in `src/partials/head.mjs` (`gtmHead`), `src/partials/layout.mjs` and `src/data/site.mjs` (`gtm`, `gtmHosts`). | Fixed in this build |
| Analytics / Search Console | GA4 source and Search Console verification method are unknown | High | OBSERVED: the live head has no `google-site-verification` meta, and the Site Kit tag `GT-T5MFXM5H` disappears with WordPress. INFERRED: verification may depend on Site Kit, GA or GTM. | If verification breaks, you lose the main tool for catching cutover problems. | Before cutover, add a DNS TXT Domain property. Confirm GA4 is a Google tag inside the GTM container; do not also hardcode gtag.js, which would double count. Add tel: click and form-submit events. Export a 16-month baseline. | Open: off-site |
| Titles | Service titles had no place, the home title had no brand, and town and About titles were weaker than live | High | OBSERVED before: "Generator \| Colonial Electric" (29 chars). Home: "Top-notch electrical services in South Shore Massachusetts." Towns: "{Town} MA, Electrical Services \| Colonial Electric" against live "Electrician in {Town} MA \| Colonial Electric Services". OBSERVED now: 45 unique titles of 34 to 61 chars, 40 of 45 with a place name. Examples: "Generator Installation in Weymouth, MA \| Colonial Electric", "Licensed Electrician in Quincy, MA \| Colonial Electric". All H1s unchanged. | The title is the strongest on-page relevance signal and the text most often quoted in results and AI citations. | `src/data/seo.mjs` plus `pageTitle()` in `src/partials/head.mjs`. The build fails on duplicate titles or descriptions, any dash separator, a `$` or "24/7". Optional: restore "Master Electrician" in the About title, which the live title has. | Fixed in this build |
| Meta descriptions | Descriptions were first sentences: short, truncated, duplicated, sometimes wrong | Medium | OBSERVED before: 17 of 45 were under 120 chars, 2 ended in "…", home and /calendar/ were identical, 14 town pages shared one sentence, and the wiring page said "National Fire Prevention Association". OBSERVED now: 45 unique descriptions of 143 to 158 chars, built only from facts on that page. og and twitter tags mirror them exactly. | Descriptions drive click-through and are often reused as link-preview and AI snippet text. | `src/data/seo.mjs`. `src/data/descriptions.json` and `src/scripts/descriptions.mjs` were deleted, and the override in `src/pages/terms.mjs` removed. | Fixed in this build |
| Indexation / pitch hosts | The vercel.app pitch copy was fully indexable | High | OBSERVED: `vercel.json` now sends `X-Robots-Tag: noindex` on any `*.vercel.app` host. It is host-conditional, so colonial-electric.com is never affected. | A third-party copy with identical NAP and copy can be indexed and split brand signals. | Done in `vercel.json`. At cutover, add a 301 from the vercel.app alias to the apex. | Fixed in this build |
| Indexation / pitch hosts | The GitHub Pages copy is still indexable | High | OBSERVED: the repo `lightbryan26/colonial-electric` is public with Pages enabled. GitHub Pages cannot send headers, and `/colonial-electric/robots.txt` is never read, because crawlers only read robots.txt at the host root (RFC 9309). No JS noindex was added, because it would drag down the Lighthouse SEO score in the new workflow. A web search found no indexed copy yet (weak evidence). | If the pitch stalls, this copy stays live indefinitely; after cutover it becomes a permanent duplicate. | Disable GitHub Pages (repo Settings, Pages) at cutover, or now if the pitch stalls, or give it a CNAME so it redirects. | Open: off-site |
| Structured data | There was no WebSite or WebPage node, and each town page declared a second Electrician | Medium | OBSERVED before: 2 to 4 loose JSON-LD blocks per page; the live WebSite node had been dropped; 21 town-level Electrician nodes with `parentOrganization`, implying 21 branches that do not exist. OBSERVED now: one `@graph` per page, and one Electrician `#business` byte-identical everywhere. Also `WebSite #website` (alternateName "Colonial Electric inc"), a page node per page (WebPage, AboutPage, ContactPage, CollectionPage), Service nodes on 13 service and 21 town pages, and BreadcrumbList. `/tmp/claude-0/seo/schema/check.mjs`: 47,282 assertions, 0 failures. | WebSite is Google's site-name signal. One connected entity, not 22, is what knowledge graphs and LLM parsers need. | `src/lib/schema.mjs`, emitted by `jsonLd()` in `src/partials/layout.mjs`. The build fails on an unresolved `@id`, a second business node, the wrong phone, `priceRange`, `aggregateRating` or an em dash. | Fixed in this build |
| E-E-A-T / founder and license | The founder and the license were not machine-readable | Medium | OBSERVED now: Person `#founder` with portrait, `hasOccupation` Master Electrician, the verbatim bio sentence and `worksFor #business`. The business has `hasCredential` with identifier 8720-A1, valid in Massachusetts. Not yet modelled: the issuing board, confirmation of the license holder, and a link to the state license lookup. | "Is Colonial Electric licensed?" is a common pre-hire question that answer engines resolve from structured facts. | Done in `src/lib/schema.mjs`. Follow-ups are in "Needs client input". | Fixed in this build |
| Entity / sameAs and names | Profiles are not joined, and display names vary | Medium | OBSERVED: `sameAs` now lists Instagram, Facebook (facebook.com/colonialelectric), the GBP cid URL and Nextdoor. Missing: a Yelp business URL (only a write-a-review link is known). Name variants are listed in section A. Same-name firms: Colonial Electric (Scottsdale AZ), Colonial Electric Company (Harwood MD), Colonial Electric Supply (PA). | `sameAs` and consistent names are how knowledge graphs and LLMs tell this Colonial Electric from the others. | The client supplies the Yelp business URL and renames Nextdoor and the Instagram display name to "Colonial Electric". Then add Yelp in `src/lib/schema.mjs` (Facebook is done: sameAs, footer, review button and llms.txt). | Open: needs client input |
| Internal linking | Service pages were isolated, and anchors were whole cards | Medium | OBSERVED before: 12 of 13 service pages had 0 body links to another service; Permanent Outdoor Lighting was linked in-body from 2 pages; card anchors were 150 to 230 chars; town anchors read "08 Weymouth". OBSERVED now: 3 to 4 Related Services links on every service page; all 21 town pages link all 13 services; anchors are service names; service-page town anchors read "Electrician in {Town}, MA"; the ordinals sit outside the link. Linkcheck: 0 broken internal links on both preview bases. | Related-service links pass relevance, and name-only anchors send a clear topical signal. | `src/blocks/services-grid.mjs`, `src/blocks/town-list.mjs`, `src/pages/service.mjs`, `src/pages/town.mjs`. | Fixed in this build |
| AEO / answer blocks | There was no compact, quotable fact block | Medium | OBSERVED now: an "At a glance" list under the hero on all 34 service and town pages, giving the service, the business (linked to About), the license, the service area, the phone and the hours. FAQ schema matches the visible text on 55 of 55 questions across 15 pages. FAQ term labels are no longer headings, so heading-based chunkers keep each answer with its question. | Passage retrieval in AI Overviews, Perplexity and ChatGPT search favours chunks that name the entity, place and credentials together. | `src/blocks/glance.mjs`, `src/css/block-glance.css`, `src/blocks/faqs.mjs`. | Fixed in this build |
| AEO / FAQ coverage | Several high-intent pages have no FAQs | Medium | OBSERVED: /generator/ has WebPage plus Service and no FAQPage (its live FAQs were copied ceiling-fan FAQs and were correctly dropped). /permanent-outdoor-lighting/, the 21 town pages, /premium-membership/ and /we-offer-financing/ also have none. | Generator work is seasonal and high-ticket, and Q&A is the most extractable format. Since Aug 2023, FAQ rich results show only for government and health sites, so the value here is AEO, not SERP features. | Scott answers, in his own words: 4 generator questions, 3 or 4 outdoor lighting questions, plus Flash Pass and financing questions (no prices). Add them to `src/data/services.mjs`; the template emits matching FAQPage. | Open: needs client input |
| Cannibalization | The homepage and /service-area/weymouth-ma/ both targeted "electrician Weymouth MA" | Medium | OBSERVED: the home H1 is "Your Trusted Local Electrician in Weymouth, MA", and the Weymouth page H2 is "Electrician in Weymouth MA". The head is now split: home "South Shore Electrician in Weymouth, MA", the Weymouth page "Electrical Services in Weymouth, MA". | Two URLs on one head term tend to swap positions, and neither builds stable rank. | Done in `src/data/seo.mjs`. After cutover, keep the GBP website link on the homepage and watch Search Console for the query splitting across pages. | Fixed in this build |
| Core Web Vitals | One 427KB render-blocking stylesheet | Medium | OBSERVED before: `site.css` was 427,018 bytes (83KB gzip) and 74 to 89% unused. Throttled lab LCP was 2.81, 2.89, 2.42 and 2.59s (home, panel, Weymouth, contact). OBSERVED today, same profile (150ms RTT, 1.6Mbps, 4x CPU, 375px): per-template minified CSS of 14 to 26KB transfer. FCP is 1.80, 1.48, 1.40 and 1.14s; LCP is 2.62, 2.40, 2.47 and 1.85s; CLS 0.000. Home LCP (the van photo) is still just over 2.5s in this lab profile. No field (CrUX) data was available. | Page experience is a tie-breaker, and faster mobile pages convert phone leads better. | `src/lib/minify.mjs`, `src/lib/css-split.mjs`, and a 768px van image (`src/assets/img/owner-van-768.*`). Next step: read real numbers from `.github/workflows/lighthouse.yml` and CrUX after cutover. | Fixed in this build |
| Sitemap | Every lastmod was the build date, and the old sitemap URL would 404 | Medium | OBSERVED: the live `/sitemap.xml` is a SmartCrawl index pointing to `/page-sitemap.xml`; the task premise that there was no sitemap was wrong. OBSERVED now: `docs/sitemap.xml` has 45 URLs, lastmod from a content hash (`src/data/lastmod.json`) and 167 image entries. `vercel.json` adds 301s from `/page-sitemap.xml`, `/sitemap_index.xml` and `/wp-sitemap.xml`. | Google uses lastmod only when it is consistently accurate. The sitemap already submitted in Search Console must keep resolving. | Done. Delete `src/data/lastmod.json` before the production build so every date starts at cutover. | Fixed in this build |
| Hosting / legacy URLs | GitHub Pages cannot send redirects or headers | Medium | OBSERVED live: `/feed/`, `/comments/feed/` and the old logo and favicon uploads return 200; `/home/` returns a 301. Live security headers: XFO, nosniff, HSTS, referrer-policy, permissions-policy. OBSERVED now: `vercel.json` has 12 redirects and 5 header rules. `/wp-admin/`, `/wp-json/`, `/author/*` and `/category/*` are left to 404 on purpose. | Avoids 404s on externally linked legacy URLs and a security regression. | Host production on Vercel, as the README cutover notes say. | Fixed in this build |
| Deployment hygiene | `docs/build-progress/` (30MB of internal pitch screenshots) deploys with `docs/` | Medium | OBSERVED: `du` shows 30M of the 69M in `docs/`; there is no `.vercelignore`, and Vercel serves `docs/` as-is. | It exposes internal process to the public and wastes crawl requests. | Before the production deploy, move it to a separate branch or add `.vercelignore` with `docs/build-progress`, and confirm the deploy honours it. | Open: off-site |
| Cutover guard | og:image, the logo and schema images point at the github.io pitch host | Low | OBSERVED: og:image is `https://lightbryan26.github.io/colonial-electric/assets/img/owner-van-1280.jpg`, set by `site.assetOrigin` in `src/data/site.mjs`. The production build now fails if any page still references github.io or vercel.app or lacks the GTM container. | If the switch is missed, share previews and the schema logo depend on a pitch repo that may be deleted. | Guard done in `src/build.mjs`. The switch itself is a cutover step (checklist). | Fixed in this build |
| Bing / IndexNow | There is no Bing Webmaster Tools verification and no IndexNow | Medium | OBSERVED: no `msvalidate.01` on the live site or the rebuild, no IndexNow key file in `docs/`, no submit script. INFERRED: ChatGPT search and Copilot rely heavily on Bing's index. | All 45 URLs change content at once at cutover, so pushing them to Bing speeds re-crawling. | Import the site into Bing Webmaster Tools from Search Console and submit `/sitemap.xml`. Generate an IndexNow key, publish `/<key>.txt`, and POST the sitemap URLs to `api.indexnow.org` after each production deploy. | Open: off-site |
| GEO / third-party sources | Colonial is absent from the directories AI answers cite | Medium | OBSERVED (web search, 2026-10-13): local electrician answers drew on BuildZoom, Porch, Thumbtack, HomeGuide, This Old House, lantern.llc and dispatchcore. The only correct third-party profile found was the Stroll Magazine feature "Lighting the Way: Scott Hays of Colonial Electric". | An LLM can only recommend a business that appears in the sources it retrieves. | Claim BuildZoom, Porch, Thumbtack, Angi/HomeAdvisor, BBB, Houzz, lantern.llc, Bing Places and Apple Business Connect with identical details. Ask Stroll to link to colonial-electric.com, and add the article as `subjectOf`. | Open: off-site |
| Content gaps | No page covers the high-ticket sub-intents | Medium | OBSERVED: a grep of `source/pages/*.md` finds no mention of 200 amp, Level 2, heat pump, interlock, Federal Pacific, Zinsco, Generac or Powerwall. Yet the job-photo alt text shows a Generac transfer switch, a Tesla gateway with a SPAN panel and a ChargePoint charger. | These are compare-and-decide queries, where AI answers quote specific process steps. | Section D. Each page needs facts from the client first. | Open: needs client input |
| GBP configuration | Categories, services and service areas are unverified, and the site lists 21 towns against a limit of 20 | Medium | OBSERVED: `src/data/towns.mjs` has 21 towns, and GBP categories could not be fetched. INFERRED: Google's documented service-area limit is 20. | The primary category is the strongest relevance factor on the GBP. | Primary category: Electrician. Secondary categories only where true; confirm names in the picker. 20 service areas (drop Carver from the GBP only). Add all 13 services. Point the website link at the homepage. | Open: off-site |
| Robots / AI crawlers | Every crawler was allowed, but only implicitly | Low | OBSERVED now: `docs/robots.txt` names search engines, AI answer bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, DuckAssistBot) and AI training bots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot). All are allowed, with a Sitemap line and an llms.txt pointer. The live site returned 200 to GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and CCBot. | Naming the bots records the decision and makes an accidental future block visible, for example a CDN's default AI-bot blocking. | Done in `src/lib/seo-files.mjs`. | Fixed in this build |
| llms.txt | Absent on both the live site and the rebuild | Low | OBSERVED: live `/llms.txt` returns 404 (re-checked today). Now `docs/llms.txt` (9,017 bytes) and `docs/llms-full.txt` (74,727 bytes) contain verbatim site text. The build fails on an em dash, a `$` or "24/7". INFERRED: no major engine has confirmed using it. | A cheap, clean fact sheet for agents and LLM tools. Expected impact is small. | Done in `src/lib/seo-files.mjs`. | Fixed in this build |
| Robots meta | The live `max-image-preview:large` directive was lost | Low | OBSERVED now: present on all 45 pages; the 404 swaps it for `noindex`. | Parity with the live site for large image previews. | Done in `src/partials/head.mjs` and `src/build.mjs`. | Fixed in this build |
| Page weight | Every below-the-fold image was forced to download after load | Low | OBSERVED before: on /, all 19 images (569KB) loaded with no scroll. Now `src/js/base.js` skips the warm-up on Save-Data, 2g and 3g connections. | Saves mobile data on slow connections; no LCP effect. | Done. | Fixed in this build |
| Thin utility page | /calendar/ is a booking-widget page of under 50 words and is indexed | Low | OBSERVED: /calendar/ is in the sitemap with no noindex; its `<main>` text is 49 words, breadcrumb included. Its title and description are now unique. | Low-value URLs dilute a 45-page site slightly. | Recommended: `noindex, follow` and removal from the sitemap. The page is live today, so this is the client's call. | Open: needs client input |
| Reviews / trust | "Posted on Google" is plain text, and the review page asks for Yelp reviews | Low | OBSERVED: the reviews block on 39 pages renders the label as a `<span>`. /leave-us-a-review/ links `yelp.com/writeareview/biz/nWomuLCv0oADHJr8aMAcag`. | Reviews that can be checked carry more weight. Yelp's guidelines tell businesses not to ask for reviews, and solicited reviews tend to be filtered. | Link the label to the GBP. Change the Yelp button to a neutral profile link. Both change visible markup, so the brief owner signs off. | Open: needs client input |
| Copy accuracy | The verbatim copy contains errors that LLMs may quote | Low | OBSERVED: the wiring page says "National Fire Prevention Association" (the real name is National Fire Protection Association); the EV page has a fragment, "With their zero emissions and eco-friendly features."; privacy reads "Welcome to Colonial Electric !"; the battery page sizes a system with 38 lead-acid batteries; the EV page's "Recommended By Top Brands" names no brand. | Wrong or dated facts weaken expertise signals. | The client approves corrections; the brief does not allow silent edits. | Open: needs client input |
| Photos / E-E-A-T | 2 service pages still have no real job photo | Low | OBSERVED: 11 of 13 service heroes are real Colonial job photos (`photos/services/`, sourced from Colonial's WordPress library). `electrical-outlets` and `electrical-inspections` still use the drawn hero. The service-card plates sitewide are still typographic (`src/data/service-photos.mjs` is empty). | Original photos are first-hand experience evidence and keep the GBP photo set fresh. | The client supplies outlet and inspection job photos, plus job photos for the cards. | Open: needs client input |
| Headings | Template headings outnumber the unique ones | Low | OBSERVED on /electrical-panel-upgrade/: 8 template H2s against 2 unique ones, including "Service Area", "Contact Us" and "FAQs", plus booking-step H3s "Call", "Share", "Schedule" and "Relax". Legal H2s render a visual "01" next to a screen-reader "1. ". | This weakens the topical outline for passage extraction. The impact is small because the H1s are fixed. | Change element levels only (labels to `<p>`) and keep the wording. Needs sign-off under the brief. | Open: needs client input |

---

## C. Priority Roadmap

### Fix Now (1 to 2 weeks)

| # | Action | Owner | Effort |
|---|---|---|---|
| 1 | Add a DNS-verified Search Console Domain property. Export 16 months of Performance (queries and pages) and the Links report. Confirm GA4 fires inside `GTM-562VCKQ5`, and add tel: click and form-submit events. | Agency + client DNS | 1 to 2 hours |
| 2 | Client signs the entity sheet: name, public address or hidden service-area profile, (781) 287-8729, days and hours, URL, 13 services, 20 GBP towns. | Client | 30 minutes |
| 3 | Make the GBP match the sheet: hours, primary and secondary categories, 13 services, 20 service areas, website `https://colonial-electric.com/`, at least 10 real photos. | Agency | 2 hours |
| 4 | Cut over to Vercel using the checklist below: switch `assetOrigin`, delete `lastmod.json`, exclude `docs/build-progress`, add the 301 from vercel.app, disable GitHub Pages, set www to redirect to the apex. | Agency | Half a day |
| 5 | Submit `/sitemap.xml` in Search Console and Bing Webmaster Tools, set up an IndexNow key and ping, and request indexing for the home page, the panel, generator and EV pages, /service-area/ and the top 5 town pages by baseline clicks. | Agency | 1 hour |
| 6 | Start the review routine: Scott texts the Google review link the day each job closes. No scripts, no incentives, no gating. Reply to every review within 48 hours. | Client | Ongoing |
| 7 | Decide on noindexing /calendar/, the Yelp button wording and the "Posted on Google" link. | Client | 15 minutes |

### Fix This Quarter (1 to 3 months)

- **Per-town proof blocks** for Quincy, Braintree, Hingham, Plymouth, Marshfield, Weymouth, Milton and Scituate, using real jobs, photos, and verified permit and utility links. Re-run the similarity script after each batch.
- **FAQs in Scott's words** for generator, permanent outdoor lighting, Flash Pass and financing (no prices).
- **Citations and profiles:**
  - claim Bing Places, Apple Business Connect, BuildZoom, Yelp (claim only, no review asks), BBB, Angi/HomeAdvisor, Thumbtack, Porch and Houzz;
  - create or claim the Facebook page;
  - rename the Nextdoor page;
  - fix the Instagram display name;
  - add every URL to `sameAs`.
- **License verification:** confirm the holder, class and issuing board on the state license lookup. Then link "MA Lic# 8720-A1" to the lookup and add `recognizedBy`.
- **Publish content ideas 10, 4, 1, 14 and 15** from section D, plus 12 now while the holiday-lighting season is live.
- **Approve the copy corrections:** the NFPA name, the EV fragment, the privacy greeting and the battery example.
- **Local links:**
  - a link from the Stroll feature;
  - South Shore Chamber and Weymouth Chamber listings;
  - sponsorships Colonial already does (check that the race-sponsor listing on bikesignup.com links to the site).
- **Monthly Search Console review:**
  - the indexed count should stay near 45;
  - "electrician {town}" impressions against the baseline;
  - the "electrician weymouth ma" query split between pages.

### Strategic Bets (6 to 12 months)

- **A `/projects/` hub with one page per real job**, each linked from its town page. This is the only scalable, honest way to make the 21 town pages unique.
- **The South Shore permit and utility reference table (idea 10)** as a linkable asset. Pitch it to town energy committees and local groups.
- **Manufacturer installer-locator listings,** only where Colonial's status is real: Generac, Tesla, ChargePoint and SPAN, plus Qmerit if Colonial joins.
- **Short YouTube explainers by Scott** (interlock vs transfer switch, what a 200A upgrade involves, spotting knob and tube). Publish full transcripts and embed each video on its matching page with VideoObject markup.
- **Community answers by Scott,** disclosed as Colonial's owner, in local Facebook town groups, Nextdoor and r/HomeImprovement. These threads feed Perplexity and AI Overviews (INFERRED).
- **First-hand data, only if Colonial logs it,** for example what inspections typically find, published with the method. Never estimated.

---

## D. Content Expansion Plan

Rules for every new page:
- a new URL only; no existing slug changes;
- relative internal links;
- no prices, no invented statistics, no "24/7", no em dashes;
- every Colonial-specific fact supplied in writing by the client;
- third-party facts (code, utilities, programs) linked to the official source with an "as of" date and no dollar amounts.

| # | Proposed URL | Target keyword / topic | Intent | Why it can rank | Why AI may cite it |
|---|---|---|---|---|---|
| 1 | /standby-generator-installation/ | whole house generator installation South Shore MA | Transactional | No local electrician observed has a dedicated process page. Nor'easter outage demand is real, and a verbatim review (Joseph Smith) mentions keeping a generator running in a Nor'easter. The generator hero already shows a real Generac transfer switch job. | It answers "what does installing a standby generator involve" step by step: sizing, permit, pad, transfer switch, gas coordination, inspection, maintenance. Needs: brands installed, dealer status, who does the gas work. |
| 2 | /generator-interlock-transfer-switch/ | generator interlock kit installation, portable generator hookup electrician | Informational to transactional | A low-competition, specific term, and the cheapest entry point to backup power. | A clean interlock vs transfer switch comparison plus the backfeed safety reason. Needs: confirmation that Colonial installs inlets and interlocks. |
| 3 | /generator-vs-battery-backup/ | whole home battery vs generator | Commercial (comparison) | The verbatim comparison copy already on /whole-home-battery-back-up/ can grow into a decision page with a table. A real Tesla gateway with SPAN panel job is on file. | Comparison tables are among the formats AI answers extract most (INFERRED). Needs: the systems Colonial actually installs. |
| 4 | /200-amp-service-upgrade/ | 100 to 200 amp service upgrade Weymouth, Quincy | Transactional | High ticket. The current panel page has no amperage, permit or utility-coordination steps. | It answers "how does a service upgrade work in Massachusetts" with an ordered process. Needs: Colonial's real process and who schedules the utility. |
| 5 | /panel-capacity-heat-pump-ev/ | do I need a panel upgrade for a heat pump or EV charger | Informational (pre-purchase) | Massachusetts electrification demand (INFERRED), and few electricians explain load calculation plainly. | A direct answer followed by a checklist. Links to the official program pages, no rebate amounts. Needs: whether Colonial does load calculations. |
| 6 | /fuse-box-and-obsolete-panel-replacement/ | fuse box replacement, Federal Pacific panel replacement Massachusetts | Transactional (often triggered by an insurer or a sale) | Named-panel terms are low competition and high intent. | "Is my panel dangerous" answers quote named lists with an authoritative source. Needs: confirmation they replace these. Cite public sources and invent no failure rates. |
| 7 | /knob-and-tube-and-aluminum-wiring/ | knob and tube wiring replacement MA, aluminum wiring | Informational to transactional | Older South Shore housing stock (INFERRED). It expands the existing verbatim hazardous-wiring copy. | Question-headed sections, such as "Can I sell a house with knob and tube?". Needs: whether Colonial does full or partial rewires. |
| 8 | /home-buyer-electrical-inspection/ | electrical inspection before buying a house MA | Transactional | The current inspections page is about generic testing standards, not the buyer's question. | A list of what an electrician checks vs what a home inspector checks. Needs: the real checklist and deliverable. Do not call Colonial a home inspector; Massachusetts licenses those separately. |
| 9 | /level-2-ev-charger-installation/ | Level 2 home charger installation Hingham, Weymouth | Transactional | Specific hardware, panel and permit steps, plus town-level utility programs. A real ChargePoint install is on file. | A step list plus "which program applies in my town" with official links. Needs: brands and certifications, which would also substantiate "Recommended By Top Brands". |
| 10 | /south-shore-electrical-permits-and-utilities/ | electrical permit Weymouth MA, who is my electric utility {town} | Informational | A unique local data asset: one row per town (21) with the wire inspector or building department link, the serving utility (municipal light plant or investor-owned, each verified) and the official program page. | Structured, sourced local facts are exactly what answer engines quote and link. The strongest GEO page on this list. Needs: official-source verification and an "as of" date. |
| 11 | /landscape-lighting/ | landscape lighting installation South Shore MA | Transactional | Currently buried inside /permanent-outdoor-lighting/. A dedicated URL can carry the verbatim landscape section and real photos. | The fixture-type list (path, accent, up and down, flood) is a clean extractable list. Needs: project photos. |
| 12 | /permanent-holiday-lighting/ | permanent roofline lights, holiday light installation Hingham | Transactional (seasonal: publish in October) | Only one franchise competitor was observed (Hull). | A seasonal vs permanent explainer. Needs: the product system used, app control details, and whether Colonial removes seasonal lights. |
| 13 | /breaker-keeps-tripping/ (hub for tripping breakers, partial power loss, warm or buzzing outlets) | breaker keeps tripping, half house no power, outlet burning smell | Informational (urgent) | High volume (INFERRED), with safety-first answers from a licensed electrician. | Numbered safety steps reused from the verbatim homepage emergency FAQ (cut power, avoid DIY, call 911 for smoke). States the real hours and makes no 24/7 claim. |
| 14 | /scott-hays-master-electrician/ (or an expanded About section) | Scott Hays electrician, Colonial Electric owner | Navigational (brand and entity) | Brand query; the live About title already targeted it. | A Person entity with the license linked to the state lookup, the lineman and teaching background (verbatim About copy) and the Stroll feature. This separates him from the same-name firms in MD, AZ and PA. Needs: license holder confirmation. |
| 15 | /projects/ plus one page per job (for example "Panel upgrade in Hingham") | {service} {town} | Transactional (proof) | First-hand photos and specifics are the only scalable way to make town pages unique; each job links from its town page. | Experience-based content with named towns and services is what AI engines prefer to cite over templated location pages. Needs: real jobs, photos, customer permission, no names or addresses. |

**Recommended order:** 10, 4, 1, 14, 15, then 12 (seasonal, now), then 7, 9, 2, 3, 5, 11, 8, 6, 13.

---

## E. GEO Upgrade Plan

### Content formatting

- **Done:**
  - an "At a glance" fact block on 34 service and town pages (who, what, license, where, phone, hours);
  - FAQ answers kept with their questions (term labels are no longer headings);
  - all text in static HTML.
- **Next, for new pages:**
  - Open each page with a 40 to 60 word direct answer under a question-style H2, then steps, then a table.
  - One topic per URL.
  - A visible "Updated" date that matches `dateModified`.
- **Name the entity and place in the first 100 words** of `<main>`. Re-checked on the current build: the At a glance block fixed this for /ev-charger-installation/, /permanent-outdoor-lighting/ and /whole-home-battery-back-up/. Five pages still fall short:
  - /we-offer-financing/ opens with "We've partnered with Wisetack", with no brand, trade or place;
  - /contact-us/, /electrical-inspections/ and /premium-membership/ have no "Colonial Electric";
  - /leave-us-a-review/ names no place.
  - Fix: extend the existing NAP eyebrow "Colonial Electric · Weymouth, MA" (already on /services/ and /calendar/) to these heroes, with the brief owner's sign-off.

### Schema and structured data

- **Done (one `@graph` per page):**
  - the Electrician `#business` with geo, hasMap, hours, contactPoint, hasCredential 8720-A1, knowsAbout for the 13 services and 21 town `areaServed` entries;
  - WebSite;
  - Person `#founder`;
  - WebPage, AboutPage, ContactPage and CollectionPage;
  - Service with provider;
  - BreadcrumbList;
  - FAQPage only where FAQs are visible.
  - No `priceRange`, `aggregateRating`, review markup or `SearchAction`.
- **Next:**
  - add Yelp to `sameAs` once the URL is known (Facebook is already in);
  - add `recognizedBy` (the issuing board) after the license lookup;
  - add `legalName` only if the Corporations Division record confirms it;
  - add `subjectOf` for the Stroll article;
  - add a `disambiguatingDescription` ("Licensed electrician based in Weymouth, Massachusetts, serving the South Shore");
  - add VideoObject when the explainers exist.

### Authority and citations

- Use identical details on BuildZoom (it reads state license data and was cited in AI answers), Bing Places, Apple Business Connect, Yelp, Facebook, Nextdoor, BBB, Angi, Thumbtack, Porch and Houzz.
- Get a link from the Stroll feature, chamber listings, real sponsorships, and manufacturer locators only where the status is real.
- Set up Bing Webmaster Tools and IndexNow, because Bing feeds ChatGPT search and Copilot (INFERRED).

### Trust additions

- Link "MA Lic# 8720-A1" to the state license lookup once the holder is confirmed.
- Link "Posted on Google" to the GBP.
- Supply real photos for outlets and inspections; replace the typographic card plates with job photos as they arrive.
- Use one public email (admin@ appears on the contact page and footer; scott@ on privacy and terms).
- One address and one set of hours everywhere.

### AI-answer content patterns

- Comparisons: generator vs battery; interlock vs transfer switch.
- Process steps: 200A upgrade; standby generator.
- Named-entity lists: panel brands to replace; hardware Colonial installs.
- A sourced local reference table: permits and utilities.
- Q&A in Scott's words.
- First-hand project pages with town and service.
- Every factual claim traceable to the site or an official source. No statistics unless Colonial logged them.

---

## F. Final Verdict

**Can this site realistically grow rankings? Yes.**

Rationale:
- **The foundation is now sound.** The rebuild keeps every live URL, so nothing has to be won back through redirects. It fixes the technical and on-page problems a migration would otherwise have introduced: titles weaker than live, no GTM, a dropped WebSite node and 22 business entities.
- **The business has real trust assets:**
  - a state license shown on every page;
  - a named master electrician founder;
  - real job photos;
  - a GBP that a search snippet shows at 5.0 from 227 reviews (unverified).
- **What limits growth is not code.** It is:
  - an inconsistent entity (three addresses, several names, three versions of the hours);
  - 21 templated town pages with almost no unique content;
  - almost no presence in the directories and local sources AI answers draw on.
- **All three are fixable within a quarter** with client input and off-site work, and none needs budget beyond time.

**Site classification: Under-optimized gem**

**Scorecard (rebuild as it will ship at cutover; all scores INFERRED judgement, 1 to 10)**

| Area | Score | Why |
|---|---|---|
| Technical SEO | 8 | Exact URL parity, clean canonicals, sitemap with real lastmod, legacy 301s, explicit robots, CLS 0. Open: GitHub Pages copy, build-progress in the deploy, Bing and IndexNow. |
| On-page SEO | 8 | 45 unique, keyword-led titles and descriptions; one H1 per page. Held back by template-heavy heading outlines. |
| Content quality | 5 | Service pages are reasonable. Town pages are about 98% shared template, and the high-ticket sub-topics have no pages. |
| Internal linking | 8 | Related services, all 13 services from every town page, name anchors. |
| Conversion alignment | 7 | Phone in the header and At a glance block, form, booking calendar, financing and membership pages. GA4 conversion events are not yet confirmed. |
| Authority / trust | 6 | License, founder and real reviews are strong. NAP conflicts, thin `sameAs` and no observed backlinks or directory presence pull it down. |
| GEO readiness | 7 | Connected schema graph, crawler-friendly static HTML, llms.txt, fact blocks, FAQ parity. Missing: third-party corroboration, named hardware and local reference content. |
| Overall ranking potential | 7 | High ceiling in the GBP's proximity area (Weymouth, Braintree, Quincy, Hingham). Outer towns depend on the town-page work. |

**The 3 changes that would move rankings fastest**

1. **Cut over cleanly, with measurement in place first.**
   - Implementation:
     - DNS TXT Search Console Domain property and baseline export before touching DNS;
     - GA4 confirmed inside `GTM-562VCKQ5`;
     - deploy to Vercel with `assetOrigin` switched and `lastmod.json` deleted;
     - submit `/sitemap.xml` in Search Console and Bing;
     - ping IndexNow;
     - request indexing for the top 10 URLs.
   - Why it is fastest: it ships, in one deploy:
     - 18 titles that gain a place name (40 of 45 now have one, up from 22);
     - 20 town titles in the "Licensed Electrician in {Town}, MA" shape;
     - a connected entity graph;
     - parity with the live site.
2. **Lock the entity, then tune the GBP.**
   - Implementation:
     - one signed entity sheet;
     - change the GBP hours, categories (Electrician primary), 13 services and 20 service areas;
     - point the GBP website link at the homepage;
     - post photos weekly;
     - same-day review requests;
     - then align Yelp, Facebook, Nextdoor and Instagram names and add them to `sameAs`.
   - Why it is fastest: the map pack drives most local electrician calls, and GBP relevance and consistency are the levers Colonial controls directly.
3. **Make the top 6 town pages genuinely local.**
   - Implementation:
     - optional `jobs`, `permitUrl` and `utility` fields in `src/data/towns.mjs`, rendered by `src/pages/town.mjs` only when present;
     - 1 to 3 real jobs per town with photos and Scott's own sentences;
     - verified permit and utility links;
     - start with Quincy, Braintree, Hingham, Plymouth, Marshfield and Weymouth;
     - re-run `/tmp/claude-0/seo/report/sim.py` until masked similarity is under 0.75.
   - Why it is fastest: these are the only organic pages that can rank in towns outside Weymouth's proximity radius.

---

## What was implemented in this build

All paths are relative to `/home/user/colonial-electric/`. The build (`node src/build.mjs`) produces 45 of 45 pages plus the 404.

**Verification results:**
- schema check: 47,282 assertions, 0 failures;
- FAQ parity: 55 of 55;
- linkcheck: 0 broken internal links on both preview bases;
- no em dash on any page at 1440 and 375px;
- no horizontal scroll on any of the 46 pages.

**Head metadata (titles, descriptions, OG, Twitter)**
- `src/data/seo.mjs` (new): a title and description for every page, plus build validation (unique, no em, en or spaced-hyphen dashes, no `$`, no "24/7").
- `src/data/pages.mjs`: reads `seo.mjs`; keeps the live title for breadcrumbs.
- `src/partials/head.mjs`: `pageTitle()` uses the SEO title; og and twitter tags mirror the title and description; `max-image-preview:large`; the GTM loader `gtmHead()`.
- `src/pages/terms.mjs`: the description override was removed.
- Deleted: `src/data/descriptions.json` and `src/scripts/descriptions.mjs`.
- `src/data/site.mjs`: `homeDescription` no longer uses a dash separator.

**Structured data**
- `src/lib/schema.mjs` (new): one `@graph` per page containing:
  - Electrician `#business`, WebSite, `#logo`, `#primaryimage` and Person `#founder`;
  - the page node, Service, BreadcrumbList and FAQPage where visible;
  - build asserts.
- `src/partials/layout.mjs`: `jsonLd()` emits the graph at the end of `<body>`; GTM noscript in the production build only.
- `src/pages/town.mjs`: the duplicate town-level Electrician was removed and replaced by a Service node.
- `src/pages/service.mjs`: the Service node.
- `src/pages/about-colonial-electric.mjs`: the full founder Person profile.

**Crawler files and sitemap**
- `src/lib/seo-files.mjs` (new), called from `src/build.mjs`, writes:
  - `docs/robots.txt`: named crawler groups, Sitemap line, llms.txt pointer;
  - `docs/sitemap.xml`: 45 URLs, real lastmod, 167 image entries;
  - `docs/llms.txt` and `docs/llms-full.txt`.
- `src/data/lastmod.json` (new): content-hash lastmod per page.
- `src/pages/premium-membership.mjs`: exports the perks list for llms.txt.

**Hosting and cutover safety**
- `vercel.json`:
  - noindex on `*.vercel.app`;
  - security headers;
  - long cache for fonts and versioned assets, 7-day cache for images;
  - 12 legacy WordPress 301s (`/home/`, `/index.php`, feeds, the three old sitemaps, the old logo and favicons).
- `src/build.mjs`: the production guard fails on any github.io or vercel.app reference or a missing GTM container.
- `README.md`: cutover notes, crawler-file notes, the title and keyword map, and a structured data section.

**Performance**
- `src/lib/minify.mjs` and `src/lib/css-split.mjs` (new): minified, per-template CSS (`docs/assets/site-<template>.css`). The full `site.css` is kept because both GitHub workflows check it.
- `src/assets/img/owner-van-768.webp` and `.jpg` (new), `src/data/images.json`, `src/scripts/images.mjs`, `src/sections/home/hero.mjs`, `src/pages/home.mjs`: a smaller mobile hero and an exact preload.
- `src/js/base.js`: no image warm-up on Save-Data, 2g or 3g connections.
- `.github/workflows/lighthouse.yml` (new): 3 mobile runs on 5 pages; reports medians and never fails the job.

**Internal linking and answer blocks**
- `src/blocks/glance.mjs` and `src/css/block-glance.css` (new): the "At a glance" block.
- `src/blocks/services-grid.mjs`, `src/blocks/town-list.mjs`, `src/blocks/faqs.mjs`, `src/pages/service.mjs`, `src/pages/town.mjs`, `src/pages/services.mjs`, `src/sections/home/services.mjs`, `src/sections/home/faqs.mjs`: name anchors, Related Services, all 13 services on town pages, town anchors, FAQ parity.
- CSS: `src/css/blocks.css`, `src/css/tpl-service.css`, `src/css/page-services.css`, `src/css/home-services.css`, `src/css/block-contact-cta.css`.

---

## Cutover checklist

**T minus 7 days**
- [ ] **Search Console:** in Settings, Ownership verification, record the current method. Add a Domain property verified by DNS TXT.
- [ ] **Baseline export:** 16 months of Performance (queries and pages), the Pages report and the Links report.
- [ ] **GA4 inside GTM-562VCKQ5:** confirm a GA4 / Google tag fires there. If GA4 came only from Site Kit (`GT-T5MFXM5H`), add it as a Google tag inside GTM; do not hardcode gtag.js. Add tel: click and form-submit triggers.
- [ ] **Lower DNS TTL** on the apex and www records to 300 seconds, 24 to 48 hours ahead.
- [ ] **Record every existing DNS record.** MX, SPF, DKIM, DMARC and any GoHighLevel or A2P verification TXT records must not change.
- [ ] **Externally linked legacy URLs:** list any `/wp-content/uploads/...` URLs from the Links report or Bing backlinks and add 301s for them to `vercel.json`.

**Build (T minus 1 day)**
- [ ] **Asset origin:** set `site.assetOrigin` to `site.origin` in `src/data/site.mjs`. This turns on the GTM noscript and the pitch-host guard.
- [ ] **Delete `src/data/lastmod.json`** so every lastmod starts at the cutover date.
- [ ] **Contact form:** swap the preview form for the live GoHighLevel widget `wVkjdlLGFrTr6qBocTaL` (brief section 11, item 7).
- [ ] **Exclude `docs/build-progress/`** from the production deploy (`.vercelignore` or a separate branch).
- [ ] **Run `node src/build.mjs`** and confirm 45 of 45, and that the guard passes.

**T zero (DNS to Vercel)**
- [ ] **Domains:** add `colonial-electric.com` in Vercel Domains as the primary. Point the apex and www to Vercel using the exact records the Vercel Domains screen shows.
- [ ] **Apex vs www:** configure `www.colonial-electric.com` in Vercel as a 301 redirect to `https://colonial-electric.com`. The apex non-www form with trailing slashes is canonical (`trailingSlash: true` is already set).
- [ ] **Keep slugs:** confirm all 45 slugs return 200 unchanged. Do not rename any URL in the same release.
- [ ] **Smoke test with curl:**
  - `/`, one service page, one town page;
  - `/page-sitemap.xml` returns 301 to `/sitemap.xml`;
  - `/feed/` returns 301;
  - `/home/` returns 301;
  - `/robots.txt`, `/sitemap.xml` and `/llms.txt` return 200;
  - an unknown path returns 404;
  - security headers are present;
  - no `X-Robots-Tag` on the apex.
- [ ] **GTM-562VCKQ5 live:** in GTM Preview or GA4 Realtime, confirm one container load per page on the apex.
- [ ] **AI crawler access:** re-run the user-agent check (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, ClaudeBot) after DNS settles, in case a CDN or firewall default blocks AI bots.

**T zero to T plus 2 days**
- [ ] **Search Console sitemap:** submit `https://colonial-electric.com/sitemap.xml`, remove the old `/page-sitemap.xml` entry, and use URL Inspection to request indexing for the home page and the top 10 pages.
- [ ] **Bing:** import the site into Bing Webmaster Tools from Search Console and submit the sitemap. Generate an IndexNow key, publish `/<key>.txt` and POST all 45 URLs to `https://api.indexnow.org/indexnow`.
- [ ] **GBP website URL:** set it to `https://colonial-electric.com/` (optionally with `?utm_source=google&utm_medium=organic&utm_campaign=gbp`; the canonical handles the parameter). Set the appointment link to /contact-us/.
- [ ] **Remove pitch hosts from the index:**
  - add the `vercel.json` redirect from `colonial-electric-nine.vercel.app/:path*` to `https://colonial-electric.com/:path*`;
  - disable GitHub Pages for `lightbryan26/colonial-electric`, or give it a CNAME;
  - check `site:lightbryan26.github.io` and `site:vercel.app colonial` stay empty.

**T plus 1 to T plus 28 days**
- [ ] **Monitor 404s** daily in week 1, then weekly: Vercel logs, the Search Console Pages report ("Not found (404)") and Crawl stats. Add a 301 for any legacy URL that still gets traffic or links.
- [ ] **Watch the numbers:** the indexed page count stays near 45; impressions for "electrician {town}" and the service queries against the baseline; Core Web Vitals and the Lighthouse workflow medians.
- [ ] **Stale profile URLs:** confirm no directory or social profile still points at a WordPress-only URL.

---

## Needs client input

| Item | What we need | Why |
|---|---|---|
| Photos for 4 services | When this audit started, ceiling fan, EV charger, inspections and outlets had no real job photo. Ceiling fan and EV charger now use real Colonial photos from the WordPress library. Still needed: outlets and inspections hero photos, plus job photos for the service-card plates and for each priority town. No faces, house numbers or addresses. | First-hand experience evidence for Google and AI engines, and fresh GBP photos. |
| GBP name consistency | Confirm the exact GBP name ("Colonial Electric inc" per the snippet), the legal name, and approval to align Nextdoor ("Scott Hays Electrician"), Instagram (`colonialhomeservices`) and any directory listings to "Colonial Electric". Rename the GBP only if the real-world name differs, and in a week with no other GBP edits. | Same-name firms exist in MD, AZ and PA; name variance weakens entity resolution. |
| Review generation | Agree a routine: Scott texts the Google review link the day a job closes, and customers mention the service and town in their own words. No incentives, no gating, no Yelp asks. Reply to every review within 48 hours. Decide on linking "Posted on Google" to the GBP. | Review count, recency and content are major local-pack factors (INFERRED), and reviews feed AI answers. |
| Public address | Choose 12 Bell Rd (privacy page), 99 Bell Rd (GBP snippet), P.O. Box 403 (everywhere else), or a hidden-address service-area profile. | NAP consistency; a P.O. Box is not a valid GBP address. |
| Days and hours | Confirm "Monday to Friday, 8:00 AM to 4:00 PM" against the GBP, and whether homepage FAQ 7's "24/7 service" is true. | Schema, the At a glance blocks and llms.txt all state these hours. |
| License details | The holder name, class and issuing board for 8720-A1 from the state lookup. | Adds `recognizedBy`, links the license line and confirms the Person credential. |
| Yelp business URL | The canonical `yelp.com/biz/<alias>` URL. | `sameAs`; replacing the review-solicitation button with a profile link. |
| FAQ answers | Generator (4), permanent outdoor lighting (3 or 4), Flash Pass and financing questions, in Scott's words, with no prices. | AEO coverage on high-intent pages. |
| Per-town material | 1 to 3 real jobs per priority town (service, photo, a short note), plus any town-specific permit experience. | The only honest fix for near-duplicate town pages. |
| Brands and certifications | The generator, battery, EV charger and panel brands Colonial installs, and any dealer or installer status. | Makes the pages quotable, substantiates "Recommended By Top Brands", and opens manufacturer locator links. |
| Copy corrections | Approval to fix "National Fire Prevention Association", the EV fragment, "Welcome to Colonial Electric !" and the lead-acid battery example. | LLMs quote verbatim copy. |
| /calendar/ indexing | Approve `noindex, follow` and removal from the sitemap. | A thin utility URL. |
| One public email | admin@ (contact page and footer) or scott@ (privacy and terms). | Contact-detail consistency. |

---

**Evidence scripts and outputs** (scratch, not part of the site):
- town similarity: `/tmp/claude-0/seo/report/sim.py`;
- lab performance: `/tmp/claude-0/seo/technical/perf.mjs`;
- schema check: `/tmp/claude-0/seo/schema/check.mjs`;
- FAQ parity: `/tmp/claude-0/seo/aeo-links/faqmatch.mjs`;
- meta, dash and GTM checks: `/tmp/claude-0/seo/verify/`;
- per-page metadata inventory: `/tmp/claude-0/seo/onpage/inventory.json`;
- old vs new titles and descriptions: `/tmp/claude-0/seo/meta/report.json`.
