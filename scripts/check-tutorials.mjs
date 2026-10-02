import assert from 'node:assert/strict';
import {readdir} from 'node:fs/promises';

const site = process.argv.includes('--site');
const base = process.argv.slice(2).find(arg => !arg.startsWith('--'))
  ?? (site ? 'http://localhost:3000' : 'http://localhost:5240');
const api = process.argv.find(arg => arg.startsWith('--api='))?.slice(6) ?? base;
const errors = [];
async function response(path, origin = base) {
  const result = await fetch(new URL(path, origin), {signal: AbortSignal.timeout(15000)});
  assert(result.ok, `HTTP ${result.status}: ${path}`);
  return result;
}
async function content(route) {
  const result = await (await response(`/api/content/tutorials${route}`, api)).json();
  assert.equal(result.code, 200);
  return result.data;
}
async function check(label, action) {
  try { await action(); } catch (error) { errors.push(`${label}: ${error.message}`); }
}
const list = await content('');
await check('Codex topic', () => {
  assert.equal(list.items[0]?.path, '/tutorials/codex-guide', 'must be first');
  assert.equal(list.items.filter(item => item.path === '/tutorials/codex-guide').length, 1);
});
const paths = new Set([
  ...['codex01', 'codex02', 'tutorials007'].map(slug => `/tutorials/${slug}`),
  ...list.items.filter(item => item.contentType === 'markdown').map(item => item.path),
]);
for (const path of paths) {
  await check(path, async () => {
    const detail = await content(`/detail?path=${encodeURIComponent(path)}`);
    assert.equal(detail?.contentType, 'markdown');
    assert(detail.markdownContent?.trim(), `missing article body (${detail.markdownPath})`);
  });
}
if (site) {
  await check('MS Cookbook reader', async () => {
    const html = await (await response('/ms-cookbook/index.html')).text();
    assert(html.includes('id="homePage"'), 'static reader missing or replaced by another HTML page');
  });
  await check('MS Cookbook route', async () => {
    const html = await (await response('/tutorials/ms-cookbook/')).text();
    assert(/\bsrc=["']?\/ms-cookbook\/index\.html#home(?:["'\s>])/.test(html), 'wrapper route missing');
  });
  const jsFiles = await readdir(new URL('../build/assets/js/', import.meta.url));
  const entryFiles = jsFiles.filter(name => /^(main\.|runtime~main\.)/.test(name));
  assert(entryFiles.length >= 2, 'Build the frontend before checking a release');
  for (const path of [
    ...entryFiles.map(name => `/assets/js/${name}`),
    '/ms-cookbook/assets/content.js',
  ]) {
    await check(path, async () => {
      const asset = await response(path);
      assert(/javascript/i.test(asset.headers.get('content-type') ?? ''), 'expected JavaScript, not HTML');
    });
  }
}
assert.equal(errors.length, 0, `Release blocked:\n${errors.join('\n')}`);
console.log(`PASS: ${paths.size} article bodies, Codex order${site ? ', release assets and Cookbook routes' : ''}.`);
