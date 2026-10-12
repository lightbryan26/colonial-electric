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
