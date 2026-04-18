import {
  getToolsByCategory,
  toolCategories,
  toolItems,
  type ToolCategory,
  type ToolItem,
} from '@site/src/data/toolItems';
import type {
  ContentListItem,
  ToolDetailItem,
} from '@site/src/data/contentModels';

export type ToolListSection = ToolCategory & {
  items: ContentListItem[];
};

function buildToolDetailPath(id: string) {
  return `/tools/detail?id=${encodeURIComponent(id)}`;
}

function adaptToolListItem(item: ToolItem): ContentListItem {
  return {
    id: item.id,
    kind: 'tool',
    title: item.name,
    summary: item.subtitle,
    categories: [item.categoryName],
    path: buildToolDetailPath(item.id),
    tone: item.tone,
  };
}

function adaptToolDetailItem(item: ToolItem): ToolDetailItem {
  return {
    id: item.id,
    kind: 'tool',
    title: item.name,
    summary: item.summary,
    categories: [item.categoryName],
    path: buildToolDetailPath(item.id),
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    subtitle: item.subtitle,
    description: item.description,
    highlights: item.highlights,
    website: item.url,
    likes: item.likes,
    logoText: item.logoText,
    tone: item.tone,
  };
}

export function getToolListSections(): ToolListSection[] {
  return toolCategories.map((category) => ({
    ...category,
    items: getToolsByCategory(category.id).map(adaptToolListItem),
  }));
}

export function getToolCardMap() {
  return new Map(
    toolItems.map((item) => [
      item.id,
      {
        subtitle: item.subtitle,
        likes: item.likes,
        logoText: item.logoText,
        tone: item.tone,
      },
    ]),
  );
}

export function getToolDetailItemById(id: string | null | undefined) {
  if (!id) {
    return undefined;
  }

  const item = toolItems.find((toolItem) => toolItem.id === id);
  return item ? adaptToolDetailItem(item) : undefined;
}

