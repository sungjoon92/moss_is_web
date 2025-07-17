import axios from "@/lib/axios";
import { PaginationParams, ContactUsType, ContactUsCreateInput } from "@/types";
import { toSnakeCase } from "@/utils/caseConverter";
import { removeTimestamps } from "@/utils/removeTimestamps";

// 생성
export const createContactUs = (data: ContactUsCreateInput) => {
  const cleanedData = removeTimestamps(data); // createdAt, updatedAt 제거
  const payload = toSnakeCase(cleanedData);
  return axios.post("/contactus", payload, { withCredentials: true });
};

// 단일 솔루션 조회
export const getContactUs = (id: number) => {
  return axios.get(`/contactus/${id}`, { withCredentials: true });
};

// 전체 리스트 조회용
export const getContactUsList = ({
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

  return axios.get(`/contactus?${params.toString()}`, {
    withCredentials: true,
  });
};

// 수정
export const updateContactUs = (id: number, data: Partial<ContactUsType>) => {
  const payload = toSnakeCase(data) as ContactUsCreateInput;
  return axios.patch(
    `/contactus`,
    { id, ...payload },
    { withCredentials: true }
  );
};

// 삭제
export const deleteContactUs = (id: number) => {
  return axios.delete(`/contactus`, { data: { id }, withCredentials: true });
};
