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
