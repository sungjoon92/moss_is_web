import Link from "next/link";
import React from "react";
import MediaArticleCard from "./MediaArticleCard";
import { sampleData } from "@/data/sampleData";
const Media: React.FC = () => {
  return (
    <section className="w-full flex items-center flex-col mx-auto py-10">
      <div className="w-[70%] flex items-center justify-between">
        <div className="text-green-600 font-semibold my-4">＊ Media</div>
        <p className="text-4xl font-bold leading-tight">
          코드오브네이처가 축적해 온 이야기들
        </p>
        <Link href={"/news"} className="text-green-400 hover:underline">
          <span>더 알아보기</span>
        </Link>
      </div>

      <div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {sampleData.map((item, index) => (
          <MediaArticleCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Media;
