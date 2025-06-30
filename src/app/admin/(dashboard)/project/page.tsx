"use client";

import React, { useEffect, useState } from "react";
import { ProjectCreateInput, ProjectType } from "@/types";
import ProjectFormModal from "@/components/admin/category/project/ProjectFormModal";
import AdminProjectList from "@/components/admin/category/project/AdminProjectList";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/lib/api/project";
import { toCamelCase } from "@/utils/caseConverter";
import { uploadImage } from "@/lib/supabase/upload";

const AdminProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<ProjectType | null>(null);

  // 데이터 불러오기
  const fetchProjects = React.useCallback(async () => {
    try {
      const response = await getProjects({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  }, [page, sort, order, limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 등록/수정 처리
  const handleSubmit = async (
    data: ProjectCreateInput | ProjectType,
    imageFile: File | null
  ) => {
    try {
      let imageUrl = data.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, {
          bucket: "moss-is-bucket",
          folder: "project-images",
        });
      }

      // 업로드된 이미지 URL로 데이터 생성/수정
      const submitData = { ...data, imageUrl };

      if (editMode === "create") {
        await createProject(submitData);
      } else if (editMode === "edit" && "id" in data) {
        await updateProject(data.id, submitData);
      }
      setModalOpen(false);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteProject(id);
      await fetchProjects();
    }
  };

  const handleEdit = (project: ProjectType) => {
    setEditMode("edit");
    setEditData(project);
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditMode("create");
    setEditData(null);
    setModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">현재 프로젝트 목록</h1>
          <button
            onClick={handleCreateClick}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            새 프로젝트 등록
          </button>
        </div>

        <AdminProjectList
          data={projects}
          onDelete={handleDelete}
          onEdit={handleEdit}
          page={page}
          onPageChange={setPage}
          sort={sort}
          order={order}
          onSortChange={setSort}
          onOrderChange={setOrder}
        />
      </div>

      {modalOpen && (
        <ProjectFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminProjectPage;
