import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import RemoteContentState from '@site/src/components/RemoteContentState';
import {getHomeData} from '@site/src/data/contentApi';
import {home as localHomeData, type HomeData, type HomeListItem} from '@site/src/data/home';
import {useRemoteData} from '@site/src/hooks/useRemoteData';

import styles from './index.module.css';

const latestTutorialItems: HomeListItem[] = [
  {
    id: 'tutorial-codex-guide',
    kind: 'tutorial',
    title: 'Codex 从入门到精通',
    summary: '系统整理 Codex 桌面 App、CLI、IDE、Cloud、配置、权限和实战案例的完整学习路线。',
    path: '/tutorials/codex-guide',
    categories: ['技术教程'],
    sourceName: 'StepOne',
    publishedLabel: '最新',
    coverImage: '/codex-guide/images/codex001.png',
    tone: 'violet',
  },
  {
    id: 'tutorial-codex01',
    kind: 'tutorial',
    title: '别只让 Codex 写代码',
    summary: '从持久对话、任务干预、工具调用到自动化，释放 Codex 作为全链路生产力助手的能力。',
    path: '/tutorials/article?path=%2Ftutorials%2Fcodex01',
    categories: ['技术教程'],
    sourceName: 'StepOne',
    publishedLabel: '最新',
    coverImage: '/codex-guide/images/codex002.png',
    tone: 'dark',
  },
  {
    id: 'tutorial-codex02',
    kind: 'tutorial',
    title: 'Codex 实战教程 02',
    summary: '延续 Codex 实战系列，围绕真实工作流梳理可复制的任务设计、执行和验证方法。',
    path: '/tutorials/article?path=%2Ftutorials%2Fcodex02',
    categories: ['技术教程'],
    sourceName: 'StepOne',
    publishedLabel: '最新',
    coverImage: '/codex-guide/images/codex003.png',
    tone: 'blue',
  },
  {
    id: 'tutorial-claudecode',
    kind: 'tutorial',
    title: 'Claude Code 使用教程',
    summary: '围绕 Claude Code 的能力边界、使用方式、典型工作流与开发协作场景展开的完整教程。',
    path: '/tutorials/claudecode',
    categories: ['技术教程'],
    sourceName: 'StepOne',
    publishedLabel: '最新',
    coverImage: '/codex-guide/images/claudecode.png',
    tone: 'orange',
  },
];

function withLatestTutorials(home: HomeData): HomeData {
  return {
    ...home,
    sections: {
      ...home.sections,
      tutorials: {
        ...home.sections.tutorials,
        items: latestTutorialItems,
      },
    },
  };
}

function HomepageHeader({home}: {home: HomeData}) {
  return (
    <header className={styles.heroBanner}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>SpaceSeek AI Knowledge Universe</p>
          <Heading as="h1" className={styles.heroTitle}>
            在 AI 宇宙中定位下一条技术航线
          </Heading>
          <p className={styles.heroSubtitle}>
            聚合 AI 快讯、Codex 教程与实用工具，把分散的信息整理成可探索、可行动、可持续更新的知识星图。
          </p>
          <div className={styles.buttons}>
            <Link className={clsx(styles.heroButton, styles.heroButtonPrimary)} to={home.hero.secondaryButton.to}>
              开始探索教程
            </Link>
            <Link className={clsx(styles.heroButton, styles.heroButtonSecondary)} to={home.hero.primaryButton.to}>
              查看 AI 快讯
            </Link>
          </div>
          <div className={styles.signalStrip} aria-label="SpaceSeek content signals">
            <span>AI Radar</span>
            <span>Codex Guide</span>
            <span>Tool Atlas</span>
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="SpaceSeek universe map">
          <div className={styles.orbitSystem}>
            <div className={styles.orbitScan} aria-hidden="true" />
            <div className={clsx(styles.orbitConnector, styles.orbitConnectorNews)} aria-hidden="true" />
            <div className={clsx(styles.orbitConnector, styles.orbitConnectorCodex)} aria-hidden="true" />
            <div className={clsx(styles.orbitConnector, styles.orbitConnectorTools)} aria-hidden="true" />
            <div className={styles.orbitCore}>
              <img src="/img/brand-spaceseek.png" alt="" aria-hidden="true" />
              <span>SpaceSeek</span>
            </div>
            <div className={clsx(styles.orbitNode, styles.orbitNodeNews)}>News</div>
            <div className={clsx(styles.orbitNode, styles.orbitNodeCodex)}>Codex</div>
            <div className={clsx(styles.orbitNode, styles.orbitNodeTools)}>Tools</div>
          </div>
          <div className={styles.heroPanel}>
            <div className={styles.heroStatCard}>
              <strong>Mission Control</strong>
              <span>围绕最新 AI 动态、技术教程和工具索引构建首页导航中枢。</span>
            </div>
            {home.hero.stats.map((stat) => (
              <div className={styles.heroStatRow} key={`${stat.value}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {data: home, loading, error} = useRemoteData(() => getHomeData(), []);
  const displayHome = withLatestTutorials(home ?? localHomeData);

  return (
    <Layout title={`${siteConfig.title}`} description="聚合全网 AI 快讯、技术教程与 AI 工具集的首页">
      <HomepageHeader home={displayHome} />
      <main>
        {loading && !home ? (
          <RemoteContentState
            loading
            error={null}
            empty={false}
            emptyTitle="首页数据加载中"
            emptyDescription="正在从内容接口获取首页数据。"
          />
        ) : null}
        {error && !home ? (
          <RemoteContentState
            loading={false}
            error={null}
            empty
            emptyTitle="首页已切换为本地数据"
            emptyDescription="接口暂时不可用，当前展示的是项目内置首页内容。"
          />
        ) : null}
        <HomepageFeatures home={displayHome} />
      </main>
    </Layout>
  );
}
