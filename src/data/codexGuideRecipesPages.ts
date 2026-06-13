import type {ComponentType} from 'react';
import type {CodexGuideSidebarSection} from '@site/src/data/codexGuideTopic';
import {CODEX_GUIDE_RECIPES_INDEX_ROUTE} from '@site/src/data/codexGuideTopic';

export type CodexGuideRecipePageMeta = {
  slug: string;
  title: string;
  fileName: string;
  prevSlug?: string;
  nextSlug?: string;
};

const recipePages: Record<string, CodexGuideRecipePageMeta> = {
  index: {slug: 'index', title: '实战案例总览', fileName: 'index.md', nextSlug: 'ppt-skill-walkthrough'},
  'ppt-skill-walkthrough': {
    slug: 'ppt-skill-walkthrough',
    title: '01 Codex × PPT Skill：一句话生成演示文稿',
    fileName: 'ppt-skill-walkthrough.md',
    prevSlug: 'index',
    nextSlug: 'drawio-mcp',
  },
  'drawio-mcp': {
    slug: 'drawio-mcp',
    title: '02 Codex × Draw.io MCP：AI 自动绘制架构图',
    fileName: 'drawio-mcp.md',
    prevSlug: 'ppt-skill-walkthrough',
    nextSlug: 'playwright-mcp',
  },
  'playwright-mcp': {
    slug: 'playwright-mcp',
    title: '03 Codex × Playwright MCP：让 AI 操作浏览器',
    fileName: 'playwright-mcp.md',
    prevSlug: 'drawio-mcp',
    nextSlug: 'hyperframes-animation',
  },
  'hyperframes-animation': {
    slug: 'hyperframes-animation',
    title: '04 Codex × HyperFrames：用代码生成动画视频',
    fileName: 'hyperframes-animation.md',
    prevSlug: 'playwright-mcp',
    nextSlug: 'obsidian-codex',
  },
  'obsidian-codex': {
    slug: 'obsidian-codex',
    title: '05 Codex × Obsidian：在知识库中自动生成配图',
    fileName: 'obsidian-codex.md',
    prevSlug: 'hyperframes-animation',
    nextSlug: 'feishu-cli-codex',
  },
  'feishu-cli-codex': {
    slug: 'feishu-cli-codex',
    title: '06 Codex × 飞书 CLI：一句话处理飞书数据',
    fileName: 'feishu-cli-codex.md',
    prevSlug: 'obsidian-codex',
    nextSlug: 'llm-wiki-codex',
  },
  'llm-wiki-codex': {
    slug: 'llm-wiki-codex',
    title: '07 Codex × LLM Wiki：在 Obsidian 中搭建 AI 知识库',
    fileName: 'llm-wiki-codex.md',
    prevSlug: 'feishu-cli-codex',
    nextSlug: 'figma-mcp-codex',
  },
  'figma-mcp-codex': {
    slug: 'figma-mcp-codex',
    title: '08 Codex × Figma MCP：读懂设计稿',
    fileName: 'figma-mcp-codex.md',
    prevSlug: 'llm-wiki-codex',
    nextSlug: 'notion-mcp-codex',
  },
  'notion-mcp-codex': {
    slug: 'notion-mcp-codex',
    title: '09 Codex × Notion MCP：打通知识空间',
    fileName: 'notion-mcp-codex.md',
    prevSlug: 'figma-mcp-codex',
    nextSlug: 'dkfile-deploy-codex',
  },
  'dkfile-deploy-codex': {
    slug: 'dkfile-deploy-codex',
    title: '10 Codex × DKFile：网页一键发布到公网',
    fileName: 'dkfile-deploy-codex.md',
    prevSlug: 'notion-mcp-codex',
    nextSlug: 'remote-bug-fix',
  },
  'remote-bug-fix': {
    slug: 'remote-bug-fix',
    title: '11 Codex × 云服务器：远程定位并修复 Bug',
    fileName: 'remote-bug-fix.md',
    prevSlug: 'dkfile-deploy-codex',
    nextSlug: 'chrome-browser-plugin',
  },
  'chrome-browser-plugin': {
    slug: 'chrome-browser-plugin',
    title: '12 Codex × Chrome：让 AI 直接控制浏览器',
    fileName: 'chrome-browser-plugin.md',
    prevSlug: 'remote-bug-fix',
    nextSlug: 'github-actions-ci-fix',
  },
  'github-actions-ci-fix': {
    slug: 'github-actions-ci-fix',
    title: '13 Codex × GitHub Actions：CI 失败自动修复',
    fileName: 'github-actions-ci-fix.md',
    prevSlug: 'chrome-browser-plugin',
    nextSlug: 'clinical-literature-review',
  },
  'clinical-literature-review': {
    slug: 'clinical-literature-review',
    title: '14 Codex × 临床文献综述：把医学问题整理成可复核证据',
    fileName: 'clinical-literature-review.md',
    prevSlug: 'github-actions-ci-fix',
    nextSlug: 'credits',
  },
  credits: {
    slug: 'credits',
    title: '参考来源与致谢',
    fileName: 'credits.md',
    prevSlug: 'clinical-literature-review',
  },
};

export const codexGuideRecipesSidebar: CodexGuideSidebarSection[] = [
  {
    title: '实战案例',
    items: [
      {label: '案例总览', slug: 'index'},
      {label: '01 Codex × PPT Skill：一句话生成演示文稿', slug: 'ppt-skill-walkthrough'},
      {label: '02 Codex × Draw.io MCP：AI 自动绘制架构图', slug: 'drawio-mcp'},
      {label: '03 Codex × Playwright MCP：让 AI 操作浏览器', slug: 'playwright-mcp'},
      {label: '04 Codex × HyperFrames：用代码生成动画视频', slug: 'hyperframes-animation'},
      {label: '05 Codex × Obsidian：在知识库中自动生成配图', slug: 'obsidian-codex'},
      {label: '06 Codex × 飞书 CLI：一句话处理飞书数据', slug: 'feishu-cli-codex'},
      {label: '07 Codex × LLM Wiki：在 Obsidian 中搭建 AI 知识库', slug: 'llm-wiki-codex'},
      {label: '08 Codex × Figma MCP：读懂设计稿', slug: 'figma-mcp-codex'},
      {label: '09 Codex × Notion MCP：打通知识空间', slug: 'notion-mcp-codex'},
      {label: '10 Codex × DKFile：网页一键发布到公网', slug: 'dkfile-deploy-codex'},
      {label: '11 Codex × 云服务器：远程定位并修复 Bug', slug: 'remote-bug-fix'},
      {label: '12 Codex × Chrome：让 AI 直接控制浏览器', slug: 'chrome-browser-plugin'},
      {label: '13 Codex × GitHub Actions：CI 失败自动修复', slug: 'github-actions-ci-fix'},
      {label: '14 Codex × 临床文献综述：把医学问题整理成可复核证据', slug: 'clinical-literature-review'},
      {label: '参考来源与致谢', slug: 'credits'},
    ],
  },
];

export function getCodexGuideRecipesRoute(slug: string): string {
  return slug === 'index' ? CODEX_GUIDE_RECIPES_INDEX_ROUTE : `${CODEX_GUIDE_RECIPES_INDEX_ROUTE}/${slug}`;
}

export function getCodexGuideRecipePageMeta(slug: string): CodexGuideRecipePageMeta | undefined {
  return recipePages[slug];
}

export function getCodexGuideRecipesSidebar(): CodexGuideSidebarSection[] {
  return codexGuideRecipesSidebar;
}

export function getCodexGuideRecipesSectionBySlug(slug: string): CodexGuideSidebarSection | undefined {
  return codexGuideRecipesSidebar.find((section) => section.items.some((item) => item.slug === slug));
}

export type CodexGuideRecipesDocumentComponent = ComponentType<Record<string, never>>;
