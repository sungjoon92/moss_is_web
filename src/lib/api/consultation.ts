import axios from "@/lib/axios";
import {
  PaginationParams,
  ConsultationCreateInput,
  ConsultationType,
} from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createConsultation = (data: ConsultationCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);

  return axios.post("/consultations", payload, { withCredentials: true });
};

// 단일 상담 조회
export const getConsultation = (id: number) => {
  return axios.get(`/consultations/${id}`, { withCredentials: true });
};

// 전체 리스트 조회용
export const getConsultations = ({
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

  return axios.get(`/consultations?${params.toString()}`, {
    withCredentials: true,
  });
};

// 수정
export const updateConsultation = (
  id: number,
  data: Partial<ConsultationType>
) => {
  const payload = toSnakeCase(data);
  return axios.patch(
    `/consultations`,
    { id, ...payload },
    { withCredentials: true }
  );
};

// 삭제
export const deleteConsultation = (id: number) => {
  return axios.delete(`/consultations`, {
    data: { id },
    withCredentials: true,
  });
};
