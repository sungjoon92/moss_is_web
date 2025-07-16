import Container from "@/components/Container";
import MainNewsCard from "@/components/main/news/MainNewsCard ";
import NewsList from "@/components/main/news/NewsList";
import CategoryTabs from "@/components/main/project/CategoryTabs";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NewsType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";

const category = ["전체", "미디어", "언론보도", "보도자료"];

export default async function NewsPage() {
  const { data, error } = await supabase.from("t_news").select("*");

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data.map((item) => toCamelCase(item) as NewsType);

  return (
    <Container>
      <CategoryTabs categories={["project", "news"]} />
      <div className="w-full text-center">
        <h1 className="text-4xl font-medium mb-5">COFN 뉴스룸</h1>
        <p className="text-gray-600 mb-10">
          코드오브네이처의 새로운 소식들을 <br />
          한눈에 살펴보세요.
        </p>
      </div>

      {/* 대표 이미지 */}
      {/* <MainNewsCard data={camelCaseData} /> */}

      <NewsList data={camelCaseData} category={category}></NewsList>
    </Container>
  );
}

export const dynamic = "force-dynamic";
