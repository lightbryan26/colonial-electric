
# Request from page-we-offer-financing (round 5)

File: src/css/header.css (line ~126, inside `@media (max-width: 599px)`)
Change: replace `.hcall__txt { display: none; }` with
`.hcall__txt { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }`
(or, alternatively, add `aria-label="Call Us Today! ${site.phone}"` to `<a class="hcall">` in src/partials/header.mjs line ~66).
Why: at 599px and below the header click-to-call link `<a class="hcall" href="tel:+17812878729">` has an EMPTY accessible name (Chromium AX tree at 375: role=link, name=""), because the only text is display:none and the icon is aria-hidden. Fails WCAG 2.4.4 / 4.1.2 and brief §9 "Accessible" on all 45 pages. A page-scoped workaround is live in src/css/page-we-offer-financing.css (`.tpl-we-offer-financing .hcall__txt`), which only fixes /we-offer-financing/; it can be removed once header.css is fixed.
