import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SolutionType } from "@/types";
import { sanitizeHtmlClient } from "@/utils/sanitizeHtmlClient";

interface props {
  data: SolutionType[];
}
export const SolutionCard: React.FC<props> = ({ data }) => {
  console.log(data);

  return (
    <div className="space-y-10">
      {data.map((item, index) => {
        const { id, categoryTag, title, content, imageUrl } = item;
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
                  href={`/solution/${id}`}
                  className="text-xl font-semibold"
                >
                  {title}
                </Link>
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlClient(content),
                  }}
                ></div>
              </div>
              <Link
                href={`/solution/${id}`}
                className="text-green-400 hover:underline"
              >
                더 알아보기 →
              </Link>
            </div>

            {/* 이미지 영역 */}
            <div className="w-full md:w-[30%] h-[300px] relative min-w-[300px]">
              <Link href={`/solution/${id}`}>
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
