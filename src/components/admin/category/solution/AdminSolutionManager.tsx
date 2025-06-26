"use client";

import React, { useEffect, useState } from "react";
import { SolutionType, SolutionCreateInput } from "@/types";
import SolutionForm from "./SolutionForm";
import AdminSolutionList from "./AdminSolutionList";
import { createSolution, getSolutions } from "@/lib/api/solution";
import { toCamelCase } from "@/utils/caseConverter";

interface props {
  data: SolutionType[];
}
const AdminSolutionManager: React.FC<props> = ({ data }) => {
  const [solutions, setSolutions] = useState<SolutionType[]>(data);

  // 최신 데이터 불러오기
  const fetchSolutions = async () => {
    try {
      const response = await getSolutions();
      const data = response.data.map(toCamelCase);
      setSolutions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  // 솔루션 생성
  const handleAddSolution = async (data: SolutionCreateInput) => {
    try {
      const response = await createSolution(data);
      console.log("등록된 데이터:", response.data);
      await fetchSolutions();
    } catch (error) {
      console.error(error);
    }
  };

  //솔루션 삭제
  const handleDelete = (index: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setSolutions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">현재 솔루션 목록</h1>
      <AdminSolutionList data={solutions} onDelete={handleDelete} />

      <h1 className="text-xl font-bold">솔루션 등록</h1>
      <SolutionForm onSubmit={handleAddSolution} />
    </div>
  );
};

export default AdminSolutionManager;
