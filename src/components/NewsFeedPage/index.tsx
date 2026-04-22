import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import type {ContentListItem} from '@site/src/data/contentModels';
import styles from './styles.module.css';

export default function NewsFeedPage({items}: {items: ContentListItem[]}): ReactNode {
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
                最新 AI 行业动态日报
              </Heading>
              <p className={styles.heroDesc}>聚合最新的 AI 行业变化、产品更新与趋势观察</p>
            </div>
          </div>
        </div>

        <div className={styles.list}>
          {items.map((item) => (
            <Link
              key={item.id}
              className={styles.itemLink}
              to={item.path}
              aria-label={`查看新闻详情：${item.title}`}
            >
              <article className={styles.item}>
                <div className={styles.date}>
                  <span className={styles.month}>{item.categories[0] ?? 'AI快讯'}</span>
                  <strong className={styles.day}>{item.publishedLabel ?? '--'}</strong>
                </div>
                <div className={styles.main}>
                  <Heading as="h2" className={styles.title}>
                    {item.title}
                  </Heading>
                  <div className={styles.meta}>
                    <span>{item.publishedLabel ?? '最新更新'}</span>
                    <span>{`来源：${item.sourceName ?? '站点编辑部'}`}</span>
                  </div>
                  <p className={styles.excerpt}>{item.summary}</p>
                  <div className={styles.footer}>
                    <span>点击查看详情</span>
                    <span>•</span>
                    <span>{item.kind}</span>
                    <span>→</span>
                  </div>
                </div>
                {item.coverImage ? <div className={styles.thumb} /> : null}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
