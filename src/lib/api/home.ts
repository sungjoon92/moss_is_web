import axios from "@/lib/axios";
import { PaginationParams, HomeCreateInput, HomeType } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createHome = (data: HomeCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);
  return axios.post("/home", payload, { withCredentials: true });
};

// 단일  조회
export const getHome = (id: number) => {
  return axios.get(`/home/${id}`, { withCredentials: true });
};

// 전체 리스트 조회용
export const getHomeList = ({
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

  return axios.get(`/home?${params.toString()}`, {
    withCredentials: true,
  });
};

// 수정
export const updateHome = (id: number, data: Partial<HomeType>) => {
  const payload = toSnakeCase(data);
  return axios.patch(`/home`, { id, ...payload }, { withCredentials: true });
};

// 삭제
export const deleteHome = (id: number) => {
  return axios.delete(`/home`, { data: { id }, withCredentials: true });
};
