"use client";

import React, { useState, useEffect } from "react";
import { NewsCreateInput, NewsType } from "@/types";
import Image from "next/image";

interface Props {
  mode: "create" | "edit";
  data: NewsType | null;
  onClose: () => void;
  onSubmit: (data: NewsCreateInput | NewsType, imageFile: File | null) => void;
}

const NewsFormModal: React.FC<Props> = ({ mode, data, onClose, onSubmit }) => {
  const [form, setForm] = useState<NewsCreateInput | NewsType>({
    category: "",
    title: "",
    content: "",
    date: "",
    link: "",
    pageUrl: "",
    imageUrl: "",
    videoUrl: "",
    isMainNews: false,
    createdAt: "",
    updatedAt: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        ...data,
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      });
    } else {
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
        createdAt: "",
        updatedAt: "",
      });
      setImageFile(null);
    }
  }, [mode, data]);

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
    if (!file) return;

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    // 용량 체크 50MB 이하
    if (file.size > 50 * 1024 * 1024) {
      alert("이미지 파일 크기는 50MB 이하로 업로드해 주세요.");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setImageFile(file);
    setForm((prev) => ({ ...prev, imageUrl: localUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력 체크
    if (!form.category.trim()) {
      alert("카테고리를 선택해 주세요.");
      return;
    }
    if (!form.title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!form.content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }
    if (!form.date.trim()) {
      alert("날짜를 입력해 주세요.");
      return;
    }

    // 이미지 or 기존 이미지 url 있어야 함
    if (!form.imageUrl && !imageFile) {
      alert("이미지를 업로드해 주세요.");
      return;
    }

    // videoUrl 유효성 검사 (빈 문자열이면 무시)
    if (form.videoUrl && !/^https?:\/\/.+/.test(form.videoUrl)) {
      alert("비디오 URL이 올바른 형식이 아닙니다.");
      return;
    }

    onSubmit(form, imageFile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "create" ? "뉴스 등록" : "뉴스 수정"}
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="">카테고리 선택</option>
            <option value="미디어">미디어</option>
            <option value="언론보도">언론보도</option>
            <option value="보도자료">보도자료</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">제목</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">내용</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">날짜</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">슬러그</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            페이지 URL
          </label>
          <input
            name="pageUrl"
            value={form.pageUrl}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
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
          <label className="text-sm font-medium text-gray-700">
            비디오 URL
          </label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="isMainNews"
            className="text-sm font-medium text-gray-700"
          >
            메인 뉴스 여부
          </label>
          <input
            type="checkbox"
            id="isMainNews"
            name="isMainNews"
            checked={form.isMainNews}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isMainNews: e.target.checked }))
            }
            className="h-4 w-4 text-green-600"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsFormModal;
