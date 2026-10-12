<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - APPLIED: deleted the stub src/pages/review.mjs. Nothing in src/data/pages.mjs or src/ referenced it.
> - ALREADY DONE: tools/blind.py `H` sits on its own line after the if/elif.
> - NO CHANGE: the client flag (§11 item 6, Facebook review URL) is a note, not a code request.

# Requests from page-leave-us-a-review

## RESOLVED (round 3)
The route change was applied: src/data/pages.mjs now maps `leave-us-a-review/` to the `leave-us-a-review` template
(body.tpl-leave-us-a-review). The `body.tpl-review` workaround block has been deleted from
src/css/page-leave-us-a-review.css. No shared-file changes are pending for this piece.

Optional cleanup (owner of src/pages/review.mjs): that stub is no longer routed by any page and could be deleted.

## Still open (tool owner)
tools/blind.py: if it still throws NameError, move `H=max(A.height,B.height)+80` onto its own line before `Image.new` (outside the elif).

## Client flag (brief §11 item 6)
The live "Leave a Facebook Review" button links to the Google review URL (live defect). The rebuild links to a Facebook
search for "Colonial Electric Weymouth MA" until the client supplies the real Facebook page URL.
