"use client";

import React, { useState } from "react";
import { SolutionType } from "@/types";
import SolutionForm from "./SolutionForm";
import AdminSolutionList from "./AdminSolutionList";

interface props {
  data: SolutionType[];
}
const AdminSolutionManager: React.FC<props> = ({ data }) => {
  const [solutions, setSolutions] = useState<SolutionType[]>(data);

  const handleAddSolution = (newData: SolutionType) => {
    console.log("등록된 데이터:", newData);
    setSolutions((prev) => [...prev, newData]);
  };

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
