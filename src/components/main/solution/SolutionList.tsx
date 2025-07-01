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
      <div className="flex flex-wrap gap-2 mb-10">
        {category.map((category) => (
          <button
            key={category}
            className={`min-w-28 px-4 py-2 rounded-full border text-sm font-medium ${
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
