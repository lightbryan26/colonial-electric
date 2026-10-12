<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - APPLIED: #1. The src/partials/footer.mjs lockup is now `loading="eager" fetchpriority="low" decoding="sync"`. It paints in full-page captures. On 404.html the build rewrites it to lazy, see the 404 note in src/build.mjs.
> - APPLIED: #2. src/scripts/descriptions.mjs `override` now has 'terms/'. It also has 'lighting-additions/', so a regeneration keeps the earlier integrator fix. Re-ran the generator: only "terms/" changed in src/data/descriptions.json. The terms.mjs runtime workaround sets the same string and was left in place.

# Requests from page-terms (round 3)

1. File: src/partials/footer.mjs, line 19 (the `.site-footer__logo` `<img>`, owner: footer/partials)
   Change: `alt="Colonial Electric" loading="lazy" decoding="async">` -> `alt="Colonial Electric" loading="eager" fetchpriority="low" decoding="sync">`
   Why: in every tools/shot.mjs full-page capture the footer lockup is an empty 152x158 gap left of the big phone number, on all 45 pages and at all widths, so each blind composite shows a broken-looking footer. Making it eager is not enough on its own. I reproduced the same blank on the page-terms closing band photo, which was eager and complete (naturalWidth 1280) but stayed unpainted in the fullPage capture until `decoding="sync"` was set; with sync it renders. The file is about 34KB, so loading it eagerly with low fetch priority costs real users almost nothing. Workaround inside page-terms: the .lg-cta photo already uses loading="eager" fetchpriority="low" decoding="sync".

# Requests from page-terms (round 5)

2. File: src/scripts/descriptions.mjs (the `override` object, line 6-9) and src/data/descriptions.json (line 43, key "terms/"), owner: shared data/scripts
   Change: add `'terms/': 'Welcome to Colonial Electric (“Company”, “we”, “our”, “us”)!',` to `override`, and set "terms/" in descriptions.json to that same string (or just re-run `node src/scripts/descriptions.mjs` after adding the override).
   Why: QA round 4 (brief §9 Meta). The generator skips Terms' 60-char first sentence (under its 70-char paragraph filter) and its sentence regex then cuts the next sentence at the "." inside "colonial-electric.com/", so the stored value is the fragment "com/ (together or individually “Service”) operated by Colonial Electric .". Workaround already live: src/pages/terms.mjs sets ctx.page.description to the first verbatim sentence of the Terms source before layout runs, so docs/terms/index.html (description, og:description, twitter:description) is correct now. The data fix keeps descriptions.json honest for any other consumer. privacy/ is fine as is.

---
<!-- earlier applied requests from this piece -->
<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: #1, src/data/pages.mjs routes terms/ and privacy/ to the terms and privacy templates.
> - APPLIED: #2, src/build.mjs section 4 now renders src/pages/notfound.mjs (`const { render } = await import('./pages/notfound.mjs'); const main = await render(ctx);`). The page object, the base-path <base> script and the noindex injection are unchanged. Verified by serving docs/404.html at deep missing URLs under /colonial-electric/ and at /. The base resolves correctly, site.css loads, every link resolves from the site root, there is no horizontal scroll at 1440 or 375, and robots=noindex.

# Request from page-terms

1. File: src/data/pages.mjs (last two entries)
   Change:
   `P('terms/', 'Terms & Conditions', 'Terms & Conditions', 'legal', { source: 'terms' }),` → `P('terms/', 'Terms & Conditions', 'Terms & Conditions', 'terms'),`
   `P('privacy/', 'Privacy Policy', 'Privacy Policy', 'legal', { source: 'privacy' }),` → `P('privacy/', 'Privacy Policy', 'Privacy Policy', 'privacy'),`
   Why: the full legal pages (brief §7) are built in src/pages/terms.mjs and src/pages/privacy.mjs; the slugs still route to the round-1 stub src/pages/legal.mjs (which can be deleted by its owner afterwards). Body class becomes tpl-terms / tpl-privacy; all styles are .lg-* scoped in src/css/page-terms.css.

2. File: src/build.mjs, section "4. 404"
   Change: replace the inline `const { icon } = await import('./partials/icons.mjs'); const main = `<section class="page-hero page-hero--404 ...`;` with
   `const { render } = await import('./pages/notfound.mjs'); const main = await render(ctx);`
   (keep the page object, baseTag, makeCtx call and the writeAtomic/noindex line exactly as they are).
   Why: the branded 404 (brief §7: brand styling, Call Now, link home) lives in src/pages/notfound.mjs; it uses ctx.r() so it resolves through the existing base-path <base> tag at any depth. Styles are .nf-* scoped in src/css/page-terms.css.
