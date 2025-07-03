"use client";
import Container from "@/components/Container";
import SolutionList from "@/components/main/solution/SolutionList";
import { getSolutions } from "@/lib/api/solution";
import { toCamelCase } from "@/utils/caseConverter";
import { useEffect, useState } from "react";

export default function SolutionPage() {
  // SSR 방식
  // const res = await getSolutions({});
  // const data = res.data.map(toCamelCase);

  // CSR 방식
  const [data, setData] = useState([]);
  const fetchSolution = async () => {
    try {
      const response = await getSolutions({});
      setData(response.data.map(toCamelCase));
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    fetchSolution();
  }, []);

  return (
    <Container>
      <SolutionList initialData={data} />
    </Container>
  );
}
