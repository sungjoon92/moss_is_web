// app/admin/(side)/category/news/page.tsx
"use client";

import React, { useState } from "react";
import { NewsType } from "@/types";
import AdminNewsList from "@/components/admin/category/news/AdminNewsList";
import NewsForm from "@/components/admin/category/news/AdminNewsForm";
import { NewsData } from "@/data/newsData";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsType[]>(NewsData);

  const handleAddNews = (newData: Omit<NewsType, "id">) => {
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
}
