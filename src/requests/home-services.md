# Request from home-services

## src/css/base.css — `.btn--outline`
- Change: give `.btn--outline` the same chamfer-true keyline technique as `.btn--ghost` (outer fill = navy keyline, `::before` inner fill = paper/transparent), instead of `box-shadow: inset 0 0 0 1.5px var(--navy)` under the chamfer `clip-path`.
- Why: the chamfer clip cuts the inset keyline at the two clipped corners, so the outline button renders with broken corners (visible next to the red phone CTA in #s-services). Workaround in home-services.css: `.hsvc__actions .btn--outline { clip-path: none; }`.
