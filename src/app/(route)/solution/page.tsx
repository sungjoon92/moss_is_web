"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import SolutionCard from "@/components/solution/SolutionCard";
import { solutionData } from "@/data/solutionData";
const categories = ["전체", "녹화시스템", "산림복원", "이끼정원"];

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
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={` px-4 py-2 rounded ${
              activeCategory === category
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-gray-700"
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
