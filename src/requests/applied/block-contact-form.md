<!-- integrator pass 2026-10-12 -->
> **Integrator pass 2026-10-12**
> - ALREADY DONE: #1, tools/shot.mjs hides the sticky chrome in the selector branch.
> - ALREADY DONE: #2, tools/blind.py `H` NameError fixed.

# Requests from block-contact-form (round 2)

1. tools/shot.mjs — element screenshots of sections taller than the viewport capture the sticky
   `.site-header` and `.callbar` painted over the middle/top of the element (Playwright centres the
   element, the sticky bars stay at the viewport top/bottom). Critics read this as a layout bug.
   Exact change: before `el.screenshot(...)` add
   `await p.addStyleTag({ content: '.site-header,.callbar{visibility:hidden!important}' });`
   (only in the selector branch). Why: section crops should show the section, not the fixed chrome.

2. tools/blind.py — NameError: `H` is only defined inside the `elif` branch. Move
   `H = max(A.height, B.height) + 80` onto its own line after the if/elif (as in shots/blind_fixed.py).

# Requests from block-contact-form (round 3)

3. tools/progress.mjs: `fs.copyFileSync(img, dir+shot)` throws ENOENT because docs/build-progress/shots/
   no longer exists (the build appears to clear it). Exact change: add
   `fs.mkdirSync(dir + 'shots', { recursive: true });` right before the copyFileSync call.
   Why: piece screenshots can't be attached to the live progress page; round 3 was posted without its image.
