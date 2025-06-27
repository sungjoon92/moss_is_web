import axios from "@/lib/axios";
import { PaginationParams, SolutionCreateInput, SolutionType } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createSolution = (data: SolutionCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);
  return axios.post("/solution", payload, { withCredentials: true });
};

// 전체 리스트 조회용
export const getSolutions = ({
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

  return axios.get(`/solution?${params.toString()}`, {
    withCredentials: true,
  });
};

// 단일 아이템 조회용
export const getSolution = (id: number) => {
  return axios.get(`/solution`, { data: { id }, withCredentials: true });
};
// 수정
export const updateSolution = (id: number, data: Partial<SolutionType>) => {
  const payload = toSnakeCase(data);
  return axios.patch(
    `/solution`,
    { id, ...payload },
    { withCredentials: true }
  );
};

// 삭제
export const deleteSolution = (id: number) => {
  return axios.delete(`/solution`, { data: { id }, withCredentials: true });
};
