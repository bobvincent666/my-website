import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>AI 资讯与实战内容聚合站</p>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/news">
              查看全网AI快讯
            </Link>
            <Link className="button button--secondary button--lg" to="/tutorials">
              浏览技术教程
            </Link>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.heroStatCard}>
            <strong>每日精选</strong>
            <span>覆盖产品动态、模型进展、开发实践与工具清单。</span>
          </div>
          <div className={styles.heroStatGrid}>
            <div>
              <strong>24h</strong>
              <span>热门快讯</span>
            </div>
            <div>
              <strong>专题</strong>
              <span>技术教程</span>
            </div>
            <div>
              <strong>精选</strong>
              <span>AI工具集</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.title}`} description="聚合全网 AI 快讯、技术教程与 AI 工具集的首页">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
