"use client";

import React, { useEffect, useState } from "react";
import {
  getHomeList,
  createHome,
  updateHome,
  deleteHome,
} from "@/lib/api/home"; // API 함수들
import HomeFormModal from "@/components/admin/category/home/HomeFormModal";
import { HomeCreateInput, HomeType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import AdminHomeList from "@/components/admin/category/home/AdminHomeList ";

const AdminHomePage: React.FC = () => {
  // fetchHomeList api로 부른 데이터들
  const [homeList, setHomeList] = useState<HomeType[]>([]);

  // 페이징 정렬
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<HomeType | null>(null);

  // 데이터 불러오기
  const fetchHomeList = React.useCallback(async () => {
    try {
      const response = await getHomeList({ page, limit, sort, order });
      setHomeList(response.data.map(toCamelCase));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [page, limit, sort, order]);

  useEffect(() => {
    fetchHomeList();
  }, [fetchHomeList]);

  // 등록/수정 처리
  const handleSubmit = async (data: HomeType | HomeCreateInput) => {
    try {
      // 새로 추가할 데이터가 isMain === true일 경우 기존 메인 false 처리
      if (editMode === "create" && data.isMain) {
        for (const video of homeList) {
          if (video.isMain) {
            await updateHome(video.id, { ...video, isMain: false });
          }
        }
      }

      if (editMode === "create") {
        await createHome(data);
      } else if (editMode === "edit" && editData) {
        // 수정 모드에서 isMain이 true인 경우에도 처리
        if (data.isMain && !editData.isMain) {
          for (const video of homeList) {
            if (video.isMain && video.id !== editData.id) {
              await updateHome(video.id, { ...video, isMain: false });
            }
          }
        }

        await updateHome(editData.id, data);
      }

      setModalOpen(false);
      await fetchHomeList();
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteHome(id);
        await fetchHomeList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMainCheck = async (selectedId: number) => {
    try {
      // 전체 비디오 리스트를 순회하며
      for (const video of homeList) {
        const isMain = video.id === selectedId;
        if (video.isMain !== isMain) {
          await updateHome(video.id, {
            ...video,
            isMain,
          });
        }
      }

      await fetchHomeList(); // 다시 불러와서 갱신
    } catch (err) {
      console.error("메인 체크 실패:", err);
    }
  };

  // 수정 버튼 클릭
  const handleEdit = (item: HomeType) => {
    setEditMode("edit");
    setEditData(item);
    setModalOpen(true);
  };

  // 새로 등록 버튼 클릭
  const handleCreateClick = () => {
    setEditMode("create");
    setEditData(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">홈 영상 관리</h1>
        <button
          onClick={handleCreateClick}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          새 영상 등록
        </button>
      </div>

      <AdminHomeList
        data={homeList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMainCheck={handleMainCheck}
        page={page}
        onPageChange={setPage}
        sort={sort}
        order={order}
        onSortChange={setSort}
        onOrderChange={setOrder}
      />

      {modalOpen && (
        <HomeFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
