"use client";

import React, { useState } from "react";
import { NewsType } from "@/types";
import NewsForm from "./AdminNewsForm";
import AdminNewsList from "./AdminNewsList";

interface Props {
  data: NewsType[];
}

const AdminNewsManager: React.FC<Props> = ({ data }) => {
  const [newsList, setNewsList] = useState<NewsType[]>(data);

  const handleAddNews = (newData: Omit<NewsType, "id">) => {
    // id는 임시로 배열 길이 + 1, 실제론 서버에서 생성
    const newNews: NewsType = {
      id: newsList.length + 1,
      ...newData,
    };
    setNewsList((prev) => [...prev, newNews]);
  };

  const handleDelete = (index: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setNewsList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">현재 뉴스 목록</h1>
      <AdminNewsList data={newsList} onDelete={handleDelete} />
      <h1 className="text-xl font-bold">뉴스 등록</h1>
      <NewsForm onSubmit={handleAddNews} />
    </div>
  );
};

export default AdminNewsManager;
