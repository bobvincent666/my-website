import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {getNewsListItems} from '@site/src/data/adapters/newsAdapter';
import type {ContentListItem} from '@site/src/data/contentModels';
import styles from './styles.module.css';

type NewsFeedPageProps = {
  items?: ContentListItem[];
};

export default function NewsFeedPage({items}: NewsFeedPageProps): ReactNode {
  const resolvedItems = items ?? getNewsListItems();

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span>/</span>
          <span>全部 AI 快讯</span>
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
          {resolvedItems.map((item) => {
            const dateCard = getNewsDateCard(item);

            return (
              <Link key={item.id} className={styles.itemLink} to={item.path} aria-label={item.title}>
                <article className={styles.item}>
                  <div className={styles.date}>
                    <span className={styles.month}>{dateCard.monthLabel}</span>
                    <strong className={styles.day}>{dateCard.dayLabel}</strong>
                  </div>
                  <div className={styles.main}>
                    <Heading as="h2" className={styles.title}>
                      {item.title}
                    </Heading>
                    <div className={styles.meta}>
                      <span>{dateCard.fullLabel}</span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getNewsDateCard(item: ContentListItem) {
  const parsedDate = parseNewsDate(item.publishedAt) ?? parseNewsDate(item.publishedLabel);
  if (parsedDate) {
    return {
      monthLabel: `${parsedDate.year}年${parsedDate.month}月`,
      dayLabel: `${parsedDate.day}日`,
      fullLabel: `${parsedDate.year}年${parsedDate.month}月${parsedDate.day}日`,
    };
  }

  const monthLabel = normalizeMonthLabel(item.dateParts?.month) ?? '日期';
  const dayLabel = normalizeDayLabel(item.dateParts?.day) ?? '--';
  return {
    monthLabel,
    dayLabel,
    fullLabel: `${monthLabel}${dayLabel}`,
  };
}

function parseNewsDate(value?: string) {
  if (!value) {
    return null;
  }

  const isoMatch = value.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (isoMatch) {
    return {
      year: isoMatch[1],
      month: String(Number(isoMatch[2])),
      day: String(Number(isoMatch[3])),
    };
  }

  const cnMatch = value.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日?/);
  if (cnMatch) {
    return {
      year: cnMatch[1],
      month: String(Number(cnMatch[2])),
      day: String(Number(cnMatch[3])),
    };
  }

  return null;
}

function normalizeMonthLabel(value?: string) {
  if (!value) {
    return undefined;
  }

  const cleaned = value.trim();
  const yearMonthMatch = cleaned.match(/(\d{4})[-/.年]\s*(\d{1,2})/);
  if (yearMonthMatch) {
    return `${yearMonthMatch[1]}年${Number(yearMonthMatch[2])}月`;
  }

  const monthMatch = cleaned.match(/(\d{1,2})/);
  if (monthMatch) {
    return `${Number(monthMatch[1])}月`;
  }

  return cleaned;
}

function normalizeDayLabel(value?: string) {
  if (!value) {
    return undefined;
  }

  const dayMatch = value.trim().match(/(\d{1,2})/);
  return dayMatch ? `${Number(dayMatch[1])}日` : value.trim();
}
