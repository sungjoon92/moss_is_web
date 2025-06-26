import axios from "@/lib/axios";
import { SolutionCreateInput, SolutionType } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";

// 생성
export const createSolution = (data: SolutionCreateInput) => {
  const payload = toSnakeCase(data);
  return axios.post("/solution", payload, { withCredentials: true });
};

// 전체 리스트 조회용
export const getSolutions = () => {
  return axios.get("/solution", { withCredentials: true });
};

// 단일 아이템 조회용
export const getSolution = (id: number | string) => {
  return axios.get(`/solution/${id}`, { withCredentials: true });
};
// 수정
export const updateSolution = (
  id: number | string,
  data: Partial<SolutionType>
) => {
  return axios.patch(`/solution/${id}`, data, { withCredentials: true });
};

// 삭제
export const deleteSolution = (id: number | string) => {
  return axios.delete(`/solution/${id}`, { withCredentials: true });
};
