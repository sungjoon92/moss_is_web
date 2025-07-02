"use client";

import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { HomeType } from "@/types";

interface AdminHomeListProps {
  data: HomeType[];
  onEdit: (item: HomeType) => void;
  onDelete: (id: number) => void;
  onMainCheck: (id: number) => void;
  page: number;
  onPageChange: (page: number) => void;
  sort: string;
  order: "asc" | "desc";
  onSortChange: (sort: string) => void;
  onOrderChange: (order: "asc" | "desc") => void;
}

const AdminHomeList: React.FC<AdminHomeListProps> = ({
  data,
  onEdit,
  onDelete,
  onMainCheck,
  page,
  onPageChange,
  sort,
  order,
  onSortChange,
  onOrderChange,
}) => {
  const handleSort = (key: string) => {
    if (sort === key) {
      onOrderChange(order === "asc" ? "desc" : "asc");
    } else {
      onSortChange(key);
      onOrderChange("asc");
    }
  };

  return (
    <div className="space-y-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center px-2">메인</th>
            <th
              className="cursor-pointer border border-gray-300 px-4 py-2"
              onClick={() => handleSort("video_url")}
            >
              영상 URL{" "}
              {sort === "video_url" ? (order === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="cursor-pointer border border-gray-300 px-4 py-2"
              onClick={() => handleSort("link_url")}
            >
              링크 URL{" "}
              {sort === "link_url" ? (order === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2">미리보기</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              수정
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={item.isMain}
                  onChange={() => onMainCheck(item.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.videoUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.linkUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                <Link
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactPlayer
                    src={item.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(item)}
                >
                  수정
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onDelete(item.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 pt-4">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="self-center">페이지 {page}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminHomeList;
