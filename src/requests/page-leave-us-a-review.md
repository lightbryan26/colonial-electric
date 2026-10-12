# Request from page-leave-us-a-review

File: src/data/pages.mjs (line 18)
Change: `P('leave-us-a-review/', 'Leave Us a Review', 'Leave Us a Review', 'review'),` → `P('leave-us-a-review/', 'Leave Us a Review', 'Leave Us a Review', 'leave-us-a-review'),`
(Alternative with identical effect: replace the body of src/pages/review.mjs with `export { render } from './leave-us-a-review.mjs';`.)
Why: the full Leave Us a Review page (brief §7) now lives in src/pages/leave-us-a-review.mjs; the slug still routes to the round-1 stub src/pages/review.mjs. Styles are in src/css/page-leave-us-a-review.css, all scoped to .lr-* (inert until the route changes; not tied to the body class).
Client flag: the live Facebook button links to the Google review URL (live defect); the rebuild uses a Facebook search for "Colonial Electric Weymouth MA" until the client supplies the real page URL.
