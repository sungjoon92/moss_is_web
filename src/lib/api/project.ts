import axios from "@/lib/axios";
import { PaginationParams, ProjectCreateInput, ProjectType } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createProject = (data: ProjectCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);
  return axios.post("/project", payload, { withCredentials: true });
};

// 전체 리스트 조회용
export const getProjects = ({
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
  return axios.get(`/project?${params.toString()}`, { withCredentials: true });
};

// 단일 아이템 조회용
export const getProject = (id: number | string) => {
  return axios.get(`/project`, { data: { id }, withCredentials: true });
};

// 수정
export const updateProject = (id: number, data: Partial<ProjectType>) => {
  const payload = toSnakeCase(data);
  return axios.patch(`/project`, { id, ...payload }, { withCredentials: true });
};

// 삭제
export const deleteProject = (id: number) => {
  return axios.delete(`/project`, { data: { id }, withCredentials: true });
};
