import {
  codexGuideConfigurationSidebar,
  getCodexGuideConfigurationRoute,
  type CodexGuideSidebarSection,
} from '@site/src/data/codexGuideTopic';
import type {CodexGuideGuidePageData} from '@site/src/data/codexGuideGuidePages';

export type CodexGuideConfigurationPageData = CodexGuideGuidePageData;

const DEFAULT_META = {
  author: 'canghe',
  wordCount: '约 900 字',
  readingTime: '大约 3 分钟',
};

const configurationPages: Record<string, CodexGuideConfigurationPageData> = {
  index: {
    slug: 'index',
    title: '配置与扩展总览',
    summary:
      'Codex 的学习有两个阶段：先会用，再会配置。会用解决单次任务，会配置把 Codex 变成稳定的个人工作台和团队协作工具。',
    meta: {author: 'canghe', wordCount: '约 980 字', readingTime: '大约 3 分钟'},
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。本页参考 OpenAI Developers 上的 Codex 配置、AGENTS.md、Skills 与安全文档整理。',
    },
    sections: [
      {
        id: 'config-map',
        title: '配置地图',
        paragraphs: [
          '配置不是“把所有开关都打开”，而是把项目规则、本地默认行为、扩展能力和安全边界分层管理。这样你在换仓库、换任务、换团队时，Codex 的行为才会稳定。',
        ],
        images: [
          {
            src: '/codex-guide/images/codex-config-map.svg',
            alt: 'Codex 配置地图',
            caption: '原页中的配置地图，总结了 AGENTS.md、config.toml、Skills、MCP、Subagents 与安全边界之间的关系。',
          },
        ],
      },
      {
        id: 'four-layers',
        title: '先理解四层配置',
        table: {
          headers: ['层级', '典型文件或入口', '解决的问题', '初学者建议'],
          rows: [
            ['项目规则', 'AGENTS.md', '让 Codex 理解仓库约定、测试命令、目录边界', '每个重要仓库都写一份'],
            ['本地配置', '~/.codex/config.toml', '设置模型、沙箱、审批、profiles 与 MCP', '先保守，按任务逐步放开权限'],
            ['扩展能力', 'Skills、MCP、Plugins、Subagents', '复用流程、连接外部工具、拆分复杂任务', '先沉淀高频流程'],
            ['安全边界', 'Sandbox、Approvals、Admin policy', '管控命令、网络、敏感文件和组织策略', '高风险操作保留人工确认'],
          ],
        },
      },
      {
        id: 'reading-order',
        title: '本专题怎么读',
        ordered: [
          '先读 CLI 选项与命令，理解交互模式、非交互模式、会话恢复和 Slash Commands。',
          '再读配置文件 config.toml，明确哪些设置属于个人本地偏好，哪些适合沉淀成团队模板。',
          '接着看 MCP、Skills 与 Subagents，把重复流程变成稳定能力。',
          '最后看安全、审批与管理，补齐权限边界和审计意识。',
        ],
      },
      {
        id: 'principles',
        title: '配置前的三条原则',
        bullets: [
          '先写任务规则，再调工具开关。任务描述、AGENTS.md、测试命令往往比复杂配置更影响结果质量。',
          '先小范围验证，再推广到团队。一个人的习惯不要直接复制到团队仓库。',
          '先保留审批，再逐步自动化。删除文件、联网、安装依赖、写系统目录、读敏感数据都应先说明理由。',
        ],
      },
      {
        id: 'minimal-route',
        title: '推荐的最小配置路线',
        subsections: [
          {
            title: '第 1 天：个人可用',
            bullets: [
              '安装 CLI。',
              '登录并完成一次只读仓库总结。',
              '创建项目级 AGENTS.md。',
              '学会 /status、/model、/approvals、/diff、/quit 等常用命令。',
            ],
            callouts: undefined,
          },
          {
            title: '第 1 周：稳定实践',
            bullets: [
              '为常用仓库写清测试命令和代码风格。',
              '在 ~/.codex/config.toml 中准备适合自己的默认 profile。',
              '把修测试、改文档、代码审查沉淀成任务模板。',
              '记录失败案例，补到排障手册。',
            ],
          },
          {
            title: '第 1 个月：团队知识库',
            bullets: [
              '把项目规则合并到仓库。',
              '把团队流程沉淀成 Skills。',
              '统一截图、演示和 PR 模板。',
              '对联网、凭据、发布、数据库变更建立审批要求。',
            ],
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里给了 CLI 状态命令截图占位说明。当前先保留结构说明，不省略原页信息。',
          },
        ],
      },
      {
        id: 'pitfalls',
        title: '常见误区',
        table: {
          headers: ['误区', '更好的做法'],
          rows: [
            ['只调模型，不写上下文', '明确仓库结构、任务范围、验收标准和验证方式'],
            ['只让它改代码，不让它验证', '每个任务都指定最小验证命令'],
            ['一开始就放开全部权限', '先只读或工作区写入，再按任务放开'],
            ['把所有规则都塞进提示词', '长期规则写到 AGENTS.md 或 Skill'],
            ['团队成员各配各的', '关键规则进仓库，个人偏好留在本地'],
          ],
        },
      },
      {
        id: 'references',
        title: '官方资料延伸',
        bullets: [
          'Codex CLI features',
          'Codex config basic',
          'Codex config advanced',
          'Codex config reference',
          'AGENTS.md guide',
          'Codex skills',
          'Codex security',
        ],
      },
    ],
    nextSlug: 'cli-options',
  },
  'cli-options': {
    slug: 'cli-options',
    title: 'CLI 选项与命令',
    summary: 'CLI 是 Codex 最适合练基本功的入口。本页把交互模式、非交互执行、会话恢复、Slash Commands 和常用启动参数整理成中文实操版。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。命令名和参数请以当下 CLI 的 --help 与官方文档为准。',
    },
    sections: [
      {
        id: 'modes',
        title: '三种使用姿势',
        table: {
          headers: ['模式', '适合任务', '典型命令'],
          rows: [
            ['交互模式', '学习仓库、逐步改代码、需要随时打断', 'codex'],
            ['一次性任务', 'CI、脚本、批量分析、生成摘要', 'codex exec "任务说明"'],
            ['恢复会话', '继续未完成任务、延续上下文', 'codex resume'],
          ],
        },
      },
      {
        id: 'interactive',
        title: '交互模式',
        paragraphs: [
          '进入项目根目录后直接运行 codex。第一轮任务最好限制在“只读分析”，先让它告诉你项目用途、入口文件、本地命令和低风险任务候选。',
        ],
        codeBlocks: [
          {
            language: 'bash',
            title: '启动交互模式',
            code: 'codex',
          },
          {
            language: 'text',
            title: '第一次对话建议',
            code: `请先阅读当前仓库，不要修改文件。请告诉我：
1. 项目用途
2. 入口文件
3. 安装、构建和测试命令
4. 你建议优先补齐的 5 个文档或测试任务`,
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页保留了交互模式首轮仓库分析的截图占位。这里保留结构，不省略原信息。',
          },
        ],
      },
      {
        id: 'exec',
        title: '非交互模式：codex exec',
        paragraphs: [
          'exec 适合脚本化和批处理。和交互模式相比，它没有追问空间，所以输入必须更明确，最好约束输出格式。',
        ],
        codeBlocks: [
          {
            language: 'bash',
            title: '只读项目摘要',
            code: 'codex exec "请阅读 README 和 package.json，输出项目本地启动命令和测试命令，不要修改文件。"',
          },
          {
            language: 'text',
            title: '推荐输出格式',
            code: `请只读分析当前仓库，不要修改文件。

输出格式：
1. 项目概览：不超过 120 字
2. 技术栈：表格
3. 本地启动：列出命令和前置条件
4. 测试命令：按单元测试、集成测试、类型检查分类
5. 风险提示：最多 5 条`,
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里给了 codex exec 只读输出的截图占位。',
          },
        ],
      },
      {
        id: 'resume',
        title: '恢复与继续',
        paragraphs: [
          '长任务建议每个阶段结束都让 Codex 输出：已读文件、已改文件、已跑命令、未完成步骤和当前风险。下一次 resume 时把这段总结贴回去，能显著减少上下文断裂。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '继续上一阶段的写法',
            code: `继续上一轮任务。上一阶段已经完成：
- 已定位失败测试：...
- 已修改文件：...
- 已运行命令：...

现在只处理下一步：补充边界测试，并运行相关测试。`,
          },
        ],
      },
      {
        id: 'slash-commands',
        title: 'Slash Commands',
        paragraphs: [
          'Slash Commands 用来查看状态、压缩上下文、审查 diff 和调整权限。最稳妥的方式是在 CLI 里输入 / 看当前版本可用命令。',
        ],
        table: {
          headers: ['命令类型', '作用', '使用建议'],
          rows: [
            ['状态类', '查看模型、审批、工作区状态', '每次重要修改前看一次'],
            ['上下文类', '查看或压缩上下文', '长任务进入下一阶段时使用'],
            ['Git 类', '查看 diff 或变更摘要', '提交前配合人工 review'],
            ['权限类', '查看审批策略', '涉及安装、联网、删除前检查'],
            ['会话类', '退出、恢复、重开', '任务结束前先留下阶段总结'],
          ],
        },
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页保留了输入 / 后的命令列表截图占位。',
          },
        ],
      },
      {
        id: 'startup-flags',
        title: '启动参数的理解方式',
        paragraphs: [
          'CLI 更新很快，参数名和默认值请以 codex --help 和官方文档为准。学习时更应该按用途理解，而不是死记参数名。',
        ],
        table: {
          headers: ['参数类别', '解决的问题', '理解方式'],
          rows: [
            ['模型选择', '速度、成本、推理深度', '复杂任务提高推理，文档整理保持默认'],
            ['沙箱设置', '能读写哪些位置、能否联网', '先只读，再工作区写入'],
            ['审批策略', '哪些命令必须人工确认', '联网、删除、安装、发布保留审批'],
            ['配置覆盖', '临时覆盖 config.toml', '对一次性任务单独选 profile'],
            ['输出格式', '适配脚本或自动化', 'exec 场景优先固定结构输出'],
          ],
        },
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页分别给了 codex --help 和 codex exec --help 的截图占位。',
          },
        ],
      },
      {
        id: 'templates',
        title: '任务设计模板',
        subsections: [
          {
            title: '只读分析',
            codeBlocks: [
              {
                language: 'text',
                code: `请只读分析当前仓库，不要修改文件，不要运行会写入文件的命令。

请输出：
1. 项目结构
2. 关键命令
3. 风险点
4. 适合 Codex 处理的低风险任务清单`,
              },
            ],
          },
          {
            title: '小修复',
            codeBlocks: [
              {
                language: 'text',
                code: `请修复 [具体问题]。

范围：
- 允许修改：[目录/文件]
- 避免修改：[目录/文件]

要求：
1. 先复现问题
2. 修改最小必要代码
3. 运行 [验证命令]
4. 总结原因、改动、验证和风险`,
              },
            ],
          },
          {
            title: '自动化摘要',
            codeBlocks: [
              {
                language: 'bash',
                code: 'codex exec "请阅读最近一次测试失败日志，提取失败测试名、关键报错、可能原因和下一步排查建议，不要修改文件。"',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'index',
    nextSlug: 'config-file',
  },
  'config-file': {
    slug: 'config-file',
    title: '配置文件 config.toml',
    summary: 'config.toml 用来保存 Codex CLI 的本地默认行为。你可以把它理解成“个人驾驶舱”：模型、审批、沙箱、profiles 和 MCP 偏好都集中在这里。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。具体字段以 Codex config basic、advanced、reference 与 openai/codex 的 config 文档为准。',
    },
    sections: [
      {
        id: 'location',
        title: '配置文件放在哪里',
        paragraphs: [
          '通常位于 ~/.codex/config.toml。项目长期规则放进仓库内的 AGENTS.md，个人偏好和本地能力开关放在 config.toml。',
        ],
        codeBlocks: [
          {
            language: 'text',
            code: '~/.codex/config.toml',
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里要求补充本机 config.toml 所在位置的截图，并提醒遮挡敏感路径和 token。',
          },
        ],
      },
      {
        id: 'minimal-example',
        title: '最小配置示例',
        paragraphs: ['下面是学习用示例，目的是理解结构，不是替代官方参考文档。'],
        codeBlocks: [
          {
            language: 'toml',
            code: `model = "gpt-5.1-codex-max"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[profiles.readonly]
approval_policy = "on-request"
sandbox_mode = "read-only"

[profiles.build]
approval_policy = "on-request"
sandbox_mode = "workspace-write"`,
          },
        ],
        bullets: [
          '默认允许在当前工作区写文件。',
          '高风险命令仍然需要审批。',
          '额外保留一个只读 profile，适合新仓库分析。',
        ],
      },
      {
        id: 'common-items',
        title: '常见配置项按用途理解',
        table: {
          headers: ['用途', '你要决定什么', '建议'],
          rows: [
            ['模型', '速度、成本、推理深度的取舍', '从默认值开始，复杂任务再临时调整'],
            ['沙箱', 'Codex 能读写哪些位置', '新手先只读或工作区写入'],
            ['审批', '哪些命令需要你确认', '联网、删除、安装、发布时保留审批'],
            ['profiles', '不同任务使用不同组合', '准备 readonly、coding、review 三类 profile'],
            ['MCP', '接入哪些外部工具', '优先只读接入，明确权限边界'],
            ['环境', '传递哪些变量或隔离哪些秘密', '避免把凭据写入截图和教程'],
          ],
        },
      },
      {
        id: 'profiles',
        title: '推荐 profiles',
        subsections: [
          {
            title: '只读学习',
            paragraphs: ['适合打开陌生仓库、生成项目地图和梳理测试命令。'],
            codeBlocks: [
              {
                language: 'toml',
                code: `[profiles.readonly]
sandbox_mode = "read-only"
approval_policy = "on-request"`,
              },
              {
                language: 'bash',
                code: 'codex --profile readonly',
              },
            ],
          },
          {
            title: '日常编码',
            paragraphs: ['适合修测试、补文档和小范围实现。'],
            codeBlocks: [
              {
                language: 'toml',
                code: `[profiles.coding]
sandbox_mode = "workspace-write"
approval_policy = "on-request"`,
              },
            ],
          },
          {
            title: '审查与发布前检查',
            paragraphs: ['适合 PR review、发布前风险扫描和 diff 总结。'],
            codeBlocks: [
              {
                language: 'toml',
                code: `[profiles.review]
sandbox_mode = "read-only"
approval_policy = "on-request"`,
              },
            ],
          },
        ],
      },
      {
        id: 'verification',
        title: '配置变更的验证方法',
        paragraphs: [
          '改完配置，不要直接上复杂任务。先用一个短任务验证当前工作区、审批策略和验证方式是否与预期一致。',
        ],
        codeBlocks: [
          {
            language: 'text',
            code: '请告诉我当前工作区、审批策略和你准备采用的验证方式。先不要修改文件。',
          },
        ],
        bullets: [
          'Codex 是否能正确读取当前目录。',
          '是否会在执行命令前解释意图。',
          '是否遵守只读或工作区写入边界。',
          '是否按预期触发审批。',
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里给了切换 profile 后的状态截图占位。',
          },
        ],
      },
      {
        id: 'provider-switch',
        title: '切换 provider 后历史会话不可见怎么办',
        paragraphs: [
          '原页单独补充了 provider 切换后的历史会话可见性问题。核心判断是：先确认是不是 Desktop 最近 50 条会话的显示限制，再判断是不是 provider metadata 需要同步。',
          '如果确实是 provider metadata 问题，原页引用了社区项目 codex-provider-sync，并明确标注这不是 OpenAI 官方工具。',
        ],
        callouts: [
          {
            tone: 'warning',
            title: '第三方社区工具',
            body: '使用 codex-provider-sync 前应先备份 ~/.codex，并确认理解它会改动本地 Codex 状态文件。',
          },
        ],
        subsections: [
          {
            title: 'Windows GUI 流程',
            ordered: [
              '打开 Releases 页面下载 CodexProviderSync.exe。',
              '确认 Codex Home 指向你的 .codex 目录。',
              '点击 Refresh 查看 provider、rollout、SQLite 和项目可见性诊断。',
              '选择目标 provider，必要时再同步 config.toml 的 model_provider。',
              '执行同步，不符合预期时用 Restore Backup 回滚。',
            ],
          },
          {
            title: 'CLI 流程',
            codeBlocks: [
              {
                language: 'bash',
                code: `npm install -g git+https://github.com/Dailin521/codex-provider-sync.git
codex-provider status

codex-provider sync
codex-provider sync --provider openai
codex-provider switch <provider-id>
codex-provider restore <backup-dir>`,
              },
            ],
          },
        ],
      },
      {
        id: 'team-split',
        title: '团队配置建议',
        table: {
          headers: ['适合进仓库', '适合留在个人机器'],
          rows: [
            ['AGENTS.md、测试命令、代码风格、PR 模板、截图规范', '默认模型、本地路径、token、私有服务地址、个人 MCP、私有 automation'],
          ],
        },
      },
      {
        id: 'troubleshooting',
        title: '排障清单',
        table: {
          headers: ['现象', '检查'],
          rows: [
            ['配置没生效', '文件路径、TOML 语法、CLI 版本、是否启用了正确 profile'],
            ['权限超出预期', '检查 sandbox_mode 和 approval_policy'],
            ['某个命令一直被拒绝', '检查沙箱限制、网络权限和组织策略'],
            ['MCP 无法连接', '检查服务命令、环境变量、端口和认证方式'],
            ['切换 provider 后旧会话不可见', '先排除 Desktop 50 条限制，再看 metadata 是否需要同步'],
            ['团队成员行为不一致', '把共同规则沉淀进 AGENTS.md'],
          ],
        },
      },
    ],
    prevSlug: 'cli-options',
    nextSlug: 'mcp-skills-subagents',
  },
  'mcp-skills-subagents': {
    slug: 'mcp-skills-subagents',
    title: 'MCP、Skills 与 Subagents',
    summary: '当你已经能稳定完成单次任务，下一步就是把 Codex 变成可扩展的工作系统：用 MCP 连接工具和数据源，用 Skills 固化流程，用 Subagents 拆分复杂任务。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。本页参考 Codex Skills、官方文档入口与 openai/codex 中的 skills 文档。',
    },
    sections: [
      {
        id: 'three-concepts',
        title: '三个概念',
        table: {
          headers: ['能力', '解决的问题', '适合沉淀什么'],
          rows: [
            ['MCP', '让 Codex 访问外部工具、系统或知识源', 'GitHub、浏览器、内部文档、数据库只读查询'],
            ['Skills', '把一套流程写成可复用说明和脚本', '代码审查、发布检查、文档生成、案例收集'],
            ['Subagents', '把复杂任务拆给多个 agent 并行处理', '大型重构、多模块分析、验证与实现分离'],
          ],
        },
      },
      {
        id: 'when-mcp',
        title: '什么时候用 MCP',
        paragraphs: [
          '当任务需要“当前工作区之外”的上下文时，优先考虑 MCP。它的核心价值不是多一个工具，而是让 Codex 在明确权限边界下接触外部系统。',
        ],
        bullets: [
          '读 GitHub issue、PR、review comments。',
          '打开浏览器检查本地页面。',
          '查询内部知识库或只读数据库。',
          '读取日历、邮件、文档、表格。',
          '连接设计稿或项目管理系统。',
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页在这里预留了 MCP 工具列表或配置截图的位置，并提醒遮挡 token、内网域名和账号信息。',
          },
        ],
      },
      {
        id: 'when-skill',
        title: '什么时候写 Skill',
        paragraphs: [
          '第三次重复同一段长提示词时，就该考虑写 Skill。Skill 适合沉淀高频、可复用、步骤清晰的工作流。',
        ],
        bullets: [
          'PR review：统一输出严重级别、文件行号、复现步骤和测试建议。',
          '文档站更新：先读目录，再补内容，再跑构建，最后检查禁用句式。',
          '案例收集：搜索、筛选、下载素材、去重和生成索引。',
          '发布检查：版本号、变更日志、构建、冒烟测试和回滚说明。',
          '数据分析：读表格、清洗字段、生成图表和导出报告。',
        ],
      },
      {
        id: 'skill-template',
        title: 'Skill 模板',
        codeBlocks: [
          {
            language: 'markdown',
            code: `---
name: codex-pr-review
description: 当用户要求审查 PR、diff 或提交时使用，重点发现 bug、回归风险和缺失测试。
---

# Codex PR Review

## 触发场景
用户要求 review、审查、检查 diff、检查 PR。

## 工作流程
1. 先只读 git diff 和相关测试。
2. 优先找行为 bug、数据丢失、权限问题和缺失测试。
3. 输出 findings，按严重程度排序。
4. 没有问题时明确说明，并列出剩余风险。`,
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了 Skill 文件结构截图。',
          },
        ],
      },
      {
        id: 'when-subagents',
        title: '什么时候用 Subagents',
        paragraphs: [
          'Subagents 适合边界明确、能并行推进的任务。关键是拆分职责，而不是简单“多开几个 agent”。',
        ],
        bullets: [
          '一个 agent 分析后端接口，另一个 agent 分析前端调用点。',
          '一个 agent 实现文档页面，另一个 agent 检查官方来源。',
          '一个 agent 做代码修改，另一个 agent 跑验证和整理失败日志。',
          '大型迁移按目录拆分写入范围。',
        ],
        callouts: [
          {
            tone: 'warning',
            title: '不适合的场景',
            body: '若下一步强依赖上一轮分析结果、多个 agent 会修改同一批文件，或任务本身仍然模糊，就不该先上 Subagents。',
          },
        ],
      },
      {
        id: 'subagent-template',
        title: 'Subagents 分工模板',
        codeBlocks: [
          {
            language: 'text',
            code: `请开启两个独立子任务：

Agent A：只读分析 src/api，输出接口变更风险，不修改文件。
Agent B：只读分析 src/ui，输出前端调用点，不修改文件。

主任务等待两个结果后，再决定是否实现。`,
          },
          {
            language: 'text',
            title: '允许写文件时的所有权划分',
            code: `Agent A 只负责 docs/platform/cli.md
Agent B 只负责 docs/configuration/config-file.md

不要修改对方负责的文件。完成后列出改动文件、验证命令和剩余风险。`,
          },
        ],
      },
      {
        id: 'automations',
        title: 'Automations 放在哪里',
        paragraphs: [
          'Automations 适合周期性或延迟型任务，比如每周检查文档断链、每天汇总 failing CI、30 分钟后提醒回到某个线程继续执行。',
        ],
        codeBlocks: [
          {
            language: 'text',
            code: '检查 CodexGuide 仓库中的 Markdown 链接、构建结果和禁用句式。输出发现的问题、涉及文件、建议修复方式和验证命令。',
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了创建 automation 的截图。',
          },
        ],
      },
      {
        id: 'safety-checklist',
        title: '安全清单',
        bullets: [
          '外部工具优先只读接入。',
          '写回 GitHub、邮箱、文档或数据库前保留人工确认。',
          'Skill 中不要写入 token、密钥和内部账号。',
          'MCP 服务要记录来源、权限和维护人。',
          'Subagents 写文件时必须划清边界。',
          'Automation 要有明确输出，不要静默修改关键资源。',
        ],
      },
    ],
    prevSlug: 'config-file',
    nextSlug: 'security-admin',
  },
  'security-admin': {
    slug: 'security-admin',
    title: '安全、审批与管理',
    summary: 'Codex 能读代码、改文件、跑命令，也可能接触凭据、内部系统和生产资源。真正适合长期使用的工作流，一定要把权限边界写清楚。',
    meta: DEFAULT_META,
    note: {
      title: '最后核对',
      body: '官方资料最后核对日期：2026-05-27。本页参考 Codex security、sandbox、exec policy 与官方产品文档整理。',
    },
    sections: [
      {
        id: 'safety-map',
        title: '安全分层',
        images: [
          {
            src: '/codex-guide/images/codex-safety-layers.svg',
            alt: 'Codex 安全分层图',
            caption: '原页中的安全分层图，把任务风险、沙箱、审批和组织治理放在同一张图里。',
          },
        ],
      },
      {
        id: 'risk-levels',
        title: '先分清风险等级',
        table: {
          headers: ['风险等级', '例子', '建议策略'],
          rows: [
            ['低', '读 README、解释函数、生成文档草稿', '可只读自动执行'],
            ['中', '改代码、跑测试、格式化文件', '限制工作区写入，保留 diff review'],
            ['高', '安装依赖、访问外网、删除文件、迁移数据库', '每一步都需要明确审批'],
            ['极高', '生产发布、账单、权限、客户数据、凭据轮换', '保留人工操作或双人复核'],
          ],
        },
      },
      {
        id: 'sandbox',
        title: '沙箱模式怎么理解',
        paragraphs: [
          '沙箱决定 Codex 能访问哪些位置、能否写文件、能否联网。对陌生仓库优先只读；对日常实现任务允许工作区写入；对自动化脚本只给必要目录和必要网络。',
        ],
        table: {
          headers: ['场景', '推荐边界', '用途'],
          rows: [
            ['陌生仓库分析', '只读', '了解结构、生成学习路线'],
            ['日常实现', '工作区写入', '修测试、补文档、改局部代码'],
            ['自动化脚本', '精确放权', '只允许必要命令和目录'],
          ],
        },
        codeBlocks: [
          {
            language: 'text',
            title: '执行前先问清命令意图',
            code: '请说明你当前准备运行哪些命令、这些命令会读写哪些路径、是否需要网络访问。先不要执行。',
          },
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了一次命令审批弹窗或权限提示截图。',
          },
        ],
      },
      {
        id: 'approvals',
        title: '审批策略',
        bullets: [
          '删除、移动大量文件。',
          '修改锁文件或依赖版本。',
          '安装全局工具。',
          '访问外部网络。',
          '读取 .env、证书、密钥文件。',
          '执行数据库迁移。',
          '创建 release、tag、部署或推送生产分支。',
        ],
        codeBlocks: [
          {
            language: 'text',
            title: '推荐审批提示词',
            code: '涉及删除文件、安装依赖、访问网络、读取敏感文件、推送代码或部署时，请先说明理由、命令和影响范围，等我确认后再执行。',
          },
        ],
      },
      {
        id: 'sensitive-data',
        title: '敏感信息处理',
        bullets: [
          '邮箱、用户名、组织名。',
          '本地绝对路径中的隐私信息。',
          'token、API key、session、cookie。',
          '内网域名、私有仓库地址。',
          '客户数据、订单号、日志中的用户标识。',
        ],
        callouts: [
          {
            tone: 'tip',
            title: '截图占位',
            body: '原页这里预留了经过去敏处理的安全截图示例。',
          },
        ],
      },
      {
        id: 'cloud-team',
        title: 'Cloud 与团队管理',
        paragraphs: [
          'Cloud / Web 场景下，安全重点从“本机命令”扩展到“仓库权限和运行环境”。你需要关心仓库连接权限、是否允许创建分支和 PR、环境变量是否包含 secret、日志里是否可能出现敏感输出。',
        ],
        ordered: [
          '先用示例仓库跑通流程。',
          '为真实仓库准备最小权限环境。',
          '把测试命令写进 AGENTS.md。',
          '对高风险目录写清禁止修改或必须审批规则。',
          '定期 review automation、MCP、Skills 和组织策略。',
        ],
      },
      {
        id: 'pre-release',
        title: '发布前安全检查模板',
        codeBlocks: [
          {
            language: 'text',
            code: `请对当前 diff 做发布前安全检查，不要修改文件。

重点检查：
1. 是否新增或暴露凭据、token、cookie、内网域名
2. 是否放宽权限、CORS、认证或网络访问
3. 是否修改数据库迁移、账单、权限、删除逻辑
4. 是否缺少测试、回滚说明或人工确认步骤
5. 是否有需要在 PR 描述中明确标注的风险`,
          },
        ],
      },
      {
        id: 'audit',
        title: '审计记录怎么留',
        bullets: [
          '任务目标。',
          'Codex 执行的命令。',
          '人工批准的命令。',
          '修改文件列表。',
          '验证命令和结果。',
          '未验证的风险。',
          '回滚方式。',
        ],
      },
    ],
    prevSlug: 'mcp-skills-subagents',
  },
};

export function getCodexGuideConfigurationPage(slug: string): CodexGuideConfigurationPageData | undefined {
  return configurationPages[slug];
}

export function getCodexGuideConfigurationSidebar(): CodexGuideSidebarSection[] {
  return codexGuideConfigurationSidebar;
}

export function getCodexGuideConfigurationLinkForIndex(slug: string): string {
  return getCodexGuideConfigurationRoute(slug);
}
