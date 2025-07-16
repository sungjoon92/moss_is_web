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
  return (
    <div className="space-y-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-[50px] py-2 text-lg align-middle text-center ">
              메인
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              제목
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              영상 URL
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              링크 URL
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              미리보기
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              수정
            </th>
            <th className="border border-gray-300 px-4 py-2 align-middle text-center">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="text-center align-middle">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={item.isMain}
                    onChange={() => onMainCheck(item.id)}
                    className="w-5 h-5"
                  />
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.title}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.videoUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.linkUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                <ReactPlayer
                  src={item.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </td>
              <td className="w-[100px] border border-gray-300  py-2 align-middle text-center">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => onEdit(item)}
                >
                  수정
                </button>
              </td>
              <td className="w-[100px] border border-gray-300 px-4 py-2 align-middle text-center">
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

      {/* 정렬 & 페이지네이션 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span>정렬:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="video_url">영상 URL</option>
            <option value="link_url">링크 URL</option>
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

export default AdminHomeList;
