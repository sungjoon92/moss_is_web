"use client";

import React from "react";
import Link from "next/link";
import { NewsType, ListProps } from "@/types";
import { formatDate, formatDateTime } from "@/utils/formatDate";

interface Props extends ListProps<NewsType> {
  onEdit?: (news: NewsType) => void;
  onMainCheck: (id: number) => void;
}

const AdminNewsList: React.FC<Props> = ({
  data,
  onDelete,
  onEdit,
  onMainCheck,
  page,
  onPageChange,
  sort,
  order,
  onSortChange,
  onOrderChange,
}) => {
  return (
    <div className="space-y-4">
      <table className="w-full table-fixed border-collapse border border-gray-200 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 align-middle">
              메인
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              카테고리
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              제목
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle">
              기사 날짜
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
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={item.isMainNews}
                  onChange={() => onMainCheck(item.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-blue-600 hover:underline text-left align-middle">
                <Link href={`/news/${item.id}`}>{item.title}</Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                {formatDate(item.date)}
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
              <td className="border border-gray-300 px-4 py-2 ">
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

      {/* 페이지네이션 + 정렬 UI */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span>정렬:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="date">기사 날짜</option>
            <option value="created_at">생성일</option>
            <option value="updated_at">수정일</option>
            <option value="title">제목</option>
            <option value="category">카테고리</option>
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

export default AdminNewsList;
