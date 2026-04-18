export type NewsLink = {
  label: string;
  url: string;
};

export type NewsTimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type NewsKeyFact = {
  label: string;
  value: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  time: string;
  month: string;
  day: string;
  categories: string[];
  detail: string[];
  href: string;
  keyFacts?: NewsKeyFact[];
  timeline?: NewsTimelineItem[];
  sourceLinks?: NewsLink[];
  relatedLinks?: NewsLink[];
  withThumb?: boolean;
};

function buildDetailHref(id: string) {
  return `/news/detail?id=${encodeURIComponent(id)}`;
}

export const newsItems: NewsItem[] = [
   {
    id: 'ai-news-1',
    title: 'OpenAI 发布新一代开发能力更新，Agent 工作流进一步落地',
    excerpt: '围绕开发者调用链、工具能力与工作流协作的更新成为今日讨论焦点。',
    source: '站点编辑部',
    time: '本周',
    month: '4月',
    day: '15',
    categories: ['全网AI快讯'],
    detail: [
      '2025 年 3 月 11 日，OpenAI 正式发布 Responses API 与开源 Agents SDK，把原本分散在对话、工具调用和多步骤编排里的开发流程进一步统一起来；从产品方向看，这意味着 Agent 不再只是“能调用工具”，而是开始进入可观测、可调试、可复用的工程化阶段。',
      '这轮更新最核心的变化，是把 Web Search、File Search、Computer Use 等能力直接纳入同一套调用范式。开发团队不必再自行拼接大量中间层逻辑，就可以把检索、文件理解、网页操作和最终回答串成一个完整工作流，明显降低了 Agent 应用的原型验证门槛。',
      '从架构视角看，Responses API 强调的是“单次响应中完成模型推理 + 工具调用 + 结果回填”，而 Agents SDK 更偏向多 Agent 协作、状态跟踪与执行可视化。两者组合后，更适合处理研究助手、企业客服自动化、代码代理和运营流程编排这类长链路任务。',
      '对开发者而言，这类能力升级的真正价值不只是模型更强，而是交付路径更短。过去很多团队卡在工具协议、上下文拼接和异常恢复上，现在则可以把精力转向权限边界、评测体系、成本控制和业务闭环设计，这也是 Agent 工作流“进一步落地”的真实信号。',
    ],
    keyFacts: [
      {label: '发布日期', value: '2025 年 3 月 11 日'},
      {label: '核心能力', value: 'Responses API、Agents SDK、Web/File Search、Computer Use'},
      {label: '行业含义', value: 'Agent 从演示能力转向工程化工作流'},
    ],
    timeline: [
      {
        date: '2025-03-11',
        title: 'OpenAI 发布新一代 Agent 开发工具',
        description: 'Responses API 与开源 Agents SDK 同步亮相，统一了工具调用与多步骤执行范式。',
      },
      {
        date: '2025-03-11',
        title: '工具能力进入统一接口层',
        description: 'Web Search、File Search 与 Computer Use 被纳入同一开发路径，降低集成门槛。',
      },
    ],
    sourceLinks: [
      {label: 'OpenAI 官方发布', url: 'https://openai.com/index/new-tools-for-building-agents/'},
    ],
    relatedLinks: [
      {label: 'OpenAI API 文档', url: 'https://platform.openai.com/docs/'},
      {label: 'OpenAI 开发者资源', url: 'https://developers.openai.com/'},
    ],
    href: buildDetailHref('ai-news-1'),
  },
  {
    id: 'ai-news-2',
    title: '多家模型厂商同日更新 API 能力，价格与上下文长度竞争升温',
    excerpt: '从推理成本到长上下文支持，最新一轮产品调整开始影响团队选型。',
    source: '行业观察',
    time: '本周',
    month: '4月',
    day: '12',
    categories: ['全网AI快讯'],
    detail: [
      '这一轮 API 竞争的焦点已经非常明确：一边是更长的上下文窗口，另一边是更细的价格分层。以 Google Gemini Developer API 为例，Gemini 2.5 Pro 采用了按 20 万 token 阈值分段计费的方式，长上下文任务的输入、输出和缓存成本都会明显变化，这直接影响企业对长文档分析、代码仓库理解和大规模检索增强任务的预算模型。',
      'Anthropic 这条线则更强调长上下文稳定性与缓存效率。Claude 系列官方文档持续强调长上下文提示策略与 prompt caching 的工程价值，说明厂商竞争已经从“谁支持更多 token”演变为“谁能在超长输入场景下保持可用性、延迟和成本可控”。',
      '价格战表面上看是单次调用更便宜，实际上比拼的是完整任务成本。一个上下文更长、缓存更成熟、工具调用更稳定的模型，哪怕单价不最低，也可能在真实业务里拥有更好的总拥有成本，因为它减少了切分、重试、摘要回灌和人工兜底的额外开销。',
      '对企业选型来说，不能只看宣传页上的“百万上下文”或“最低 token 单价”，更要评估四件事：复杂提示下的实际吞吐、长任务中的稳定性、缓存/批处理机制是否成熟，以及工具调用与数据合规能力是否满足生产环境要求。这也是本轮竞争开始升温后，技术负责人最需要回到工程事实做判断的地方。',
    ],
    keyFacts: [
      {label: '竞争焦点', value: '长上下文、缓存能力、完整任务成本'},
      {label: '代表厂商', value: 'Google Gemini、Anthropic Claude 等'},
      {label: '决策关键', value: '稳定性、吞吐、缓存策略、合规性'},
    ],
    timeline: [
      {
        date: '2025-04',
        title: 'Gemini 系列继续强调长上下文与分层定价',
        description: 'Google 在开发者定价页中持续强化长上下文任务的计费细则。',
      },
      {
        date: '2025-04',
        title: 'Anthropic 继续突出 prompt caching',
        description: 'Claude 文档强调缓存和长任务控制能力，推动企业把注意力转向真实总成本。',
      },
    ],
    sourceLinks: [
      {label: 'Google AI 定价说明', url: 'https://ai.google.dev/pricing'},
      {label: 'Anthropic 开发文档', url: 'https://docs.anthropic.com/'},
    ],
    relatedLinks: [
      {label: 'Gemini API 文档', url: 'https://ai.google.dev/gemini-api/docs'},
      {label: 'Claude Prompt Caching', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching'},
    ],
    href: buildDetailHref('ai-news-2'),
  },
  {
    id: 'ai-news-3',
    title: 'AI 搜索与知识库产品持续升温，私有化与企业场景成为热点',
    excerpt: '企业用户对可控部署、知识权限与可追溯回答的需求正在快速增长。',
    source: '趋势追踪',
    time: '本周',
    month: '4月',
    day: '10',
    categories: ['全网AI快讯'],
    detail: [
      'AI 搜索和知识库产品的热度上升，并不只是因为问答体验更自然，而是企业开始把它们当成“知识分发基础设施”来采购。过去很多系统停留在 FAQ 检索或文档摘要层面，现在则普遍要求支持来源引用、权限继承、多数据源接入和结果可追溯，这些能力直接决定产品能否进入真实业务流程。',
      '从公开能力演进来看，Amazon Bedrock Knowledge Bases 在 2025 年 3 月相继把 GraphRAG 推向 GA，并继续扩展 OpenSearch、Aurora PostgreSQL、MongoDB Atlas 等向量存储与混合检索支持，释放出的信号很明确：企业客户最看重的已经不是“能不能做 RAG”，而是“能不能把 RAG 做成稳定、可治理、可评估的企业服务”。',
      '“私有化”之所以成为热点，不只是部署位置的问题，更涉及知识权限、审计链路和组织边界。尤其在金融、制造、医药和政企业务里，用户通常希望模型只能访问授权知识域，并且回答里能回溯到具体文档片段、图谱关系或业务系统记录，这要求底层检索层和权限系统深度耦合。',
      '因此，当前 AI 搜索产品的竞争核心已经从回答是否流畅，升级为检索是否可信、权限是否精细、评测是否可量化。谁能把企业内部文档、数据库、工单系统和协作平台接入成一套统一知识底座，谁才更有机会从“聊天式工具”升级为真正的企业知识入口。',
    ],
    keyFacts: [
      {label: '热点方向', value: '私有化部署、权限继承、来源可追溯'},
      {label: '基础设施趋势', value: 'GraphRAG 与混合检索进入企业落地阶段'},
      {label: '典型场景', value: '金融、制造、医药、政企知识管理'},
    ],
    timeline: [
      {
        date: '2025-03',
        title: 'Amazon Bedrock Knowledge Bases 扩展能力',
        description: 'GraphRAG、向量数据库支持与企业知识治理能力继续增强。',
      },
      {
        date: '2025-04',
        title: '企业采购重心转向治理与审计',
        description: '市场从简单问答转向知识权限、评测闭环和多源接入。',
      },
    ],
    sourceLinks: [
      {
        label: 'AWS Bedrock GraphRAG GA',
        url: 'https://aws.amazon.com/about-aws/whats-new/2025/03/amazon-bedrock-knowledge-bases-graphrag-generally-available/',
      },
      {label: 'AWS Bedrock Knowledge Bases', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html'},
    ],
    relatedLinks: [
      {label: 'Amazon Bedrock 官方页', url: 'https://aws.amazon.com/bedrock/'},
    ],
    href: buildDetailHref('ai-news-3'),
  },
  {
    id: 'ai-news-4',
    title: '开源生态一周回顾：推理框架、RAG 组件与 Agent 模板持续活跃',
    excerpt: '新的开源项目不断涌现，落地速度和可复用性都在提升。',
    source: '开源雷达',
    time: '本周',
    month: '4月',
    day: '08',
    categories: ['全网AI快讯'],
    detail: [
      '最近一轮开源生态的活跃点，已经从“模型本身”明显转向“模型之外的应用基础设施”。围绕推理服务、RAG 管线、Agent 编排、评测、可观测性和前端交互层的项目更新频率都在加快，说明社区关注点正在从单点能力炫技，转向系统化交付 AI 应用。',
      '其中 RAG 相关组件的成熟度提升尤其明显。越来越多项目开始把文档切分、向量检索、重排、引用回传、权限控制和评测闭环作为一整套能力提供，而不是只提供一个向量召回接口。这让中小团队也能更快搭建“能上线”的知识问答系统，而不必从零拼装全链路。',
      'Agent 模板的变化同样值得注意。现在主流开源方案更强调任务拆分、工具注册、状态记忆、人工接管和失败恢复，这些能力看起来不如模型参数醒目，但恰恰决定了一个 Agent 系统能否在生产环境连续运行。模板越成熟，团队在 PoC 到生产之间踩的坑就越少。',
      '对技术团队来说，这波开源繁荣最现实的意义在于“复用率”提升。以前做一个 AI 应用，很多基础能力都要自己补；现在从推理层到前端对话组件，已经出现越来越多可直接验证和替换的开源积木，这会显著缩短试错周期，也让架构选型变得更强调组合能力而不是单点堆料。',
    ],
    keyFacts: [
      {label: '开源重心', value: '推理服务、RAG、Agent、评测、可观测性'},
      {label: '成熟方向', value: '引用回传、状态管理、失败恢复'},
      {label: '团队收益', value: '缩短 PoC 到生产的试错周期'},
    ],
    timeline: [
      {
        date: '2025-04',
        title: 'RAG 组件进入全链路整合阶段',
        description: '越来越多项目从向量召回转向完整知识问答流水线。',
      },
      {
        date: '2025-04',
        title: 'Agent 模板强调可运维性',
        description: '任务拆分、人工接管和失败恢复成为社区高频能力。',
      },
    ],
    sourceLinks: [
      {label: 'GitHub Explore AI', url: 'https://github.com/topics/artificial-intelligence'},
      {label: 'Hugging Face Papers', url: 'https://huggingface.co/papers'},
    ],
    relatedLinks: [
      {label: 'LangChain', url: 'https://github.com/langchain-ai/langchain'},
      {label: 'LlamaIndex', url: 'https://github.com/run-llama/llama_index'},
    ],
    href: buildDetailHref('ai-news-4'),
  },
  {
    id: 'trae-claude-37',
    title: 'Trae 已支持 Claude 3.7 Sonnet 模型，这个免费 AI 编程工具更强了',
    excerpt:
      '如果你正在寻找一个更轻量的 AI 编程工具，Trae 这次的模型升级会让日常补全和对话改代码更顺手。',
    source: 'StepOne',
    time: '13:45',
    month: '2月',
    day: '28',
    categories: ['全网AI快讯', 'AI 编程'],
    detail: [
      '这条新闻的背景是 Anthropic 在 2025 年 2 月 24 日正式发布 Claude 3.7 Sonnet，并将其定义为首个“混合推理”模型。官方特别强调它在 coding 和前端 Web 开发上的提升，同时支持更长时间的可控思考，这使它天然适合被集成进 IDE、代码代理和多轮改码场景。',
      'Trae 对 Claude 3.7 Sonnet 的支持，价值并不只是“换了一个更强模型”，而是让免费或轻量级 AI 编程工具也具备了更好的复杂仓库理解能力。对于真实开发任务来说，最重要的收益通常体现在跨文件修改建议、更稳定的 bug 定位、以及对已有工程上下文的持续跟踪，而不是单纯的补全速度。',
      '从产品竞争角度看，这类升级会显著缩小轻量 AI IDE 与重度付费工具之间的体验差距。尤其对个人开发者、小团队和中文开发场景来说，如果工具已经能在聊天改码、代码解释、局部重构和命令辅助上做到足够顺手，那么模型可用性本身就会成为用户迁移的重要触发点。',
      '不过真正值得长期观察的，仍然是工具层能力是否跟得上模型升级。包括索引速度、项目级上下文管理、终端协同、权限隔离和多模型切换体验，都会决定 Trae 这类产品最终是停留在“好用的免费助手”，还是成长为可进入日常主力工作流的 AI 编程环境。',
    ],
    keyFacts: [
      {label: '模型发布时间', value: '2025 年 2 月 24 日'},
      {label: '升级重点', value: '复杂代码理解、长上下文、多轮修改稳定性'},
      {label: '关注点', value: '索引速度、上下文管理、终端协同'},
    ],
    timeline: [
      {
        date: '2025-02-24',
        title: 'Anthropic 发布 Claude 3.7 Sonnet',
        description: '官方强调该模型在编码与前端任务中的表现提升。',
      },
      {
        date: '2025-02-28',
        title: 'Trae 接入 Claude 3.7 Sonnet',
        description: '轻量级 AI 编程工具开始具备更强的复杂仓库理解能力。',
      },
    ],
    sourceLinks: [
      {label: 'Anthropic 官方发布', url: 'https://www.anthropic.com/research/claude-3-7-sonnet'},
    ],
    relatedLinks: [
      {label: 'Claude 开发文档', url: 'https://docs.anthropic.com/'},
    ],
    href: buildDetailHref('trae-claude-37'),
    // withThumb: true,
  },
  {
    id: 'su7-ultra-h20',
    title: '小米 SU7 Ultra 开售 2 小时销量破万，英伟达 H20 芯片采购增长 30% 引爆供应链',
    excerpt:
      '智能硬件与 AI 基础设施的链接越来越紧密，从终端到芯片供应链都出现了新一轮变化。',
    source: 'StepOne',
    time: '11:15',
    month: '2月',
    day: '27',
    categories: ['全网AI快讯', '产业动态'],
    detail: [
      '小米 SU7 Ultra 在 2025 年 2 月 27 日晚发布后，两小时内大定突破 1 万台，直接完成年度销售目标。这件事本身说明高性能智能汽车仍然具备极强的话题牵引力，也反映出“智能终端 + 软件体验 + 品牌流量”正在形成新的消费电子式竞争逻辑。',
      '同一时间，围绕英伟达 H20 的需求也在快速升温。路透社在 2025 年 2 月的报道指出，受中国市场对低成本 AI 模型和推理部署需求带动，腾讯、阿里巴巴、字节跳动等公司显著增加了 H20 订单。H20 虽然不是英伟达最强芯片，但在出口限制框架下，它依然是中国市场极具现实意义的 AI 推理算力选项。',
      '把这两件事放在一起看，更能反映产业链的联动关系。一端是智能汽车等高端终端持续吸引资本和用户注意力，另一端是模型训练、推理和云侧部署继续拉动对合规 AI 芯片的采购需求。终端创新与算力供给并不是两条完全独立的线，而是在共同塑造新一轮硬科技投资叙事。',
      '对行业观察者来说，更值得追踪的是后续传导效应：上游芯片供给是否进一步趋紧，中游服务器与云服务厂商是否受益，以及下游终端品牌能否把 AI 能力真正转化为可感知卖点。只有当“销量热度”和“算力投入”都能沉淀为长期产品力，这类新闻才会从短期热点变成中期趋势。',
    ],
    keyFacts: [
      {label: '终端动态', value: 'SU7 Ultra 发布后 2 小时大定破 1 万台'},
      {label: '芯片信号', value: 'H20 订单受中国推理需求拉动持续升温'},
      {label: '观察角度', value: '终端创新与算力供给联动增强'},
    ],
    timeline: [
      {
        date: '2025-02-27',
        title: 'SU7 Ultra 发布并快速完成年度目标',
        description: '小米高性能车型发布后短时间内实现超预期订购表现。',
      },
      {
        date: '2025-02',
        title: 'H20 订单增长成为供应链热点',
        description: '中国主要科技公司加大对合规 AI 推理芯片的采购力度。',
      },
    ],
    sourceLinks: [
      {label: '雷军微博披露销量', url: 'https://weibo.com/1749127163/5138820200138237'},
      {
        label: 'Reuters/H20 需求报道转引',
        url: 'https://www.investing.com/news/stock-market-news/nvidias-h20-chip-orders-jump-as-chinese-firms-adopt-deepseeks-ai-models-sources-say-3887843',
      },
    ],
    relatedLinks: [
      {label: '小米汽车官网', url: 'https://www.xiaomiev.com/'},
    ],
    href: buildDetailHref('su7-ultra-h20'),
  },
  {
    id: 'gpt-45-pricing',
    title: 'GPT-4.5 来了，订阅价上探到 200 美元，算力订单一夜暴增 30%',
    excerpt:
      '价格与能力始终是用户最关心的两条线，这次最新动态再次推高了产品选型讨论热度。',
    source: 'StepOne',
    time: '11:48',
    month: '2月',
    day: '27',
    categories: ['全网AI快讯', '模型商业化'],
    detail: [
      'OpenAI 于 2025 年 2 月 27 日发布 GPT-4.5 研究预览版，并首先向 ChatGPT Pro 用户与开发者开放。官方将其描述为当时“最大、最有知识”的聊天模型，强调更自然的交互、更强的模式识别能力以及更低的幻觉率，这说明 GPT-4.5 的定位并不是纯推理冠军，而是偏通用、高质量对话与创意生成的高端模型。',
      '“200 美元订阅价”对应的是 ChatGPT Pro 档位的高端使用门槛，而这类定价信号对行业的影响远大于个人订阅本身。它相当于公开告诉市场：更高质量、更大规模的模型能力仍然需要昂贵算力来支撑，顶级模型的商业化短期内不会回到低价普惠路线，而会继续维持明显分层。',
      '从企业侧看，GPT-4.5 这种产品会重新拉高选型讨论的复杂度。团队不再只是比较“模型谁更聪明”，而是要比较它在写作、客服、知识处理、代码辅助等具体任务上的边际收益，是否足以覆盖更高的订阅或 API 成本。如果收益无法稳定兑现，很多企业就会转向更便宜的模型做混合部署。',
      '因此，这条新闻真正值得关注的不是单一价格数字，而是它释放出的行业信号：前沿模型能力正在继续提升，但商业化路径越来越像分层市场。高端模型卖的是体验上限和任务完成质量，中端模型卖的是规模化部署效率，未来的产品策略很可能不是“只选一个模型”，而是围绕成本与质量做多层组合。',
    ],
    keyFacts: [
      {label: '发布日期', value: '2025 年 2 月 27 日'},
      {label: '开放对象', value: 'ChatGPT Pro 用户与开发者'},
      {label: '商业信号', value: '前沿模型继续走高端分层路线'},
    ],
    timeline: [
      {
        date: '2025-02-27',
        title: 'OpenAI 发布 GPT-4.5 研究预览',
        description: '官方将其定位为更自然、知识更丰富的高端聊天模型。',
      },
      {
        date: '2025-02-27',
        title: '高端订阅定价再次引发行业讨论',
        description: '市场开始重新评估顶级模型的成本结构和商业化路径。',
      },
    ],
    sourceLinks: [
      {label: 'OpenAI GPT-4.5 官方发布', url: 'https://openai.com/index/introducing-gpt-4-5/'},
    ],
    relatedLinks: [
      {label: 'OpenAI 定价页', url: 'https://openai.com/api/pricing/'},
    ],
    href: buildDetailHref('gpt-45-pricing'),
  },
  {
    id: 'ant-design-x-vue',
    title: '首个 Vue AI 组件库 ant-design-x-vue 发布',
    excerpt:
      '面向 Vue 开发者的 AI 组件库正在变得更成熟，对搭建内部管理平台和智能问答应用都很有帮助。',
    source: 'StepOne',
    time: '10:45',
    month: '2月',
    day: '26',
    categories: ['全网AI快讯', 'Vue 生态'],
    detail: [
      'ant-design-x-vue 的出现，意味着 React 生态里已经相对成熟的 AI 交互组件思路，开始被系统性地迁移到 Vue 场景中。根据其 GitHub 与 npm 页面披露的信息，这个项目围绕对话气泡、AI 交互容器、模板化页面和 OpenAI 兼容接口接入做了较完整封装，目标很明确，就是帮助 Vue 团队更快搭建 LUI 或 Copilot 类界面。',
      '这类组件库的价值，不在于替代业务逻辑，而在于把高频且难统一的 AI 交互层抽象出来。比如消息流展示、输入态反馈、上下文切换、卡片化回答、工具状态提示等，如果每个团队都从零实现，成本会很高；组件库成熟后，前端团队就能把更多时间放在业务流程和数据接入上。',
      '对 Vue 生态来说，这也是一个积极信号。它说明 AI 应用开发不再只是 React 社区的先发优势，Vue 团队同样开始拥有成体系的 UI 积木和工程范式。对于大量使用 Vue 构建中后台、SaaS 管理台和企业内部系统的团队来说，这会明显降低在现有技术栈中加入 AI 助手的阻力。',
      '不过从技术选型角度，使用这类组件库前仍然要关注三个问题：一是设计语言是否与现有系统兼容，二是状态管理和流式响应能力是否足够稳定，三是组件封装是否方便二次扩展。只有当“开箱即用”和“后续可控”同时成立，它才会从演示级方案变成真正可投产的前端基础设施。',
    ],
    keyFacts: [
      {label: '生态定位', value: '面向 Vue 的 AI 交互组件库'},
      {label: '能力范围', value: '消息流、交互容器、模板页面、OpenAI 兼容接入'},
      {label: '适用场景', value: '中后台系统、SaaS 管理台、智能问答界面'},
    ],
    timeline: [
      {
        date: '2025-02',
        title: 'ant-design-x-vue 对外发布',
        description: 'Vue 社区开始拥有更体系化的 AI UI 组件积木。',
      },
      {
        date: '2025-02',
        title: '项目同步提供 npm 与仓库入口',
        description: '组件库开始具备可安装、可扩展、可工程复用的基础条件。',
      },
    ],
    sourceLinks: [
      {label: 'npm 包页', url: 'https://www.npmjs.com/package/ant-design-x-vue'},
      {label: 'GitHub 仓库搜索入口', url: 'https://github.com/search?q=ant-design-x-vue&type=repositories'},
    ],
    relatedLinks: [
      {label: 'Ant Design X', url: 'https://x.ant.design/'},
    ],
    href: buildDetailHref('ant-design-x-vue'),
    // withThumb: true,
  },
  {
    id: 'magma-agent',
    title: '微软开源多模态 AI Agent 新框架 Magma',
    excerpt:
      '新框架尝试把多模态感知、任务调度和 Agent 单元组合到一起，给开发者提供了一条更完整的智能体开发路线。',
    source: 'StepOne',
    time: '09:14',
    month: '2月',
    day: '26',
    categories: ['全网AI快讯', 'Agent'],
    detail: [
      '微软研究院在 2025 年 2 月下旬公开了 Magma 项目，并将其定义为面向多模态 AI Agent 的基础模型。与传统视觉语言模型相比，Magma 不只强调“看懂图像和视频”，而是进一步强调在数字界面和物理环境中执行动作的能力，例如 UI 导航、按钮点击定位和机器人操作规划。',
      '从论文与项目页披露的信息来看，Magma 的关键创新在于把视觉理解与行动能力放到同一训练框架里，并引入 Set-of-Mark 与 Trace-of-Mark 两类机制，分别用于动作目标定位和动作轨迹规划。这个思路的意义在于，让模型不只是会描述界面，而是更接近“知道下一步该操作哪里、如何操作”。',
      '这类框架之所以值得关注，是因为它代表 Agent 研究正在从纯文本任务向真实交互任务扩展。过去很多 Agent 更像“会调用函数的语言模型”，而 Magma 这类系统尝试打通视觉感知、空间推理与行动生成，理论上更适合桌面自动化、网页操作、工业机器人辅助和复杂人机协同场景。',
      '当然，从研究走向生产仍然有距离。多模态 Agent 要真正可用，还需要解决实时性、环境泛化、错误恢复和安全边界等问题。但 Magma 至少给出了一个非常清晰的方向：未来的 Agent 框架不会只围绕文本思考，而会越来越强调“感知环境、规划动作、执行任务”的完整闭环。',
    ],
    keyFacts: [
      {label: '发布主体', value: 'Microsoft Research'},
      {label: '核心方向', value: '多模态感知 + 行动规划 + Agent 执行'},
      {label: '典型场景', value: 'UI 自动化、网页操作、机器人辅助'},
    ],
    timeline: [
      {
        date: '2025-02',
        title: 'Magma 项目公开',
        description: '微软研究院将其定义为面向多模态 AI Agent 的基础模型。',
      },
      {
        date: '2025-02',
        title: '关键机制随论文披露',
        description: 'Set-of-Mark 与 Trace-of-Mark 被用于动作目标与轨迹规划。',
      },
    ],
    sourceLinks: [
      {
        label: 'Microsoft Research 论文页',
        url: 'https://www.microsoft.com/en-us/research/publication/magma-a-foundation-model-for-multimodal-ai-agents/',
      },
    ],
    relatedLinks: [
      {label: 'arXiv 检索入口', url: 'https://arxiv.org/search/?query=Magma+a+foundation+model+for+multimodal+AI+agents&searchtype=all'},
    ],
    href: buildDetailHref('magma-agent'),
  },
];

export function getNewsItemById(id: string | null | undefined) {
  if (!id) {
    return undefined;
  }

  return newsItems.find((item) => item.id === id);
}
