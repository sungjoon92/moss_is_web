import React from "react";
import Link from "next/link";
import { NewsType } from "@/types";

interface Props {
  data: NewsType[];
}

const NewsCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-10">
      {data.map((item) => {
        const { id, category, title, imageUrl, date, link } = item;
        return (
          <div
            key={id}
            className="m-auto flex flex-col justify-between lg:flex-row items-start bg-white rounded-lg shadow-sm"
          >
            {/* 텍스트 영역 */}
            <div className="flex flex-col lg:w-1/2 space-y-4">
              <span className="inline-block bg-green-400 text-white text-xs font-semibold rounded-full px-3 py-1 w-max">
                {category}
              </span>
              <Link
                href={link}
                className="text-2xl font-semibold leading-snug whitespace-pre-line"
              >
                {title}
              </Link>
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span>{date}</span>
              </div>
              <Link
                href={link}
                className="text-green-400 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                더 알아보기 →
              </Link>
            </div>

            {/* 이미지 영역 */}
            <Link
              href={link}
              className="w-full min-w-[250px] lg:w-1/3 block rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NewsCard;
