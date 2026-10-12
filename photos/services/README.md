# Service hero photos

Drop one real Colonial Electric job photo per service in this folder. Good sources are Colonial's Instagram and its Google Business Profile. Each photo replaces the drawn service illustration in that page's hero (src/pages/service-art.mjs). Until a service has a photo, its hero keeps the illustration.

Rules (brief §8): real Colonial photos only, so no AI-generated images, no stock and no screenshots with overlays. Do not use the founder portrait or the van photo here. Those already appear elsewhere on the site.

## Expected filenames

Name each file after the page slug. `.jpg`, `.jpeg`, `.png` and `.webp` are all accepted.

| File | Service | Page |
|---|---|---|
| `permanent-outdoor-lighting.jpg` | Permanent Outdoor Lighting | `permanent-outdoor-lighting/` |
| `electrical-outlets.jpg` | Electrical Outlets | `electrical-outlets/` |
| `electrical-panel-upgrade.jpg` | Electrical Panel Upgrade | `electrical-panel-upgrade/` |
| `surge-protection.jpg` | Surge Protection | `surge-protection/` |
| `ceiling-fan-installation.jpg` | Ceiling Fan Installation | `ceiling-fan-installation/` |
| `ev-charger-installation.jpg` | EV Charger Installation | `ev-charger-installation/` |
| `whole-house-wiring-or-rewiring.jpg` | Whole House Wiring/Rewiring | `whole-house-wiring-or-rewiring/` |
| `electrical-inspections.jpg` | Electrical Inspection | `electrical-inspections/` |
| `recessed-lighting.jpg` | Recessed Lighting | `recessed-lighting/` |
| `remodels.jpg` | Remodels | `remodels/` |
| `lighting-additions.jpg` | Lighting Additions | `lighting-additions/` |
| `whole-home-battery-back-up.jpg` | Whole Home Battery Back Up | `whole-home-battery-back-up/` |
| `generator.jpg` | Generators | `generator/` |

## Command

Run this from the project root:

```
node src/scripts/service-photos.mjs && node src/build.mjs
```

The script writes `src/assets/img/services/<slug>-{640,960,1280,1600}.webp` and `.jpg`. It never upscales: widths larger than the source are skipped, and a source narrower than 1600px also gets a copy at its own width. It then merges `services/<slug>` into `src/data/images.json` and leaves every other key alone. Any file whose name is not a service slug is skipped with a warning. If you delete a photo and run the command again, that page goes back to its illustration.

## Size and crop

- Use at least 1600px wide if you can.
- On desktop the hero crops the photo to a 4:5 portrait frame. Below 960px it crops to a square. Keep the subject near the centre.
- If the crop needs moving, add `heroFocus: "50% 30%"` (a CSS object-position) to that service in `src/data/services.mjs`.
- The default alt text is "<Service name> by Colonial Electric". To describe what the photo actually shows, add `heroAlt: "..."` to that service. Only state facts that are true of that photo.
