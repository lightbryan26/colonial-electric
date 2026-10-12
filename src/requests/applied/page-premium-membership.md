<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - APPLIED: #1. src/blocks/contact-cta.mjs photo() now emits `decoding="sync"` on the initial town photo. The page's own syncDecode() wrapper is now redundant for that image but harmless, so it was left in place.
> - APPLIED: #2. The tools/shot.mjs scroll pass uses `scrollTo({ top: y, behavior: 'instant' })`, so `html { scroll-behavior: smooth }` no longer slows it.
> - ALREADY DONE: #3 and #5. tools/progress.mjs creates docs/build-progress/shots/ before copying.
> - REJECTED: #4. The brief is binding and lists the only typo fixes allowed. An integrator cannot amend it, so "thats" stays verbatim in the page and in the meta description. The brief owner or orchestrator should decide, and it could go on the §11 client-flag list.

# Round 2 requests from page-premium-membership (worked around locally; FYI for other owners)
1. File: src/blocks/contact-cta.mjs (owner block-contact-cta), function photo(): change `decoding="async"` to `decoding="sync"` (or drop the attribute) on the initial town photo.
   Why: in tools/shot.mjs full-page captures at 1440 the Weymouth photo intermittently paints as an empty navy frame (measured: 3 of 4 captures blank with async, 4 of 4 correct with sync). premium-membership works around it by rewriting decoding="async" to "sync" in its own render output.
2. File: tools/shot.mjs (or src/css/base.css `html { scroll-behavior: smooth }`): the capture's scroll pass uses scrollTo(0, y), which is smoothed by the global scroll-behavior, so it never reaches the lower half of long pages and loading="lazy" images there stay unloaded (blank) in full-page shots. Change: in shot.mjs use `scrollTo({ top: y, behavior: 'instant' })` (or set `document.documentElement.style.scrollBehavior = 'auto'` before the loop).
   Why: affects every long page with lazy photos below ~3000px. premium-membership works around it by loading its two below-the-fold photos eagerly (fetchpriority="low").

# Round 3 request from page-premium-membership
3. File: tools/progress.mjs (line 11): add `fs.mkdirSync(dir + 'shots', { recursive: true });` before `fs.copyFileSync(img, dir+shot)`.
   Why: docs/build-progress/shots/ no longer exists, so every progress call that passes an image path crashes with ENOENT (copyfile) and the update is not written. page-premium-membership posted its round 2 "lost" and round 3 updates without the image as a workaround.

# Round 4 requests from page-premium-membership
4. File: colonial-electric-rebuild-prompt.md §7 /premium-membership/ (brief owner / orchestrator): add "thats" -> "that's" to the allowed typo fixes for intro paragraph 1 ("...we mean it, and thats exactly what sets us apart from the rest."), and to §11 if it should be raised with the client.
   Why: the round 3 critic called out "thats" as a visible copy error that undercuts the premium feel, but the brief allows only the listed typo fixes, so the page still carries it verbatim (also in the page's meta/OG description, which comes from src/data/pages.mjs). Once approved, it is a one-word change in src/pages/premium-membership.mjs (intro.paras[0]) plus the description in src/data/pages.mjs.
5. Still open (same as request 3): tools/progress.mjs crashes with ENOENT when an image path is passed because docs/build-progress/shots/ does not exist. Round 4 "lost" update was posted without the blind-r3.jpg image.

---
<!-- earlier applied requests from this piece -->
<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: src/data/pages.mjs routes premium-membership/ to the premium-membership template.

# Request from page-premium-membership

File: src/data/pages.mjs (line with `P('premium-membership/', 'Flash Pass Membership', 'Flash Pass Membership', 'membership')`)
Change: change the template from `'membership'` to `'premium-membership'`, i.e.
  P('premium-membership/', 'Flash Pass Membership', 'Flash Pass Membership', 'premium-membership'),
(Alternative with identical effect: replace the body of src/pages/membership.mjs with `export { render } from './premium-membership.mjs';` — keeps body class tpl-membership; my CSS is scoped to .pm-* classes so either works.)
Why: the full Flash Pass Membership page (brief §7: hero, intro, interactive bolt with 4 benefits, shared blocks, Save Big; no price) lives in src/pages/premium-membership.mjs (owned by page-premium-membership). Until this lands, /premium-membership/ still renders the round-1 stub in src/pages/membership.mjs.
