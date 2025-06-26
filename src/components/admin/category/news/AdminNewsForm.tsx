"use client";

import React, { useState } from "react";
import { NewsCreateInput, NewsType } from "@/types";
import Image from "next/image";

interface Props {
  onSubmit: (data: Omit<NewsType, "id">) => void; // id는 서버에서 처리한다고 가정
}

const NewsForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<NewsCreateInput>({
    category: "",
    title: "",
    content: "",
    date: "",
    link: "",
    pageUrl: "",
    imageUrl: "",
    videoUrl: "",
    isMainNews: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, imageUrl: localUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      category: "",
      title: "",
      content: "",
      date: "",
      link: "",
      pageUrl: "",
      imageUrl: "",
      videoUrl: "",
      isMainNews: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6 border"
    >
      <h2 className="text-xl font-semibold text-gray-800">뉴스 등록</h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">카테고리</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="예: 미디어, 공지"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="뉴스 제목을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">내용</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="뉴스 내용을 입력하세요"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">날짜</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          링크 (슬러그)
        </label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="예: news-slug"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">페이지 URL</label>
        <input
          name="pageUrl"
          value={form.pageUrl}
          onChange={handleChange}
          placeholder="예: https://example.com/news/news-slug"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          이미지 업로드
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        {form.imageUrl && (
          <Image
            width={1000}
            height={1000}
            src={form.imageUrl}
            alt="미리보기"
            className="mt-2 w-full max-w-xs rounded border"
          />
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">비디오 URL</label>
        <input
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="유튜브 등 비디오 URL 입력"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isMainNews"
          name="isMainNews"
          checked={form.isMainNews}
          onChange={handleChange}
          className="h-4 w-4 text-green-600"
        />

        <label
          htmlFor="isMainNews"
          className="text-sm font-medium text-gray-700"
        >
          메인 뉴스 여부
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
