"use client";

import React, { useEffect, useState } from "react";
import { NewsType, NewsCreateInput } from "@/types";
import AdminNewsList from "@/components/admin/category/news/AdminNewsList";
import NewsFormModal from "@/components/admin/category/news/NewsFormModal";
import { toCamelCase } from "@/utils/caseConverter";
import {
  getNewsList,
  createNews,
  deleteNews,
  updateNews,
} from "@/lib/api/news";
import { uploadImage } from "@/lib/supabase/upload";

const AdminNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<NewsType | null>(null);

  // 뉴스 데이터 불러오기
  const fetchNews = React.useCallback(async () => {
    try {
      const response = await getNewsList({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setNewsList(data);
    } catch (error) {
      console.error(error);
    }
  }, [page, limit, sort, order]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 생성 또는 수정
  const handleSubmit = async (
    data: NewsCreateInput | NewsType,
    imageFile: File | null
  ) => {
    try {
      let imageUrl = data.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, {
          bucket: "moss-is-bucket",
          folder: "news-images",
        });
      }

      // 업로드된 이미지 URL로 데이터 생성/수정
      const submitData = { ...data, imageUrl };
      if (editMode === "create") {
        await createNews(submitData);
      } else if (editMode === "edit" && "id" in data) {
        await updateNews(data.id, submitData);
      }
      setModalOpen(false);
      await fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  // 솔루션 삭제
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteNews(id);
      await fetchNews();
    }
  };

  // 수정 버튼 눌렀을 때
  const handleEdit = (news: NewsType) => {
    setEditMode("edit");
    setEditData(news);
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
          <h1 className="text-xl font-bold">현재 뉴스 목록</h1>
          <button
            onClick={handleCreateClick}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            새 뉴스 등록
          </button>
        </div>

        <AdminNewsList
          data={newsList}
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
        <NewsFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminNewsPage;
