export interface IMenuItem {
  text: string;
  url: string;
}
export interface SampleData {
  imageUrl: string;
  description: string;
}

export interface HistoryType {
  id: number;
  year: number;
  title: string;
  descriptions: string[];
  highlights?: string[];
}

export interface AwardsType {
  id: number;
  year: number;
  items: string[];
  highlight?: boolean;
}

export interface SolutionType {
  id: number;
  categoryTag: string;
  category: string;
  title: string;
  content: string;
  imageUrl: string;
  link: string;
}
// 솔루션 생성 시 사용하는 타입 (id 제외)
export type SolutionCreateInput = Omit<SolutionType, "id">;

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
  id: number;
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
