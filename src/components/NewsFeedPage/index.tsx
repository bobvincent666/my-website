import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type NewsItem = {
  title: string;
  excerpt: string;
  source: string;
  time: string;
  month: string;
  day: string;
  withThumb?: boolean;
};

const newsItems: NewsItem[] = [
  {
    title: 'MKEAI 中转站新增 GPT-OSS-120B 模型，OpenAI 首款开源大模型正式上线',
    excerpt:
      'MKEAI 补齐了开源推理能力版图，入门门槛降低，这次更新对大模型试用、聚合调度和接口兼容性都有帮助。',
    source: 'StepOne',
    time: '13:17',
    month: '8月',
    day: '06',
  },
  {
    title: 'Trae 已支持 Claude 3.7 Sonnet 模型，这个免费 AI 编程工具更强了',
    excerpt:
      '如果你正在寻找一个更轻量的 AI 编程工具，Trae 这次的模型升级会让日常补全和对话改代更顺手。',
    source: 'StepOne',
    time: '13:45',
    month: '2月',
    day: '28',
    withThumb: true,
  },
  {
    title: '小米 SU7 Ultra 开售 2 小时销量破万，英伟达 H20 芯片订购 30% 引爆供应链',
    excerpt:
      '智能硬件与 AI 基础设施的链接越来越紧密，从终端到芯片供应链都出现了新一轮变化。',
    source: 'StepOne',
    time: '11:15',
    month: '2月',
    day: '27',
  },
  {
    title: 'GPT-4.5 来了，订阅价飙升至 200 刀，英伟达算力订单一夜暴涨 30%',
    excerpt:
      '价格与能力始终是用户最关注的两条线，这次最新动态再次推高了产品选型讨论热度。',
    source: 'StepOne',
    time: '11:48',
    month: '2月',
    day: '27',
  },
  {
    title: '首个 VUE AI 组件库：ant-design-x-vue 发布',
    excerpt:
      '面向 Vue 开发者的 AI 组件库正在变得更成熟，对搭建内部管理平台和智能问答应用都很有帮助。',
    source: 'StepOne',
    time: '10:45',
    month: '2月',
    day: '26',
    withThumb: true,
  },
  {
    title: '微软开源多模态 AI Agent 新框架 Magma',
    excerpt:
      '新框架尝试把多模态感知、任务调度和 Agent 单元组合到一起，给开发者提供了一条更完整的智能体开发路线。',
    source: 'StepOne',
    time: '09:14',
    month: '2月',
    day: '26',
  },
];

export default function NewsFeedPage(): ReactNode {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div>
            <p className={styles.heroKicker}>快讯</p>
            <Heading as="h1" className={styles.heroTitle}>
              最新 AI 行业动向日报
            </Heading>
            <p className={styles.heroDesc}>2025 全球人工智能最新动态与趋势解读</p>
          </div>
          <span className={styles.heroAction}>我要爆料</span>
        </div>
      </div>

      <div className={styles.list}>
        {newsItems.map((item) => (
          <article key={`${item.month}-${item.day}-${item.title}`} className={styles.item}>
            <div className={styles.date}>
              <span className={styles.month}>{item.month}</span>
              <strong className={styles.day}>{item.day}</strong>
            </div>
            <div className={styles.main}>
              <Heading as="h2" className={styles.title}>
                {item.title}
              </Heading>
              <div className={styles.meta}>
                <span>{item.time}</span>
                <span>{`作者 ${item.source}`}</span>
              </div>
              <p className={styles.excerpt}>{item.excerpt}</p>
              <div className={styles.footer}>
                <span>分享到</span>
                <span>☆</span>
                <span>○</span>
                <span>↗</span>
              </div>
            </div>
            {item.withThumb ? <div className={styles.thumb} /> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
