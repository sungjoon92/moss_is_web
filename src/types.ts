export interface IMenuItem {
  text: string;
  url: string;
}
export interface SampleData {
  imageUrl: string;
  description: string;
}

export interface HistoryType {
  year: number;
  title: string;
  descriptions: string[];
  highlights?: string[];
}

export interface AwardsType {
  year: number;
  items: string[];
  highlight?: boolean;
}

export interface SolutionType {
  categoryTag: string;
  category: string;
  title: string;
  content: string;
  imageUrl: string;
  link: string;
}

export interface ProjectType {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  link: string;
  imageUrl: string;
  contentTitle?: string;
  contentText?: string;
  contentImages?: string[];
}

export interface NewsType {
  id: number;
  category: string;
  title: string;
  content: string;
  date: string;
  link: string;
  pageUrl: string;
  imageUrl: string;
  videoUrl: string;
  isMainNews?: boolean;
}

export interface AdminCategory {
  name: string;
  key: string;
  children?: string[];
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}
