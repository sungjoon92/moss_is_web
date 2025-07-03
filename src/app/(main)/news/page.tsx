"use client";
import Container from "@/components/Container";
import MainNewsCard from "@/components/main/news/MainNewsCard ";
import NewsList from "@/components/main/news/NewsList";
import { getNewsList } from "@/lib/api/news";
import { NewsType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import { useEffect, useState } from "react";

const category = ["전체", "미디어", "언론보도", "보도자료"];

const NewsPage = () => {
  const [data, setData] = useState<NewsType[]>([]);
  const [activeCategory, setActiveCategory] = useState("전체");

  const fetchNews = async () => {
    try {
      const response = await getNewsList();
      setData(response.data.map(toCamelCase));
    } catch (err) {
      console.error("뉴스 데이터 가져오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredData =
    activeCategory === "전체"
      ? data
      : data.filter((item) => item.category === activeCategory);

  return (
    <Container className=" flex flex-col items-center">
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold mb-5">COFN 뉴스룸</h1>
        <p className="text-gray-600 mb-10">
          코드오브네이처의 새로운 소식들을 <br />
          한눈에 살펴보세요.
        </p>
      </div>

      {/* 대표 이미지 */}
      <MainNewsCard data={filteredData} />

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
      <NewsList data={filteredData}></NewsList>
    </Container>
  );
};

export default NewsPage;
