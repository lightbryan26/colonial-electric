<!-- integrator pass 1.1 2026-10-12 -->
> **Integrator pass 1.1 2026-10-12**
> - APPLIED: src/blocks/process.mjs prints `s.short` (Call / Share / Schedule / Relax) when `withBodies` is set. After this pass deleted the stubs outdoor-lighting.mjs and services-index.mjs, no page calls process(). services.mjs only imports quoteBlock, so this change has no visible effect today.

# Request from page-services (round 5)

File: src/blocks/process.mjs, line 8
Change: `<h3 class="step__t">${esc(s.title)}</h3>`  ->  `<h3 class="step__t">${esc(withBodies ? s.short : s.title)}</h3>`
Why: QA round 4 found the shared block prints the homepage step titles (Give Us a Call / Share Your Concerns /
Schedule An Appointment / Sit Back & Relax) wherever it is called with withBodies. services.md and brief 5.9 name the
steps Call / Share / Schedule / Relax. /services/ no longer uses this block (src/pages/services.mjs renders its own
booking section with s.short), but src/pages/outdoor-lighting.mjs and src/pages/services-index.mjs still call
process(ctx, { withBodies: true }) and would show the wrong titles if routed.

---
<!-- earlier applied requests from this piece -->
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
