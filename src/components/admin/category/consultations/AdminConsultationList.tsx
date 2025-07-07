"use client";

import React from "react";
import { ConsultationType, ListProps } from "@/types";
import { formatDateTime } from "@/utils/formatDate";

const statusOptions = ["접수", "처리중", "완료", "보류"];

interface Props extends ListProps<ConsultationType> {
  onEdit?: (consultation: ConsultationType) => void;
  onEditStatus?: (id: number, status: string) => void;
}

const AdminConsultationList: React.FC<Props> = ({
  data,
  onDelete,
  onEdit,
  onEditStatus,
  page,
  onPageChange,
  sort,
  order,
  onSortChange,
  onOrderChange,
}) => {
  const handleSelectStatus = (id: number, status: string) => {
    onEditStatus?.(id, status);
  };
  return (
    <div className="space-y-4">
      <table className="w-full table-auto border-collapse border border-gray-200 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 align-middle">
              문의상태
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              회사명
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              담당자
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              연락처
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              문의사항
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              알게된 경로
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              생성일
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              수정일
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              수정
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 align-middle">
                <select
                  value={item.status}
                  onChange={(e) => handleSelectStatus(item.id, e.target.value)}
                  className="border-none focus:outline-none p-1"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle ">
                {item.companyName}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle ">
                {item.managerName}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle ">
                {item.tel}
              </td>
              <td
                className="border border-gray-300 px-4 py-2 align-middle max-w-xs text-left"
                title={item.message}
              >
                {item.message}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                {item.referrer}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                {formatDateTime(item.createdAt)}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                {formatDateTime(item.updatedAt)}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                <button
                  onClick={() => onEdit?.(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  수정
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 및 정렬 UI */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span>정렬:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="created_at">생성일</option>
            <option value="updated_at">수정일</option>
            <option value="company_name">회사명</option>
          </select>

          <select
            value={order}
            onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
            className="border rounded px-2 py-1"
          >
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
          >
            이전
          </button>
          <span>페이지 {page}</span>
          <button
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1 border rounded"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConsultationList;
