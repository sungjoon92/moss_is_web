"use client";

import React, { useEffect, useState } from "react";
import { SolutionType, SolutionCreateInput } from "@/types";
import AdminSolutionList from "@/components/admin/category/solution/AdminSolutionList";
import {
  createSolution,
  deleteSolution,
  getSolutions,
  updateSolution,
} from "@/lib/api/solution";
import { toCamelCase } from "@/utils/caseConverter";
import SolutionFormModal from "@/components/admin/category/solution/SolutionFormModal";
import { uploadImage } from "@/lib/supabase/upload";

const AdminSolutionPage: React.FC = () => {
  const [solutions, setSolutions] = useState<SolutionType[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<SolutionType | null>(null);

  // 솔루션 데이터 불러오기
  const fetchSolutions = React.useCallback(async () => {
    try {
      const response = await getSolutions({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setSolutions(data);
    } catch (error) {
      console.error(error);
    }
  }, [page, limit, sort, order]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  // 생성 또는 수정
  const handleSubmit = async (
    data: SolutionCreateInput | SolutionType,
    imageFile: File | null
  ) => {
    try {
      let imageUrl = data.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, {
          bucket: "solution",
          folder: "solution-images",
        });
      }

      // 업로드된 이미지 URL로 데이터 생성/수정
      const submitData = { ...data, imageUrl };

      if (editMode === "create") {
        await createSolution(data);
      } else if (editMode === "edit" && "id" in submitData) {
        await updateSolution(submitData.id, submitData);
      }
      setModalOpen(false);
      await fetchSolutions();
    } catch (error) {
      console.error(error);
    }
  };

  // 솔루션 삭제
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteSolution(id);
      await fetchSolutions();
    }
  };

  // 수정 버튼 눌렀을 때
  const handleEdit = (solution: SolutionType) => {
    setEditMode("edit");
    setEditData(solution);
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
          <h1 className="text-xl font-bold">현재 솔루션 목록</h1>
          <button
            onClick={handleCreateClick}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            새 솔루션 등록
          </button>
        </div>

        <AdminSolutionList
          data={solutions}
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
        <SolutionFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminSolutionPage;
