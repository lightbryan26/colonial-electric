# Requests from page-contact-us (round 2)

## 0. BLOCKER — src/data/pages.mjs (owner: build/data) — route /contact-us/ to the new template
- Line 15: `P('contact-us/', 'Contact Us', 'Contact Us', 'contact'),`
- Change: `P('contact-us/', 'Contact Us', 'Contact Us', 'contact-us'),`
- Why: the designed page lives in src/pages/contact-us.mjs (+ src/css/page-contact-us.css). The slug still renders the placeholder src/pages/contact.mjs, so the live /contact-us/ shows the scaffold (generic cards + unstyled form) and none of the page-contact-us work. After the change, src/pages/contact.mjs is unused and can be deleted by its owner.

## 1. src/css/block-contact-form.css (owner: block-contact-form) — never hide form fields
- Lines ~238-242: `.cf-set, .cf-consent, .cf-actions { animation: cf-rise ... animation-timeline: view() }` with `cf-rise` starting at `opacity: 0`.
- Change: make `cf-rise` transform-only: `@keyframes cf-rise { from { transform: translateY(24px); } to { transform: none; } }` (drop both opacity stops).
- Why: a scroll-driven view() timeline that is never scrolled (full-page captures, embeds, some print paths) leaves the fields at opacity 0 -> blank form, which failed QA. Workaround already live in src/css/page-contact-us.css (`.cu-form .cf-set ... { animation-name: cu-cf-drift }`), but every other page using the block still has the bug.

## 2. tools/blind.py (tooling owner) — NameError
- Line 10: `H=max(A.height,B.height)+80` is attached to the `elif` line, so it only runs in that branch.
- Change: move `H=max(A.height,B.height)+80` to its own unindented line after the if/elif block.

## 3. FYI block-contact-form (observed 2026-10-12 build, mid-edit?)
- New markup (`.cf-photo > picture`, no `.cf-photo__frame`; trust `<ul>` with icons) does not match the current CSS: the founder photo renders as an empty navy box in full-page captures and the trust list shows default bullets with icons on their own lines.
- "Emergency support: We provide 24/7 service." — check against source/pages/*.md; the live hours are 8:00 AM – 4:00 PM, so a 24/7 claim may be invented copy.
