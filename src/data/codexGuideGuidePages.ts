import {
  codexGuideGuideSidebar,
  getCodexGuideGuideRoute,
  type CodexGuideSidebarSection,
} from '@site/src/data/codexGuideTopic';

export type CodexGuideGuideTable = {
  headers: string[];
  rows: string[][];
};

export type CodexGuideGuideImage = {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
};

export type CodexGuideGuideCodeBlock = {
  language?: string;
  title?: string;
  code: string;
};

export type CodexGuideGuideCallout = {
  tone: 'tip' | 'warning';
  title?: string;
  body: string;
};

export type CodexGuideGuideSubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
  images?: CodexGuideGuideImage[];
  codeBlocks?: CodexGuideGuideCodeBlock[];
};

export type CodexGuideGuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
  table?: CodexGuideGuideTable;
  images?: CodexGuideGuideImage[];
  callouts?: CodexGuideGuideCallout[];
  subsections?: CodexGuideGuideSubsection[];
  codeBlocks?: CodexGuideGuideCodeBlock[];
};

export type CodexGuideGuidePageData = {
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
  surfaceMap?: {
    title: string;
    description: string;
    primaryCards: Array<{title: string; description: string; tone: 'teal' | 'blue' | 'violet' | 'amber'}>;
    secondaryCards: Array<{title: string; description: string}>;
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

const guidePages: Record<string, CodexGuideGuidePageData> = {
  '00-overview': {
    slug: '00-overview',
    title: '学习路线',
    summary:
      'CodexGuide 按“认识入口、跑通任务、建立方法、团队沉淀”四层组织。关键不是先记命令，而是先理解每个入口适合承载什么类型的任务。',
    meta: {author: 'canghe', wordCount: '约 970 字', readingTime: '大约 3 分钟'},
    note: {
      title: '最后核对',
      body: '官方资料最后核对时间：2026-05-27。涉及功能、价格、可用性和安全策略时，应优先以 OpenAI 官方文档为准。',
    },
    surfaceMap: {
      title: 'Codex 使用入口地图',
      description: '同一套能力，在不同入口里承担不同节奏的任务。',
      primaryCards: [
        {title: 'CLI', description: '终端内快速迭代。读代码、改文件、跑测试。', tone: 'teal'},
        {title: 'Cloud / Web', description: '长任务与并行任务。仓库任务、PR、后台运行。', tone: 'blue'},
        {title: 'IDE', description: '贴近编辑器上下文。解释代码、局部修改、Review。', tone: 'violet'},
        {title: 'Desktop App', description: '本地多任务工作台。Agents、Skills、Automations。', tone: 'amber'},
      ],
      secondaryCards: [
        {title: 'ChatGPT 中的 Codex', description: '面向仓库任务分派、理解、总结与协作。'},
        {title: '集成生态', description: 'GitHub、Slack、Linear、MCP、企业流程。'},
      ],
    },
    sections: [
      {
        id: 'global-understanding',
        title: '你要先建立的全局理解',
        bullets: [
          'CLI：贴近终端和本地仓库，适合快速修改、运行命令、排障和验证。',
          '桌面 App：适合本地多任务、Skills、Automations、子代理和插件化工作流。',
          'Web / Cloud / ChatGPT：适合连接仓库、分派长任务、并行处理和生成 PR。',
          'IDE：适合贴近编辑器上下文的解释、修改、审查和局部任务。',
          '集成生态：GitHub、Slack、Linear、MCP 等入口让 Codex 接入团队协作链路。',
        ],
      },
      {
        id: 'four-stages',
        title: '四阶段路线',
        table: {
          headers: ['阶段', '目标', '推荐页面', '验收标准'],
          rows: [
            ['入门', '跑通一个低风险任务', '桌面 App 安装、手机端协同、连接第三方 API、完成第一个任务', '能用 Codex 完成一次完整任务闭环'],
            ['进阶', '形成稳定任务方法', '理解桌面 App 结构与基础操作', '能明确写出目标、范围、约束、验证和交付'],
            ['工程化', '进入真实项目流程', '任务执行、权限管理、技能与自动化', '每次修改都有 diff、测试结果和风险说明'],
            ['团队化', '沉淀规则和案例', 'AGENTS.md、沙箱与审批、Cloud、排障手册', '有项目规则、案例库、排障路径和协作共识'],
          ],
        },
      },
      {
        id: 'starter-path',
        title: '新手推荐路径',
        paragraphs: ['从 App 开始通常更顺畅；如果你已经在项目里写代码，可以直接从 CLI 路线切入。'],
        ordered: [
          '先安装桌面 App，完成登录。',
          '按需补齐 Plus 或对应账号权限。',
          '理解界面结构，再做第一个低风险任务。',
          '如果你是开发者，再切到 CLI 补工程化能力。',
        ],
      },
      {
        id: 'non-dev',
        title: '非开发者也可以怎么用',
        bullets: [
          '阅读陌生仓库，输出学习路线。',
          '整理 README、迁移说明、发布说明和操作手册。',
          '审阅配置、依赖、脚本和 CI 失败原因。',
          '把重复流程沉淀成模板、Skill 或自动化提醒。',
          '辅助产品、运营、技术写作和团队知识管理。',
        ],
      },
    ],
    nextSlug: '01-app-installation',
  },
  '01-app-installation': {
    slug: '01-app-installation',
    title: 'Codex 桌面 App 下载与安装',
    summary: '本教程里的 Codex 桌面 App 指电脑端客户端，不是手机 App。它由 OpenAI 官方发布，支持 macOS 和 Windows，安装后可以在本地管理项目、发起任务、使用 Skills 和 Automations。',
    meta: {author: 'canghe', wordCount: '约 487 字', readingTime: '大约 2 分钟'},
    note: {
      tone: 'tip',
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。下载地址与安装方式以 OpenAI Codex 产品页和 chatgpt.com/codex/cloud 为准，不同地区和账号套餐下可用功能可能有差异。',
    },
    sections: [
      {
        id: 'download',
        title: '下载',
        paragraphs: [
          '打开 chatgpt.com/codex/cloud，页面中央会显示对应系统的下载按钮。',
        ],
        subsections: [
          {
            title: 'macOS:',
            images: [
              {
                src: '/codex-guide/images/image-20260511172444574.png',
                alt: 'Codex 桌面 App 下载页 macOS',
                caption: '点击 [Download for macOS] 下载 .dmg 安装包。',
              },
            ],
          },
          {
            title: 'Windows:',
            images: [
              {
                src: '/codex-guide/images/image-20260511172634781.png',
                alt: 'Codex 桌面 App 下载页 Windows',
                caption: 'Windows 用户点击对应的下载按钮，下载完成后运行安装程序，按提示完成安装。',
              },
            ],
          },
        ],
      },
      {
        id: 'install',
        title: 'macOS 安装步骤',
        ordered: [
          '下载对应系统的安装包。',
          '打开下载好的 .dmg 文件。',
          '将 Codex 图标拖入 [Applications（应用程序）] 文件夹。',
          '首次启动时，macOS 可能提示“无法验证开发者”，进入【系统设置 → 隐私与安全性】，点击【仍要打开】。',
        ],
      },
      {
        id: 'login',
        title: '登录',
        paragraphs: [
          '安装完成后打开 App，使用 ChatGPT / OpenAI 账号登录。',
        ],
        callouts: [
          {
            tone: 'warning',
            title: '注意套餐限制',
            body: 'Codex 桌面 App 的完整功能（多 agent 并行、Skills、Automations 等）通常需要 Plus 及以上套餐。免费账号登录后部分功能会受限或无法使用。',
          },
          {
            tone: 'tip',
            title: '提示',
            body: '如果登录失败，可以考虑切换代理节点或检查账号本身的地区 / 套餐限制。',
          },
        ],
      },
      {
        id: 'verify',
        title: '安装后验证',
        paragraphs: [
          '登录成功后，左侧栏应显示【Projects】和【Chats】两个入口，顶部显示当前账号信息。如果界面正常加载，说明安装成功。',
          '下一步：订阅 ChatGPT Plus / Pro',
        ],
      },
    ],
    prevSlug: '00-overview',
    nextSlug: '02-subscribe-plus',
  },
  '02-subscribe-plus': {
    slug: '02-subscribe-plus',
    title: '02 订阅 Plus',
    summary: '确认桌面 App、ChatGPT 和 Codex 能力对应的订阅前提，避免安装完成后权限不足。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'why-plus',
        title: '为什么需要 Plus',
        paragraphs: [
          '很多用户第一次卡住，不是因为不会装，而是因为账号能力不足。Plus 或更高订阅通常决定你能否稳定使用 Codex 相关入口。',
          '如果你在团队环境中使用企业版或其他套餐，应以组织管理员的策略和官方说明为准。',
        ],
      },
      {
        id: 'how-to-upgrade',
        title: '如何判断是否需要升级',
        bullets: [
          '桌面 App 登录后只能看到受限功能。',
          '某些任务入口无法打开或被提示无权限。',
          'Cloud / ChatGPT 中的仓库能力无法启用。',
        ],
      },
      {
        id: 'subscription-check',
        title: '订阅检查清单',
        ordered: [
          '确认当前账号是否为个人账号还是组织账号。',
          '确认当前套餐是否包含 Codex 所需能力。',
          '确认地区与网络环境没有额外限制。',
        ],
      },
    ],
    prevSlug: '01-app-installation',
    nextSlug: '03-app-overview',
  },
  '03-app-overview': {
    slug: '03-app-overview',
    title: '03 桌面 App 总览',
    summary: '先理解桌面 App 的界面结构和主要对象，再去执行任务，成本最低。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'main-layout',
        title: '主界面结构',
        bullets: [
          'Projects：围绕项目组织上下文和任务。',
          'Chats：围绕单次任务或对话组织执行过程。',
          '顶部账号区：查看当前登录状态和可用能力。',
        ],
      },
      {
        id: 'task-flow',
        title: '典型任务流',
        ordered: [
          '进入项目或创建会话。',
          '描述任务目标、范围、约束和交付。',
          '让 Codex 先读上下文，再开始执行。',
          '用 diff、日志、截图或测试确认结果。',
        ],
      },
      {
        id: 'built-in-capabilities',
        title: '你会频繁用到的能力',
        bullets: [
          'Skills：沉淀常用能力模板。',
          'Automations：周期化或重复性任务。',
          '多任务管理：同时推进多个上下文任务。',
        ],
      },
    ],
    prevSlug: '02-subscribe-plus',
    nextSlug: '04-mobile-control-desktop',
  },
  '04-mobile-control-desktop': {
    slug: '04-mobile-control-desktop',
    title: '04 手机端协同',
    summary: '手机端更适合查看状态和跟进进度，不要把它误解为远程桌面替代品。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'what-mobile-is-for',
        title: '手机端适合什么',
        bullets: [
          '查看任务当前状态。',
          '补充说明、继续对话、追踪结果。',
          '在不方便开电脑时跟进任务进展。',
        ],
      },
      {
        id: 'what-mobile-is-not-for',
        title: '手机端不适合什么',
        bullets: [
          '不适合作为复杂工程任务的主操作入口。',
          '不适合替代桌面系统级安装、调试和本地验证。',
          '不适合承担大量精细编辑动作。',
        ],
      },
      {
        id: 'best-practice',
        title: '推荐协同方式',
        paragraphs: [
          '把桌面 App 当主入口，把手机端当任务跟进入口。复杂任务在桌面端初始化，手机端只做说明补充和状态检查。',
        ],
      },
    ],
    prevSlug: '03-app-overview',
    nextSlug: '05-third-party-api',
  },
  '05-third-party-api': {
    slug: '05-third-party-api',
    title: '05 连接第三方 API',
    summary: '只有在官方账号能力不足或团队明确要求时，才考虑第三方 API 接入。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'when-to-use',
        title: '什么时候才需要第三方 API',
        paragraphs: [
          '优先使用官方能力。只有在账号策略、组织限制、特殊集成要求明确存在时，才考虑补充第三方 API。',
          '第三方 API 会引入额外的密钥管理、计费、安全和稳定性边界，不适合作为默认起点。',
        ],
      },
      {
        id: 'configuration',
        title: '配置要点',
        bullets: [
          '确认 Base URL、API Key 和模型名称来源可靠。',
          '明确哪些任务允许使用外部服务。',
          '避免在项目里硬编码密钥和敏感配置。',
        ],
      },
      {
        id: 'risks',
        title: '风险与边界',
        bullets: [
          '额外的成本控制难度。',
          '请求内容可能经过第三方服务。',
          '与团队默认工作流不一致时，排障会更复杂。',
        ],
      },
    ],
    prevSlug: '04-mobile-control-desktop',
    nextSlug: '06-app-first-task',
  },
  '06-app-first-task': {
    slug: '06-app-first-task',
    title: '06 第一个任务',
    summary: '第一个任务不要追求复杂，而是要追求可验证、可回退、可总结。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'choose-task',
        title: '先选低风险任务',
        bullets: [
          '总结仓库结构。',
          '补一段文档。',
          '修一个样式小问题。',
          '补一个简单测试或修单个失败用例。',
        ],
      },
      {
        id: 'write-request',
        title: '把任务说清楚',
        ordered: [
          '说明目标和预期结果。',
          '说明不允许动的部分。',
          '说明如何验证。',
          '要求先读上下文再修改。',
        ],
      },
      {
        id: 'close-loop',
        title: '形成第一次闭环',
        paragraphs: [
          '一个合格的首次任务，至少要留下改动结果、验证证据和下一步建议。完成后把这次任务描述沉淀成后续可复用模板。',
        ],
      },
    ],
    prevSlug: '05-third-party-api',
    nextSlug: '07-task-execution',
  },
  '07-task-execution': {
    slug: '07-task-execution',
    title: '07 任务执行',
    summary: '进入日常工作流后，关键是把任务拆小、边做边验，而不是一次性丢给 Codex 一个模糊大需求。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'execution-principles',
        title: '执行原则',
        bullets: [
          '先读后改。',
          '小步提交。',
          '每一步都给验证依据。',
          '高风险动作必须显式审批。',
        ],
      },
      {
        id: 'task-template',
        title: '推荐任务模板',
        ordered: [
          '说明目标。',
          '指出相关文件或范围。',
          '说明不能动的地方。',
          '指定验证方式和期望输出。',
        ],
      },
    ],
    prevSlug: '06-app-first-task',
    nextSlug: '08-permissions',
  },
  '08-permissions': {
    slug: '08-permissions',
    title: '08 权限管理',
    summary: '权限边界决定了 Codex 是否可控。这个主题要先于任何大规模自动化。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'permission-layers',
        title: '权限边界的三层',
        bullets: [
          '文件系统：哪些目录可读、可写。',
          '网络：是否允许访问外部服务。',
          '执行：哪些命令必须经过审批。',
        ],
      },
      {
        id: 'approval-strategy',
        title: '审批策略',
        paragraphs: [
          '对删除、移动、外部写入、安装依赖、生产环境命令等动作设置明确审批规则。没有审批策略的自动化，迟早会出事故。',
        ],
      },
    ],
    prevSlug: '07-task-execution',
    nextSlug: '09-skills-plugins',
  },
  '09-skills-plugins': {
    slug: '09-skills-plugins',
    title: '09 技能与插件',
    summary: 'Skills 和插件不是装得越多越好，而是要围绕高频任务沉淀可复用能力。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'why-skills',
        title: '为什么要沉淀 Skills',
        bullets: [
          '减少重复说明。',
          '稳定任务模板。',
          '降低团队内不同人使用 Codex 的偏差。',
        ],
      },
      {
        id: 'selection-principles',
        title: '选择原则',
        bullets: [
          '优先装解决真实高频任务的能力。',
          '能本地完成的，不额外引入复杂插件。',
          '涉及外部账号和凭据的插件要先定边界。',
        ],
      },
    ],
    prevSlug: '08-permissions',
    nextSlug: '10-automation',
  },
  '10-automation': {
    slug: '10-automation',
    title: '10 自动化',
    summary: '自动化适合重复性工作，不适合把模糊高风险决策直接放进无人值守流程里。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'good-automation',
        title: '适合自动化的任务',
        bullets: [
          '日报和周报整理。',
          '周期性检查依赖与日志。',
          '模板化内容生成。',
          '固定脚本的包装执行。',
        ],
      },
      {
        id: 'unsafe-automation',
        title: '不适合自动化的任务',
        bullets: [
          '直接修改生产配置。',
          '无审批的大范围代码重构。',
          '需要人工判断安全性的操作。',
        ],
      },
    ],
    prevSlug: '09-skills-plugins',
    nextSlug: '11-desktop-pet',
  },
  '11-desktop-pet': {
    slug: '11-desktop-pet',
    title: '11 桌面助手',
    summary: '桌面助手的价值不在于“陪伴感”，而在于让你更持续地维护任务上下文。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'assistant-role',
        title: '桌面助手的定位',
        paragraphs: [
          '把它理解成一个持续在线的任务入口，而不是简单聊天窗口。关键价值在于提醒、跟进和保持上下文连续。',
        ],
      },
      {
        id: 'usage-patterns',
        title: '推荐使用方式',
        bullets: [
          '用来启动和跟踪轻量任务。',
          '用来补充说明和继续任务。',
          '不要把复杂工程编辑完全压在这类入口上。',
        ],
      },
    ],
    prevSlug: '10-automation',
    nextSlug: '12-cli-installation',
  },
  '12-cli-installation': {
    slug: '12-cli-installation',
    title: '12 CLI 安装与登录',
    summary: '开发者路线先从 CLI 跑通本地安装、登录和第一次只读任务。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'precheck',
        title: '安装前检查',
        bullets: [
          '确认 Node、npm 和 Git 可用。',
          '确认操作系统和 shell 环境符合要求。',
          '优先在可控的本地项目目录里做第一次尝试。',
        ],
      },
      {
        id: 'install-login',
        title: '安装与登录',
        ordered: [
          '安装 CLI。',
          '检查版本。',
          '完成一次登录。',
          '进入项目目录做第一次只读理解任务。',
        ],
      },
    ],
    prevSlug: '11-desktop-pet',
    nextSlug: '13-cli-first-run',
  },
  '13-cli-first-run': {
    slug: '13-cli-first-run',
    title: '13 CLI 首次改代码',
    summary: '第一次通过 CLI 改代码，目标不是速度，而是确认你的验证链路完整。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'first-change',
        title: '推荐第一次修改',
        bullets: [
          '补一段文档。',
          '修一个明显的 UI 小问题。',
          '补一个失败的测试。',
        ],
      },
      {
        id: 'verify',
        title: '验证链路',
        ordered: [
          '先读相关文件。',
          '小步修改。',
          '跑测试或构建。',
          '输出变更说明和风险。',
        ],
      },
    ],
    prevSlug: '12-cli-installation',
    nextSlug: '14-ide-vscode',
  },
  '14-ide-vscode': {
    slug: '14-ide-vscode',
    title: '14 VS Code 插件',
    summary: 'IDE 入口适合贴近编辑器上下文做解释、局部修改和代码审查。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'ide-use-cases',
        title: 'IDE 入口最适合的场景',
        bullets: [
          '解释当前文件和调用链。',
          '做局部改动和重构。',
          '就近查看 diff 和审查结果。',
        ],
      },
      {
        id: 'avoid-misuse',
        title: '不要这样用',
        bullets: [
          '不要把超大范围任务只塞给 IDE 入口。',
          '不要在没有测试与验证手段时大改核心逻辑。',
        ],
      },
    ],
    prevSlug: '13-cli-first-run',
    nextSlug: '15-agents-md',
  },
  '15-agents-md': {
    slug: '15-agents-md',
    title: '15 AGENTS.md',
    summary: 'AGENTS.md 是把个人经验变成团队规则的关键文件。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'why-agents',
        title: '为什么必须写 AGENTS.md',
        bullets: [
          '统一命令和目录约定。',
          '统一代码风格和交付要求。',
          '明确禁止事项和审批边界。',
        ],
      },
      {
        id: 'what-to-write',
        title: '建议包含的内容',
        bullets: [
          '构建、测试、运行命令。',
          '代码规范与提交流程。',
          '高风险操作约束。',
          '验证与汇报格式。',
        ],
      },
    ],
    prevSlug: '14-ide-vscode',
    nextSlug: '16-sandbox-approvals',
  },
  '16-sandbox-approvals': {
    slug: '16-sandbox-approvals',
    title: '16 沙箱与审批',
    summary: '把 Codex 放进团队流程之前，先把沙箱、权限和审批策略讲明白。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'sandbox-model',
        title: '沙箱模型',
        bullets: [
          '限定可读写目录。',
          '限定网络访问。',
          '限定高风险命令必须升级审批。',
        ],
      },
      {
        id: 'team-policy',
        title: '团队策略',
        paragraphs: [
          '审批规则要写在文档里，而不是靠口头共识。尤其是删除、外部发布、依赖安装和生产环境命令，必须统一口径。',
        ],
      },
    ],
    prevSlug: '15-agents-md',
    nextSlug: '17-cloud-ide-app',
  },
  '17-cloud-ide-app': {
    slug: '17-cloud-ide-app',
    title: '17 Codex Cloud',
    summary: 'Cloud 入口更适合长任务、仓库级任务和团队协作，不适合所有事情都本地跑。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'cloud-scenarios',
        title: '适合 Cloud 的任务',
        bullets: [
          '长时间运行的仓库级任务。',
          '多任务并行处理。',
          '围绕 PR、Issue、代码审查的协作任务。',
        ],
      },
      {
        id: 'cloud-boundary',
        title: '边界提醒',
        bullets: [
          '明确哪些仓库和分支允许被 Cloud 访问。',
          '明确组织级权限和审查流程。',
        ],
      },
    ],
    prevSlug: '16-sandbox-approvals',
    nextSlug: '18-troubleshooting',
  },
  '18-troubleshooting': {
    slug: '18-troubleshooting',
    title: '18 排障手册',
    summary: '排障优先查三件事：权限、环境、上下文。不要一上来就怀疑模型本身。',
    meta: DEFAULT_META,
    sections: [
      {
        id: 'troubleshooting-order',
        title: '推荐排查顺序',
        ordered: [
          '先看权限与审批是否被拒绝。',
          '再看环境依赖和网络状态。',
          '再看任务描述和上下文是否缺失。',
          '最后再看工具或服务端本身是否异常。',
        ],
      },
      {
        id: 'common-failures',
        title: '常见故障',
        bullets: [
          '登录失败或会话失效。',
          '命令能读不能写。',
          '图片或上传资源无权限访问。',
          '后端接口、构建或测试无法复现。',
        ],
      },
    ],
    prevSlug: '17-cloud-ide-app',
  },
};

guidePages['02-subscribe-plus'] = {
  slug: '02-subscribe-plus',
  title: '02 订阅 Plus / Pro',
  summary:
    '在安装桌面 App 之前，先确认当前 ChatGPT / OpenAI 账号是否具备 Codex 所需权限。很多“装好了但不能用”的问题，本质上是套餐和地区限制。',
  meta: {author: 'canghe', wordCount: '约 860 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '账号套餐、地区可用性、Cloud 与桌面 App 的功能边界经常调整。涉及功能开放情况时，以 OpenAI 官方产品页和帮助中心说明为准。',
  },
  sections: [
    {
      id: 'why-plus',
      title: '为什么需要 Plus',
      paragraphs: [
        '很多用户第一次卡住，并不是不会安装，而是账号能力本身不够。桌面 App、Cloud 和部分仓库任务入口，往往要求 Plus、Pro 或组织侧开通的更高权限。',
        '如果你处在团队或企业环境中，应优先以组织管理员、SSO 策略和公司文档为准，不要只参考个人账号页面的提示。',
      ],
      images: [
        {
          src: '/codex-guide/images/subscribe-hero-sms.png',
          alt: 'Codex 订阅提示与验证短信示意',
          caption: '原页面强调：先确认账号能力，再做安装与登录，避免把权限问题误判为安装问题。',
        },
      ],
    },
    {
      id: 'how-to-upgrade',
      title: '如何判断是否需要升级',
      bullets: [
        '桌面 App 登录后只能看到受限能力，无法进入完整任务工作台。',
        'Cloud / ChatGPT 中的仓库能力不可用，或提示当前套餐不支持。',
        '某些任务入口、并行任务、Skills、Automations 一直是灰色或直接报权限不足。',
        '组织要求统一使用企业套餐，而你的个人账号并未纳入组织范围。',
      ],
      callouts: [
        {
          tone: 'warning',
          title: '先排除权限，再排查安装',
          body: '如果你已经能正常启动桌面 App，但进入后功能明显缺失，优先检查账号套餐、地区和组织权限，不要先怀疑安装包损坏。',
        },
      ],
    },
    {
      id: 'subscription-options',
      title: '常见订阅与支付路径',
      table: {
        headers: ['场景', '推荐路径', '说明'],
        rows: [
          ['个人账号', '官网订阅 Plus / Pro', '最直接，后续问题最少，优先使用官方支付链路。'],
          ['Apple 生态', '通过 Apple ID 礼品卡或应用内订阅', '适合本地银行卡受限但可以使用美区 Apple ID 的用户。'],
          ['团队 / 企业', '由组织管理员统一开通', '以组织分配的账号能力、SSO 与安全策略为准。'],
        ],
      },
      subsections: [
        {
          title: 'Apple Gift Card 路径',
          paragraphs: [
            '如果你使用美区 Apple ID，可以先为 Apple 账户充值，再通过 ChatGPT iOS 应用或 App Store 订阅 Plus / Pro。',
          ],
          images: [
            {
              src: '/codex-guide/images/subscribe-apple-gift-card.jpg',
              alt: 'Apple Gift Card 订阅示意',
              caption: '使用礼品卡时，先确认 Apple ID 地区与礼品卡面额、币种一致。',
            },
            {
              src: '/codex-guide/images/subscribe-apple-id-redeem.jpg',
              alt: 'Apple ID 兑换礼品卡示意',
              caption: '充值完成后，再回到 ChatGPT 或对应订阅入口执行升级。',
            },
          ],
        },
      ],
    },
    {
      id: 'subscription-check',
      title: '订阅检查清单',
      ordered: [
        '确认当前账号属于个人账号还是组织账号。',
        '确认当前套餐是否覆盖桌面 App、Cloud 和仓库任务所需能力。',
        '确认当前地区、支付方式与网络环境没有额外限制。',
        '如果已经升级，重新登录桌面 App 和 Cloud 页面再验证能力是否生效。',
      ],
    },
  ],
  prevSlug: '01-app-installation',
  nextSlug: '03-app-overview',
};

guidePages['03-app-overview'] = {
  slug: '03-app-overview',
  title: '03 桌面 App 总览',
  summary:
    '先理解桌面 App 的主要区域、任务对象和设置入口，再去执行具体任务。这样后面遇到多任务、聊天线程、项目上下文时不会混乱。',
  meta: {author: 'canghe', wordCount: '约 980 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '阅读方式',
    body: '这一页不要求你立刻记住每一个按钮，而是先建立界面地图：左侧是什么，中间是什么，右上角设置里有什么，哪里可以验证当前账号状态。',
  },
  sections: [
    {
      id: 'main-layout',
      title: '主界面结构',
      paragraphs: [
        '桌面 App 的核心不是“一个聊天框”，而是围绕项目、会话、上下文与自动化能力组织的工作台。你后面做本地任务、切换项目、调用 Skills，都建立在这个界面结构上。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511150406204.png',
          alt: 'Codex 桌面 App 主界面总览',
          caption: '先认识整体布局，再理解每个区域承担的任务。',
        },
      ],
      bullets: [
        'Projects：围绕仓库或目标组织上下文，适合持续推进一类任务。',
        'Chats：围绕单次任务或单条工作链组织执行过程。',
        '顶部 / 右上区域：查看账号状态、模型能力、设置与入口切换。',
      ],
    },
    {
      id: 'left-sidebar',
      title: '左侧与中间区域分别做什么',
      subsections: [
        {
          title: '左侧：项目、会话、切换关系',
          paragraphs: ['左侧更像任务索引层。你可以把它理解成“我要在哪个上下文里继续做事”的导航区。'],
          images: [
            {
              src: '/codex-guide/images/image-20260511150432591.png',
              alt: 'Codex 左侧区域示意',
              caption: '左侧承担导航、切换和组织上下文的职责。',
            },
          ],
        },
        {
          title: '中间：当前任务的主工作区',
          paragraphs: [
            '中间区域是你真正读取、描述、追踪和确认任务的地方。你后面看到的执行过程、输出结果、下一步建议，都会在这里展开。',
          ],
        },
      ],
    },
    {
      id: 'settings',
      title: '设置与能力映射',
      paragraphs: ['真正影响使用体验的，不只是界面排版，而是你是否知道哪些设置控制模型、权限、外部服务、技能与自动化。'],
      images: [
        {
          src: '/codex-guide/images/image-20260511174720640.png',
          alt: 'Codex 设置入口示意',
          caption: '先熟悉设置入口，再决定是否调整模型、权限或集成。',
        },
        {
          src: '/codex-guide/images/image-20260511175034743.png',
          alt: 'Codex 设置页示意',
          caption: '很多“功能没有生效”的问题，最后都要回到设置页确认。',
        },
        {
          src: '/codex-guide/images/image-20260511175220089.png',
          alt: 'Codex 设置页能力项示意',
          caption: '把账号状态、能力开关和工具链配置对应起来看，后面排障会轻很多。',
        },
        {
          src: '/codex-guide/images/codex-settings-map.svg',
          alt: 'Codex 设置能力地图',
          caption: '这张图适合用来快速建立“设置项和能力之间”的对应关系。',
        },
      ],
    },
    {
      id: 'built-in-capabilities',
      title: '你会频繁用到的能力',
      bullets: [
        'Skills：沉淀常用任务模板，把高频操作变成可复用能力。',
        'Automations：适合周期性任务、提醒、监控和重复流程。',
        '多任务管理：同时推进多个任务上下文，而不是把所有事情塞进同一个聊天线程。',
      ],
    },
  ],
  prevSlug: '02-subscribe-plus',
  nextSlug: '04-mobile-control-desktop',
};

guidePages['04-mobile-control-desktop'] = {
  slug: '04-mobile-control-desktop',
  title: '04 手机端协同桌面',
  summary:
    '手机端不是桌面端替代品，而是补充入口。它适合查看状态、继续对话、追踪任务进度，不适合承担复杂本地工程任务。',
  meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 2 分钟'},
  note: {
    tone: 'tip',
    title: '使用边界',
    body: '把手机端当成“跟进、补充、续接”的入口更合理。真正需要读仓库、改文件、跑命令时，还是应回到桌面端。',
  },
  sections: [
    {
      id: 'what-mobile-is-for',
      title: '手机端适合做什么',
      paragraphs: [
        '如果你已经在桌面端发起了任务，手机端很适合查看执行状态、补充说明、确认中间结果，或者在离开电脑时继续维持任务上下文。',
      ],
      images: [
        {
          src: '/codex-guide/images/mobile-codex-ios-app.jpg',
          alt: 'Codex 手机端界面示意',
          caption: '手机端更像轻量工作入口，而不是完整本地开发环境。',
        },
        {
          src: '/codex-guide/images/mobile-codex-connect-desktop.jpg',
          alt: '手机端连接桌面任务示意',
          caption: '最常见的模式是：桌面发起，手机跟进。',
        },
        {
          src: '/codex-guide/images/mobile-codex-chatgpt-entry.jpg',
          alt: 'ChatGPT 中进入 Codex 的手机入口示意',
          caption: '你也可以通过 ChatGPT 移动端进入相关入口，但它的职责依旧是协同而不是替代。',
        },
      ],
      bullets: ['查看任务当前状态和最近输出。', '补充说明、继续对话、催促下一步或确认结论。', '在不方便打开电脑时，跟踪任务是否已经收敛。'],
    },
    {
      id: 'what-mobile-is-not-for',
      title: '手机端不适合做什么',
      bullets: ['不适合作为复杂工程任务的主入口。', '不适合替代桌面端做系统级安装、调试和本地验证。', '不适合承担大量细致的文件编辑和多窗口排查工作。'],
    },
    {
      id: 'best-practice',
      title: '推荐协同方式',
      paragraphs: [
        '把桌面 App 当主入口，把手机端当任务跟进入口。复杂任务在桌面端初始化，手机端只做补充说明、状态检查和轻量确认。',
        '如果你发现自己在手机端反复尝试解决本地环境、仓库读写、脚本执行这类问题，说明任务已经超出手机端的合理边界，应回到桌面端。',
      ],
    },
  ],
  prevSlug: '03-app-overview',
  nextSlug: '05-third-party-api',
};

guidePages['05-third-party-api'] = {
  slug: '05-third-party-api',
  title: '05 连接第三方 API',
  summary:
    '只有在官方账号能力无法满足，或者团队明确要求接入其他模型与代理层时，才考虑第三方 API。默认路线仍然应是先跑通官方工作流。',
  meta: {author: 'canghe', wordCount: '约 1800 字', readingTime: '大约 6 分钟'},
  note: {
    tone: 'warning',
    title: '先确认必要性',
    body: '第三方 API 会引入额外的密钥管理、计费、稳定性和合规边界。除非你很明确地知道自己为什么要这样做，否则不要把它作为默认起点。',
  },
  sections: [
    {
      id: 'when-to-use',
      title: '什么时候才需要第三方 API',
      paragraphs: [
        '优先使用官方能力。只有在账号策略、组织限制、地区约束，或者你确实要接入专门的模型代理层时，才考虑补充第三方 API。',
        '第三方 API 会引入额外的密钥管理、计费、延迟与安全边界，不适合做默认起点。',
      ],
      callouts: [
        {
          tone: 'tip',
          title: '最后核对',
          body: '这一页对应 CodexGuide 原文中的进阶配置页，重点是理解手动配置、Codex++、CCX + CC Switch 三类路线。不是每个用户都需要做这一层。',
        },
      ],
    },
    {
      id: 'three-options',
      title: '三种方案怎么选',
      table: {
        headers: ['方案', '适合谁', '优点', '需要注意'],
        rows: [
          ['手动配置', '想理解 Codex 底层配置的人', '透明、可控、方便排障', '要自己维护 config.toml，字段写错就不生效'],
          ['Codex++', '主要使用桌面 App，希望图形化管理的人', '有管理界面，可以切模型、改 Base URL、管 Key', '是第三方 launcher，Codex 更新后可能需要跟进适配'],
          ['CCX + CC Switch', '有多个供应商、需要协议转换和统一切换的人', 'CCX 做网关路由，CC Switch 做配置切换', '组件更多，需要理解本地服务、端口、密钥和代理链路'],
        ],
      },
      paragraphs: ['如果你只是刚开始学习 Codex，建议先完成第一个任务，再回来看这一页。第三方 API 不是入门必需步骤。'],
    },
    {
      id: 'manual-config',
      title: '方案一：手动配置',
      paragraphs: [
        '手动配置最接近原理层。你直接修改本机的 ~/.codex/config.toml，并自行维护 provider、Base URL、模型名和环境变量。',
        '这条路径更适合已经理解 config.toml、API Key、Base URL 和 Responses API 形态的人。',
      ],
      images: [
        {
          src: 'https://cdn.canghecode.com/blog/20260529172147.png',
          alt: '手动配置模式示意图',
          caption: '原文里先给出整体示意，再进入 config.toml 配置细节。',
        },
        {
          src: 'https://cdn.canghecode.com/blog/20260529165811.png',
          alt: '备份配置文件示意图',
          caption: '改之前先备份 config.toml 和 auth.json，避免回滚困难。',
        },
      ],
      ordered: [
        '先备份 ~/.codex/config.toml 和 ~/.codex/auth.json。',
        '明确当前是走 ChatGPT 登录态，还是走 API Key 登录。',
        '只新增一个 provider，先跑通，再考虑多 profile 或多供应商。',
      ],
      callouts: [
        {
          tone: 'tip',
          title: '两类登录思路',
          body: 'ChatGPT 登录态更适合保留官方账号能力，只调整请求入口；API Key 登录更适合纯 OpenAI API Key 或兼容 Responses API 的上游服务。第一次配置时不要混改太多字段。',
        },
      ],
      subsections: [
        {
          title: 'ChatGPT 登录态示例',
          paragraphs: [
            '如果你已经先登录了 ChatGPT / OpenAI 账号，可以在 config.toml 中添加一个 provider，把请求入口改到兼容的 Base URL，并通过环境变量注入 API Key。',
            '关键点是：model_provider 名称必须和 [model_providers.xxx] 里的 xxx 完全一致；base_url 通常写到 /v1；wire_api 要保持 responses。',
          ],
          images: [
            {
              src: 'https://cdn.canghecode.com/blog/20260529170535.png',
              alt: 'config.toml 手动配置示意图',
            },
            {
              src: 'https://cdn.canghecode.com/blog/20260529171249.png',
              alt: '环境变量注入 API Key 示意图',
            },
            {
              src: 'https://cdn.canghecode.com/blog/20260529171601.png',
              alt: 'Codex App 读取到新模型的示意图',
              caption: 'macOS 下通常需要从终端启动 Codex App，才能确保继承当前 shell 的环境变量。',
            },
          ],
        },
        {
          title: 'API Key 登录示例',
          paragraphs: [
            '如果你的服务本身就是 API Key 驱动，推荐把 Key 放在环境变量里，不要写死在 config.toml。',
            '如果上游只支持 Chat Completions，不支持 Responses API，通常不能只靠 config.toml 解决，需要用 CCX 这类网关做协议转换。',
          ],
          images: [
            {
              src: 'https://cdn.canghecode.com/blog/20260529170927.png',
              alt: '修改 auth.json 或鉴权文件示意图',
              caption: '原页面同时提示了 auth.json 的修改方式，但实际仍然更推荐通过环境变量管理密钥。',
            },
          ],
        },
      ],
    },
    {
      id: 'codex-plus-plus',
      title: '方案二：Codex++',
      paragraphs: [
        'Codex++ 是面向 Codex App 的外部增强 launcher 和管理工具。它不直接修改原始安装文件，而是通过外部 launcher 和注入方式增强桌面端能力。',
        '这一条路更适合长期使用桌面 App，并且希望用图形界面维护 Base URL、Key 和模型列表的人。',
      ],
      images: [
        {
          src: 'https://cdn.canghecode.com/blog/20260529171743.png',
          alt: 'Codex++ 总览图',
        },
      ],
      bullets: [
        '你主要使用 Codex 桌面 App。',
        '你希望通过图形界面维护 Base URL 和 Key。',
        '你希望切回官方登录态时，不完全靠手写配置。',
      ],
      subsections: [
        {
          title: '安装与检测流程',
          ordered: [
            '打开 Codex++ Releases，下载与你系统匹配的管理工具和 app 安装包。',
            '安装后先打开管理工具，确认系统权限和登录态。',
            '如果 macOS 首次打开被拦截，需要到系统设置 -> 隐私与安全性中点击“仍要打开”。',
          ],
          images: [
            {
              src: 'https://cdn.canghecode.com/blog/20260529172239.png',
              alt: 'Codex++ Releases 下载页',
            },
            {
              src: 'https://cdn.canghecode.com/blog/ca6415f0ad1e10755f656001d16d91d5.png',
              alt: 'Codex++ 两个安装包示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/b265fd82e492107e53dc7b0df6af553c.png',
              alt: 'Codex++ 首次打开报错示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/3e514cfc66a2a76536dbfc5c37743315.png',
              alt: 'macOS 隐私与安全性允许打开示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/f33b0f1f6377c237f113000a0ec0637f.png',
              alt: 'Codex++ 管理工具界面示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/e0ca6498f640c984c438527f13faf435.jpg',
              alt: 'Codex++ 检测全绿示意',
            },
          ],
        },
        {
          title: '添加供应商配置并启动',
          paragraphs: [
            '在“供应商配置”里添加自己的上游服务，填写 Base URL、Key 和模型信息。接入方式按原文建议选纯 API。',
            '配置完成后，从 Codex++ 入口而不是原版 Codex 入口启动，新的 provider 才会真正生效。',
          ],
          images: [
            {
              src: 'https://cdn.canghecode.com/blog/d13c6d3d480af07b22cc8b7b470a45e5.jpg',
              alt: 'Codex++ 添加供应商配置示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/0c4dd861837c8686d3135b704ae4517d.jpg',
              alt: 'Codex++ 拉取模型列表示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/9132822e751d0eccd37b79bbe0d6b3b0.jpg',
              alt: 'Codex++ 写入配置示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/728d1e4564ea5f78121cae63fd94790a.jpg',
              alt: 'Codex++ 测试连通并启用示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/cb577d3e36171a7204e291500a7db9dc.jpg',
              alt: '从 Codex++ 入口启动示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/151adfc6f7cd994b58815787999a5c37.jpg',
              alt: 'Codex++ 启动后模型供应商生效示意',
            },
            {
              src: 'https://cdn.canghecode.com/blog/66afdc2191cadafa60171ef81940733d.jpg',
              alt: 'Codex++ 中插件能力示意',
            },
          ],
        },
      ],
    },
    {
      id: 'ccx-switch',
      title: '方案三：CCX + CC Switch',
      paragraphs: [
        '这条路线把“网关”和“切换工具”拆开：CCX 负责 API 代理、协议转换、路由与管理界面；CC Switch 负责桌面侧的供应商配置切换。',
        '它更适合你有多个国产模型 API、多个中转服务、多个 Key，或者需要把 Chat Completions 转成 Codex 可用入口的场景。',
      ],
      subsections: [
        {
          title: '第 1 步：部署 CCX',
          paragraphs: [
            '如果你使用 Docker，可以先启动 CCX，再通过本地 Web 管理界面添加上游渠道。原文里给了带访问密钥的 docker run 示例。',
          ],
        },
        {
          title: '第 2 步：在 CCX 添加渠道',
          bullets: [
            '选择上游服务类型。',
            '填写国产模型或中转服务的 API Key。',
            '填写 Base URL，并配置模型映射或可用模型。',
            '先用 CCX 自带测试功能确认渠道可用。',
          ],
        },
        {
          title: '第 3 步：安装并初始化 CC Switch',
          paragraphs: [
            '安装后通过 cc-switch init 初始化，把 CCX 地址作为统一中转入口。后续你可以用 cc-switch use <配置名> 切换不同供应商。',
          ],
        },
      ],
      callouts: [
        {
          tone: 'tip',
          title: '适用边界',
          body: '如果你只是单一账号、单一模型、单一入口，不一定需要 CCX + CC Switch。它真正有价值的场景是“多供应商、多路由、多环境切换”。',
        },
      ],
    },
    {
      id: 'common-issues',
      title: '常见问题',
      table: {
        headers: ['现象', '先检查什么'],
        rows: [
          ['切换后没有生效', '是否完全重启 Codex，model_provider 名称是否一致'],
          ['报认证错误', 'API Key 是否有效，环境变量是否被当前 shell 继承'],
          ['报接口路径错误', 'base_url 是否只写到 /v1，不要重复拼上 /responses'],
          ['国产模型无法响应', '上游是否支持 Responses API；不支持时需要 CCX 这类网关转换'],
          ['插件或 Skills 配置不见了', '切换工具是否覆盖了通用配置，是否有备份或共享配置片段'],
        ],
      },
    },
    {
      id: 'decision',
      title: '建议的决策顺序',
      ordered: [
        '先跑通官方账号 + 官方入口。',
        '确认卡点确实在账号、地区或组织策略，而不是不会用。',
        '只有在明确需要时，再接入第三方 API 或代理层。',
        '接入后用一个小任务先验证，再逐步放大使用范围。',
      ],
    },
  ],
  prevSlug: '04-mobile-control-desktop',
  nextSlug: '06-app-first-task',
};

guidePages['06-app-first-task'] = {
  slug: '06-app-first-task',
  title: '06 第一个任务',
  summary:
    '第一次不要追求复杂，而要追求闭环：能描述清楚、能执行、能验证、能回顾。先拿一个低风险任务，把完整流程跑通。',
  meta: {author: 'canghe', wordCount: '约 1020 字', readingTime: '大约 4 分钟'},
  note: {
    tone: 'tip',
    title: '第一个任务的标准',
    body: '目标不是让 Codex 一次解决所有问题，而是完成一条可验证、可回退、可复用的工作链路。首个任务做对，后面才有工程化空间。',
  },
  sections: [
    {
      id: 'choose-task',
      title: '先选一个低风险任务',
      paragraphs: [
        '第一个任务不应该是“重构整个项目”或“直接接管生产故障”。更好的选择是：补一段文档、修一个样式问题、完善一个测试、总结一个仓库结构，或者跑通一个很小的自动化步骤。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511175758960.png',
          alt: 'Codex 第一个任务示意 1',
          caption: '先从可观察、可验证、改动小的任务开始。',
        },
        {
          src: '/codex-guide/images/image-20260511180342249.png',
          alt: 'Codex 第一个任务示意 2',
          caption: '任务越小，越容易建立对输入、输出和验证方式的直觉。',
        },
      ],
      bullets: ['总结仓库结构或目录职责。', '补一段文档或 README。', '修一个样式或文案问题。', '补一个简单测试，或修单个失败用例。'],
    },
    {
      id: 'write-request',
      title: '把任务描述清楚',
      images: [
        {
          src: '/codex-guide/images/image-20260511180544468.png',
          alt: 'Codex 第一个任务示意 3',
        },
        {
          src: '/codex-guide/images/image-20260511180648409.png',
          alt: 'Codex 第一个任务示意 4',
        },
      ],
      ordered: ['说明目标和预期结果。', '说明哪些部分不允许动。', '说明如何验证，例如跑什么页面、看什么输出、执行什么测试。', '要求先读上下文，再开始修改。'],
    },
    {
      id: 'execution-loop',
      title: '执行时要看什么',
      images: [
        {
          src: '/codex-guide/images/image-20260511184050002.png',
          alt: 'Codex 第一个任务执行过程示意 1',
        },
        {
          src: '/codex-guide/images/image-20260511184146656.png',
          alt: 'Codex 第一个任务执行过程示意 2',
        },
        {
          src: '/codex-guide/images/image-20260511184315443.png',
          alt: 'Codex 第一个任务执行过程示意 3',
        },
      ],
      bullets: ['它是否先读了上下文，而不是直接开改。', '它是否把步骤拆小，并在关键节点给出确认。', '它是否给出了改动结果与验证证据，而不是只说“已经完成”。'],
    },
    {
      id: 'close-loop',
      title: '形成第一次闭环',
      paragraphs: [
        '一次合格的首个任务，至少要留下三类结果：改动本身、验证证据、下一步建议。完成之后，把这次任务整理成你后续可复用的任务模板。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511184528218.png',
          alt: 'Codex 第一个任务闭环示意',
          caption: '从“完成一次任务”升级到“沉淀一套可复用方法”，这是后续进阶的关键。',
        },
      ],
    },
  ],
  prevSlug: '05-third-party-api',
  nextSlug: '07-task-execution',
};

guidePages['07-task-execution'] = {
  slug: '07-task-execution',
  title: '07 任务的顺序执行和并行',
  summary:
    '这一页对应 CodexGuide 原页的“顺序执行 / 并行”说明，重点不是命令语法，而是理解同一项目里任务如何排队、如何插队、如何并行推进。',
  meta: {author: 'canghe', wordCount: '约 620 字', readingTime: '大约 2 分钟'},
  sections: [
    {
      id: 'sequential',
      title: '1. 顺序执行',
      paragraphs: [
        '在桌面 App 里，一个 Project 对应一个本地项目文件夹。你进入项目并创建新的对话后，向 Codex 发送任务，它就会按当前会话顺序开始执行。',
        '如果当前任务还没执行完，你继续下达新的命令，后续命令会进入等待队列。这时你看到的不是“丢任务”，而是排队等待前一个任务结束。',
        '原页面举的是 Obsidian 新手教程网站的例子：先让 Codex 设计网站，再介绍技术选型。这时如果你临时想到要把背景风格改成手绘风格，就不应该等它全部做完再返工。',
      ],
      images: [
        {
          src: '/codex-guide/images/Xnapper-2026-05-11-15.08.36.png',
          alt: '创建新对话并发起第一个任务',
        },
        {
          src: '/codex-guide/images/image-20260511151615728.png',
          alt: 'Codex 开始执行当前任务',
        },
        {
          src: '/codex-guide/images/image-20260511153100591.png',
          alt: '后续命令进入等待队列',
          caption: '这个状态表示新的命令会排队，直到当前任务执行完成。',
        },
      ],
      ordered: [
        '当前正在执行的网站设计任务保持在最前。',
        '后续解释技术选型等命令进入等待队列。',
        '如果你此时想即时追加一个会影响当前结果的新要求，可以使用“引导”让它插入当前执行上下文。',
      ],
    },
    {
      id: 'interrupt',
      title: '如何理解“引导”插队',
      paragraphs: [
        '这里的“引导”本质上是在当前正在执行的任务中插入一个更及时的约束，而不是再开一个新任务排队等它慢慢轮到。',
        '如果你的新要求会直接影响当前结果，比如“风格改为手绘”“首页不要用紫色”“输出格式改成表格”，这类要求更适合插入当前任务，而不是等全部跑完后返工。',
      ],
    },
    {
      id: 'parallel',
      title: '2. 如何并行',
      paragraphs: [
        '并行不是在同一个对话里不断堆命令，而是在同一个 Project 里新建多个对话，让它们分别承担不同任务。这样几个任务会同时推进，互不干扰。',
        '所以最稳的做法是：同一主题、同一目标链路放在一个会话里；不同目标、不同产物的任务，通过“新建对话”并行推进。',
      ],
      bullets: [
        '一个对话更适合一条连续工作链。',
        '需要同时推进多个目标时，直接在左侧新建新的对话。',
        '不要把完全无关的任务塞进同一个会话里，否则上下文会迅速变脏。',
      ],
    },
  ],
  prevSlug: '06-app-first-task',
  nextSlug: '08-permissions',
};

guidePages['08-permissions'] = {
  slug: '08-permissions',
  title: '08 权限管理',
  summary:
    '这一页对齐 CodexGuide 原页，重点说明 Suggest、Auto Edit、Full Auto 三种常见模式，以及什么时候应该保守、什么时候可以放开自动化能力。',
  meta: {author: 'canghe', wordCount: '约 700 字', readingTime: '大约 2 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '不同入口的界面文案会变，但核心问题不变：Codex 能不能自动改文件、能不能自动执行命令、哪些动作需要你确认。',
  },
  sections: [
    {
      id: 'modes',
      title: '三种常见模式',
      images: [
        {
          src: '/codex-guide/images/image-20260511153154873.png',
          alt: 'Codex 权限模式示意图',
        },
      ],
      subsections: [
        {
          title: 'Suggest',
          paragraphs: [
            '这是最保守的模式。Codex 可以读取文件并提出建议，但真正改文件或执行命令前，通常仍需要你确认。',
            '适合第一次进入陌生仓库、做代码审查，或者你希望全程掌控关键操作的时候使用。',
          ],
        },
        {
          title: 'Auto Edit',
          paragraphs: [
            '这个模式通常允许 Codex 自动写文件，但在执行 shell 命令时仍会保留人工确认。',
            '适合你已经了解项目结构，想让它快速完成文档、样式、测试这类明确范围的修改，但又不想完全放开命令执行权限。',
          ],
        },
        {
          title: 'Full Auto',
          paragraphs: [
            '这是自主性最高的模式。Codex 会在受限环境里自动读取、写入并执行命令，适合边界清晰的小功能实现、构建修复或整轮验证。',
            '风险也最高。只有在仓库可回滚、任务目标清楚、你理解当前沙盒边界时，才应该使用。',
          ],
        },
      ],
    },
    {
      id: 'how-to-choose',
      title: '怎么选更稳妥',
      bullets: [
        '第一次进入新项目，优先从 Suggest 开始。',
        '需要批量修改文档、样式或测试时，可以考虑 Auto Edit。',
        '只有在任务边界明确、仓库可回滚、并且你接受它连续执行命令时，再考虑 Full Auto。',
      ],
    },
    {
      id: 'reminders',
      title: '使用时的提醒',
      bullets: [
        '不同客户端不一定把权限模式翻成一样的中文名，优先认英文模式名。',
        '即使使用更自动化的模式，也要保留对高风险操作的复核，比如安装依赖、删除文件、访问网络、推送代码或处理敏感信息。',
        '如果你不确定当前模式会不会执行某个动作，先让 Codex 说明它准备运行哪些命令、会改哪些文件，再决定是否继续。',
      ],
    },
  ],
  prevSlug: '07-task-execution',
  nextSlug: '09-skills-plugins',
};

guidePages['09-skills-plugins'] = {
  slug: '09-skills-plugins',
  title: '09 Skills 和 Plugins',
  summary:
    '这一页对应 CodexGuide 原页，重点是把 Skill、Plugin 和更广义的集成能力区分清楚，避免把它们都理解成“一个按钮”。',
  meta: {author: 'canghe', wordCount: '约 920 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '入口位置会变，但概念关系相对稳定：Skill 更像工作流程说明，Plugin 更像打包与分发机制。',
  },
  sections: [
    {
      id: 'overview',
      title: '先建立概念图',
      paragraphs: [
        '如果你在 App 里看到了和技能、插件相关的入口，不要先纠结按钮在哪，而是先理解它们解决的是哪一类问题。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511153225029.png',
          alt: 'Skills 和 Plugins 总览图',
        },
      ],
    },
    {
      id: 'skill',
      title: 'Skill 是什么',
      paragraphs: [
        'Skill 可以理解为一份让 Codex 稳定执行重复任务的操作手册。当某个工作流已经足够固定，例如审查 PR、整理文档、补案例索引，就可以把它沉淀成 Skill。',
        '一个 Skill 通常至少包含一个 SKILL.md，用来说明触发场景、执行步骤、输出格式和注意事项；必要时还会配套脚本、模板或参考文件。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511153249467.png',
          alt: 'Skill 结构示意图',
        },
        {
          src: '/codex-guide/images/image-20260511153309947.png',
          alt: 'Skill 安装或使用入口示意图',
        },
      ],
      bullets: [
        '先准备或安装可用的 Skill。',
        '在发起任务时明确说明希望使用哪个 Skill。',
        '让 Codex 按 Skill 流程执行，再根据结果继续追问或迭代。',
      ],
    },
    {
      id: 'plugin',
      title: 'Plugin 是什么',
      paragraphs: [
        'Plugin 更像一种打包和分发机制，用来把可复用工作流、应用集成、MCP 服务配置等能力组合起来，方便安装和统一使用。',
        '可以简单理解为：Skill 关注“这件事应该怎么做”，Plugin 关注“把哪些能力打包起来方便安装和复用”。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511153326902.png',
          alt: 'Plugin 入口示意图',
        },
      ],
    },
    {
      id: 'relationship',
      title: '怎么理解它们的关系',
      paragraphs: [
        '更直观的比喻是：Skill 是工作说明书，Plugin 是装着说明书、工具和连接配置的工具箱。',
        '有些插件里会包含一个或多个 Skills，也可能附带应用集成或 MCP 配置，这样团队迁移环境时就不需要逐项手工配置。',
      ],
    },
    {
      id: 'reminders',
      title: '使用时的提醒',
      bullets: [
        '插件和技能的具体入口会随版本变化，不要把某个截图里的按钮位置当成永远不变。',
        '如果插件涉及外部系统、浏览器、邮箱、知识库或项目管理工具，先确认它是只读还是可写。',
        '涉及安装、写回外部系统或共享给团队时，最好保留人工复核。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511153409165.png',
          alt: 'Skills / Plugins 使用提醒示意图',
        },
      ],
    },
  ],
  prevSlug: '08-permissions',
  nextSlug: '10-automation',
};

guidePages['10-automation'] = {
  slug: '10-automation',
  title: '10 自动化',
  summary:
    '这一页对应 CodexGuide 原页，重点说明 Automation 不是“再发一次同样的话”，而是把稳定、重复、可界定边界的任务按时间或事件自动触发。',
  meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: 'Automation 关注“什么时候自动去做”，Skill 更关注“怎么做”。不同客户端和套餐下入口会不同，但这个分工是稳定的。',
  },
  sections: [
    {
      id: 'what-is-automation',
      title: '可以怎么理解自动化',
      paragraphs: [
        '当一个工作流已经足够稳定，而且会重复发生时，就可以考虑把它交给 Automation，在后台按计划触发，而不是每次都手动发起。',
        '适合自动化的任务包括：定期检查文档死链、每周整理一次 issue 或 PR 摘要、每天汇总 failing CI、固定时间提醒补复盘或更新文档。',
      ],
    },
    {
      id: 'structure',
      title: '一个自动化任务至少包含三部分',
      ordered: [
        '目标对象：对应哪个项目、仓库或线程。',
        '触发时机：固定时间、固定间隔，或者稍后回到当前任务继续跟进。',
        '执行内容：到时具体让 Codex 去完成什么。',
      ],
    },
    {
      id: 'workflow',
      title: '常见使用流程',
      ordered: [
        '选择对应的项目、仓库或当前线程。',
        '设定执行时间或执行周期。',
        '写清楚自动化任务本身的目标、输出格式和边界。',
        '保存后先观察第一次运行结果，再决定是否长期保留。',
      ],
      paragraphs: [
        '这里最容易被忽略的一点是：自动化 prompt 要尽量写成自包含的任务说明。不要默认它会记得你之前说过什么，最好把检查范围、输出格式和验证要求写完整。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511155400455.png',
          alt: 'Automation 入口或配置示意图',
        },
      ],
    },
    {
      id: 'reminders',
      title: '使用时的提醒',
      bullets: [
        '不同工作区里的自动化能力可能并不完全一样，有些支持项目级任务，有些更偏向提醒和跟进。',
        '第一次配置时，建议先从低风险、只读型任务开始。',
        '如果自动化会写文件、访问外部系统或触发通知，最好先确认权限边界和人工复核方式。',
      ],
    },
  ],
  prevSlug: '09-skills-plugins',
  nextSlug: '11-desktop-pet',
};

guidePages['11-desktop-pet'] = {
  slug: '11-desktop-pet',
  title: '11 如何设置自己的 Codex 桌面宠物',
  summary:
    '这一页对应 CodexGuide 原页，重点不是“装饰”，而是让桌面小宠物把 Codex 当前任务状态可视化，减少你反复切回主窗口确认进度的成本。',
  meta: {author: 'canghe', wordCount: '约 520 字', readingTime: '大约 2 分钟'},
  sections: [
    {
      id: 'why-pet',
      title: '桌面宠物的价值',
      paragraphs: [
        '桌面小宠物不只是一个装饰，它会把 Codex 当前在忙什么显示出来。',
        '最大的价值是状态可视化：不用一直切回 Codex 窗口，也能看到任务是否在运行、是否需要确认、是否已经完成。',
      ],
      bullets: [
        '任务进度一目了然。',
        '忙碌、等待确认、完成等状态会以不同表现形式显示。',
        '适合在你切到其他软件继续工作时，保持对 Codex 任务状态的感知。',
      ],
    },
    {
      id: 'install',
      title: '1. 安装',
      paragraphs: [
        '打开“设置” -> “外观”，往下滑到“宠物”这一栏。在这里可以选择喜欢的宠物类型并点击“唤醒”，桌面上就会出现选定的小宠物。',
        '如果不想进设置，也可以直接在聊天框中输入 `/`，选择“宠物”选项，同样可以唤醒或收起桌面宠物。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260512224500231.png',
          alt: '桌面宠物设置入口示意图',
        },
        {
          src: '/codex-guide/images/image-20260512225501451.png',
          alt: '通过斜杠命令唤醒桌面宠物示意图',
        },
      ],
    },
    {
      id: 'usage',
      title: '2. 使用',
      paragraphs: [
        '唤醒之后，像平常一样下达指令，然后去做其他事情。小宠物会在屏幕上陪伴着你，实时显示任务完成进度。',
        '比如它在执行搜索和任务时，会显示正在工作的状态；任务完成后，会显示绿色对勾，提示你可以回来检查结果了。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260512225715200.png',
          alt: '桌面宠物执行任务中示意图',
        },
        {
          src: '/codex-guide/images/image-20260512230004092.png',
          alt: '桌面宠物显示任务完成示意图',
          caption: '这就是它的核心价值：你不需要一直盯着主窗口等待。',
        },
      ],
    },
  ],
  prevSlug: '10-automation',
  nextSlug: '12-cli-installation',
};

guidePages['12-cli-installation'] = {
  slug: '12-cli-installation',
  title: '12 安装与登录',
  summary:
    '这一页对应 CodexGuide 原页的 CLI 安装与登录说明，覆盖运行环境、安装命令、版本检查、登录方式以及第一次只读任务的准备。',
  meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: 'CLI 的系统要求、安装方式和账号计划说明，优先以 openai/codex 官方仓库、install 文档和 Help Center 为准。',
  },
  sections: [
    {
      id: 'precheck',
      title: '安装前检查',
      paragraphs: ['官方仓库当前给出的 CLI 运行环境建议包括：macOS 12+、Ubuntu 20.04+/Debian 10+，以及 Windows 11 + WSL2。'],
      table: {
        headers: ['项目', '建议'],
        rows: [
          ['操作系统', 'macOS 12+、Ubuntu 20.04+/Debian 10+、Windows 11 通过 WSL2'],
          ['Git', '推荐 2.23+，便于 PR 辅助能力'],
          ['内存', '4GB 起步，8GB 更稳'],
        ],
      },
      paragraphs: ['本地先确认 Node、npm 和 Git 都可用。'],
      images: [
        {
          src: '/codex-guide/images/image-20260511165250308.png',
          alt: 'CLI 安装前检查示意图',
        },
      ],
    },
    {
      id: 'install',
      title: '安装 CLI',
      paragraphs: [
        '常见安装方式是通过 npm 全局安装 `@openai/codex`，需要更新到最新版本时可以显式指定 `@latest`。',
        '安装完成后，先用 `codex --version` 验证命令是否已经进入当前 shell 的 PATH。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511165422384.png',
          alt: 'CLI 安装与版本检查示意图',
        },
      ],
    },
    {
      id: 'login',
      title: '登录方式',
      paragraphs: [
        '运行 `codex` 后，根据终端提示完成登录。当前可用计划、限额和组织策略以官方 Help Center 为准。',
        '如果你已经在其他入口里使用 ChatGPT / OpenAI 账号，不代表 CLI 一定自动继承状态；还是应以当前终端登录流程为准。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511165455390.png',
          alt: 'CLI 登录示意图',
        },
      ],
    },
    {
      id: 'first-readonly-task',
      title: '第一次只读任务',
      paragraphs: [
        '进入一个本地项目根目录后，不要一上来就让它改代码。先让 Codex 只读仓库，输出项目用途、目录结构、安装测试命令和低风险任务建议。',
        '这样做的目的，是先建立你对 CLI 工作方式的信任，再进入真正的修改任务。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511165723872.png',
          alt: 'CLI 第一次只读任务示意图',
        },
      ],
    },
    {
      id: 'installation-failures',
      title: '安装失败时怎么判断',
      table: {
        headers: ['现象', '可能原因', '处理方式'],
        rows: [
          ['codex 命令找不到', 'npm global bin 未进 PATH', '查看 npm bin -g，把目录加入 shell PATH'],
          ['登录后仍提示无权限', '账号计划、组织策略或会话状态问题', '重新登录，并查看 Help Center 中的计划说明'],
          ['Windows 运行异常', '未使用 WSL2 或 shell 环境不完整', '按官方建议使用 Windows 11 + WSL2'],
          ['仓库命令跑不起来', '项目依赖未安装或本地环境缺失', '先安装项目依赖，再让 Codex 读取测试配置'],
        ],
      },
    },
  ],
  prevSlug: '11-desktop-pet',
  nextSlug: '13-cli-first-run',
};

guidePages['13-cli-first-run'] = {
  slug: '13-cli-first-run',
  title: '13 第一次让 Codex 改代码',
  summary:
    '这一页对应 CodexGuide 原页的 CLI 首次实战说明，重点是选择一个低风险、可验证、易回滚的任务，建立你和 Codex 的协作节奏。',
  meta: {author: 'canghe', wordCount: '约 980 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '第一次实战不要选择“重构整个项目”。先拿一个很小的任务跑通：理解仓库、描述任务、最小修改、验证结果、总结风险。',
  },
  sections: [
    {
      id: 'choose-task',
      title: '选择第一个任务',
      paragraphs: ['适合新手的任务，要满足三个条件：范围小、结果可验证、失败后容易回滚。'],
      bullets: [
        '修复一个文案错别字。',
        '给一个纯函数补测试。',
        '更新 README 里的过期命令。',
        '解释一个小模块，并补充必要注释。',
        '修复一个已经有失败测试覆盖的 bug。',
        '为文档站补一段截图占位说明。',
      ],
      callouts: [
        {
          tone: 'warning',
          title: '暂时避开',
          body: '大规模架构重构、跨多个服务的迁移、没有测试的核心逻辑改动、涉及生产凭据和删除数据的操作，都不适合作为第一次任务。',
        },
      ],
    },
    {
      id: 'readonly-map',
      title: '第一步：只读建图',
      paragraphs: [
        '先让 Codex 理解仓库，再让它动手。只读分析通常应该输出：项目用途、关键目录、安装测试构建命令、当前任务适合从哪里开始，以及它建议的低风险任务。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511170254461.png',
          alt: 'CLI 只读分析仓库示意图',
        },
      ],
    },
    {
      id: 'small-task',
      title: '第二步：给出小任务',
      paragraphs: [
        '原页面给了一个非常典型的模板：先运行测试确认失败，再阅读相关代码和测试，不做无关重构，只修改最少必要文件，最后重新验证并总结风险。',
        '如果是文档任务，也要把来源、风格、补图位置和构建验证要求写清楚。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511170405298.png',
          alt: 'CLI 下达第一个小任务示意图',
        },
      ],
    },
    {
      id: 'observe',
      title: '第三步：观察过程',
      table: {
        headers: ['观察点', '说明'],
        rows: [
          ['是否先读上下文', '好结果通常来自充分阅读相关文件'],
          ['是否控制范围', '第一次任务不追求顺手重构'],
          ['是否解释命令', '命令执行前应说明目的'],
          ['是否运行验证', '修改完成后要跑相关测试或构建'],
          ['是否说明风险', '没能验证的部分要如实记录'],
        ],
      },
    },
    {
      id: 'check-diff',
      title: '第四步：检查 diff',
      paragraphs: [
        '完成后你应该自己再看一遍 `git diff`。如果需要，可以让 Codex 自查刚才的改动，重点检查是否有无关改动、是否遗漏测试、是否引入未验证风险。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511170740040.png',
          alt: 'CLI review 刚才改动的示意图',
        },
      ],
    },
    {
      id: 'done',
      title: '完成标准',
      bullets: [
        '一个很小的 diff。',
        '一条可复现的验证命令。',
        '一段清楚的改动摘要。',
        '一个可复用的任务模板。',
        '对 Codex 权限和审批的初步理解。',
      ],
    },
  ],
  prevSlug: '12-cli-installation',
  nextSlug: '14-ide-vscode',
};

guidePages['14-ide-vscode'] = {
  slug: '14-ide-vscode',
  title: '14 在 VS Code 中使用 Codex',
  summary:
    '这一页对应 CodexGuide 原页的 VS Code 插件说明，覆盖插件安装、对话窗口、@ 文件引用，以及桌面 App 和 IDE 插件两种入口的选择。',
  meta: {author: 'canghe', wordCount: '约 700 字', readingTime: '大约 2 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '本章以 VS Code 为例说明插件安装与基本用法。具体按钮位置和图标细节会随版本变化，以你当前编辑器里的实际界面为准。',
  },
  sections: [
    {
      id: 'install-plugin',
      title: '安装 Codex 插件',
      paragraphs: [
        '打开 VS Code，点击左侧边栏“扩展”，搜索 Codex，安装 OpenAI 官方发布的 ChatGPT 插件。原页说明里把它作为 Codex 在编辑器中的主要入口。',
      ],
      callouts: [
        {
          tone: 'tip',
          title: '这里安装的是什么',
          body: '这里安装的是 OpenAI 官方发布的 ChatGPT 插件，其中集成了 Codex 的对话与代码辅助能力。',
        },
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511192103991.png',
          alt: 'VS Code 中搜索并安装 Codex 插件',
        },
      ],
    },
    {
      id: 'open-panel',
      title: '打开插件对话窗口',
      paragraphs: [
        '安装完成后，打开任意项目文件，右上角会出现 ChatGPT 图标。点击之后，右侧边栏会展开 Codex 对话窗口。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511192430989.png',
          alt: '文件右上角的 ChatGPT 图标',
        },
        {
          src: '/codex-guide/images/image-20260511192548524.png',
          alt: '展开后的 VS Code 对话窗口',
        },
      ],
    },
    {
      id: 'usage',
      title: '开始使用',
      paragraphs: [
        '对话窗口打开后，直接输入需求，Codex 就会开始辅助完成开发任务。与桌面 App 相比，它最大的优势是更贴近编辑器上下文。',
        '原页面特别强调 `@` 引用文件：在对话框输入 `@` 后选择具体文件，Codex 会直接定位到该文件进行分析或修改，比让它全局搜索更快、更准确。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260511192700125.png',
          alt: '在 VS Code 中使用 @ 指定文件',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'App 与 VS Code 插件怎么选',
      table: {
        headers: ['维度', 'Codex 桌面 App', 'VS Code 插件'],
        rows: [
          ['适合场景', '多任务管理、Skills、Automations', '边写代码边调用，贴近编辑器工作流'],
          ['文件结构可见性', '需要切换界面', '直接在编辑器里查看'],
          ['修改前后对比', '独立查看', '可结合编辑器 diff 查看'],
          ['推荐用户', '需要并行任务或插件协作', '日常编码开发者'],
        ],
      },
      paragraphs: ['实际使用中，两者并不是互斥关系。你完全可以在桌面 App 里做多任务推进，在 VS Code 里处理局部代码修改。'],
    },
  ],
  prevSlug: '13-cli-first-run',
  nextSlug: '15-agents-md',
};

guidePages['15-agents-md'] = {
  slug: '15-agents-md',
  title: '15 AGENTS.md 项目规则',
  summary:
    '这一页对应 CodexGuide 原页的 AGENTS.md 说明，重点是把项目命令、代码规范、测试要求和安全边界显式写给 Codex，减少每次新对话都重新解释。',
  meta: {author: 'canghe', wordCount: '约 920 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: 'AGENTS.md 的机制与作用域，以 Codex 官方 AGENTS.md 指南和 openai/codex 仓库说明为准。它不是普通文档，而是给编码代理读取的项目规则文件。',
  },
  sections: [
    {
      id: 'why-agents',
      title: '为什么需要 AGENTS.md',
      paragraphs: [
        '每开启一个新的对话窗口，Codex 都进入新的上下文。它不会自然记住之前你说过的项目规则、命令习惯、目录边界和安全要求。',
        '没有项目规则时，Codex 需要从仓库里自行推断：用哪个包管理器、如何运行测试、哪些目录是生成物、哪些文件不能改、提交前要跑哪些检查。',
        'AGENTS.md 的价值就在于把这些规则显式写下来，减少反复解释和误判。',
      ],
    },
    {
      id: 'where-to-place',
      title: '建议放在仓库哪里',
      paragraphs: [
        '最直接的做法，是在当前项目根目录创建一个 AGENTS.md。Codex 在开始工作前会先读取它，把其中内容作为当前项目的记忆文件。',
        '原页演示了一个简单测试：先在 AGENTS.md 里写入规则，再回到对话窗口问它“这是一个什么样的系统？”，你会发现 Codex 会自动带入这些上下文。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260513125413867.png',
          alt: '在项目根目录创建 AGENTS.md',
        },
        {
          src: '/codex-guide/images/image-20260513125430444.png',
          alt: 'Codex 读取 AGENTS.md 后的效果',
          caption: '这说明 AGENTS.md 会自动进入新的项目级对话上下文。',
        },
      ],
      bullets: [
        '项目根目录下的 AGENTS.md 只对当前仓库生效。',
        '它不会自动变成全局规则。',
        '如果是 monorepo，还可以根据需要在子目录分层放置更细的规则。',
      ],
    },
    {
      id: 'scope',
      title: '项目级与全局级的区别',
      paragraphs: [
        '如果想全局生效，原页给了两种思路：一种是在系统的全局 Codex 目录里放置对应规则文件，另一种是在桌面 App 设置里的“个性化 / 自定义指令”里维护全局规则。',
        '这两种全局规则的作用范围与项目根目录 AGENTS.md 不同。前者会对所有项目生效，后者更适合作为个人通用工作偏好；而项目根目录 AGENTS.md 更适合写仓库专属规则。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260513125644728.png',
          alt: '在桌面 App 个性化设置中维护全局规则',
        },
      ],
    },
    {
      id: 'template',
      title: '推荐模板',
      paragraphs: [
        '原页给出了一个比较稳的模板：项目概览、常用命令、代码规范、安全边界、交付要求。它的重点不是写得华丽，而是写得具体。',
      ],
      bullets: [
        '项目类型、主要语言、关键目录。',
        '安装依赖、本地开发、测试、类型检查、格式化命令。',
        '代码规范，例如“遵循现有风格、不做无关重构、新功能要补测试”。',
        '安全边界，例如“不读取 .env、不执行删除生产数据命令、迁移前先说明影响”。',
        '交付要求，例如“说明改动文件、验证命令、结果和剩余风险”。',
      ],
    },
    {
      id: 'writing-tips',
      title: '写作建议与最小可用版本',
      bullets: [
        '越具体越好，`pnpm test` 比“记得测试”有用得多。',
        '把生成目录、构建产物、锁文件策略写清楚。',
        '如果是 monorepo，要说明每个包的边界。',
        '如果有特殊 lint、格式化或代码生成流程，写在命令区。',
        '对安全敏感项目，单独列出禁止事项。',
      ],
      paragraphs: [
        '如果你一开始不想写太长，可以先做一个最小可用版本：只包含项目命令、改动规则、验证要求和安全边界。后续随着团队实践再逐步扩充。',
      ],
    },
  ],
  prevSlug: '14-ide-vscode',
  nextSlug: '16-sandbox-approvals',
};

guidePages['16-sandbox-approvals'] = {
  slug: '16-sandbox-approvals',
  title: '16 沙盒、审批与安全边界',
  summary:
    '这一页对应 CodexGuide 原页的沙盒与审批说明，核心是把风险拆成文件系统、网络、命令、凭据和数据几个层面，再决定哪些动作应自动执行，哪些必须人工确认。',
  meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 3 分钟'},
  note: {
    tone: 'tip',
    title: '最后核对',
    body: '能力越强，边界越重要。安全相关说明优先以 Codex security 和 sandbox 官方文档为准，不要仅根据界面文案做推断。',
  },
  sections: [
    {
      id: 'layers',
      title: '你需要关心什么',
      paragraphs: ['先把风险拆成几个层面，再去判断一个任务是否适合放开自动执行。'],
      images: [
        {
          src: '/codex-guide/images/codex-safety-layers.svg',
          alt: 'Codex 安全边界分层图',
        },
      ],
      bullets: [
        '文件系统：能读写哪些目录。',
        '网络：是否允许访问外网。',
        '命令：是否允许安装依赖、启动服务、跑迁移。',
        '凭据：是否可能接触密钥、token、cookie。',
        '数据：是否会修改数据库、对象存储或生产资源。',
      ],
    },
    {
      id: 'low-risk',
      title: '低风险任务',
      bullets: ['修改文档。', '补充测试。', '修复本地可复现 bug。', '更新非敏感配置。', '运行项目已有的测试命令。'],
    },
    {
      id: 'high-risk',
      title: '高风险任务',
      bullets: [
        '删除文件或批量移动文件。',
        '数据库迁移。',
        '修改认证、权限、支付、账单逻辑。',
        '访问生产服务。',
        '上传、下载或处理敏感数据。',
        '引入新依赖或大规模升级依赖。',
      ],
      callouts: [
        {
          tone: 'warning',
          title: '建议先确认计划',
          body: '高风险任务不适合模糊执行。应先让 Codex 说明计划运行哪些命令、可能影响哪些文件、哪些步骤需要人工确认。',
        },
      ],
    },
    {
      id: 'prompt',
      title: '给 Codex 的安全提示词',
      paragraphs: [
        '原页提供了一条很实用的提示思路：要求 Codex 在动手前先说明计划运行的命令和可能影响的文件，不读取 `.env`、密钥、token 或私有凭据，不执行删除数据、发布、部署或迁移命令，除非你明确确认。',
      ],
    },
    {
      id: 'approval-flow',
      title: '桌面 App 中的审批流程',
      paragraphs: [
        '在桌面 App 里，当 Codex 要执行写文件、跑命令、访问网络等敏感操作时，会暂停并弹出审批提示，列出它打算做的事。你可以放行、拒绝，或者修改提示词让它换一种方式做。',
        '这套机制在浏览器控制、Playwright、文件写入、服务启动这类场景里尤其常见。一个实用习惯是：不确定的操作先看清楚再放行。',
      ],
    },
    {
      id: 'team',
      title: '团队建议',
      bullets: [
        '在 AGENTS.md 里写清楚禁止事项。',
        '把高风险命令放进人工审批流程。',
        '给测试、lint、类型检查提供明确命令。',
        '避免把生产凭据放在普通开发环境里。',
        '对 Codex 产出的 PR 仍然执行正常代码审查。',
      ],
    },
  ],
  prevSlug: '15-agents-md',
  nextSlug: '17-cloud-ide-app',
};

guidePages['17-cloud-ide-app'] = {
  slug: '17-cloud-ide-app',
  title: '17 Codex Cloud：使用云端模式',
  summary:
    '这一页对应 CodexGuide 原页的 Codex Cloud 说明，重点是理解它与本地 App、CLI、IDE 的差异，以及云端任务、仓库授权和并行工作的使用场景。',
  meta: {author: 'canghe', wordCount: '约 720 字', readingTime: '大约 2 分钟'},
  note: {
    tone: 'tip',
    title: '入口关系',
    body: 'CLI、桌面 App、IDE 和 Cloud 并不是相互替代，而是承载不同任务节奏。Cloud 更适合仓库级、长任务、并行任务和不依赖本地环境的场景。',
  },
  sections: [
    {
      id: 'scenarios',
      title: '适合场景',
      bullets: [
        '较长的任务，不想占用本地资源。',
        '多个任务并行推进。',
        '让 Codex 在独立环境里分析仓库、提出 PR。',
        '不在电脑旁、只有浏览器时临时使用。',
      ],
    },
    {
      id: 'step-open',
      title: '第 1 步：打开 Codex Cloud',
      paragraphs: [
        '访问 chatgpt.com/codex/cloud，连接成功后会进入任务页面。原页重点是让你先把 Cloud 当成独立运行环境来理解，而不是桌面 App 的网页镜像。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260513124118871.png',
          alt: '打开 Codex Cloud 入口',
        },
        {
          src: '/codex-guide/images/image-20260513124234976.png',
          alt: 'Cloud 任务页示意',
        },
      ],
    },
    {
      id: 'step-repo',
      title: '第 2 步：授权并选择仓库',
      paragraphs: [
        'Cloud 模式直接在 GitHub 仓库中运行，因此需要先完成授权。你可以授权全部仓库，也可以只选择特定仓库。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260513124426627.png',
          alt: 'GitHub 仓库授权示意',
        },
      ],
    },
    {
      id: 'step-progress',
      title: '第 3 步：下达指令并查看进度',
      paragraphs: [
        '下达指令后，Codex 会在云端执行任务，进度显示在页面下方的任务列表。点击任务可以查看每一步执行过程、中间状态以及最终结果。',
      ],
      images: [
        {
          src: '/codex-guide/images/image-20260513124638212.png',
          alt: 'Cloud 任务列表示意',
        },
        {
          src: '/codex-guide/images/image-20260513124727322.png',
          alt: 'Cloud 任务详情示意',
        },
      ],
    },
    {
      id: 'comparison',
      title: '与桌面 App 模式的区别',
      table: {
        headers: ['维度', 'Codex 桌面 App', 'Codex Cloud'],
        rows: [
          ['运行环境', '本地电脑', '云端（GitHub 环境）'],
          ['是否需要安装', '需要下载客户端', '不需要，浏览器直接访问'],
          ['适合任务', '本地代码、插件、自动化', '远程仓库分析、PR 生成'],
          ['并行任务', '支持', '支持'],
        ],
      },
    },
  ],
  prevSlug: '16-sandbox-approvals',
  nextSlug: '18-troubleshooting',
};

guidePages['18-troubleshooting'] = {
  slug: '18-troubleshooting',
  title: '18 排障手册',
  summary:
    '这一页对应 CodexGuide 原页的排障手册，按常见现象拆分问题：上下文缺失、改动过大、测试失败、内容不准、登录权限、provider 切换后会话异常。',
  meta: {author: 'canghe', wordCount: '约 760 字', readingTime: '大约 3 分钟'},
  sections: [
    {
      id: 'context',
      title: 'Codex 找不到项目上下文',
      paragraphs: ['常见原因包括：不在项目根目录、仓库缺少 README / 测试命令 / 项目说明，或者 monorepo 没有说明包边界。'],
      bullets: [
        '先让 Codex 只读目录并总结项目结构。',
        '添加或更新 AGENTS.md。',
        '在任务说明里指定相关目录。',
      ],
    },
    {
      id: 'scope',
      title: 'Codex 改动范围太大',
      bullets: [
        '明确“只修改这些文件”。',
        '要求“先输出计划，不要动手”。',
        '把任务拆成更小的步骤。',
        '在 review 时拒绝无关重构。',
      ],
    },
    {
      id: 'tests',
      title: '测试跑不起来',
      bullets: [
        '让 Codex 先定位测试命令。',
        '检查依赖是否安装。',
        '区分环境问题和代码问题。',
        '如果是环境问题，让 Codex 记录阻塞，而不是继续乱改。',
      ],
    },
    {
      id: 'accuracy',
      title: '生成内容不准确',
      bullets: [
        '要求 Codex 引用它依据的文件。',
        '对官方事实要求附链接。',
        '让它区分“已确认”和“推测”。',
        '让它先读代码再写文档。',
      ],
    },
    {
      id: 'login',
      title: '登录或权限问题',
      bullets: [
        '更新 Codex CLI 到最新版本。',
        '重新运行登录流程。',
        '检查当前账号计划和组织策略。',
        '查看官方 Help Center 的 Codex 相关文章。',
      ],
    },
    {
      id: 'provider',
      title: '切换 provider 后旧会话不可见',
      paragraphs: [
        '原页专门提到一个典型问题：修改过 config.toml 根级 model_provider 后，旧会话文件可能还在，但 Desktop 侧不可见。这不一定是丢失，也可能是 provider metadata、SQLite 状态、项目路径缓存或“最近 50 条会话显示限制”造成的。',
      ],
      bullets: [
        '先确认 ~/.codex/sessions 或 ~/.codex/archived_sessions 里是否还存在旧会话文件。',
        '如果只是 Desktop 项目侧不可见，先判断是否被最近 50 条显示限制挡住。',
        '如果确认是 provider 切换后 metadata 不一致，再去看 config.toml 里的社区工具说明。',
        '使用第三方工具前先备份 ~/.codex，不要把它们当成官方认证或账号切换工具。',
      ],
    },
  ],
  prevSlug: '17-cloud-ide-app',
};

export const codexGuideGuidePages = guidePages;

export function getCodexGuideGuidePage(slug: string): CodexGuideGuidePageData | undefined {
  return guidePages[slug];
}

export function getCodexGuideGuideSidebar(): CodexGuideSidebarSection[] {
  return codexGuideGuideSidebar;
}

export function getCodexGuideGuideLink(slug: string): string {
  return getCodexGuideGuideRoute(slug);
}
