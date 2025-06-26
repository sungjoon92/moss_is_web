"use client";

import React, { useEffect, useState } from "react";
import { NewsCreateInput, NewsType } from "@/types";
import AdminNewsList from "@/components/admin/category/news/AdminNewsList";
import NewsForm from "@/components/admin/category/news/AdminNewsForm";
import { toCamelCase } from "@/utils/caseConverter";
import { createNews, deleteNews, getNewsList } from "@/lib/api/news";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 뉴스 목록 불러오기
  const fetchNews = async () => {
    try {
      const response = await getNewsList({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setNewsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, sort, order]);

  // 뉴스 등록
  const handleAddNews = async (data: NewsCreateInput) => {
    try {
      await createNews(data);
      await fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  // 뉴스 삭제
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteNews(id);
        await fetchNews();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">현재 뉴스 목록</h1>
      <AdminNewsList
        data={newsList}
        onDelete={handleDelete}
        page={page}
        onPageChange={setPage}
        sort={sort}
        order={order}
        onSortChange={setSort}
        onOrderChange={setOrder}
      />

      <h1 className="text-xl font-bold">뉴스 등록</h1>
      <NewsForm onSubmit={handleAddNews} />
    </div>
  );
}
