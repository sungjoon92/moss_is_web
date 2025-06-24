"use client";

import React, { useState } from "react";
import { ProjectType } from "@/types";
import Image from "next/image";

interface Props {
  onSubmit: (data: ProjectType) => void;
}

const ProjectForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<Omit<ProjectType, "id" | "contentImages">>({
    category: "",
    title: "",
    description: "",
    location: "",
    date: "",
    link: "",
    imageUrl: "",
    contentTitle: "",
    contentText: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    // onSubmit 할 때 id는 서버에서 처리한다고 가정
    onSubmit(form as ProjectType); // id는 나중에 채워진다고 가정
    setForm({
      category: "",
      title: "",
      description: "",
      location: "",
      date: "",
      link: "",
      imageUrl: "",
      contentTitle: "",
      contentText: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6 border"
    >
      <h2 className="text-xl font-semibold text-gray-800">프로젝트 등록</h2>

      {/* 카테고리 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">카테고리</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="예: 건설, 환경, IT"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 제목 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="프로젝트 제목을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 설명 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">설명</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="프로젝트 설명을 입력하세요"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
      </div>

      {/* 위치 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">위치</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="프로젝트 위치를 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 날짜 */}
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

      {/* 이미지 업로드 */}
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

      {/* 링크 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          링크 (슬러그)
        </label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="예: project-slug"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 상세 콘텐츠 제목 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          상세 콘텐츠 제목
        </label>
        <input
          name="contentTitle"
          value={form.contentTitle}
          onChange={handleChange}
          placeholder="예: 프로젝트 상세 설명 제목"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 상세 콘텐츠 텍스트 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          상세 콘텐츠 텍스트
        </label>
        <textarea
          name="contentText"
          value={form.contentText}
          onChange={handleChange}
          placeholder="프로젝트 상세 설명 텍스트"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
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

export default ProjectForm;
