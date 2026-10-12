# Requests from page-about-colonial-electric (round 4)

1. **tools/progress.mjs / docs/build-progress/shots/** — the `shots/` folder under `docs/build-progress/` no longer exists, so `node tools/progress.mjs <piece> <status> <round> "<note>" <image>` crashes with ENOENT on `copyFileSync` and records nothing. Change: have progress.mjs `fs.mkdirSync(dir + 'shots', { recursive: true })` before copying (or recreate the folder). Why: builders cannot attach their blind composites to the progress page. Workaround used: posted this piece's statuses without the image argument.
