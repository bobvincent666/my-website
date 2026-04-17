import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {newsItems} from '@site/src/data/newsItems';
import styles from './styles.module.css';

export default function NewsFeedPage(): ReactNode {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span>/</span>
          <span>全部AI快讯</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroOverlay}>
            <div>
              <p className={styles.heroKicker}>快讯</p>
              <Heading as="h1" className={styles.heroTitle}>
                最新 AI 行业动向日报
              </Heading>
              <p className={styles.heroDesc}>2025 全球人工智能最新动态与趋势解读</p>
            </div>
            {/* <span className={styles.heroAction}>我要爆料</span> */}
          </div>
        </div>

        <div className={styles.list}>
          {newsItems.map((item) => (
            <Link
              key={item.id}
              className={styles.itemLink}
              to={item.href}
              aria-label={`查看新闻详情：${item.title}`}
            >
              <article className={styles.item}>
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
                    <span>{`作者：${item.source}`}</span>
                  </div>
                  <p className={styles.excerpt}>{item.excerpt}</p>
                  <div className={styles.footer}>
                    <span>点击查看详情</span>
                    <span>★</span>
                    <span>◎</span>
                    <span>→</span>
                  </div>
                </div>
                {item.withThumb ? <div className={styles.thumb} /> : null}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
