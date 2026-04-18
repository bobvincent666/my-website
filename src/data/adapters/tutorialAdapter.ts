import {
  featuredTutorialItem,
  tutorialItems,
  type TutorialItem,
} from '@site/src/data/tutorialItems';
import {
  tutorialDetailItems,
  type TutorialDetailItem as LegacyTutorialDetailItem,
} from '@site/src/data/tutorialDetails';
import type {
  ContentListItem,
  TutorialDetailItem,
} from '@site/src/data/contentModels';

function adaptTutorialListItem(item: TutorialItem): ContentListItem {
  return {
    id: item.link,
    kind: 'tutorial',
    title: item.title,
    summary: item.description,
    categories: item.categories,
    path: item.link,
    publishedLabel: item.date,
    coverImage: item.image,
    tone: item.tone,
  };
}

function adaptTutorialDetailItem(item: LegacyTutorialDetailItem): TutorialDetailItem {
  return {
    id: item.id,
    kind: 'tutorial',
    title: item.title,
    summary: item.description,
    categories: item.categories,
    path: item.path,
    publishedLabel: item.date,
    coverImage: item.image,
    tone: item.tone,
    overview: item.overview,
    sections: item.sections,
    references: item.references,
  };
}

export function getFeaturedTutorialListItem(): ContentListItem {
  return adaptTutorialListItem(featuredTutorialItem);
}

export function getTutorialListItems(): ContentListItem[] {
  return tutorialItems.map(adaptTutorialListItem);
}

export function getTutorialListItemByPath(path: string) {
  const item = tutorialItems.find((tutorialItem) => tutorialItem.link === path);
  return item ? adaptTutorialListItem(item) : undefined;
}

export function getTutorialDetailItemByPath(path: string) {
  const item = tutorialDetailItems.find((tutorialItem) => tutorialItem.path === path);
  return item ? adaptTutorialDetailItem(item) : undefined;
}

