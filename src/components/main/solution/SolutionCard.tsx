// components/MosbyCard.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SolutionType } from "@/types";

interface props {
  data: SolutionType[];
}
export const SolutionCard: React.FC<props> = ({ data }) => {
  return (
    <div className="space-y-10">
      {data.map((item, index) => {
        const { categoryTag, title, content, imageUrl, link } = item;
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start justify-between bg-white rounded-lg overflow-hidden"
          >
            {/* 텍스트 영역 */}
            <div className="w-full md:w-[50%] flex flex-col justify-between min-h-[280px]">
              <div className="w-full flex flex-col justify-between space-y-4">
                <span className="text-sm text-gray-500">{categoryTag}</span>
                <Link
                  href={`/solution/${link}`}
                  className="text-xl font-semibold"
                >
                  {title}
                </Link>
                <p className="text-gray-700 leading-relaxed">{content}</p>
              </div>
              <Link
                href={`/solution/${link}`}
                className="text-green-400 hover:underline"
              >
                더 알아보기 →
              </Link>
            </div>

            {/* 이미지 영역 */}
            <div className="w-full md:w-[30%] h-[300px] relative min-w-[300px]">
              <Link href={`/solution/${link}`}>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SolutionCard;
