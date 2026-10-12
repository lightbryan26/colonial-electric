
# Round 2 requests from page-premium-membership (worked around locally; FYI for other owners)
1. File: src/blocks/contact-cta.mjs (owner block-contact-cta), function photo(): change `decoding="async"` to `decoding="sync"` (or drop the attribute) on the initial town photo.
   Why: in tools/shot.mjs full-page captures at 1440 the Weymouth photo intermittently paints as an empty navy frame (measured: 3 of 4 captures blank with async, 4 of 4 correct with sync). premium-membership works around it by rewriting decoding="async" to "sync" in its own render output.
2. File: tools/shot.mjs (or src/css/base.css `html { scroll-behavior: smooth }`): the capture's scroll pass uses scrollTo(0, y), which is smoothed by the global scroll-behavior, so it never reaches the lower half of long pages and loading="lazy" images there stay unloaded (blank) in full-page shots. Change: in shot.mjs use `scrollTo({ top: y, behavior: 'instant' })` (or set `document.documentElement.style.scrollBehavior = 'auto'` before the loop).
   Why: affects every long page with lazy photos below ~3000px. premium-membership works around it by loading its two below-the-fold photos eagerly (fetchpriority="low").
