# Request from page-leave-us-a-review (ROUND 2 — BLOCKING, still unapplied)

The round-1 critic judged the STUB (src/pages/review.mjs), not the real page, because this route change was never applied.

File: src/data/pages.mjs (line 18)
Change: `P('leave-us-a-review/', 'Leave Us a Review', 'Leave Us a Review', 'review'),` → `P('leave-us-a-review/', 'Leave Us a Review', 'Leave Us a Review', 'leave-us-a-review'),`
(Alternative with identical effect: replace the whole body of src/pages/review.mjs with `export { render } from './leave-us-a-review.mjs';`.)
Why: the full page (photo hero, portrait + lead intro, pinned-CTA platform cards, labelled town list — all round-2 QA fixes) lives in src/pages/leave-us-a-review.mjs + src/css/page-leave-us-a-review.css (.lr-* scoped). Verified via a scratch build with the route swapped (shots/lrprev.sh): no horizontal scroll, no errors at 1440/375.

Also (tool owner): tools/blind.py throws NameError — move `H=max(A.height,B.height)+80` onto its own line before `Image.new` (outside the elif).

Client flag: the live Facebook button links to the Google review URL (live defect); the rebuild uses a Facebook search for "Colonial Electric Weymouth MA" until the client supplies the real page URL.
