# Requests from page-terms (round 3)

1. File: src/partials/footer.mjs, line 19 (the `.site-footer__logo` `<img>`, owner: footer/partials)
   Change: `alt="Colonial Electric" loading="lazy" decoding="async">` -> `alt="Colonial Electric" loading="eager" fetchpriority="low" decoding="sync">`
   Why: in every tools/shot.mjs full-page capture the footer lockup is an empty 152x158 gap left of the big phone number, on all 45 pages and at all widths, so each blind composite shows a broken-looking footer. Making it eager is not enough on its own. I reproduced the same blank on the page-terms closing band photo, which was eager and complete (naturalWidth 1280) but stayed unpainted in the fullPage capture until `decoding="sync"` was set; with sync it renders. The file is about 34KB, so loading it eagerly with low fetch priority costs real users almost nothing. Workaround inside page-terms: the .lg-cta photo already uses loading="eager" fetchpriority="low" decoding="sync".

# Requests from page-terms (round 5)

2. File: src/scripts/descriptions.mjs (the `override` object, line 6-9) and src/data/descriptions.json (line 43, key "terms/"), owner: shared data/scripts
   Change: add `'terms/': 'Welcome to Colonial Electric (“Company”, “we”, “our”, “us”)!',` to `override`, and set "terms/" in descriptions.json to that same string (or just re-run `node src/scripts/descriptions.mjs` after adding the override).
   Why: QA round 4 (brief §9 Meta). The generator skips Terms' 60-char first sentence (under its 70-char paragraph filter) and its sentence regex then cuts the next sentence at the "." inside "colonial-electric.com/", so the stored value is the fragment "com/ (together or individually “Service”) operated by Colonial Electric .". Workaround already live: src/pages/terms.mjs sets ctx.page.description to the first verbatim sentence of the Terms source before layout runs, so docs/terms/index.html (description, og:description, twitter:description) is correct now. The data fix keeps descriptions.json honest for any other consumer. privacy/ is fine as is.
