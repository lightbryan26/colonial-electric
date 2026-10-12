<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - ALREADY DONE: #0 routing and #2 tools/blind.py `H`.
> - ALREADY DONE: #1. src/css/block-contact-form.css has no `cf-rise` or view() timeline on .cf-set/.cf-consent/.cf-actions. APPLIED as follow-up: deleted the now-dead page workaround (`.cu-form .cf-set … { opacity:1 }`, `animation-name: cu-cf-drift`, the reduced-motion reset and `@keyframes cu-cf-drift`) from src/css/page-contact-us.css. Fields render at full opacity in full-page captures at 1440 and 375.
> - ALREADY DONE: #3. `.cf-photo picture` is styled and `.cf-trust` has `list-style: none` with inline icons. "24/7" appears in the built site only in docs/index.html (homepage FAQ 7 copy and its FAQPage JSON-LD).
> - APPLIED: #4. In src/css/footer.css, `.site-footer__fact dt`, `.site-footer__h` and `.site-footer__all` changed from .6875rem to .75rem (12px), with letter-spacing set to .12em. Checked at 1440 and 375.

<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12 (file stays in src/requests/: has SKIPPED items)**
> - ALREADY DONE: #0, src/data/pages.mjs routes contact-us/ to the contact-us template.
> - SKIPPED (owned by an in-flight piece): #1 targets src/css/block-contact-form.css, which is being edited now. At this pass the file no longer has a view()-timeline `cf-rise` that hides fields. The only opacity-0 keyframe is the time-based `cf-in` on .cf-status. The owner should confirm and close.
> - ALREADY DONE: #2, tools/blind.py `H` NameError fixed.
> - SKIPPED (owned by an in-flight piece): #3 targets src/blocks/contact-form.mjs and its CSS, both in flight. At this pass `.cf-photo picture/img` rules exist in the CSS, and "24/7" appears in the built site only in the home FAQ (visible copy plus FAQPage JSON-LD). The owner should confirm and close.

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

# Requests from page-contact-us (round 4)

## 4. src/css/footer.css (owner: footer/shared) — raise footer micro-labels to 12px
- Lines ~74, ~109, ~131: footer labels use `font: 700 .6875rem/1 var(--f-wide)` (11px): `.site-footer__fact dt`, the column headings (`.site-footer__h`) and the bottom-row label link style.
- Change: `.6875rem` -> `.75rem` on those three rules (keep letter-spacing; optionally drop .16em to .12em so the wider glyphs keep the same line length).
- Why: the round-3 blind critic flagged "tiny micro-labels (eyebrows, form labels, consent text, footer links)" as hard to read. The page-owned labels and the shared form labels on /contact-us/ are now 12–14px (scoped in src/css/page-contact-us.css); the footer is shared on all 45 pages, so it must change in footer.css, not in a page file.
