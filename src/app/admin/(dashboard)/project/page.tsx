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
import { deleteImage } from "@/lib/supabase/deleteImage";
import { getImagePathFromUrl } from "@/lib/supabase/getImagePath";

const AdminProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<ProjectType | null>(null);

  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

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
    imageFile: File | null,
    detailImageFiles: File[],
    removedImageUrls: string[]
  ) => {
    try {
      let imageUrl = data.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, {
          bucket: "moss-is-bucket",
          folder: "project-images",
        });
      }

      // 기존 DB 이미지 배열 가져오기
      const existingImages =
        typeof data.contentImages === "string"
          ? JSON.parse(data.contentImages)
          : data.contentImages || [];

      // 삭제된 이미지를 제거한 배열
      const filteredExistingImages = existingImages.filter(
        (url: string) => !removedImageUrls.includes(url)
      );
      // 상세 이미지들 업로드 (새로 올린 파일)
      let newUploadedImages: string[] = [];
      if (detailImageFiles.length > 0) {
        const uploadPromises = detailImageFiles.map((file) =>
          uploadImage(file, {
            bucket: "moss-is-bucket",
            folder: "project-detail-images",
          })
        );
        newUploadedImages = await Promise.all(uploadPromises);
      }

      // 기존 이미지 + 새 이미지 합침
      const allContentImages = [
        ...filteredExistingImages,
        ...newUploadedImages,
      ];

      // 최종적으로 제출할 데이터
      const submitData = {
        ...data,
        imageUrl,
        contentImages: allContentImages,
      };

      // 삭제된 이미지 Supabase에서 제거
      await Promise.all(
        removedImageUrls.map(async (url) => {
          try {
            const path = getImagePathFromUrl(url, "moss-is-bucket");
            console.log("삭제할 이미지 경로(path):", path);
            await deleteImage({
              bucket: "moss-is-bucket",
              path,
            });
          } catch (error) {
            console.error("삭제 실패:", error);
          }
        })
      );

      // 모달 상태가 create면 생성 edit이면 수정
      if (editMode === "create") {
        await createProject(submitData);
      } else if (editMode === "edit" && "id" in data) {
        await updateProject(data.id, submitData);
      }

      setModalOpen(false);
      setDetailImageFiles([]); // 이미지 파일 초기화
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

  // 생성
  const handleEdit = (project: ProjectType) => {
    setEditMode("edit");
    setEditData(project);
    setModalOpen(true);
  };

  // 수정
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
          detailImageFiles={detailImageFiles}
          setDetailImageFiles={setDetailImageFiles}
        />
      )}
    </>
  );
};

export default AdminProjectPage;
