import { towns } from '../data/towns.mjs';
// 21 towns, live order, each linked; current town gets aria-current.
export function townList(ctx, { current = '', cls = '', label = 'Towns we serve' } = {}) {
  return `<ul class="town-list ${cls}" role="list" aria-label="${label}">${towns.map(t => `<li><a href="${ctx.r('service-area/' + t.slug + '/')}"${current === t.slug ? ' aria-current="page"' : ''}>${t.name}</a></li>`).join('')}</ul>`;
}
