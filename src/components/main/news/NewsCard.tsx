import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsType } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface Props {
  item: NewsType;
}

const NewsCard: React.FC<Props> = ({ item }) => {
  const { id, category, title, imageUrl, date } = item;

  return (
    <div className="flex flex-col justify-between md:flex-row items-start bg-white rounded-md">
      {/* 텍스트 영역 */}
      <div className="flex flex-col md:w-1/2 space-y-4">
        <div className="flex items-center text-xs text-gray-500 space-x-2 w-full">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-700 font-medium text-xl">{category}</span>
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          <span className="text-xl">{formatDate(date)}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <Link
          href={`/news/${id}`}
          className="text-3xl font-semibold leading-snug whitespace-pre-line"
        >
          {title}
        </Link>

        <Link
          href={`/news/${id}`}
          className="text-green-600 text-sm font-semibold hover:underline flex items-center"
        >
          더 알아보기 →
        </Link>
      </div>

      {/* 이미지 영역 */}
      <Link
        href={`/news/${id}`}
        className="w-full md:w-1/3 block rounded-lg overflow-hidden shadow-lg"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={1000}
          height={1000}
          className="w-full h-64 object-cover rounded-lg"
        />
      </Link>
    </div>
  );
};

export default NewsCard;
