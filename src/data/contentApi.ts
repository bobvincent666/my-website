import {home as localHomeData, type HomeData, type HomeSection} from '@site/src/data/home';
import {
  getFeaturedTutorialListItem,
  getTutorialListItems,
} from '@site/src/data/adapters/tutorialAdapter';
import {
  getToolDetailItemById,
  getToolCardMap,
  getToolListSections as getLocalToolListSections,
} from '@site/src/data/adapters/toolAdapter';
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

const TUTORIAL_COVER_OVERRIDES: Record<string, string> = {
  '/tutorials/codex01': '/codex-guide/images/codex002.png',
  '/tutorials/codex02': '/codex-guide/images/codex003.png',
  '/tutorials/claudecode': '/codex-guide/images/claudecode.png',
};

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

function getTutorialPathKey(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value.startsWith('/tutorials/article')) {
    const query = value.split('?')[1];
    const articlePath = query ? new URLSearchParams(query).get('path') : undefined;
    return articlePath ?? value;
  }

  return value;
}

function getTutorialCoverOverride(item: Pick<ContentListItem, 'id' | 'path' | 'routePath'>) {
  const pathKeys = [
    getTutorialPathKey(item.path),
    getTutorialPathKey(item.routePath),
    item.id.startsWith('tutorial-') ? `/tutorials/${item.id.replace(/^tutorial-/, '')}` : undefined,
    item.id.startsWith('/tutorials/') ? item.id : undefined,
  ];

  return pathKeys.reduce<string | undefined>(
    (coverImage, pathKey) => coverImage ?? (pathKey ? TUTORIAL_COVER_OVERRIDES[pathKey] : undefined),
    undefined,
  );
}

function resolveHomeNewsCoverImage(index: number): string {
  return HOME_NEWS_IMAGE_POOL[index % HOME_NEWS_IMAGE_POOL.length];
}

function normalizeContentListItem(item: ContentListItem): ContentListItem {
  const tutorialCoverOverride =
    item.kind === 'tutorial' ? getTutorialCoverOverride(item) : undefined;

  return {
    ...item,
    coverImage: normalizeAssetUrl(tutorialCoverOverride ?? item.coverImage),
  };
}

function normalizeTutorialDetailItem(item: TutorialDetailItem | null): TutorialDetailItem | null {
  if (!item) {
    return null;
  }

  return {
    ...item,
    coverImage: normalizeAssetUrl(TUTORIAL_COVER_OVERRIDES[item.path] ?? item.coverImage),
  };
}

const HOME_TOOL_ID_ALIASES: Record<string, string> = {
  yiyan: 'ernie-bot',
};

function resolveHomeToolId(id: string): string {
  const normalizedId = id.replace(/^home-tool-/, '');
  return HOME_TOOL_ID_ALIASES[normalizedId] ?? normalizedId;
}

function normalizeToolListData(data: ToolListResponse): ToolListResponse {
  const localToolCardMap = getToolCardMap();

  return {
    ...data,
    sections: data.sections.map((section) => ({
      ...section,
      items: section.items.map((item) => {
        const localTool = localToolCardMap.get(item.id);
        return {
          ...item,
          logo: normalizeAssetUrl(item.logo ?? localTool?.logo),
          logoText: item.logoText ?? localTool?.logoText,
          tone: item.tone ?? localTool?.tone,
        };
      }),
    })),
  };
}

function normalizeToolDetailItem(item: ToolDetailItem | null): ToolDetailItem | null {
  if (!item) {
    return null;
  }

  const localTool = getToolDetailItemById(item.id);
  return {
    ...item,
    logo: normalizeAssetUrl(item.logo ?? localTool?.logo),
    logoText: item.logoText ?? localTool?.logoText,
    tone: item.tone ?? localTool?.tone,
  };
}

function normalizeHomeSection(section: HomeSection, fallbackSection?: HomeSection): HomeSection {
  const localToolCardMap = section.id === 'home-tools' ? getToolCardMap() : undefined;

  return {
    ...section,
    items: section.items.map((item, index) => ({
      ...item,
      coverImage:
        section.id === 'home-news'
          ? resolveHomeNewsCoverImage(index)
          : normalizeAssetUrl(item.coverImage ?? fallbackSection?.items[index]?.coverImage),
      logo:
        section.id === 'home-tools'
          ? normalizeAssetUrl(
              item.logo ??
                localToolCardMap?.get(resolveHomeToolId(item.id))?.logo ??
                fallbackSection?.items[index]?.logo,
            )
          : normalizeAssetUrl(item.logo ?? fallbackSection?.items[index]?.logo),
      logoText:
        section.id === 'home-tools'
          ? (item.logoText ??
            localToolCardMap?.get(resolveHomeToolId(item.id))?.logoText ??
            fallbackSection?.items[index]?.logoText)
          : item.logoText,
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
  return requestContent<TutorialListResponse>('/tutorials')
    .then((data) => ({
      ...data,
      featuredItem: normalizeContentListItem(data.featuredItem),
      items: data.items.map(normalizeContentListItem),
    }))
    .catch(() => {
      const featuredItem = normalizeContentListItem(getFeaturedTutorialListItem());
      const items = getTutorialListItems().map(normalizeContentListItem);
      return {
        featuredItem,
        items,
        total: items.length,
      };
    });
}

export function getTutorialDetailData(path: string): Promise<TutorialDetailItem | null> {
  return requestContent<TutorialDetailItem | null>(
    `/tutorials/detail?path=${encodeURIComponent(path)}`,
  ).then(normalizeTutorialDetailItem);
}

export function getToolListData(): Promise<ToolListResponse> {
  return requestContent<ToolListResponse>('/tools')
    .then(normalizeToolListData)
    .catch(() => {
      const sections = getLocalToolListSections();
      return {
        sections,
        total: sections.reduce((count, section) => count + section.items.length, 0),
      };
    });
}

export function getToolDetailData(id: string): Promise<ToolDetailItem | null> {
  return requestContent<ToolDetailItem | null>(`/tools/${encodeURIComponent(id)}`)
    .then(normalizeToolDetailItem)
    .catch(() => getToolDetailItemById(id) ?? null);
}
