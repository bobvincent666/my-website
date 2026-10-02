import assert from 'node:assert/strict';

const base = process.argv[2] ?? 'http://localhost:5240';
async function content(route) {
  const response = await fetch(`${base}/api/content/tutorials${route}`);
  assert(response.ok, `HTTP ${response.status}: ${route}`);
  const result = await response.json();
  assert.equal(result.code, 200);
  return result.data;
}
const list = await content('');
assert.equal(list.items[0].path, '/tutorials/codex-guide', 'Codex topic must be first');
assert.equal(list.items.filter(item => item.path === '/tutorials/codex-guide').length, 1);
for (const slug of ['codex01', 'codex02']) {
  const detail = await content(`/detail?path=${encodeURIComponent(`/tutorials/${slug}`)}`);
  assert.equal(detail.contentType, 'markdown');
  assert(detail.markdownContent?.trim().length > 1000, `${slug}: missing article body`);
}
console.log('Tutorial API: Codex first and unique; both article bodies present.');
