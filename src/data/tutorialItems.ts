import tutorialItemsData from './tutorialItems.json';

export type TutorialItem = {
  id: string;
  path: string;
  link: string;
  title: string;
  description: string;
  categories: string[];
  date: string;
  image: string;
  tone: 'violet' | 'blue' | 'orange';
};

type TutorialItemsData = {
  featuredTutorialItem: TutorialItem;
  tutorialItems: TutorialItem[];
};

const {featuredTutorialItem, tutorialItems} = tutorialItemsData as TutorialItemsData;

export {featuredTutorialItem, tutorialItems};

export function getTutorialItemByLink(link: string) {
  return tutorialItems.find((item) => item.link === link || item.path === link);
}

export function getTutorialItemById(id: string) {
  return tutorialItems.find((item) => item.id === id);
}

export function getTutorialItemByPath(path: string) {
  return tutorialItems.find((item) => item.path === path || item.link === path);
}
