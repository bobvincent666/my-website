import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Heading from '@theme/Heading';
import NewsDetailPageComponent from '@site/src/components/NewsDetailPage';
import {getNewsItemById} from '@site/src/data/newsItems';
import styles from '@site/src/components/NewsDetailPage/styles.module.css';

function NewsDetailFallback(): ReactNode {
  return (
    <NewsDetailPageComponent
      title="未找到新闻详情"
      description="当前新闻参数不存在或已失效。"
      date="请返回列表页重试"
      categories={['全网AI快讯']}
      heroTone="blue"
    >
      <p>当前新闻内容没有找到，可能是跳转参数缺失或对应数据已经调整。</p>
      <p>
        <Link to="/news">返回全网AI快讯</Link>
      </p>
    </NewsDetailPageComponent>
  );
}

export default function NewsDetailPage(): ReactNode {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const item = getNewsItemById(params.get('id'));

  if (!item) {
    return <NewsDetailFallback />;
  }

  return (
    <NewsDetailPageComponent
      title={item.title}
      description={item.excerpt}
      date={`${item.month}${item.day}日 ${item.time}`}
      categories={item.categories}
      heroTone="blue"
      sidebar={
        <>
          {item.keyFacts?.length ? (
            <section className={styles.infoCard}>
              <Heading as="h2" className={styles.infoCardTitle}>
                关键信息
              </Heading>
              <div className={styles.factList}>
                {item.keyFacts.map((fact) => (
                  <div key={`${fact.label}-${fact.value}`} className={styles.factItem}>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <div className={styles.factValue}>{fact.value}</div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {item.sourceLinks?.length ? (
            <section className={styles.infoCard}>
              <Heading as="h2" className={styles.infoCardTitle}>
                来源链接
              </Heading>
              <ul className={styles.linkList}>
                {item.sourceLinks.map((link) => (
                  <li key={`${link.label}-${link.url}`} className={styles.linkItem}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      <span className={styles.linkLabel}>{link.label}</span>
                      <span className={styles.linkUrl}>{link.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      }
    >
      <section className={styles.contentSection}>
        <Heading as="h2" className={styles.sectionTitle}>
          核心摘要
        </Heading>
        <p>{item.excerpt}</p>
        <p>来源：{item.source}</p>
      </section>

      <section className={styles.contentSection}>
        <Heading as="h2" className={styles.sectionTitle}>
          详细解读
        </Heading>
        {item.detail.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {item.timeline?.length ? (
        <section className={styles.contentSection}>
          <Heading as="h2" className={styles.sectionTitle}>
            事件时间线
          </Heading>
          <div className={styles.timeline}>
            {item.timeline.map((timelineItem) => (
              <article
                key={`${timelineItem.date}-${timelineItem.title}`}
                className={styles.timelineItem}
              >
                <span className={styles.timelineDate}>{timelineItem.date}</span>
                <h3 className={styles.timelineItemTitle}>{timelineItem.title}</h3>
                <p className={styles.timelineItemDesc}>{timelineItem.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {item.relatedLinks?.length ? (
        <section className={styles.contentSection}>
          <Heading as="h2" className={styles.sectionTitle}>
            延伸阅读
          </Heading>
          <ul className={styles.linkList}>
            {item.relatedLinks.map((link) => (
              <li key={`${link.label}-${link.url}`} className={styles.linkItem}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkUrl}>{link.url}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className={styles.contentSection}>
        <p>
          <Link to="/news">返回全网AI快讯</Link>
        </p>
      </section>
    </NewsDetailPageComponent>
  );
}
