"use client";

import React, { useState } from "react";
import SolutionCard from "./SolutionCard";
import { SolutionType } from "@/types";

const category = ["전체", "녹화시스템", "산림복원", "이끼정원"];

interface Props {
  initialData: SolutionType[];
}

export default function SolutionList({ initialData }: Props) {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filterData =
    activeCategory === "전체"
      ? initialData
      : initialData.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-0 mb-10 sm:gap-2 justify-around sm:justify-start">
        {category.map((category) => (
          <button
            key={category}
            className={`sm:min-w-28 px-4 sm:px-2 py-2 rounded-full border text-sm font-medium ${
              activeCategory === category
                ? "bg-green-400 text-white"
                : "bg-white text-gray-400 border-gray-300"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <SolutionCard data={filterData} />
    </>
  );
}
