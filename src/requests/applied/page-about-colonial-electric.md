<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: #1, src/data/pages.mjs routes about-colonial-electric/ to the about-colonial-electric template.
> - APPLIED: #2, the sticky call bar stays hidden while the hero is on screen. src/partials/callbar.mjs renders `class="callbar is-hidden"`. src/js/base.js runs an IntersectionObserver on `main > section` and toggles .is-hidden; it removes the class if there is no hero or no IO. src/css/header.css: `.is-hidden` now also sets visibility:hidden, delayed until the slide finishes, so off-screen links leave the tab order, and a new `@media (scripting: none)` rule keeps the bar visible without JS. Verified at 375: hidden at the top, shown below the hero and at the page bottom, shown with JS disabled; display:none at 1440.
> - NOTE for the page owner: the CSS-only workaround block at the end of src/css/page-about-colonial-electric.css (`body:is(.tpl-about-colonial-electric, .tpl-about) .callbar { transform...; visibility: hidden }` plus a scroll() timeline) can now be deleted. It overrides the sitewide toggle. In browsers without animation-timeline (Firefox) it also keeps the bar hidden on /about-colonial-electric/ for good, even with JS on or off.

# Request from page-about-colonial-electric  (ROUND 2 — BLOCKING, please apply first)

## 1. [ROUND 3: worked around — src/pages/about.mjs now re-exports render from about-colonial-electric.mjs; switching pages.mjs template is still the cleaner fix] Route the slug to the finished page (was BLOCKING — the round-1 QA failure was caused by this)
File: src/data/pages.mjs (line 10)
Change: `P('about-colonial-electric/', 'About Us', 'About Us', 'about'),` → `P('about-colonial-electric/', 'About Us', 'About Us', 'about-colonial-electric'),`
Why: the full About Us page (Founder/Scott Hays bio with photo, Mission, Vision, 5 pillars — all verbatim) is built in src/pages/about-colonial-electric.mjs, but the slug still routes to the round-1 stub src/pages/about.mjs, which is exactly what the critic saw ("goes straight from Meet the Man to Contact Us Today"). After the switch, src/pages/about.mjs is unused and can be deleted by its owner. Body class becomes tpl-about-colonial-electric (styles in src/css/page-about-colonial-electric.css are scoped to .ab-* and that class).
Verified preview of the routed result: http://127.0.0.1:8080/shots/about-preview/ (rendered by shots/ab-preview.mjs).

## 2. Sticky call bar should start hidden until the hero leaves the viewport (site-wide)
Files: src/js/base.js + src/css/header.css (owner: header/partials)
Change: in base.js add
  var cb = doc.querySelector('[data-callbar]'); if (cb) { var hero = doc.querySelector('main > section'); cb.classList.add('is-hidden');
    var io = new IntersectionObserver(function (e) { cb.classList.toggle('is-hidden', e[0].isIntersecting); }); if (hero) io.observe(hero); else cb.classList.remove('is-hidden'); }
and in header.css render `.callbar` initially with `is-hidden` (or add the class in src/partials/callbar.mjs) so it never covers hero/intro copy on first paint. body padding-bottom (header.css:172) already equals bar height.
Why: QA at 375px flagged the bar covering intro copy. I have a CSS-only scroll-timeline workaround for the About page in my own CSS meanwhile.
