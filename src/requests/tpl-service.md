# Requests from tpl-service

## 1. src/data/descriptions.json — fix /lighting-additions/ meta description
Change: `"lighting-additions/"` value from
"Many people tend to underestimate the risks associated with DIY ceiling fan installation."
to the first verbatim sentence of its real block (block B):
"Because of just how impactful having the right lighting is, lighting additions in a home or business has become an essential aspect of modern living and design."
(149 chars, under the 160 limit.)
Why: the current text is the ceiling-fan copy pasted by mistake on the live page (brief §5 + §10: "do not reproduce live-site defects"). The page body no longer shows it, but the meta/og/twitter description still does.

## 2. src/pages/outdoor-lighting.mjs — now unused (FYI, optional delete by its owner/orchestrator)
The /permanent-outdoor-lighting/ variant is rendered by src/pages/service.mjs (task: one template incl. the variant).
src/data/services.mjs now flags that entry `outdoor: true` instead of `variant: true`, so pages.mjs routes it to the
`service` template with no change to pages.mjs. outdoor-lighting.mjs is no longer imported by anything.

## 3. tools/blind.py (tools owner) — NameError H
Move `H=max(A.height,B.height)+80` off the `elif` line onto its own line after the if/elif block, so it runs in every branch. Patched copy exists at shots/blind_fixed.py.
Why: QA round 2 composite crashed.

## 4. src/blocks/guarantee.mjs / src/css/block-guarantee.css (block-guarantee owner) — FYI
Verified at round 2: certificate renders at full opacity at 1440 and 375 and clauses run 01/02/03. If a scroll-reveal is ever added, keep content at opacity 1 by default and gate the hidden state on a JS-added class (IntersectionObserver), as tpl-service does with .svp-io. tpl-service.css now carries a defensive `.tpl-service .gx… { opacity:1; filter:none }` guard.
