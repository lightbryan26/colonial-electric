<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: src/data/pages.mjs routes services/ to the services template.

# Request from page-services — URGENT / BLOCKING (round 2)

The round-1 blind critic and QA judged the OLD STUB (src/pages/services-index.mjs), not the real page.
Every QA "missing content" item (Premium Residential section, 3 category blocks, photography) already exists in
src/pages/services.mjs but is never rendered because /services/ is still routed to the stub.

File: src/data/pages.mjs, line 11
Change:  P('services/', 'Services', 'Services', 'services-index'),
     ->  P('services/', 'Services', 'Services', 'services'),
(Equivalent alternative: replace the whole body of src/pages/services-index.mjs with
 `export { render } from './services.mjs';`)
Why: the full /services/ page (brief §7) lives in src/pages/services.mjs (owned by page-services).
Preview of the real page meanwhile: http://127.0.0.1:8080/shots/pv/services.html (node shots/preview-services.mjs).
