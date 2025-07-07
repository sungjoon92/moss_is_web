import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SolutionType } from "@/types";
import { sanitizeHtmlClient } from "@/utils/sanitizeHtmlClient";

interface Props {
  data: SolutionType;
}

const SolutionCard: React.FC<Props> = ({ data }) => {
  const { id, categoryTag, title, content, imageUrl } = data;

  return (
    <div className="flex flex-col justify-between md:flex-row items-start bg-white rounded-md">
      {/* 텍스트 영역 */}
      <div className="flex flex-col md:w-1/2 space-y-4">
        <span className="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1 w-max">
          {categoryTag}
        </span>
        <Link
          href={`/solution/${id}`}
          className="text-3xl font-semibold leading-snug whitespace-pre-line"
        >
          {title}
        </Link>
        <div
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlClient(content) }}
        />
        <Link
          href={`/solution/${id}`}
          className="text-green-600 text-sm font-semibold hover:underline flex items-center pb-6"
        >
          더 알아보기 →
        </Link>
      </div>

      {/* 이미지 영역 */}
      <Link
        href={`/solution/${id}`}
        className="w-full md:w-1/3 block rounded-lg overflow-hidden shadow-lg md:mt-0"
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

export default SolutionCard;
