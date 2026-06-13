import {
  codexGuidePracticeSidebar,
  getCodexGuidePracticeRoute,
  type CodexGuideSidebarSection,
} from '@site/src/data/codexGuideTopic';
import type {CodexGuideGuidePageData} from '@site/src/data/codexGuideGuidePages';

export type CodexGuidePracticePageData = CodexGuideGuidePageData;

const DEFAULT_META = {
  author: 'canghe',
  wordCount: '约 900 字',
  readingTime: '大约 3 分钟',
};

const practicePages: Record<string, CodexGuidePracticePageData> = {
  index: {
    slug: 'index',
    title: '实践方法',
    summary: 'Codex 的学习重点不只在命令和界面。更关键的是把任务设计、上下文管理、安全边界和验证闭环训练成习惯。',
    meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 2 分钟'},
    sections: [
      {
        id: 'workflow-loop',
        title: '高质量任务闭环',
        paragraphs: ['实践页的核心不是“再多看几个按钮”，而是把一次任务做成可验证、可复用、可复盘的闭环。'],
        images: [
          {
            src: '/codex-guide/images/codex-workflow-loop.svg',
            alt: 'Codex 高质量任务闭环',
            caption: '原页中的任务闭环图，把任务设计、执行、验证和复盘放在同一张图里。',
          },
        ],
      },
      {
        id: 'method-map',
        title: '方法地图',
        table: {
          headers: ['主题', '解决什么问题'],
          rows: [
            ['任务设计', '如何把模糊需求写成 Codex 能稳定执行的任务'],
            ['非开发工作流', '如何用 Codex 做文档、学习、分析和团队知识管理'],
            ['团队实践', '如何把 Codex 接入团队规范、PR、排障和知识库沉淀'],
          ],
        },
      },
      {
        id: 'three-baselines',
        title: '三条底线',
        bullets: [
          '任务要可验证：没有验证方式的任务，很难判断结果质量。',
          '范围要可控制：越靠近核心业务、权限、支付、数据，越需要小步推进。',
          '结果要可复盘：每次任务都要留下“原因、改动、验证、风险”。',
        ],
      },
      {
        id: 'minimal-loop-template',
        title: '最小闭环模板',
        codeBlocks: [
          {
            language: 'text',
            code: `请处理：[明确目标]

背景：
- [当前现象/业务上下文]

范围：
- 可以修改：[文件/目录]
- 保持不变：[文件/目录/行为]

约束：
- 不引入新依赖
- 保持公开 API 兼容
- 不处理生产数据或敏感凭据

验证：
- 运行：[命令]
- 如果失败，请定位原因并说明阻塞

交付：
- 改了什么
- 为什么这样改
- 验证结果
- 剩余风险`,
          },
        ],
      },
    ],
    nextSlug: 'task-design',
  },
  'task-design': {
    slug: 'task-design',
    title: '任务设计',
    summary: '任务设计决定 Codex 的工作质量。一个好任务会同时说明目标、上下文、范围、约束、验证方式和最终交付。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'six-elements',
        title: '任务六要素',
        table: {
          headers: ['要素', '写法', '示例'],
          rows: [
            ['目标', '一句话说明结果', '修复登录页刷新后状态丢失的问题'],
            ['背景', '给出现象和上下文', '用户刷新页面后需要重新登录'],
            ['范围', '限定文件或模块', '只修改 auth 模块和相关测试'],
            ['约束', '写明禁止事项', '不改数据库 schema，不引入新依赖'],
            ['验证', '给出命令或检查方式', 'pnpm test auth'],
            ['交付', '要求复盘格式', '总结根因、改动、测试和风险'],
          ],
        },
      },
      {
        id: 'fuzzy-to-clear',
        title: '从模糊到清晰',
        subsections: [
          {
            title: '模糊写法',
            codeBlocks: [
              {
                language: 'text',
                code: '帮我优化登录逻辑。',
              },
            ],
          },
          {
            title: '清晰写法',
            codeBlocks: [
              {
                language: 'text',
                code: `请修复登录页刷新后状态丢失的问题。

背景：
- 用户登录后刷新页面，会回到未登录状态。
- 期望刷新后仍能恢复已登录状态。

范围：
- 优先检查 src/auth 和相关测试。
- 不改数据库和后端接口。

验证：
- 运行 pnpm test auth。
- 如果需要新增测试，请覆盖刷新恢复状态的场景。

交付：
- 说明根因、改动文件、验证结果和剩余风险。`,
              },
            ],
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了“模糊任务 vs 清晰任务”的对比截图。',
          },
        ],
      },
      {
        id: 'split-large-task',
        title: '大任务拆分',
        ordered: [
          '只读分析：先让 Codex 找到影响面。',
          '方案确认：让 Codex 给出切分方式和验证路径。',
          '分步实施：每次只做一个可验证改动。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '大任务拆分模板',
            code: `请先不要修改代码。阅读 [模块/目录]，分析 [目标] 会影响哪些文件、接口和测试。请输出：
1. 影响面
2. 推荐实施步骤
3. 每一步的验证方式
4. 第一阶段最小改动建议`,
          },
        ],
      },
      {
        id: 'expose-uncertainty',
        title: '让 Codex 主动暴露不确定性',
        paragraphs: [
          '涉及文档更新、版本升级、依赖迁移和跨模块改动时，最好要求它明确标注“推测”，并在官方文档、代码和测试不一致时先停下来说明冲突。',
        ],
        codeBlocks: [
          {
            language: 'text',
            code: '如果你需要推测，请明确标注“推测”。如果官方文档、代码和测试之间有冲突，请先停下来说明冲突。',
          },
        ],
      },
    ],
    prevSlug: 'index',
    nextSlug: 'non-dev-workflows',
  },
  'non-dev-workflows': {
    slug: 'non-dev-workflows',
    title: '非开发工作流',
    summary: 'Codex 的价值不只体现在写代码。只要任务涉及一组文件、明确目标和可复核结果，Codex 就能提供帮助。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'docs-work',
        title: '文档工作',
        bullets: [
          '把 README 改成新手友好的版本。',
          '根据代码生成模块说明。',
          '整理迁移指南。',
          '生成发布说明。',
          '把 issue、PR、commit 整理成周报。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '文档任务模板',
            code: `请阅读当前仓库的 README、docs 和 package 配置，帮我整理一份新手上手指南。

要求：
1. 不修改代码。
2. 命令必须来自仓库真实配置。
3. 不确定的步骤标注为“待确认”。
4. 输出目录结构、安装步骤、开发命令、测试命令和常见问题。`,
          },
        ],
      },
      {
        id: 'learning-work',
        title: '学习工作',
        bullets: [
          '让 Codex 按学习顺序解释代码库。',
          '生成“从入口到核心模块”的阅读路线。',
          '把复杂模块讲成产品或运营也能理解的语言。',
          '把陌生技术栈拆成学习清单。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '学习路线模板',
            code: `请把这个仓库当成学习材料。请按初学者阅读顺序讲解：
1. 先看哪些文件
2. 每个目录承担什么职责
3. 关键数据流或调用链
4. 学完后可以做的 3 个练习`,
          },
        ],
      },
      {
        id: 'product-ops',
        title: '产品与运营工作',
        bullets: [
          '把 PR 改动翻译成用户影响。',
          '生成发布公告草稿。',
          '检查文档和功能说明是否一致。',
          '从 issue 中提取用户痛点。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '发布说明模板',
            code: `请阅读当前 diff，把技术改动整理成产品发布说明。请包含：
1. 用户能感知到的变化
2. 管理后台或配置变化
3. 可能影响旧用户的地方
4. 需要客服或运营同步的话术`,
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了“把 PR 转成发布说明”的示例截图。',
          },
        ],
      },
      {
        id: 'knowledge-management',
        title: '知识管理',
        paragraphs: [
          'Codex 很适合把零散经验沉淀成模板：排障记录、FAQ、任务模板、团队规范和案例复盘。目标是把“每次临时问一次”变成“下一次直接复用”。',
        ],
      },
    ],
    prevSlug: 'task-design',
    nextSlug: 'team-playbook',
  },
  'team-playbook': {
    slug: 'team-playbook',
    title: '团队实践',
    summary: '团队使用 Codex 的关键是把规则写清楚，把验证跑起来，把案例沉淀下来。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'safety-layers',
        title: '安全边界分层',
        images: [
          {
            src: '/codex-guide/images/codex-safety-layers.svg',
            alt: 'Codex 安全边界分层',
            caption: '原页在团队实践里复用了安全分层图，强调团队接入时规则和审批不能缺失。',
          },
        ],
      },
      {
        id: 'team-checklist',
        title: '团队接入清单',
        table: {
          headers: ['项目', '建议'],
          rows: [
            ['AGENTS.md', '写清项目结构、命令、风格和安全边界'],
            ['测试命令', '提供最小相关测试和全量测试命令'],
            ['PR 模板', '要求说明 Codex 参与范围、验证结果和风险'],
            ['安全规则', '明确生产数据、密钥、发布和迁移审批要求'],
            ['案例库', '把成功任务和失败复盘都沉淀下来'],
          ],
        },
      },
      {
        id: 'agents-template',
        title: 'AGENTS.md 提纲',
        codeBlocks: [
          {
            language: 'markdown',
            code: `# AGENTS.md

## 项目概览

## 常用命令

## 目录边界

## 代码规范

## 测试要求

## 安全边界

## PR 交付要求`,
          },
        ],
      },
      {
        id: 'pr-template',
        title: 'PR 描述模板',
        codeBlocks: [
          {
            language: 'markdown',
            code: `## 背景

## 改动

## Codex 参与范围

## 验证

## 风险

## 截图或日志`,
          },
        ],
      },
      {
        id: 'retrospective',
        title: '例会复盘问题',
        bullets: [
          '哪类任务 Codex 表现稳定？',
          '哪类任务容易失控或需要更强约束？',
          '哪些命令、规则、截图说明应该写入 AGENTS.md？',
          '哪些成功案例可以沉淀成模板？',
          '哪些失败案例应该写入排障手册？',
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了团队 PR 中 Codex 参与说明的截图。',
          },
        ],
      },
    ],
    prevSlug: 'non-dev-workflows',
  },
};

export function getCodexGuidePracticePage(slug: string): CodexGuidePracticePageData | undefined {
  return practicePages[slug];
}

export function getCodexGuidePracticeSidebar(): CodexGuideSidebarSection[] {
  return codexGuidePracticeSidebar;
}

export function getCodexGuidePracticeLinkForIndex(slug: string): string {
  return getCodexGuidePracticeRoute(slug);
}
