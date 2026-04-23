import type {HomeData} from '@site/src/data/home';
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

// const API_BASE_URL = 'http://localhost:5240';
// const CONTENT_API_PREFIX = `${API_BASE_URL}/api/content`;

// 生产
const API_BASE_URL = '';
//测试
// const API_BASE_URL = 'http://spaceseek.tech';

const CONTENT_API_PREFIX = `${API_BASE_URL}/api/content`;

async function requestContent<T>(path: string): Promise<T> {
  const response = await fetch(`${CONTENT_API_PREFIX}${path}`);
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
  return requestContent<HomeData>('/home');
}

export function getNewsListData(): Promise<NewsListResponse> {
  return requestContent<NewsListResponse>('/news');
}

export function getNewsDetailData(id: string): Promise<NewsDetailItem | null> {
  return requestContent<NewsDetailItem | null>(`/news/${encodeURIComponent(id)}`);
}

export function getTutorialListData(): Promise<TutorialListResponse> {
  return requestContent<TutorialListResponse>('/tutorials');
}

export function getTutorialDetailData(path: string): Promise<TutorialDetailItem | null> {
  return requestContent<TutorialDetailItem | null>(
    `/tutorials/detail?path=${encodeURIComponent(path)}`,
  );
}

export function getToolListData(): Promise<ToolListResponse> {
  return requestContent<ToolListResponse>('/tools');
}

export function getToolDetailData(id: string): Promise<ToolDetailItem | null> {
  return requestContent<ToolDetailItem | null>(`/tools/${encodeURIComponent(id)}`);
}
