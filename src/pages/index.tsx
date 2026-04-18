import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {home} from '@site/src/data/home';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{home.hero.kicker}</p>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to={home.hero.primaryButton.to}>
              {home.hero.primaryButton.label}
            </Link>
            <Link className="button button--secondary button--lg" to={home.hero.secondaryButton.to}>
              {home.hero.secondaryButton.label}
            </Link>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.heroStatCard}>
            <strong>{home.hero.statCard.title}</strong>
            <span>{home.hero.statCard.description}</span>
          </div>
          <div className={styles.heroStatGrid}>
            {home.hero.stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`}>
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

  return (
    <Layout title={`${siteConfig.title}`} description="聚合全网 AI 快讯、技术教程与 AI 工具集的首页">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
