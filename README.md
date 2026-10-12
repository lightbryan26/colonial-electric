# Colonial Electric — site rebuild (pitch build)

Static multi-page rebuild of colonial-electric.com. Built site lives in `docs/` (served by GitHub Pages). Brief: `colonial-electric-rebuild-prompt.md`.

## Cut-over notes

Steps for when colonial-electric.com moves from the live WordPress site to this build:

- Switch the og:image / twitter:image / JSON-LD image and logo origin back to colonial-electric.com: set `site.assetOrigin` in `src/data/site.mjs` to `site.origin` (it points at the GitHub Pages pitch host until then).
- Swap the preview contact form for the live GoHighLevel widget `wVkjdlLGFrTr6qBocTaL` (brief §11, item 7).
