import assert from 'node:assert/strict';
import {cpSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? '');
const target = join(root, 'static/ms-cookbook');
assert(process.argv[2], 'Usage: node scripts/import-ms-cookbook.mjs <upstream checkout>');
mkdirSync(target, {recursive: true});
for (const entry of ['assets', 'content', 'chapters', 'LICENSE', 'README.md', 'CONTRIBUTING.md']) {
  cpSync(join(source, entry), join(target, entry), {recursive: true});
}

let html = readFileSync(join(source, 'index.html'), 'utf8');
html = html
  .replace(/<main data-page="contribute" hidden>[\s\S]*?<\/main>/, '')
  .replace(/<section class="home-community[\s\S]*?<\/section>/, '')
  .replace(/<div class="home-fact"><strong>10<span> 人<\/span><\/strong>[\s\S]*?<\/div>/, '')
  .replace(/<div class="reader-community">[\s\S]*?<\/div>/, '')
  .replace(/<a\b[^>]*href="#contribute"[^>]*>[\s\S]*?<\/a>/g, '')
  .replace(/<script src="assets\/(?:analytics|discussion|wishes)\.js[^\"]*"><\/script>/g, '')
  .replace(/<link rel="stylesheet" href="assets\/(?:discussion|wishes|contributors\/wall)\.css[^\"]*">/g, '')
  .replace('<a class="wordmark" href="#home">', '<a class="wordmark" href="/tutorials" target="_top">SpaceSeek 教程</a><a class="wordmark" href="#home">');
let paper = readFileSync(join(source, 'assets/paper.js'), 'utf8');
paper = paper
  .replace(/<a href="#contribute">社区共建<\/a>/g, '')
  .replace("['contents','paths','practice','contribute']", "['contents','paths','practice']");
assert(!html.includes('data-page="contribute"'));
assert(!html.includes('href="#contribute"'));
assert(!paper.includes('href="#contribute"'));
assert(html.includes('id="homePaths"') && html.includes('id="articleBody"'));
assert(html.includes('assets/content.js') && html.includes('assets/paper.js'));
writeFileSync(join(target, 'index.html'), html);
writeFileSync(join(target, 'assets/paper.js'), paper);
const revision = execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
writeFileSync(join(target, 'UPSTREAM.md'), `Source: https://github.com/modelscope/ms-cookbook\nRevision: ${revision}\nLicense: Apache-2.0; third-party asset notices are preserved.\nLocal changes: removed community pages and entry points; disabled community and analytics scripts; added SpaceSeek return link.\nUpdate: node scripts/import-ms-cookbook.mjs <upstream checkout>\n`);
console.log(`Imported MS Cookbook ${revision}; community removal checks passed.`);
