"use client";

import React from "react";
import Link from "next/link";
import { NewsType } from "@/types";

interface Props {
  data: NewsType[];
  onDelete: (index: number) => void;
}

const AdminNewsList: React.FC<Props> = ({ data, onDelete }) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">
            카테고리
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left">제목</th>
          <th className="border border-gray-300 px-4 py-2 text-left">날짜</th>
          <th className="border border-gray-300 px-4 py-2 text-center">삭제</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">
              {item.category}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-blue-600 hover:underline">
              <Link href={`/news/${item.link}`}>{item.title}</Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.date}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={() => onDelete(index)}
                className="text-red-600 hover:text-red-800"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminNewsList;
