import Link from "next/link";
import React from "react";
import MediaArticleCard from "./MediaArticleCard";
import { sampleData } from "@/data/sampleData";

const Media: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center mx-auto py-16 md:px-0 bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mb-10 gap-4 md:gap-0">
        <div className="text-green-600 font-semibold my-4">＊ Media</div>
        <p className="text-3xl md:text-4xl leading-tight text-gray-900 text-center md:text-left">
          코드오브네이처가 축적해 온 이야기들
        </p>
        <Link
          href={"/news"}
          className="text-green-500 hover:text-green-600 transition-colors font-semibold text-sm md:text-base"
        >
          더 알아보기
        </Link>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sampleData.map((item, index) => (
          <MediaArticleCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Media;
