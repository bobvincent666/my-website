import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type TutorialItem = {
  title: string;
  description: string;
  categories: string[];
  date: string;
  link: string;
  tone: 'violet' | 'blue' | 'orange';
};

const featuredItem: TutorialItem = {
  title: '打工虾的赛博朋克起义：724claw.icu 一个匿名吐槽墙的诞生',
  description:
    '在 AI 席卷职场的今天，一个赛博朋克风格的匿名吐槽社区正在悄然走红。我们从产品设计、社区文化和独立开发的角度拆解这个现象。',
  categories: ['最新文章'],
  date: '2026年03月27日',
  link: '/tutorials/claude-code',
  tone: 'violet',
};

const tutorialItems: TutorialItem[] = [
  {
    title: 'Claude Code：一个开源的 AI 代码助手，助你轻松驾驭编程挑战',
    description:
      'Claude Code 能自动从数十个来源抓取内容，用 AI 生成高质量、结构清晰的摘要，按 4 小时 / 每日 / 每周 / 每月四种频率推送给你。',
    categories: ['开源项目'],
    date: '2026年02月27日',
    link: '/tutorials/claudecode',
    tone: 'orange',
  },
  {
    title: '信息过载终结者！2026 开源AI新闻摘要神器 ClawFeed',
    description:
      'ClawFeed 能自动从数十个来源抓取内容，用 AI 生成高质量、结构清晰的摘要，按 4 小时 / 每日 / 每周 / 每月四种频率推送给你。',
    categories: ['开源项目'],
    date: '2026年02月27日',
    link: '/tutorials/clawfeed',
    tone: 'orange',
  },
  {
    title: '离线AI神器MonkeyCode：Docker一键搞定，数据永不外泄的部署指南',
    description:
      'MonkeyCode 是一个开源的企业级 AI 编程助手，支持完全私有化、离线部署，适用于研发团队和敏感行业。',
    categories: ['开源项目', '编程工具'],
    date: '2026年01月23日',
    link: '/tutorials/monkeycode',
    tone: 'blue',
  },
  {
    title: '从 0 到 1 搭建 AI 知识库：文档整理、检索、问答与迭代优化',
    description:
      '适合中小团队的知识库实践指南，从切片、向量化到提示词设计，用一条路线把 RAG 跑通。',
    categories: ['AI 工作流', '知识库'],
    date: '2025年12月12日',
    link: '/tutorials/knowledge-base',
    tone: 'violet',
  },
];

export default function TutorialsPage(): ReactNode {
  return (
    <Layout title="技术教程" description="AI 技术教程与实战文章列表">
      <div className={styles.page}>
        <div className="container">
          <div className={styles.breadcrumb}>首页 / 全部文章</div>

          <Link className={`${styles.featured} ${styles[`tone${capitalize(featuredItem.tone)}`]}`} to={featuredItem.link}>
            <div className={styles.featuredInner}>
              <div className={styles.featuredDate}>
                <span>{featuredItem.date}</span>
                <strong>最新文章</strong>
              </div>
              <div className={styles.featuredText}>
                <Heading as="h1" className={styles.featuredTitle}>
                  {featuredItem.title}
                </Heading>
                <p className={styles.featuredDesc}>{featuredItem.description}</p>
              </div>
            </div>
          </Link>

          <div className={styles.list}>
            {tutorialItems.map((item) => (
              <Link key={item.title} className={styles.listItem} to={item.link}>
                <div className={`${styles.thumb} ${styles[`tone${capitalize(item.tone)}`]}`} />
                <div className={styles.itemBody}>
                  <Heading as="h2" className={styles.itemTitle}>
                    {item.title}
                  </Heading>
                  <p className={styles.itemDesc}>{item.description}</p>
                  <div className={styles.itemMeta}>
                    <div className={styles.itemCategories}>
                      {item.categories.map((category) => (
                        <span key={category}>{category}</span>
                      ))}
                    </div>
                    <span className={styles.itemDate}>{item.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
