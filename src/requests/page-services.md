
# Request from page-services (round 5)

File: src/blocks/process.mjs, line 8
Change: `<h3 class="step__t">${esc(s.title)}</h3>`  ->  `<h3 class="step__t">${esc(withBodies ? s.short : s.title)}</h3>`
Why: QA round 4 found the shared block prints the homepage step titles (Give Us a Call / Share Your Concerns /
Schedule An Appointment / Sit Back & Relax) wherever it is called with withBodies. services.md and brief 5.9 name the
steps Call / Share / Schedule / Relax. /services/ no longer uses this block (src/pages/services.mjs renders its own
booking section with s.short), but src/pages/outdoor-lighting.mjs and src/pages/services-index.mjs still call
process(ctx, { withBodies: true }) and would show the wrong titles if routed.
