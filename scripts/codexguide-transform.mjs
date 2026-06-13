#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_SOURCE_ROOT = 'C:/Users/baoba/develop/AI/CodexGuide/docs';
const DEFAULT_OUTPUT_ROOT = path.resolve('.codexguide-output');

const FIRST_BATCH = [
  {
    id: 'codex-overview',
    source: 'guide/00-overview.md',
    title: 'Codex Overview',
    path: '/guides/codex/guide/overview',
    routePath: '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Foverview',
    categories: ['CodexGuide', '入门'],
    tone: 'blue',
  },
  {
    id: 'codex-app-installation',
    source: 'guide/01-app-installation.md',
    title: 'Codex App Installation',
    path: '/guides/codex/guide/app-installation',
    routePath: '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fapp-installation',
    categories: ['CodexGuide', '安装'],
    tone: 'blue',
  },
  {
    id: 'codex-cli-installation',
    source: 'guide/12-cli-installation.md',
    title: 'Codex CLI Installation',
    path: '/guides/codex/guide/cli-installation',
    routePath: '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fcli-installation',
    categories: ['CodexGuide', 'CLI'],
    tone: 'green',
  },
  {
    id: 'codex-platform-overview',
    source: 'platform/index.md',
    title: 'Codex Platform Overview',
    path: '/guides/codex/platform/overview',
    routePath: '/tutorials/article?path=%2Fguides%2Fcodex%2Fplatform%2Foverview',
    categories: ['CodexGuide', '平台'],
    tone: 'orange',
  },
  {
    id: 'codex-recipes-overview',
    source: 'recipes/index.md',
    title: 'Codex Recipes',
    path: '/guides/codex/recipes/overview',
    routePath: '/tutorials/article?path=%2Fguides%2Fcodex%2Frecipes%2Foverview',
    categories: ['CodexGuide', '案例'],
    tone: 'violet',
  },
];

async function main() {
  const sourceRoot = resolveArg('--source', DEFAULT_SOURCE_ROOT);
  const outputRoot = resolveArg('--out', DEFAULT_OUTPUT_ROOT);
  const manifestDir = path.join(outputRoot, 'manifest');
  const markdownDir = path.join(outputRoot, 'markdown');

  await fs.mkdir(manifestDir, {recursive: true});
  await fs.mkdir(markdownDir, {recursive: true});

  const manifest = [];

  for (const item of FIRST_BATCH) {
    const sourceFile = path.join(sourceRoot, item.source);
    const raw = await fs.readFile(sourceFile, 'utf8');
    const {body} = parseFrontmatter(raw);
    const transformed = transformMarkdown(body, item);
    const summary = extractSummary(transformed);
    const itemId = item.id || buildItemId(item.path);
    const outputFile = path.join(markdownDir, `${itemId}.md`);

    await fs.writeFile(outputFile, transformed, 'utf8');

    manifest.push({
      id: itemId,
      sourceProject: 'CodexGuide',
      sourcePath: item.source,
      title: item.title,
      summary,
      path: item.path,
      routePath: item.routePath,
      categories: item.categories,
      tone: item.tone,
      featured: 0,
      status: 1,
      sortValue: 0,
      publishedLabel: '',
      coverImage: '',
      contentType: 'markdown',
      markdownContent: transformed,
      outputMarkdown: outputFile,
    });
  }

  await fs.writeFile(
    path.join(manifestDir, 'codexguide-first-batch.manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  );

  process.stdout.write(
    [
      `sourceRoot: ${sourceRoot}`,
      `outputRoot: ${outputRoot}`,
      `items: ${manifest.length}`,
      'manifest: codexguide-first-batch.manifest.json',
    ].join('\n'),
  );
}

function resolveArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) {
    return fallback;
  }
  return path.resolve(process.argv[index + 1]);
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return {frontmatter: '', body: normalized};
  }

  const endIndex = normalized.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return {frontmatter: '', body: normalized};
  }

  return {
    frontmatter: normalized.slice(4, endIndex),
    body: normalized.slice(endIndex + 5),
  };
}

function transformMarkdown(markdown, item) {
  let text = markdown.trim();

  text = removeVuePressHomeSections(text);
  text = rewriteContainers(text);
  text = rewriteImagePaths(text);
  text = rewriteCrossLinks(text);
  text = normalizeWhitespace(text);

  return [
    `# ${item.title}`,
    '',
    text,
    '',
  ].join('\n');
}

function removeVuePressHomeSections(text) {
  return text
    .replace(/<div class="home-section"[\s\S]*?<\/div>/g, '')
    .replace(/<img[^>]*class="home-visual"[^>]*>/g, '')
    .trim();
}

function rewriteContainers(text) {
  const containerPattern = /:::\s*(tip|warning|info|caution)\s*\n([\s\S]*?)\n:::/g;
  const multilineConverted = text.replace(containerPattern, (_, kind, content) => {
    const label = kind.charAt(0).toUpperCase() + kind.slice(1);
    const cleaned = content
      .trim()
      .split('\n')
      .map((line, index) => {
        const prefix = index === 0 ? `> ${label}: ` : '> ';
        return `${prefix}${line.trim()}`;
      })
      .join('\n');
    return cleaned;
  });

  const inlinePattern = /:::\s*(tip|warning|info|caution)\s+([\s\S]*?)\s+:::/g;
  return multilineConverted.replace(inlinePattern, (_, kind, content) => {
    const label = kind.charAt(0).toUpperCase() + kind.slice(1);
    return `> ${label}: ${String(content).trim()}`;
  });
}

function rewriteImagePaths(text) {
  return text
    .replace(/\.\.\/images\//g, '/codex-guide/images/')
    .replace(/\(\/images\//g, '(/codex-guide/images/')
    .replace(/\(\/screenshots\//g, '(/codex-guide/screenshots/');
}

function rewriteCrossLinks(text) {
  return text
    .replace(
      /\.\.\/guide\/01-app-installation\.md/g,
      '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fapp-installation',
    )
    .replace(
      /\.\.\/guide\/12-cli-installation\.md/g,
      '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Fcli-installation',
    )
    .replace(
      /\.\.\/guide\/00-overview\.md/g,
      '/tutorials/article?path=%2Fguides%2Fcodex%2Fguide%2Foverview',
    )
    .replace(
      /\.\.\/platform\/index\.md/g,
      '/tutorials/article?path=%2Fguides%2Fcodex%2Fplatform%2Foverview',
    )
    .replace(
      /\.\.\/recipes\/index\.md/g,
      '/tutorials/article?path=%2Fguides%2Fcodex%2Frecipes%2Foverview',
    );
}

function normalizeWhitespace(text) {
  return text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function extractSummary(markdown) {
  const lines = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith('#'))
    .filter((line) => !line.startsWith('>'))
    .filter((line) => !line.startsWith(':::'))
    .filter((line) => !line.startsWith('- '))
    .filter((line) => !/^\d+\.\s/.test(line));

  return (lines[0] || '').slice(0, 160);
}

function buildItemId(itemPath) {
  return itemPath
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .join('-');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
