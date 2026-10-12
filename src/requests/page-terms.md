# Requests from page-terms (round 3)

1. File: src/partials/footer.mjs, line 19 (the `.site-footer__logo` `<img>`, owner: footer/partials)
   Change: `alt="Colonial Electric" loading="lazy" decoding="async">` -> `alt="Colonial Electric" loading="eager" fetchpriority="low" decoding="sync">`
   Why: in every tools/shot.mjs full-page capture the footer lockup is an empty 152x158 gap left of the big phone number, on all 45 pages and at all widths, so each blind composite shows a broken-looking footer. Making it eager is not enough on its own. I reproduced the same blank on the page-terms closing band photo, which was eager and complete (naturalWidth 1280) but stayed unpainted in the fullPage capture until `decoding="sync"` was set; with sync it renders. The file is about 34KB, so loading it eagerly with low fetch priority costs real users almost nothing. Workaround inside page-terms: the .lg-cta photo already uses loading="eager" fetchpriority="low" decoding="sync".
