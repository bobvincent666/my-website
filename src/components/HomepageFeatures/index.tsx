import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ContentCard = {
  title: string;
  excerpt: string;
  category: string;
  source: string;
  date: string;
  link: string;
  accent: 'orange' | 'blue' | 'dark' | 'gold' | 'violet';
};

type ToolCard = {
  name: string;
  subtitle: string;
  mark: string;
  link: string;
};

const aiNewsItems: ContentCard[] = [
  {
    title: 'OpenAI 发布新一代开发能力更新，Agent 工作流进一步落地',
    excerpt: '围绕开发者调用链、工具能力与工作流协作的更新成为今日讨论焦点。',
    category: '全网AI快讯',
    source: '站点编辑部',
    date: '今天',
    link: '/news/intro',
    accent: 'dark',
  },
  {
    title: '多家模型厂商同日更新 API 能力，价格与上下文长度竞争升温',
    excerpt: '从推理成本到长上下文支持，最新一轮产品调整开始影响团队选型。',
    category: '全网AI快讯',
    source: '行业观察',
    date: '2 小时前',
    link: '/news/intro',
    accent: 'orange',
  },
  {
    title: 'AI 搜索与知识库产品持续升温，私有化与企业场景成为热点',
    excerpt: '企业用户对可控部署、知识权限与可追溯回答的需求正在快速增长。',
    category: '全网AI快讯',
    source: '趋势追踪',
    date: '今天',
    link: '/news/intro',
    accent: 'blue',
  },
  {
    title: '开源生态一周回顾：推理框架、RAG 组件与 Agent 模板持续活跃',
    excerpt: '新的开源项目不断涌现，落地速度和可复用性都在提升。',
    category: '全网AI快讯',
    source: '开源雷达',
    date: '本周',
    link: '/news/intro',
    accent: 'violet',
  },
];

const tutorialItems: ContentCard[] = [
  {
    title: 'Cursor 与 Claude Code 如何配合使用，搭建高效 AI 编程工作流',
    excerpt: '从需求拆解、生成代码到 review 与修复，整理一套实用协作方式。',
    category: '技术教程',
    source: 'StepOne',
    date: '25年7月18日',
    link: '/tutorials',
    accent: 'dark',
  },
  {
    title: '从零开始搭建本地 AI 知识库，适合个人和小团队快速上手',
    excerpt: '覆盖文档导入、分段、召回与答案生成，帮助你形成完整闭环。',
    category: '技术教程',
    source: 'StepOne',
    date: '25年7月13日',
    link: '/tutorials',
    accent: 'gold',
  },
  {
    title: 'TypeScript 项目中接入 AI 能力的 10 个常见模式',
    excerpt: '总结聊天、摘要、结构化提取、工具调用与自动化任务的常用设计。',
    category: '技术教程',
    source: 'StepOne',
    date: '25年7月8日',
    link: '/tutorials',
    accent: 'orange',
  },
  {
    title: 'API 调用计费怎么看，如何评估模型成本与稳定性',
    excerpt: '从 token 成本、延迟波动到缓存策略，帮助团队做好上线前评估。',
    category: '技术教程',
    source: 'StepOne',
    date: '25年2月25日',
    link: '/tutorials',
    accent: 'blue',
  },
];

const toolItems: ToolCard[] = [
  {name: 'Qwen Chat', subtitle: '阿里通义系对话与推理入口', mark: 'Q', link: '/tools'},
  {name: 'Grok AI', subtitle: '面向实时信息与对话场景', mark: 'G', link: '/tools'},
  {name: 'DeepSeek', subtitle: '推理与代码能力关注度高', mark: 'D', link: '/tools'},
  {name: '豆包', subtitle: '适合中文日常使用与创作', mark: '豆', link: '/tools'},
  {name: '文心一言', subtitle: '百度生态内的中文 AI 助手', mark: '文', link: '/tools'},
  {name: '腾讯元宝', subtitle: '面向办公与通用问答场景', mark: '元', link: '/tools'},
  {name: 'Gemini', subtitle: 'Google 生态中的多模态工具', mark: 'Gm', link: '/tools'},
  {name: 'Kimi', subtitle: '长文本处理与检索体验突出', mark: 'K', link: '/tools'},
];

function SectionHeader({
  title,
  moreLabel,
  moreTo,
}: {
  title: string;
  moreLabel: string;
  moreTo: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      <Link className={styles.moreLink} to={moreTo}>
        {moreLabel}
      </Link>
    </div>
  );
}

function ContentSection({
  title,
  moreTo,
  items,
}: {
  title: string;
  moreTo: string;
  items: ContentCard[];
}) {
  return (
    <section className={styles.sectionBlock}>
      <SectionHeader title={title} moreLabel="更多" moreTo={moreTo} />
      <div className={styles.contentGrid}>
        {items.map((item) => (
          <Link key={item.title} className={styles.contentCard} to={item.link}>
            <div className={clsx(styles.cardVisual, styles[`accent${capitalize(item.accent)}`])}>
              <span className={styles.visualLabel}>{item.category}</span>
            </div>
            <div className={styles.cardBody}>
              <Heading as="h3" className={styles.cardTitle}>
                {item.title}
              </Heading>
              <p className={styles.cardExcerpt}>{item.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className={clsx(styles.sectionBlock, styles.toolsBlock)}>
      <SectionHeader title="AI工具集" moreLabel="更多" moreTo="/tools" />
      <div className={styles.toolsGrid}>
        {toolItems.map((tool) => (
          <Link key={tool.name} className={styles.toolCard} to={tool.link}>
            <div className={styles.toolAvatar}>{tool.mark}</div>
            <div className={styles.toolBody}>
              <strong>{tool.name}</strong>
              <span>{tool.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function HomepageFeatures(): ReactNode {
  return (
    <div className={styles.pageShell}>
      <div className="container">
        <ContentSection title="全网AI快讯" moreTo="/news/intro" items={aiNewsItems} />
        <ContentSection title="技术教程" moreTo="/tutorials" items={tutorialItems} />
        <ToolsSection />
      </div>
    </div>
  );
}
