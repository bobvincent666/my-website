import {
  codexGuidePlatformSidebar,
  getCodexGuidePlatformRoute,
  type CodexGuideSidebarSection,
} from '@site/src/data/codexGuideTopic';
import type {
  CodexGuideGuideCallout,
  CodexGuideGuideImage,
  CodexGuideGuideSection,
  CodexGuideGuideSubsection,
  CodexGuideGuideTable,
} from '@site/src/data/codexGuideGuidePages';

export type CodexGuidePlatformPageData = {
  slug: string;
  title: string;
  summary: string;
  meta: {
    author: string;
    wordCount: string;
    readingTime: string;
  };
  note?: {
    tone?: 'tip' | 'warning';
    title: string;
    body: string;
  };
  sections: CodexGuideGuideSection[];
  prevSlug?: string;
  nextSlug?: string;
};

const DEFAULT_META = {
  author: 'canghe',
  wordCount: '约 900 字',
  readingTime: '大约 3 分钟',
};

const platformPages: Record<string, CodexGuidePlatformPageData> = {
  index: {
    slug: 'index',
    title: 'Codex 入口地图',
    summary:
      'CodexGuide 把 Codex 看成一组入口协同的工作系统。真正影响效率的，不是你是否只会一个界面，而是你能否把不同类型的任务放进最合适的入口。',
    meta: {author: 'canghe', wordCount: '约 870 字', readingTime: '大约 3 分钟'},
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。涉及产品入口、可用性与能力边界时，应以 OpenAI 官方页面、Help Center 和官方仓库为准。',
    },
    sections: [
      {
        id: 'surfaces-map',
        title: 'Codex 使用入口地图',
        paragraphs: [
          '学习 Codex 时，不要只盯着某一个界面。CLI、桌面 App、Cloud / Web、IDE、ChatGPT 中的 Codex 和集成生态，承担的是不同节奏的任务。',
        ],
        images: [
          {
            src: '/codex-guide/images/codex-surfaces.svg',
            alt: 'Codex 入口地图',
            caption: '原项目中的入口总览图，展示不同入口各自适合承载的工作类型。',
          },
        ],
      },
      {
        id: 'comparison',
        title: '入口对照表',
        table: {
          headers: ['入口', '更适合', '典型任务', '学习优先级'],
          rows: [
            ['CLI', '本地快速迭代', '修 bug、补测试、跑命令、解释仓库', '新手优先'],
            ['桌面 App', '本地多任务工作台', '多 agent、Skills、Automations、插件协作', '进阶优先'],
            ['Cloud / Web', '长任务和并行任务', '仓库任务、PR、后台分析', '团队优先'],
            ['IDE', '编辑器上下文', '局部修改、解释、审查', '日常高频'],
            ['ChatGPT 中的 Codex', '面向仓库任务分派', '连接 GitHub、理解仓库、协作推进', '按账号能力选择'],
          ],
        },
      },
      {
        id: 'how-to-choose',
        title: '如何选择入口',
        bullets: [
          '任务需要频繁看命令输出：选 CLI。',
          '任务需要多 agent 并行、Skills 或 Automations：选桌面 App。',
          '任务时间较长，希望后台运行或可能生成 PR：选 Cloud / Web。',
          '你正在编辑具体文件：选 IDE。',
          '你想从对话里分派仓库级任务：选 ChatGPT 中的 Codex。',
        ],
      },
      {
        id: 'starter-sequence',
        title: '第一次学习建议',
        ordered: [
          '先从 CLI 建立最小闭环。',
          '再用桌面 App 体验本地多任务和技能沉淀。',
          '然后进入 Cloud / Web，学习长任务、PR 与团队协作。',
          '最后回到配置主题，补全 CLI 选项、config.toml、MCP、Skills 与安全边界。',
        ],
      },
      {
        id: 'config-relationship',
        title: '入口和配置的关系',
        table: {
          headers: ['配置主题', '主要影响入口', '学习页'],
          rows: [
            ['AGENTS.md', 'CLI / 桌面 App / Cloud', '15 AGENTS.md'],
            ['CLI 选项', 'CLI', 'CLI 选项与命令'],
            ['config.toml', 'CLI', '配置文件 config.toml'],
            ['Skills', 'App / CLI', 'MCP、Skills 与 Subagents'],
            ['Worktrees', '桌面 App', '桌面 App'],
            ['Environments', 'Cloud / App', 'Cloud / Web'],
            ['Sandbox / Approvals', '全部入口', '安全、审批与管理'],
          ],
        },
      },
    ],
    nextSlug: 'cli',
  },
  cli: {
    slug: 'cli',
    title: 'CLI',
    summary: 'CLI 是最适合建立 Codex 基本功的入口。它贴近本地仓库、终端命令和测试输出，适合快速验证与小步修改。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '本页基于 CodexGuide 原始 CLI 页面整理，功能细节以 OpenAI 官方 Codex 文档和 openai/codex 官方仓库为准。',
    },
    sections: [
      {
        id: 'what-cli-does',
        title: 'CLI 能做什么',
        bullets: [
          '只读理解仓库结构、入口、测试命令和风险点。',
          '修改代码、文档、配置和测试。',
          '运行 lint、typecheck、unit test、build 等验证命令。',
          '查看 diff、调整审批策略、恢复会话。',
          '通过 codex exec 执行标准化的一次性任务。',
        ],
      },
      {
        id: 'cli-learning-order',
        title: '推荐学习顺序',
        ordered: [
          '安装 CLI 并完成登录。',
          '在陌生仓库中做一次只读总结。',
          '学会交互模式中的常用 Slash Commands。',
          '完成一次低风险修改，并运行验证。',
          '学会 codex exec，把可重复任务脚本化。',
        ],
      },
      {
        id: 'interactive-mode',
        title: '交互模式',
        paragraphs: [
          '进入项目根目录后运行 codex，第一轮建议先让 Codex 只读分析仓库，不要立即改代码。把“项目用途、主要目录、安装测试命令、风险点、低风险任务”一次性问清楚。',
        ],
      },
      {
        id: 'exec-mode',
        title: '非交互模式',
        paragraphs: [
          'codex exec 更适合批处理和自动化。你可以要求它输出固定格式，例如项目概览、本地运行、测试命令、CI 风险和适合 Codex 处理的任务。',
        ],
      },
      {
        id: 'slash-commands',
        title: 'Slash Commands',
        bullets: [
          '查看状态：确认模型、目录、审批和沙箱。',
          '查看 diff：每次准备提交前检查变更。',
          '调整模型或审批：把复杂任务和高风险任务分开处理。',
          '压缩或整理上下文：长任务进入下一阶段前使用。',
        ],
      },
    ],
    prevSlug: 'index',
    nextSlug: 'app',
  },
  app: {
    slug: 'app',
    title: '桌面 App',
    summary: '桌面 App 更像一个本地 Codex 工作台，适合在一个项目里管理多条任务线、多 agent、Skills、Automations 和插件协作。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '本页基于 CodexGuide 原始桌面 App 页面整理，产品细节仍应以 OpenAI 官方 Codex App 文档为准。',
    },
    sections: [
      {
        id: 'app-fit',
        title: '桌面 App 适合什么',
        bullets: [
          '本地仓库中的长任务和多阶段任务。',
          '同时推进多个互不阻塞的任务。',
          '使用 Worktrees 隔离不同实现分支。',
          '把重复流程写成 Skills。',
          '用 Automations 做提醒、定期检查或后续跟进。',
        ],
      },
      {
        id: 'app-capabilities',
        title: '核心能力地图',
        table: {
          headers: ['能力', '用途', '学习重点'],
          rows: [
            ['Projects', '组织本地工作区和任务历史', '每个项目都先确认 Git 状态'],
            ['Agents', '分配探索、实现、验证任务', '并行任务要有清晰边界'],
            ['Worktrees', '隔离不同分支的文件改动', '适合多方案对比和长任务'],
            ['Local Environments', '为任务准备依赖、命令、环境', '写清安装、构建、测试步骤'],
            ['Review', '检查 diff 和结果', '先看风险，再看风格'],
            ['Skills', '固化复杂流程', '把高频提示词变成可复用能力'],
            ['Automations', '延迟或周期性任务', '输出要自包含'],
          ],
        },
      },
      {
        id: 'recommended-flow',
        title: '一个推荐的本地任务流',
        ordered: [
          '打开项目，确认分支和未提交改动。',
          '让 Codex 只读总结仓库结构。',
          '把任务拆成探索、实现、验证。',
          '需要并行时，为每个 agent 指定文件范围。',
          '修改后运行验证命令，再 Review diff。',
        ],
      },
      {
        id: 'worktrees',
        title: 'Worktrees 的使用场景',
        bullets: [
          '两种实现方案对比。',
          '修复同一 bug 的不同思路。',
          '同时推进文档和代码改动。',
          '长任务中保留一个干净分支。',
        ],
      },
      {
        id: 'skills-automations',
        title: 'Skills 与 Automations',
        paragraphs: [
          '桌面 App 很适合把经验固化下来。Skill 适合 PR review、文档站检查、前端截图验证、案例收集；Automation 适合定时检查文档断链、汇总失败 CI、任务完成后延迟复盘。',
        ],
      },
    ],
    prevSlug: 'cli',
    nextSlug: 'cloud',
  },
  cloud: {
    slug: 'cloud',
    title: 'Cloud / Web',
    summary: 'Cloud / Web 入口适合耗时更长、需要后台运行或需要与 GitHub 协作的任务，适合长任务、并行任务和 PR 工作流。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '本页基于 CodexGuide 原始 Cloud / Web 页面整理，环境能力和连接方式以 OpenAI 官方产品说明为准。',
    },
    sections: [
      {
        id: 'cloud-fit',
        title: 'Cloud 适合什么',
        bullets: [
          '连接 GitHub 仓库后分派任务。',
          '在后台处理长时间修复、迁移或分析。',
          '基于 issue 或需求生成分支和 PR。',
          '团队成员共同查看任务进度。',
          '为大型仓库做结构分析和风险扫描。',
        ],
      },
      {
        id: 'task-checklist',
        title: '提交任务前的清单',
        table: {
          headers: ['检查项', '为什么重要'],
          rows: [
            ['仓库权限', 'Codex 需要读取代码，也可能创建分支或 PR'],
            ['环境配置', '缺依赖、缺服务、缺环境变量会影响验证'],
            ['Internet Access', '安装依赖和读取资料时要明确网络边界'],
            ['任务范围', '长任务更需要明确目录、模块和排除项'],
            ['验证命令', '明确测试命令能提高结果可审查性'],
            ['安全边界', '凭据、生产数据、部署操作需要人工确认'],
          ],
        },
      },
      {
        id: 'environments',
        title: 'Environments',
        paragraphs: [
          'Cloud 任务是否可靠，很大程度取决于环境是否可复现。建议为仓库准备好包管理器、安装命令、测试命令、需要的服务和环境变量占位说明。',
        ],
      },
      {
        id: 'internet-access',
        title: 'Internet Access',
        paragraphs: [
          '有些任务需要联网上下载依赖、查询官方文档或访问 registry。联机任务要写清目的和范围，不要让任务越界访问生产或内部系统。',
        ],
      },
      {
        id: 'team-practice',
        title: '团队实践建议',
        bullets: [
          '为常见任务准备模板，例如“修 CI”“补测试”“更新文档”。',
          '把仓库规则写到 AGENTS.md。',
          '用最小权限连接仓库。',
          '重要 PR 仍由人类 reviewer 合并。',
        ],
      },
    ],
    prevSlug: 'app',
    nextSlug: 'ide',
  },
  ide: {
    slug: 'ide',
    title: 'IDE',
    summary: 'IDE 入口适合贴近编辑器上下文的高频小任务，优势在于文件、选区、错误信息和当前注意力都在同一环境里。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '本页基于 CodexGuide 原始 IDE 页面整理。具体插件、入口和可用功能会随产品更新变化，应以当前 IDE 插件说明为准。',
    },
    sections: [
      {
        id: 'ide-fit',
        title: 'IDE 适合什么',
        bullets: [
          '解释当前文件或选中代码。',
          '为一个函数补测试。',
          '局部重构。',
          '生成注释、文档或类型说明。',
          '审查当前 diff。',
          '快速理解错误信息和调用链。',
        ],
      },
      {
        id: 'selection-prompts',
        title: '选区任务写法',
        paragraphs: [
          '选区越准确，结果越稳定。适合要求它解释职责、输入输出、边界情况，或者只改当前文件与对应测试文件，不做无关重构。',
        ],
      },
      {
        id: 'high-frequency',
        title: 'IDE 中的高频任务',
        table: {
          headers: ['任务', '推荐输入', '结果检查'],
          rows: [
            ['解释代码', '选中函数或类', '看是否说清职责和边界'],
            ['补测试', '选中函数和现有测试', '看测试是否能失败后通过'],
            ['修类型错误', '粘贴错误信息和文件', '看是否影响运行时行为'],
            ['局部重构', '指定文件和目标', '看 diff 是否可读、测试是否通过'],
            ['写文档', '选中 API 或配置', '看示例是否可执行'],
            ['Review diff', '提供当前 diff', '看是否优先发现行为风险'],
          ],
        },
      },
      {
        id: 'with-cli',
        title: '和 CLI 的配合',
        ordered: [
          '在 IDE 中解释或修改当前文件。',
          '回到 CLI 运行相关测试。',
          '用 git diff 检查最终变更。',
          '需要更大上下文时，再让 CLI 读取仓库规则和配置。',
        ],
      },
      {
        id: 'ide-notes',
        title: '注意事项',
        bullets: [
          '不要用过大的选区开始任务。',
          '局部任务写清“只改当前文件”或“只改对应测试”。',
          '重要改动仍然要跑测试。',
          '生成注释时优先解释边界、原因和约束。',
        ],
      },
    ],
    prevSlug: 'cloud',
    nextSlug: 'chatgpt',
  },
  chatgpt: {
    slug: 'chatgpt',
    title: 'ChatGPT 中的 Codex',
    summary: 'ChatGPT 中的 Codex 适合从对话里分派仓库任务、查看状态、理解代码库并推动团队协作，尤其适合非开发角色参与。',
    meta: DEFAULT_META,
    note: {
      title: '官方边界',
      body: '计划可用性、消息限额、连接方式和具体入口请以 Codex in ChatGPT Help Center 为准。本页只聚焦任务分派与仓库协作视角。',
    },
    sections: [
      {
        id: 'fit-scenarios',
        title: '适用场景',
        bullets: [
          '连接 GitHub 仓库后发起任务。',
          '让 Codex 阅读仓库并总结结构。',
          '把 issue 转成可执行任务。',
          '生成 PR 摘要或变更说明。',
          '面向非开发者解释技术改动。',
          '把复杂任务拆成阶段计划。',
        ],
      },
      {
        id: 'first-task',
        title: '第一次任务怎么写',
        paragraphs: [
          '先让 Codex 只读分析仓库，再进一步要求它完成最小改动并输出可审查结果。关键是先摘要，再执行，不要直接让它大范围改代码。',
        ],
        ordered: [
          '先让它总结相关目录和关键文件。',
          '确认它理解任务目标与约束。',
          '再交付第一步最小改动。',
          '要求说明修改原因、验证方式和剩余风险。',
        ],
      },
      {
        id: 'non-dev-usage',
        title: '适合非开发者的用法',
        table: {
          headers: ['场景', '任务说明'],
          rows: [
            ['看懂 PR', '请把这个 PR 改动解释成产品经理能理解的语言。'],
            ['写发布说明', '请基于这些改动生成面向用户的 release notes。'],
            ['拆 issue', '请把这个 issue 拆成可交付给工程师执行的任务清单。'],
            ['读技术方案', '请解释这个方案涉及哪些模块、风险和验收标准。'],
            ['整理知识库', '请指出这份教程对新手来说缺哪些前置说明。'],
          ],
        },
      },
      {
        id: 'with-cloud',
        title: '和 Cloud 的关系',
        paragraphs: [
          'ChatGPT 更适合发起、讨论和理解任务；Cloud 更适合后台执行长任务和产出 PR。推荐方式是：在 ChatGPT 里把需求说清楚，先做只读分析，再把明确的执行步骤交给 Cloud，最后回到 ChatGPT 整理结果。',
        ],
      },
      {
        id: 'safety-notes',
        title: '安全提醒',
        bullets: [
          '连接仓库前确认组织策略。',
          '不要在对话里粘贴真实密钥。',
          '让 Codex 修改代码前先写清验收标准。',
          '对生成的 PR 做人工 review。',
          '截图进入公开仓库前遮挡账号、组织名和仓库隐私信息。',
        ],
      },
    ],
    prevSlug: 'ide',
  },
};

export function getCodexGuidePlatformPage(slug: string): CodexGuidePlatformPageData | undefined {
  return platformPages[slug];
}

export function getCodexGuidePlatformSidebar(): CodexGuideSidebarSection[] {
  return codexGuidePlatformSidebar;
}

export function getCodexGuidePlatformLinkForIndex(slug: string): string {
  return getCodexGuidePlatformRoute(slug);
}
