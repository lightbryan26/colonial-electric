# Photo manifest

Every photo in this folder is a real Colonial Electric job photo from Colonial's own WordPress media library on colonial-electric.com. The client approved them for this site. There are no stock photos, no AI images and no illustrations.

The files here are the source of truth. Each one was downloaded at full size, rotated per its EXIF orientation, cropped as listed below, and saved as JPEG quality 90 with the longest side capped at 3000px. All metadata, including any GPS, is stripped.

Privacy rules:

- No customer face, house number or street address is visible in any crop.
- Filenames, alt text and this manifest never carry a customer name or a street address. Several WordPress filenames do, so those photos are renamed by service here. Their source is listed by media id only. `https://colonial-electric.com/?attachment_id=<id>` redirects to the file.

Crop boxes are in pixels of the WordPress original, written as x1,y1 to x2,y2.

## Commands

```
node src/scripts/service-photos.mjs   # photos/services/<slug>.jpg  -> src/assets/img/services/<slug>-<w>.webp/.jpg, key 'services/<slug>'
node src/scripts/library-photos.mjs   # photos/library/<name>.jpg   -> src/assets/img/photos/<name>-<w>.webp/.jpg, key 'photos/<name>'
node src/build.mjs
```

Neither script upscales. A source narrower than the largest width also gets a copy at its own width.

## Service heroes (photos/services/)

The hero frame is 4:5 on desktop and square below 960px. `heroFocus` is the object-position for the square frame. Put it, with `heroAlt`, on that service in `src/data/services.mjs`.

| File | images.json key | Media id | Source | Source size | Crop applied | Saved size | heroFocus | Alt text |
|---|---|---|---|---|---|---|---|---|
| `services/electrical-panel-upgrade.jpg` | `services/electrical-panel-upgrade` | 337007 | https://colonial-electric.com/wp-content/uploads/2026/08/2026-01-06.jpg | 1686x2248 | 4:5, 150,90 to 1386,1635. Drops the oil tank on the right and most of the floor. | 1236x1545 | `50% 45%` | New main breaker enclosure between two breaker panels on a diamond-plate backboard, installed by Colonial Electric |
| `services/generator.jpg` | `services/generator` | 337051 | https://colonial-electric.com/?attachment_id=337051 (filename withheld: customer name) | 1920x2560 | 4:5, 30,250 to 1130,1625. Drops the unrelated beige box, the storage clutter and the toy. | 1100x1375 | `50% 35%` | Generac transfer switch mounted beside a breaker panel labelled for generator power, installed by Colonial Electric |
| `services/surge-protection.jpg` | `services/surge-protection` | 337010 | https://colonial-electric.com/?attachment_id=337010 (filename withheld: street address) | 1080x1350 | 4:5, 250,230 to 850,980. The surge device sits in the upper-left third. | 600x750 | `50% 40%` | Plug-in surge protective device in a Siemens breaker panel, installed by Colonial Electric |
| `services/recessed-lighting.jpg` | `services/recessed-lighting` | 3201 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_2845-1.jpg | 640x480 | 4:5, 150,0 to 534,480. Keeps the ceiling cans, wall ovens, cabinets and peninsula. Soft at hero size. | 384x480 | `50% 0%` | Recessed ceiling lights evenly spaced across a remodeled kitchen, a Colonial Electric job |
| `services/remodels.jpg` | `services/remodels` | 2165 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_2846.jpg | 640x480 | 4:5, 170,0 to 554,480. Keeps the hood, cooktop, cabinets, sink and ceiling cans. Soft at hero size. | 384x480 | `50% 15%` | Remodeled kitchen with recessed ceiling lights over white shaker cabinets and a lit quartz backsplash, a Colonial Electric job |
| `services/lighting-additions.jpg` | `services/lighting-additions` | 3202 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_3724-1.jpg | 640x480 | 4:5, 170,0 to 554,480. Keeps both wall lights, the pergola and the deck, and drops the neighbouring house and the side porch on the left. Soft at hero size. | 384x480 | `50% 40%` | Vertical exterior wall lights glowing beside sliding doors on a rear addition at dusk, a Colonial Electric job |
| `services/whole-home-battery-back-up.jpg` | `services/whole-home-battery-back-up` | 2163 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_1514.jpg | 640x480 | 4:5, 82,0 to 466,480. Keeps both units. Soft at hero size. | 384x480 | `50% 50%` | Tesla backup gateway and SPAN smart panel installed side by side by Colonial Electric |

Backups if a hero is replaced: electrical-panel-upgrade 337023, generator 337022, surge-protection 337012, recessed-lighting 2165, remodels 337006, lighting-additions 337003. There is no backup for whole-home-battery-back-up.

These services have no real job photo yet and keep their drawn hero: permanent-outdoor-lighting, electrical-outlets, ceiling-fan-installation, ev-charger-installation, whole-house-wiring-or-rewiring, electrical-inspections.

## Library photos (photos/library/)

| File | images.json key | Media id | Source | Source size | Crop applied | Saved size | Use | Alt text |
|---|---|---|---|---|---|---|---|---|
| `library/panel-branch-circuits.jpg` | `photos/panel-branch-circuits` | 337023 | https://colonial-electric.com/wp-content/uploads/2026/08/2026-06-16-scaled.jpg | 1920x2560 | 16:10, 560,880 to 1920,1730, centred on the landed branch wiring. For a 4:5 slot, re-crop the source at 280,480 to 1820,2405. | 1360x850 | Homepage services grid: Electrical Panel Upgrades card (16:10). | New breaker panel with branch circuits landed and the cover off, on a diamond-plate backboard |
| `library/service-entrance-meter-bank.jpg` | `photos/service-entrance-meter-bank` | 337053 | https://colonial-electric.com/?attachment_id=337053 (filename withheld: customer name) | 1920x2560 | 1400x990, 520,1290 to 1920,2280. This is the union of the 16:10 box (520,1400 to 1920,2275) and the 4:3 box (600,1290 to 1920,2280), so object-fit: cover works in both frames. In the 4:3 frame, `object-position: 100% 50%` matches the 4:3 box exactly. | 1400x990 | /services/ index: Electrical Upgrades category card (plate id services-electrical-upgrades, 16:10, 4:3 at tablet). | Service conduit running down to a new two-meter bank on a blue clapboard wall |
| `library/two-meter-service-emergency-disconnect.jpg` | `photos/two-meter-service-emergency-disconnect` | 337052 | https://colonial-electric.com/?attachment_id=337052 (filename withheld: customer name) | 1920x2560 | 1:1, 0,100 to 1920,2020, then scaled to 1200px so the meter serials stay illegible. | 1200x1200 | About page Services tile: Electrical Panel Upgrade (1:1, 4:3 at tablet). | Two-meter service bank with emergency disconnect labels and a red emergency stop button |
| `library/siemens-panel-closed.jpg` | `photos/siemens-panel-closed` | 337009 | https://colonial-electric.com/?attachment_id=337009 (filename withheld: street address) | 1080x1350 | 4:5, 60,80 to 1020,1280, centred on the panel door with the receptacle box at the lower right. For a square slot, re-crop the source at 0,200 to 1080,1280. | 960x1200 | Financing page work tile: Electrical Panel Upgrade. | Siemens breaker panel with its door closed on a black diamond-plate backboard |
| `library/generator-transfer-switch-panels.jpg` | `photos/generator-transfer-switch-panels` | 337022 | https://colonial-electric.com/wp-content/uploads/2026/08/2026-01-19.jpg | 995x748 | 16:10, 0,40 to 995,662: both panels and the Generac switch. | 995x622 | Homepage services grid: Generators card (16:10). | Generac transfer switch beside two breaker panels on a diamond-plate backboard |
| `library/panel-surge-protector.jpg` | `photos/panel-surge-protector` | 337012 | https://colonial-electric.com/?attachment_id=337012 (filename withheld: street address) | 1080x1350 | 16:10, 420,560 to 1000,922: the breaker columns with the surge device at the top right. This also removes the black side bars. Card size only. | 580x362 | Homepage services grid: Surge Protection card (16:10). | Breaker panel with a plug-in surge protective device at the top of the breaker column |
| `library/deck-railing-post-lights.jpg` | `photos/deck-railing-post-lights` | 337003 | https://colonial-electric.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-04-at-7.05.13-AM-2-scaled.jpeg | 2560x1920 | 16:10, 1600,580 to 2560,1180: the lit post cap and side light, with the covered grill and its brand logo cropped out. | 960x600 | Homepage services grid: Lighting card (16:10). | Lit post-cap and post-side lights on a white deck railing at dusk |
| `library/kitchen-backsplash-outlets.jpg` | `photos/kitchen-backsplash-outlets` | 337006 | https://colonial-electric.com/wp-content/uploads/2026/08/2024-10-06.jpg | 480x640 | 16:10, 0,45 to 480,345: the window over the sink, the tiled backsplash with an outlet and a switch, and the fridge. Card size only. | 480x300 | Homepage services grid: Remodels card (16:10). | Remodeled kitchen with a tiled backsplash, outlets and a switch beside the window over the sink |
| `library/shower-rain-head-recessed-light.jpg` | `photos/shower-rain-head-recessed-light` | 2161 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_0327-rotated.jpg | 480x640 | 1:1, 0,0 to 480,480: the rain head, the recessed shower light and the herringbone niche. Card size only. | 480x480 | Financing page work tile: Remodels, or any other remodel tile that needs a second image. | Marble-tiled shower with a ceiling rain head and a recessed shower light |
| `library/walk-in-shower-recessed-light.jpg` | `photos/walk-in-shower-recessed-light` | 2162 | https://colonial-electric.com/wp-content/uploads/2024/04/IMG_0354.jpg | 480x640 | 1:1, 0,20 to 480,500: the recessed ceiling light, the black hex niche and the glass door. GPS EXIF stripped. Card size only. | 480x480 | Remodels page secondary image (block B or a gallery tile), or an about-page work gallery. | Subway-tiled walk-in shower with a frameless glass door and a recessed ceiling light |

## Duplicates in the media library (never use both)

- 337021 is a near-identical copy of 337007 (electrical-panel-upgrade hero).
- 2166 is the same file as 3201 (recessed-lighting hero).
- 2167 is the same file as 3202 (lighting-additions hero).
- 3200 is the same file as 2162 and carries GPS EXIF. Use 2162 only.

## Reuse

- The electrical-panel-upgrade, recessed-lighting and whole-home-battery-back-up heroes can each appear once more, as their homepage grid card.
- The other homepage cards use the library photos above, so no hero photo repeats on the homepage.

## Google Business Profile photos

Two more real job photos come from Colonial's own Google Business Profile ("Colonial Electric inc", Weymouth MA, maps.google.com/?cid=16886290494525312563), downloaded at 1536x2048 from the profile's photo viewer (owner uploads, Aug 2026). No crop; EXIF orientation applied.

| File | Shows | Use |
|---|---|---|
| services/permanent-outdoor-lighting.jpg | LED step lights set into the risers of a white deck stair | /permanent-outdoor-lighting/ hero |
| services/whole-house-wiring-or-rewiring.jpg | New cable runs dropped into a breaker panel on a diamond-plate backboard | /whole-house-wiring-or-rewiring/ hero |

## Facebook photos (supplied by the client)

Four real job photos from Colonial's Facebook page (facebook.com/colonialelectric), sent directly by the client at full resolution. EXIF orientation applied, no crop at save time (framing is done with object-position in the templates).

| File | Shows | Use |
|---|---|---|
| services/ev-charger-installation.jpg | ChargePoint EV charger on a cedar post beside a house | /ev-charger-installation/ hero |
| services/ceiling-fan-installation.jpg | Ceiling fan with light kit and recessed lights, living room | /ceiling-fan-installation/ hero |
| library/ev-charger-wall-unit.jpg | ChargePoint EV charger mounted on siding | EV charger service card |
| library/ceiling-fan-dining-room.jpg | Ceiling fan with light kit and recessed lights, dining room | Ceiling fan service card |
