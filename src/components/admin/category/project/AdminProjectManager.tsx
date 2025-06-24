"use client";

import React, { useState } from "react";
import { ProjectType } from "@/types";
import ProjectForm from "./AdminProjectForm";
import AdminProjectList from "./AdminProjectList";

interface props {
  data: ProjectType[];
}
const AdminProjectManager: React.FC<props> = ({ data }) => {
  const [projects, setProjects] = useState<ProjectType[]>(data);

  const handleAddProject = (newProject: ProjectType) => {
    console.log("등록된 프로젝트:", newProject);
    setProjects((prev) => [...prev, newProject]);
  };

  const handleDelete = (index: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">현재 프로젝트 목록</h1>
      <AdminProjectList data={projects} onDelete={handleDelete} />

      <h1 className="text-xl font-bold">프로젝트 등록</h1>
      <ProjectForm onSubmit={handleAddProject} />
    </div>
  );
};

export default AdminProjectManager;
