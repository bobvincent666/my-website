import {home as localHomeData, type HomeData, type HomeSection} from '@site/src/data/home';
import type {
  ContentListItem,
  NewsDetailItem,
  ToolDetailItem,
  TutorialDetailItem,
} from '@site/src/data/contentModels';

export type NewsListResponse = {
  items: ContentListItem[];
  total: number;
};

export type TutorialListResponse = {
  featuredItem: ContentListItem;
  items: ContentListItem[];
  total: number;
};

export type ToolListSection = {
  id: string;
  name: string;
  shortTabs?: string[];
  items: ContentListItem[];
};

export type ToolListResponse = {
  sections: ToolListSection[];
  total: number;
};

const HOME_NEWS_IMAGE_POOL = Array.from({length: 10}, (_, index) => `/img/news${index + 1}.png`);

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://localhost:5240';
  }

  const {hostname} = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5240';
  }

  return '';
}

function getContentApiPrefix(): string {
  return `${getApiBaseUrl()}/api/content`;
}

function normalizeAssetUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) {
    return value;
  }

  if (value.startsWith('/uploads/')) {
    return `${getApiBaseUrl()}${value}`;
  }

  return value;
}

function resolveHomeNewsCoverImage(index: number): string {
  return HOME_NEWS_IMAGE_POOL[index % HOME_NEWS_IMAGE_POOL.length];
}

function normalizeContentListItem(item: ContentListItem): ContentListItem {
  return {
    ...item,
    coverImage: normalizeAssetUrl(item.coverImage),
  };
}

function normalizeTutorialDetailItem(item: TutorialDetailItem | null): TutorialDetailItem | null {
  if (!item) {
    return null;
  }

  return {
    ...item,
    coverImage: normalizeAssetUrl(item.coverImage),
  };
}

function normalizeHomeSection(section: HomeSection, fallbackSection?: HomeSection): HomeSection {
  return {
    ...section,
    items: section.items.map((item, index) => ({
      ...item,
      coverImage:
        section.id === 'home-news'
          ? resolveHomeNewsCoverImage(index)
          : normalizeAssetUrl(item.coverImage ?? fallbackSection?.items[index]?.coverImage),
    })),
  };
}

function normalizeHomeData(data: HomeData): HomeData {
  return {
    ...data,
    sections: {
      news: normalizeHomeSection(data.sections.news, localHomeData.sections.news),
      tutorials: normalizeHomeSection(data.sections.tutorials, localHomeData.sections.tutorials),
      tools: normalizeHomeSection(data.sections.tools, localHomeData.sections.tools),
    },
  };
}

async function requestContent<T>(path: string): Promise<T> {
  const response = await fetch(`${getContentApiPrefix()}${path}`);
  if (!response.ok) {
    throw new Error(`Content request failed with status ${response.status}`);
  }

  const result = await response.json();
  if (result?.code !== 200) {
    throw new Error(result?.message ?? 'Content request failed');
  }

  return result.data as T;
}

export function getHomeData(): Promise<HomeData> {
  return requestContent<HomeData>('/home').then(normalizeHomeData);
}

export function getNewsListData(): Promise<NewsListResponse> {
  return requestContent<NewsListResponse>('/news');
}

export function getNewsDetailData(id: string): Promise<NewsDetailItem | null> {
  return requestContent<NewsDetailItem | null>(`/news/${encodeURIComponent(id)}`);
}

export function getTutorialListData(): Promise<TutorialListResponse> {
  return requestContent<TutorialListResponse>('/tutorials').then((data) => ({
    ...data,
    featuredItem: normalizeContentListItem(data.featuredItem),
    items: data.items.map(normalizeContentListItem),
  }));
}

export function getTutorialDetailData(path: string): Promise<TutorialDetailItem | null> {
  return requestContent<TutorialDetailItem | null>(
    `/tutorials/detail?path=${encodeURIComponent(path)}`,
  ).then(normalizeTutorialDetailItem);
}

export function getToolListData(): Promise<ToolListResponse> {
  return requestContent<ToolListResponse>('/tools');
}

export function getToolDetailData(id: string): Promise<ToolDetailItem | null> {
  return requestContent<ToolDetailItem | null>(`/tools/${encodeURIComponent(id)}`);
}
