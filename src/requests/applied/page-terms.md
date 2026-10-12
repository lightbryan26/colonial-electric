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
