import axios from "@/lib/axios";
import { NewsCreateInput, NewsType, PaginationParams } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createNews = (data: NewsCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);
  return axios.post("/news", payload, { withCredentials: true });
};

// 전체 리스트 조회용
export const getNewsList = ({
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "desc",
}: PaginationParams = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    order,
  });
  return axios.get(`/news?${params.toString()}`, { withCredentials: true });
};

// 단일 아이템 조회용
export const getNews = (id: number | string) => {
  return axios.get(`/news`, { data: { id }, withCredentials: true });
};

// 수정
export const updateNews = (id: number | string, data: Partial<NewsType>) => {
  const payload = toSnakeCase(data) as NewsCreateInput;
  return axios.patch(`/news`, { id, ...payload }, { withCredentials: true });
};

// 삭제
export const deleteNews = (id: number) => {
  return axios.delete(`/news`, { data: { id }, withCredentials: true });
};
