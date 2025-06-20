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
            className="h-full flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 bg-white rounded-lg transition-shadow duration-300"
          >
            <div className="w-full h-full flex flex-col justify-between  md:flex-row items-center md:space-y-0 md:space-x-6">
              <div className="w-full h-full flex flex-col justify-between md:w-1/2 space-y-8">
                {categoryTag && (
                  <span className="text-sm text-gray-500">{categoryTag}</span>
                )}
                <Link
                  href={`/solution/${link}`}
                  className="text-xl font-semibold"
                >
                  {title}
                </Link>
                <p className="text-gray-700">{content}</p>
                <Link
                  href={`/solution/${link}`}
                  className="text-green-400 hover:underline"
                >
                  더 알아보기 →
                </Link>
              </div>
              <Link href={`/solution/${link}`} className="">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
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
