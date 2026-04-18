export type TutorialItem = {
  title: string;
  description: string;
  categories: string[];
  date: string;
  link: string;
  image: string;
  tone: 'violet' | 'blue' | 'orange';
};

export const featuredTutorialItem: TutorialItem = {
  title: '打工虾的赛博朋克起义：724claw.icu 一个匿名吐槽墙的诞生',
  description:
    '在 AI 席卷职场的今天，一个赛博朋克风格的匿名吐槽社区正在悄然走红。我们从产品设计、社区文化和独立开发的角度拆解这个现象。',
  categories: ['最新文章'],
  date: '2026年03月27日',
  link: '/tutorials/claudecode',
  image: '/img/tutotials_header_compressed.png',
  tone: 'violet',
};

export const tutorialItems: TutorialItem[] = [
  {
    title: 'Claude Code：一个开源的 AI 代码助手，助你轻松驾驭编程挑战',
    description:
      'Claude Code 能自动从数十个来源抓取内容，用 AI 生成高质量、结构清晰的摘要，按 4 小时 / 每日 / 每周 / 每月四种频率推送给你。',
    categories: ['开源项目'],
    date: '2026年02月27日',
    link: '/tutorials/claudecode',
    image: '/img/news4.png',
    tone: 'orange',
  },
  {
    title: '从 0 到 1 搭建 AI 知识库：文档整理、检索、问答与迭代优化',
    description:
      '适合中小团队的知识库实践指南，从切片、向量化到提示词设计，用一条路线把 RAG 跑通。',
    categories: ['AI 工作流', '知识库'],
    date: '2025年12月12日',
    link: '/tutorials/knowledge-base',
    image: '/img/news2.png',
    tone: 'violet',
  },
  {
    title: '信息过载终结者！2026 开源AI新闻摘要神器 ClawFeed',
    description:
      'ClawFeed 能自动从数十个来源抓取内容，用 AI 生成高质量、结构清晰的摘要，按 4 小时 / 每日 / 每周 / 每月四种频率推送给你。',
    categories: ['开源项目'],
    date: '2026年02月27日',
    link: '/tutorials/clawfeed',
    image: '/img/tutorials6.png',
    tone: 'orange',
  },
  {
    title: '离线AI神器MonkeyCode：Docker一键搞定，数据永不外泄的部署指南',
    description:
      'MonkeyCode 是一个开源的企业级 AI 编程助手，支持完全私有化、离线部署，适用于研发团队和敏感行业。',
    categories: ['开源项目', '编程工具'],
    date: '2026年01月23日',
    link: '/tutorials/monkeycode',
    image: '/img/tutorials7.png',
    tone: 'blue',
  },
];

export function getTutorialItemByLink(link: string) {
  return tutorialItems.find((item) => item.link === link);
}
