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
  createdAt: string;
  updatedAt: string;
}
export type SolutionCreateInput = Omit<SolutionType, "id">;

export interface ProjectType {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  contentTitle: string;
  contentText: string;
  contentImages: string[];
  createdAt: string;
  updatedAt: string;
}
export type ProjectCreateInput = Omit<ProjectType, "id">;

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
  createdAt: string;
  updatedAt: string;
}
export type NewsCreateInput = Omit<NewsType, "id">;

export interface AdminCategoryType {
  id: number;
  name: string;
  path: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface ListProps<T> {
  data: T[];
  onDelete: (id: number) => void;
  page: number;
  onPageChange: (newPage: number) => void;
  sort: string;
  order: "asc" | "desc";
  onSortChange: (field: string) => void;
  onOrderChange: (order: "asc" | "desc") => void;
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
