<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - APPLIED: in src/css/header.css at 599px and below, `.hcall__txt` is now visually hidden (sr-only pattern) instead of `display: none`. Removed the page-scoped workaround from src/css/page-we-offer-financing.css. In the Chromium AX tree at 375, the header tel link's name is "Call Us Today! (781) 287-8729" and no link has an empty name. Visual result is unchanged.

# Request from page-we-offer-financing (round 5)

File: src/css/header.css (line ~126, inside `@media (max-width: 599px)`)
Change: replace `.hcall__txt { display: none; }` with
`.hcall__txt { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }`
(or, alternatively, add `aria-label="Call Us Today! ${site.phone}"` to `<a class="hcall">` in src/partials/header.mjs line ~66).
Why: at 599px and below the header click-to-call link `<a class="hcall" href="tel:+17812878729">` has an EMPTY accessible name (Chromium AX tree at 375: role=link, name=""), because the only text is display:none and the icon is aria-hidden. Fails WCAG 2.4.4 / 4.1.2 and brief §9 "Accessible" on all 45 pages. A page-scoped workaround is live in src/css/page-we-offer-financing.css (`.tpl-we-offer-financing .hcall__txt`), which only fixes /we-offer-financing/; it can be removed once header.css is fixed.

---
<!-- earlier applied requests from this piece -->
<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: src/data/pages.mjs routes we-offer-financing/ to the we-offer-financing template.

# Request from page-we-offer-financing

File: src/data/pages.mjs (line 17)
Change: `P('we-offer-financing/', 'We Offer Financing', 'We Offer Financing', 'financing'),` → `P('we-offer-financing/', 'We Offer Financing', 'We Offer Financing', 'we-offer-financing'),`
Why: the full, price-stripped Financing page (brief §7) is built in src/pages/we-offer-financing.mjs; the slug still routes to the round-1 stub src/pages/financing.mjs. Styles are in src/css/page-we-offer-financing.css (all .fin-* scoped, inert until the route changes). After the switch src/pages/financing.mjs is unused and can be deleted by its owner.
