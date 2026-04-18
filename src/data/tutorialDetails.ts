import tutorialDetails from './tutorialDetailsItem.json';

export type TutorialDetailSubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
};

export type TutorialDetailSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
  subsections?: TutorialDetailSubsection[];
};

export type TutorialReference = {
  label: string;
  url: string;
};

export type TutorialDetailItem = {
  id: string;
  path: string;
  title: string;
  description: string;
  date: string;
  categories: string[];
  image: string;
  tone: 'violet' | 'blue' | 'orange';
  overview: string;
  sections: TutorialDetailSection[];
  references?: TutorialReference[];
};

export const tutorialDetailItems = tutorialDetails as TutorialDetailItem[];

export function getTutorialDetailByPath(path: string) {
  return tutorialDetailItems.find((item) => item.path === path);
}
