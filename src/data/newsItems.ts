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
      '本条为聚合类快讯，核心关注开发能力与 Agent 工作流的结合。',
      '建议在详情页补充 API 更新点、典型使用场景以及对开发流程的影响。',
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
      '模型厂商竞争集中在价格与上下文能力两个核心维度。',
      '企业选型需要同时评估成本结构与实际推理性能。',
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
      '知识库产品正在从简单问答走向企业级知识管理。',
      '私有化部署和权限控制成为关键决策因素。',
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
      '开源生态正在快速补齐 AI 应用基础设施。',
      'RAG 与 Agent 模板的成熟度显著提升。',
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
      'Trae 接入 Claude 3.7 Sonnet 后，核心受益点在于复杂代码理解、长上下文对话和多轮修改任务的稳定性。',
      '对个人开发者来说，这类升级通常会先体现在解释旧代码更清楚和改动范围更可控上，而不只是补全速度。',
      '如果团队里已经在使用多种 AI 编程工具，比较值得关注的是模型切换成本、账号权限和编辑器内工作流是否顺滑。',
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
      '消费终端销量与算力基础设施扩张往往会互相放大市场情绪，因此这类新闻经常被放在同一轮产业观察中讨论。',
      '对站内内容组织来说，这条新闻更适合在详情页补充上下游影响、厂商关系和投资者最关心的供需变化。',
      '如果后续继续扩展，可以在这里加入相关事件时间线或延伸阅读模块。',
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
      '高端模型价格变化往往不只影响个人订阅，还会直接改变企业 API 选型和内部成本评估方式。',
      '这类消息在详情页里通常值得拆开讲，一部分是产品能力值不值得，另一部分是基础设施成本为什么会同步抬升。',
      '如果你后面想把新闻详情页做得更像专题页，可以把价格变化、可用人群和替代方案做成固定模块。',
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
      '组件库层面的发布意味着 AI 功能正在从能力演示走向工程可复用，这对中后台应用尤其重要。',
      '新闻详情页可以承担一个很实用的角色，除了讲新闻本身，还顺带告诉读者它适合什么场景、适不适合上手。',
      '如果后续有更多前端生态新闻，这一类页面可以统一附上演示截图或 API 入口。',
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
      '多模态 Agent 框架的价值通常不只在模型本身，而在于流程编排、状态管理和工具接入能力能否落地。',
      '如果把它做成详情页，比较适合补充它与传统 Agent 框架有什么不同，以及适合哪类团队先试。',
      '后续也可以把这类文章和教程区打通，形成新闻加实操教程的双入口。',
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
