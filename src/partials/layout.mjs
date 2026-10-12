import { head } from './head.mjs';
import { header } from './header.mjs';
import { footer } from './footer.mjs';
import { callbar } from './callbar.mjs';

export function layout(ctx, main) {
  return `<!doctype html>
<html lang="en">
<head>
${head(ctx)}
</head>
<body class="tpl-${ctx.page.template}">
<a class="skip-link" href="#main">Skip to content</a>
${header(ctx)}
<main id="main" tabindex="-1">
${main}
</main>
${footer(ctx)}
${callbar(ctx)}
<script src="${ctx.asset('site.js')}?v=${ctx.version}" defer></script>
</body>
</html>
`;
}
