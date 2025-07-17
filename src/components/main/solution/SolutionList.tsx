"use client";

import React, { useState } from "react";
import SolutionCard from "./SolutionCard";
import { SolutionType } from "@/types";

const category = ["이끼재배", "벽면녹화", "모쏘일", "테라리움"];

interface Props {
  data: SolutionType[];
}

export default function SolutionList({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filterData =
    activeCategory === "전체"
      ? data
      : data.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* 솔루션에서 카테고리 사용시 아래 코드 이용 */}
      {/*   <div className="flex flex-wrap mb-10 gap-2 sm:gap-1 justify-start">
        {category.map((category) => (
          <button
            key={category}
            className={`sm:min-w-26 px-3 md:px-4 py-2 rounded-full border text-sm font-medium ${
              activeCategory === category
                ? "bg-green-400 text-white"
                : "bg-white text-gray-400 border-gray-300"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div> */}
      <div className="space-y-10">
        {filterData.map((item) => {
          return <SolutionCard key={item.id} data={item} />;
        })}
      </div>
    </>
  );
}
