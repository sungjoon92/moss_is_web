"use client";
import { useState } from "react";
import { SolutionType } from "@/types";
import Image from "next/image";

interface Props {
  onSubmit: (data: SolutionType) => void;
}

const SolutionForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<SolutionType>({
    categoryTag: "",
    category: "",
    title: "",
    content: "",
    imageUrl: "",
    link: "",
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
      const localUrl = URL.createObjectURL(file); // 미리보기용 로컬 URL
      setForm((prev) => ({ ...prev, imageUrl: localUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      categoryTag: "",
      category: "",
      title: "",
      content: "",
      imageUrl: "",
      link: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6 border"
    >
      <h2 className="text-xl font-semibold text-gray-800">솔루션 등록</h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          카테고리 태그
        </label>
        <input
          name="categoryTag"
          value={form.categoryTag}
          onChange={handleChange}
          placeholder="예: 도시 녹화 솔루션"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">카테고리</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">내용</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="솔루션 설명을 입력하세요"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
      </div>

      {/* 이미지 업로드 input */}
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

      {/* 슬러그 */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          링크 (슬러그)
        </label>
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="예: mosby"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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

export default SolutionForm;
