"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import SolutionCard from "@/components/solution/SolutionCard";
import { solutionData } from "@/data/solutionData";
const category = ["전체", "녹화시스템", "산림복원", "이끼정원"];

const SolutionPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  // 필터링 로직
  const filterData =
    activeCategory === "전체"
      ? solutionData
      : solutionData.filter((item) => item.category === activeCategory);

  return (
    <Container>
      {/* 카테고리 메뉴 */}
      <div className="flex gap-4 mb-10">
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

      {/* 솔루션 카드 */}
      <SolutionCard data={filterData} />
    </Container>
  );
};

export default SolutionPage;
