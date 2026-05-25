export type ContentKind = 'news' | 'tutorial' | 'tool';

export type ContentTone = 'violet' | 'blue' | 'orange' | 'green' | 'dark' | 'pink' | 'red';

export type ContentLink = {
  label: string;
  url: string;
};

export type ContentFact = {
  label: string;
  value: string;
};

export type ContentTimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type ContentSectionBlock = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: string[];
  subsections?: ContentSectionBlock[];
};

export type ContentListItem = {
  id: string;
  kind: ContentKind;
  title: string;
  summary: string;
  categories: string[];
  path: string;
  routePath?: string;
  publishedAt?: string;
  publishedLabel?: string;
  dateParts?: {
    month?: string;
    day?: string;
    time?: string;
  };
  sourceName?: string;
  coverImage?: string;
  tone?: ContentTone;
  logoText?: string;
};

export type NewsDetailItem = {
  id: string;
  kind: 'news';
  title: string;
  summary: string;
  categories: string[];
  path: string;
  publishedAt?: string;
  publishedLabel?: string;
  sourceName: string;
  body: string[];
  keyFacts?: ContentFact[];
  timeline?: ContentTimelineItem[];
  sourceLinks?: ContentLink[];
  relatedLinks?: ContentLink[];
};

export type TutorialDetailItem = {
  id: string;
  kind: 'tutorial';
  title: string;
  summary: string;
  categories: string[];
  path: string;
  contentType?: 'structured' | 'markdown';
  publishedAt?: string;
  publishedLabel?: string;
  coverImage?: string;
  tone?: ContentTone;
  overview?: string;
  sections: ContentSectionBlock[];
  markdownContent?: string;
  references?: ContentLink[];
};

export type ToolDetailItem = {
  id: string;
  kind: 'tool';
  title: string;
  summary: string;
  categories: string[];
  path: string;
  categoryId: string;
  categoryName: string;
  subtitle: string;
  description: string;
  highlights: string[];
  website: string;
  likes: number;
  logoText: string;
  tone: ContentTone;
};
