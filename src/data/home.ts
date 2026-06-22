import homeData from './home.json';

export type HomeTone = 'orange' | 'blue' | 'dark' | 'gold' | 'violet';

export type HomeHeroStat = {
  value: string;
  label: string;
};

export type HomeHeroData = {
  kicker: string;
  primaryButton: {
    label: string;
    to: string;
  };
  secondaryButton: {
    label: string;
    to: string;
  };
  statCard: {
    title: string;
    description: string;
  };
  stats: HomeHeroStat[];
};

export type HomeListItem = {
  id: string;
  kind: 'news' | 'tutorial' | 'tool';
  title: string;
  summary: string;
  path: string;
  routePath?: string;
  categories: string[];
  sourceName?: string;
  publishedLabel?: string;
  coverImage?: string;
  tone?: HomeTone;
  logoText?: string;
  logo?: string;
};

export type HomeSection = {
  id: string;
  kind: 'news' | 'tutorial' | 'tool';
  title: string;
  moreTo: string;
  moreLabel: string;
  items: HomeListItem[];
};

export type HomeData = {
  hero: HomeHeroData;
  sections: {
    news: HomeSection;
    tutorials: HomeSection;
    tools: HomeSection;
  };
};

export const home = homeData as HomeData;
