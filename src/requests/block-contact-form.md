# Requests from block-contact-form

## 1. src/css/blocks.css — remove dead contact-form rules
- File: src/css/blocks.css, the `/* contact form */` group (`.cform`, `.cform__grid`, `.field*`, `.cform .btn`, `.cform__status*`).
- Change: delete those rules.
- Why: the shared form block now renders cf-* classes only (styled in src/css/block-contact-form.css), so those selectors no longer match anything and are dead weight in site.css.

## 2. src/data/images.json (optional) — register the new crop
- New real-photo crop (from source/images/owner-van.jpg, no AI): src/assets/img/cf-scott-van-{420,580}.{webp,jpg}, 580x840.
- The block builds its own <picture> today; registering it as key `cf-scott-van` (w 580, h 840, widths [420,580], fallback jpg) would let it use picture() instead. Not required.
