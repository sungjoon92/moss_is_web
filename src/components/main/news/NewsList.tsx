"use client";
import React, { useState } from "react";
import { NewsType } from "@/types";
import NewsCard from "./NewsCard";

interface Props {
  data: NewsType[];
  category: string[];
}

const NewsList: React.FC<Props> = ({ data, category }) => {
    const [activeCategory, setActiveCategory] = useState("전체");

      const filteredData =
    activeCategory === "전체"
      ? data
      : data.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-10 w-full">
         {/* 카테고리 버튼 */}
      <div className="flex gap-2 mb-10">
        {category.map((category) => (
          <button
            key={category}
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory(category);
            }}
            className={`px-4 py-2 rounded-full border text-sm font-medium ${
              activeCategory === category
                ? "bg-green-400 text-white"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredData.map((item) => {
        return <NewsCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default NewsList;
  