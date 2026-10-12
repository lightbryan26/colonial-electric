<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - APPLIED: src/css/base.css `.btn--outline` now gets a chamfer-true keyline. Instead of a ::before inner fill, `::after` draws an octagonal ring with `clip-path: polygon(evenodd, outer, inner)`, so the interior is truly transparent on white, paper or photo grounds. The inner points are offset by kl*0.414 so the diagonal stroke matches the straight edges. Removed the old inset box-shadow. Also removed `clip-path: none` from the `.hsvc__actions .btn--outline` workaround in src/css/home-services.css (kept its `min-height: 3.5rem`), because an unclipped button would square off the paper hover fill. Checked at 1440 and 375 on home #s-services, /we-offer-financing/ .fin-pq and the /calendar/ fallback card.

# Request from home-services

## src/css/base.css — `.btn--outline`
- Change: give `.btn--outline` the same chamfer-true keyline technique as `.btn--ghost` (outer fill = navy keyline, `::before` inner fill = paper/transparent), instead of `box-shadow: inset 0 0 0 1.5px var(--navy)` under the chamfer `clip-path`.
- Why: the chamfer clip cuts the inset keyline at the two clipped corners, so the outline button renders with broken corners (visible next to the red phone CTA in #s-services). Workaround in home-services.css: `.hsvc__actions .btn--outline { clip-path: none; }`.
