import {
  newsItems,
  type NewsItem,
} from '@site/src/data/newsItems';
import type {ContentListItem, NewsDetailItem} from '@site/src/data/contentModels';

function buildPublishedLabel(item: NewsItem) {
  return `${item.month}${item.day}日 ${item.time}`;
}

function adaptNewsListItem(item: NewsItem): ContentListItem {
  return {
    id: item.id,
    kind: 'news',
    title: item.title,
    summary: item.excerpt,
    categories: item.categories,
    path: item.href,
    publishedLabel: buildPublishedLabel(item),
    sourceName: item.source,
  };
}

function adaptNewsDetailItem(item: NewsItem): NewsDetailItem {
  return {
    id: item.id,
    kind: 'news',
    title: item.title,
    summary: item.excerpt,
    categories: item.categories,
    path: item.href,
    publishedLabel: buildPublishedLabel(item),
    sourceName: item.source,
    body: item.detail,
    keyFacts: item.keyFacts,
    timeline: item.timeline,
    sourceLinks: item.sourceLinks,
    relatedLinks: item.relatedLinks,
  };
}

export function getNewsListItems(): ContentListItem[] {
  return newsItems.map(adaptNewsListItem);
}

export function getNewsDetailItemById(id: string | null | undefined) {
  if (!id) {
    return undefined;
  }

  const item = newsItems.find((newsItem) => newsItem.id === id);
  return item ? adaptNewsDetailItem(item) : undefined;
}

