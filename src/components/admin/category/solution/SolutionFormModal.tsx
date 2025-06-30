"use client";

import React, { useEffect, useState } from "react";
import { SolutionCreateInput, SolutionType } from "@/types";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  mode: "create" | "edit";
  data: SolutionType | null;
  onClose: () => void;
  onSubmit: (
    data: SolutionCreateInput | SolutionType,
    imageFile: File | null
  ) => void;
}

const SolutionFormModal: React.FC<Props> = ({
  mode,
  data,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<SolutionCreateInput | SolutionType>({
    id: undefined,
    categoryTag: "",
    category: "",
    title: "",
    content: "",
    imageUrl: "",
    link: "",
    createdAt: "",
    updatedAt: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm(data);
    } else {
      setForm({
        categoryTag: "",
        category: "",
        title: "",
        content: "",
        imageUrl: "",
        link: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [mode, data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 로컬 미리보기용 URL 생성
    const localUrl = URL.createObjectURL(file);
    setImageFile(file);
    setForm((prev) => ({ ...prev, imageUrl: localUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, imageFile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "create" ? "솔루션 등록" : "솔루션 수정"}
        </h2>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            카테고리 태그
          </label>
          <input
            name="categoryTag"
            value={form.categoryTag}
            onChange={handleChange}
            placeholder="예: 도시 녹화 솔루션"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="">카테고리 선택</option>
            <option value="녹화시스템">녹화시스템</option>
            <option value="산림복원">산림복원</option>
            <option value="이끼정원">이끼정원</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">제목</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="예: 모스비"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">내용</label>
          <div className="border border-gray-300 rounded-lg">
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, content: value }))
              }
              className="rounded-lg"
              placeholder="솔루션 설명을 입력하세요"
            />
          </div>
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
            링크 (슬러그)
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="예: mosby"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
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

export default SolutionFormModal;
