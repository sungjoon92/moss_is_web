"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import SolutionCard from "@/components/main/solution/SolutionCard";
import { SolutionType } from "@/types";
import { getSolutions } from "@/lib/api/solution";
import { toCamelCase } from "@/utils/caseConverter";
const category = ["전체", "녹화시스템", "산림복원", "이끼정원"];

const SolutionPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [solutions, setSolutions] = useState<SolutionType[]>([]);

  // 나중에 페이지네이션, 정렬 사용하게 되면 활성화
  // const [page, setPage] = useState(1);
  // const [limit] = useState(10);
  // const [sort, setSort] = useState("created_at");
  // const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 솔루션 데이터 불러오기
  const fetchSolutions = React.useCallback(async () => {
    try {
      const response = await getSolutions({});
      const data = response.data.map(toCamelCase);

      setSolutions(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  // 필터링 로직
  const filterData =
    activeCategory === "전체"
      ? solutions
      : solutions.filter((item) => item.category === activeCategory);

  return (
    <Container>
      {/* 카테고리 메뉴 */}
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

      {/* 솔루션 카드 */}
      <SolutionCard data={filterData} />
    </Container>
  );
};

export default SolutionPage;
