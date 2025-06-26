"use client";

import React, { useEffect, useState } from "react";
import { ProjectType } from "@/types";
import ProjectForm from "@/components/admin/category/project/AdminProjectForm";
import AdminProjectList from "@/components/admin/category/project/AdminProjectList";
import { createProject, deleteProject, getProjects } from "@/lib/api/project";
import { toCamelCase } from "@/utils/caseConverter";

const AdminProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 프로젝트 데이터 불러오기
  const fetchProjects = async () => {
    try {
      const response = await getProjects({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, sort, order]);

  // 프로젝트 등록
  const handleAddProject = async (data: ProjectType) => {
    try {
      const response = await createProject(data);
      console.log("등록된 데이터:", response.data);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  // 프로젝트 삭제
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteProject(id);
      await fetchProjects();
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">현재 프로젝트 목록</h1>
      <AdminProjectList
        data={projects}
        onDelete={handleDelete}
        page={page}
        onPageChange={setPage}
        sort={sort}
        order={order}
        onSortChange={setSort}
        onOrderChange={setOrder}
      />

      <h1 className="text-xl font-bold">프로젝트 등록</h1>
      <ProjectForm onSubmit={handleAddProject} />
    </div>
  );
};

export default AdminProjectPage;
