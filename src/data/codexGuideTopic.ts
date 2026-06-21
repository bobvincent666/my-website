import type {ContentListItem} from '@site/src/data/contentModels';

export const CODEX_GUIDE_ROUTE = '/tutorials/codex-guide';
export const CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE = '/tutorials/codex-guide/guide/00-overview';
export const CODEX_GUIDE_PLATFORM_INDEX_ROUTE = '/tutorials/codex-guide/platform';
export const CODEX_GUIDE_CONFIGURATION_INDEX_ROUTE = '/tutorials/codex-guide/configuration';
export const CODEX_GUIDE_PRACTICE_INDEX_ROUTE = '/tutorials/codex-guide/practice';
export const CODEX_GUIDE_RECIPES_INDEX_ROUTE = '/tutorials/codex-guide/recipes';
export const CODEX_GUIDE_PATH_PREFIX = '/guides/codex/';
export const CODEX_GUIDE_HERO_IMAGE = '/img/tutotials_header_compressed.png';

export type CodexGuideSidebarItem = {
  label: string;
  slug: string;
};

export type CodexGuideSidebarSection = {
  title: string;
  items: CodexGuideSidebarItem[];
};

export type CodexGuideNavChildItem = {
  label: string;
  to: string;
};

export type CodexGuideNavItem = {
  key: string;
  label: string;
  to?: string;
  href?: string;
  items?: CodexGuideNavChildItem[];
};

export const codexGuideTopic = {
  route: CODEX_GUIDE_ROUTE,
  title: 'CodeX 从入门到精通高级课程',
  subtitle: '面向真实工作流组织的 Codex 实战指南。从第一次上手，到把 Codex 接入个人和团队协作。',
  eyebrow: 'CodexGuide',
  primaryCtaLabel: '从学习路线开始',
  secondaryCtaLabel: '浏览实战案例',
};

export function getCodexGuideGuideRoute(slug: string): string {
  return `/tutorials/codex-guide/guide/${slug}`;
}

export function getCodexGuidePlatformRoute(slug: string): string {
  return slug === 'index' ? CODEX_GUIDE_PLATFORM_INDEX_ROUTE : `${CODEX_GUIDE_PLATFORM_INDEX_ROUTE}/${slug}`;
}

export function getCodexGuideConfigurationRoute(slug: string): string {
  return slug === 'index'
    ? CODEX_GUIDE_CONFIGURATION_INDEX_ROUTE
    : `${CODEX_GUIDE_CONFIGURATION_INDEX_ROUTE}/${slug}`;
}

export function getCodexGuidePracticeRoute(slug: string): string {
  return slug === 'index' ? CODEX_GUIDE_PRACTICE_INDEX_ROUTE : `${CODEX_GUIDE_PRACTICE_INDEX_ROUTE}/${slug}`;
}

export function getCodexGuideRecipesRoute(slug: string): string {
  return slug === 'index' ? CODEX_GUIDE_RECIPES_INDEX_ROUTE : `${CODEX_GUIDE_RECIPES_INDEX_ROUTE}/${slug}`;
}

export const codexGuideTutorialMenuItems: CodexGuideNavChildItem[] = [
  {label: '01 Codex 桌面 App 下载与安装', to: getCodexGuideGuideRoute('01-app-installation')},
  {label: '02 订阅 ChatGPT Plus', to: getCodexGuideGuideRoute('02-subscribe-plus')},
  {label: '03 了解 Codex 桌面 App', to: getCodexGuideGuideRoute('03-app-overview')},
  {label: '04 手机端协同桌面任务', to: getCodexGuideGuideRoute('04-mobile-control-desktop')},
  {label: '05 连接第三方 API', to: getCodexGuideGuideRoute('05-third-party-api')},
  {label: '06 用 Codex 完成第一个任务', to: getCodexGuideGuideRoute('06-app-first-task')},
  {label: '07 任务顺序执行与并行', to: getCodexGuideGuideRoute('07-task-execution')},
  {label: '08 权限管理', to: getCodexGuideGuideRoute('08-permissions')},
  {label: '09 技能与插件', to: getCodexGuideGuideRoute('09-skills-plugins')},
  {label: '10 自动化', to: getCodexGuideGuideRoute('10-automation')},
  {label: '11 桌面宠物', to: getCodexGuideGuideRoute('11-desktop-pet')},
  {label: '12 CLI 安装与登录', to: getCodexGuideGuideRoute('12-cli-installation')},
  {label: '13 第一次让 Codex 改代码', to: getCodexGuideGuideRoute('13-cli-first-run')},
  {label: '14 在 VS Code 中使用 Codex', to: getCodexGuideGuideRoute('14-ide-vscode')},
  {label: '15 AGENTS.md', to: getCodexGuideGuideRoute('15-agents-md')},
  {label: '16 沙箱与审批', to: getCodexGuideGuideRoute('16-sandbox-approvals')},
  {label: '17 Codex Cloud：使用云端模式', to: getCodexGuideGuideRoute('17-cloud-ide-app')},
  {label: '18 排障手册', to: getCodexGuideGuideRoute('18-troubleshooting')},
];

export const codexGuideRecipesMenuItems: CodexGuideNavChildItem[] = [
  {label: '案例总览', to: getCodexGuideRecipesRoute('index')},
  {label: '01 Codex × PPT Skill：一句话生成演示文稿', to: getCodexGuideRecipesRoute('ppt-skill-walkthrough')},
  {label: '02 Codex × Draw.io MCP：AI 自动绘制架构图', to: getCodexGuideRecipesRoute('drawio-mcp')},
  {label: '03 Codex × Playwright MCP：让 AI 操作浏览器', to: getCodexGuideRecipesRoute('playwright-mcp')},
  {label: '04 Codex × HyperFrames：用代码生成动画视频', to: getCodexGuideRecipesRoute('hyperframes-animation')},
  {label: '05 Codex × Obsidian：在知识库中自动生成配图', to: getCodexGuideRecipesRoute('obsidian-codex')},
  {label: '06 Codex × 飞书 CLI：一句话处理飞书数据', to: getCodexGuideRecipesRoute('feishu-cli-codex')},
  {label: '07 Codex × LLM Wiki：在 Obsidian 中搭建 AI 知识库', to: getCodexGuideRecipesRoute('llm-wiki-codex')},
  {label: '08 Codex × Figma MCP：读懂设计稿', to: getCodexGuideRecipesRoute('figma-mcp-codex')},
  {label: '09 Codex × Notion MCP：打通知识空间', to: getCodexGuideRecipesRoute('notion-mcp-codex')},
  {label: '10 Codex × DKFile：网页一键发布到公网', to: getCodexGuideRecipesRoute('dkfile-deploy-codex')},
  {label: '11 Codex × 云服务器：远程定位并修复 Bug', to: getCodexGuideRecipesRoute('remote-bug-fix')},
  {label: '12 Codex × Chrome：让 AI 直接控制浏览器', to: getCodexGuideRecipesRoute('chrome-browser-plugin')},
  {label: '13 Codex × GitHub Actions：CI 失败自动修复', to: getCodexGuideRecipesRoute('github-actions-ci-fix')},
  {label: '14 Codex × 临床文献综述：把医学问题整理成可复核证据', to: getCodexGuideRecipesRoute('clinical-literature-review')},
  {label: '参考来源与致谢', to: getCodexGuideRecipesRoute('credits')},
];

export const codexGuideNavItems: CodexGuideNavItem[] = [
  {key: 'home', label: '大纲', href: `${CODEX_GUIDE_ROUTE}#codex-home`},
  {key: 'guide', label: '学习路线', to: CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE},
  {key: 'platform', label: '入口地图', to: CODEX_GUIDE_PLATFORM_INDEX_ROUTE},
  {key: 'configuration', label: '配置', to: CODEX_GUIDE_CONFIGURATION_INDEX_ROUTE},
  {key: 'practice', label: '资源', to: CODEX_GUIDE_PRACTICE_INDEX_ROUTE},
  {key: 'tutorials', label: '教程', items: codexGuideTutorialMenuItems},
  {key: 'recipes', label: '实战案例', items: codexGuideRecipesMenuItems},
  {key: 'community', label: '交流群', href: `${CODEX_GUIDE_ROUTE}#codex-final`},
];

export const codexGuideMetricCards = [
  {
    title: '19 篇学习路线',
    details: '按阶段覆盖 Desktop App、CLI、IDE、Cloud、权限、技能与团队协作。',
    tone: 'teal',
    to: CODEX_GUIDE_GUIDE_OVERVIEW_ROUTE,
  },
  {
    title: '6 个入口模块',
    details: '入口地图拆分为总览、CLI、桌面 App、Cloud / Web、IDE 与 ChatGPT 中的 Codex。',
    tone: 'blue',
    to: CODEX_GUIDE_PLATFORM_INDEX_ROUTE,
  },
  {
    title: '4 组配置主题',
    details: '覆盖 CLI 选项、config.toml、MCP / Skills / Subagents 与安全治理。',
    tone: 'amber',
    to: CODEX_GUIDE_CONFIGURATION_INDEX_ROUTE,
  },
  {
    title: '3 条推荐路径',
    details: '分别面向第一次上手、开发者提效和团队落地三个方向。',
    tone: 'violet',
    href: '#codex-paths',
  },
];

export const codexGuideLearningPaths = [
  {
    id: 'app',
    title: '第一次使用 Codex',
    details: '先安装桌面端，理解界面结构，完成第一个低风险任务，建立任务闭环。',
    audience: '适合初学者、内容创作者、产品、运营',
  },
  {
    id: 'cli',
    title: '开发者本地提效',
    details: '在 CLI 中读代码、改文件、跑测试，形成可验证的工程节奏。',
    audience: '适合前端、后端、全栈、开源维护者',
  },
  {
    id: 'team',
    title: '团队落地与规范',
    details: '用 AGENTS.md、权限边界、案例库和排障手册统一协作方法。',
    audience: '适合技术负责人、团队 Lead、内部平台负责人',
  },
];

export const codexGuideLoopItems = [
  {title: '说明', details: '写清目标、范围、上下文、禁区和交付格式。', tone: 'teal'},
  {title: '执行', details: '让 Codex 读文件、跑命令、小步修改，并持续汇报状态。', tone: 'blue'},
  {title: '控制', details: '设置沙箱、审批、网络和凭据边界，避免高风险误操作。', tone: 'rose'},
  {title: '验证', details: '用测试、构建、截图和日志确认结果是否可信。', tone: 'amber'},
  {title: '沉淀', details: '把成功任务整理成模板、案例和团队规则。', tone: 'violet'},
];

export const codexGuideCaseCards = [
  {
    title: '一键生成演示文稿',
    details: '把一句话主题转成结构化 slides，适合内容和汇报场景。',
    href: '#codex-cases',
  },
  {
    title: '让 Codex 操作浏览器',
    details: '通过浏览器自动化完成点击、校验、截图和流程演练。',
    href: '#codex-cases',
  },
  {
    title: '接入知识库工作流',
    details: '在 Obsidian / Wiki 里完成资料整理、生成和归档。',
    href: '#codex-cases',
  },
  {
    title: '临床文献证据表',
    details: '把医学问题拆成 PICO、证据来源、局限性和安全边界。',
    href: '#codex-cases',
  },
  {
    title: 'CI 失败自动修复',
    details: '从失败日志定位问题，生成修复方案并准备 PR。',
    href: '#codex-cases',
  },
];

export const codexGuideChecklist = [
  '用 AGENTS.md 写清项目命令、代码风格、禁止事项和交付要求。',
  '用沙箱与审批管理文件、网络、凭据和高风险命令。',
  '用团队 playbook 统一任务模板、复盘格式和案例沉淀。',
  '用排障手册快速定位登录、权限、依赖和执行异常。',
];

export const codexGuideGuideSidebar: CodexGuideSidebarSection[] = [
  {
    title: '学习路线',
    items: [{label: '学习路线', slug: '00-overview'}],
  },
  {
    title: '入门准备',
    items: [
      {label: '01 桌面 App 安装', slug: '01-app-installation'},
      {label: '02 订阅 Plus', slug: '02-subscribe-plus'},
      {label: '03 桌面 App 总览', slug: '03-app-overview'},
      {label: '04 手机端协同', slug: '04-mobile-control-desktop'},
      {label: '05 连接第三方 API', slug: '05-third-party-api'},
      {label: '06 第一个任务', slug: '06-app-first-task'},
    ],
  },
  {
    title: '日常工作流',
    items: [
      {label: '07 任务执行', slug: '07-task-execution'},
      {label: '08 权限管理', slug: '08-permissions'},
      {label: '09 技能与插件', slug: '09-skills-plugins'},
      {label: '10 自动化', slug: '10-automation'},
      {label: '11 桌面助手', slug: '11-desktop-pet'},
    ],
  },
  {
    title: 'CLI 与 IDE',
    items: [
      {label: '12 CLI 安装与登录', slug: '12-cli-installation'},
      {label: '13 CLI 改代码', slug: '13-cli-first-run'},
      {label: '14 VS Code 插件', slug: '14-ide-vscode'},
    ],
  },
  {
    title: '进阶与团队',
    items: [
      {label: '15 Agent', slug: '15-agents-md'},
      {label: '16 沙箱与审批', slug: '16-sandbox-approvals'},
      {label: '17 Codex Cloud', slug: '17-cloud-ide-app'},
      {label: '18 排障手册', slug: '18-troubleshooting'},
    ],
  },
];

export const codexGuidePlatformSidebar: CodexGuideSidebarSection[] = [
  {
    title: '入口地图',
    items: [
      {label: 'Codex 入口地图', slug: 'index'},
      {label: 'CLI', slug: 'cli'},
      {label: '桌面 App', slug: 'app'},
      {label: 'Cloud / Web', slug: 'cloud'},
      {label: 'IDE', slug: 'ide'},
      {label: 'ChatGPT 中的 Codex', slug: 'chatgpt'},
    ],
  },
];

export const codexGuideConfigurationSidebar: CodexGuideSidebarSection[] = [
  {
    title: '配置与扩展',
    items: [
      {label: '配置与扩展总览', slug: 'index'},
      {label: 'CLI 选项与命令', slug: 'cli-options'},
      {label: '配置文件 config.toml', slug: 'config-file'},
      {label: 'MCP、Skills 与 Subagents', slug: 'mcp-skills-subagents'},
      {label: '安全、审批与管理', slug: 'security-admin'},
    ],
  },
];

export const codexGuidePracticeSidebar: CodexGuideSidebarSection[] = [
  {
    title: '实践方法',
    items: [
      {label: '实践方法总览', slug: 'index'},
      {label: '任务设计', slug: 'task-design'},
      {label: '非开发工作流', slug: 'non-dev-workflows'},
      {label: '团队实践', slug: 'team-playbook'},
    ],
  },
];

export function getCodexGuideSidebarSectionBySlug(slug: string): CodexGuideSidebarSection | undefined {
  return codexGuideGuideSidebar.find((section) => section.items.some((item) => item.slug === slug));
}

export function getCodexGuidePlatformSectionBySlug(slug: string): CodexGuideSidebarSection | undefined {
  return codexGuidePlatformSidebar.find((section) => section.items.some((item) => item.slug === slug));
}

export function getCodexGuideConfigurationSectionBySlug(slug: string): CodexGuideSidebarSection | undefined {
  return codexGuideConfigurationSidebar.find((section) => section.items.some((item) => item.slug === slug));
}

export function getCodexGuidePracticeSectionBySlug(slug: string): CodexGuideSidebarSection | undefined {
  return codexGuidePracticeSidebar.find((section) => section.items.some((item) => item.slug === slug));
}

export function isCodexGuideItem(item: ContentListItem): boolean {
  return item.path.startsWith(CODEX_GUIDE_PATH_PREFIX);
}

export function groupCodexGuideItems(items: ContentListItem[]) {
  return {
    guide: items.filter((item) => item.path.startsWith('/guides/codex/guide/')),
    platform: items.filter((item) => item.path.startsWith('/guides/codex/platform/')),
    configuration: items.filter((item) => item.path.startsWith('/guides/codex/configuration/')),
    practice: items.filter((item) => item.path.startsWith('/guides/codex/practice/')),
    recipes: items.filter((item) => item.path.startsWith('/guides/codex/recipes/')),
    reference: items.filter((item) => item.path.startsWith('/guides/codex/reference/')),
    community: items.filter((item) => item.path.startsWith('/guides/codex/community/')),
  };
}

export function findCodexGuideItemBySlug(items: ContentListItem[], slug: string) {
  return items.find((item) => item.path === `/guides/codex/guide/${slug}`);
}
