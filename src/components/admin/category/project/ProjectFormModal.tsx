"use client";

import React, { useEffect, useState } from "react";
import { ProjectType, ProjectCreateInput } from "@/types";
import Image from "next/image";
import { DynamicReactQuill } from "@/utils/DynamicReactQuill";
import "react-quill-new/dist/quill.snow.css";

interface Props {
  mode: "create" | "edit";
  data: ProjectType | null;
  onClose: () => void;
  onSubmit: (
    data: ProjectCreateInput | ProjectType,
    imageFile: File | null,
    detailImageFiles: File[],
    removedImageUrls: string[]
  ) => void;
  detailImageFiles: File[];
  setDetailImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ProjectFormModal: React.FC<Props> = ({
  mode,
  data,
  onClose,
  onSubmit,
  detailImageFiles,
  setDetailImageFiles,
}) => {
  const [form, setForm] = useState<ProjectCreateInput | ProjectType>({
    category: "",
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    contentTitle: "",
    contentText: "",
    contentImages: [],
    createdAt: "",
    updatedAt: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const allImages = [...(form.contentImages || []), ...previewImages];
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm({
        ...data,
        contentImages:
          typeof data.contentImages === "string"
            ? JSON.parse(data.contentImages)
            : data.contentImages || [],
      });
      // previewImages는 초기화
      setPreviewImages([]);
    } else {
      setForm({
        category: "",
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        contentTitle: "",
        contentText: "",
        contentImages: [],
        createdAt: "",
        updatedAt: "",
      });
      setPreviewImages([]);
    }
  }, [mode, data]);

  // input 데이터 변경값
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 프로젝트 본문 이미지
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImageFile(file);
    setForm((prev) => ({ ...prev, imageUrl: localUrl }));
  };

  // 프로젝트 디테일 페이지 이미지
  const handleDetailImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setDetailImageFiles((prev) => [...prev, ...Array.from(files)]);

    const newPreviewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
  };

  // 이미지 삭제
  const handleRemoveImage = (url: string) => {
    setRemovedImageUrls((prev) => [...prev, url]);
    setForm((prev) => ({
      ...prev,
      contentImages: prev.contentImages.filter((img) => img !== url),
    }));
  };

  // form 제출시 onsubmit 상위 컴포넌트로 props전달
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, imageFile, detailImageFiles, removedImageUrls);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "create" ? "프로젝트 등록" : "프로젝트 수정"}
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">카테고리</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="예: 도시 재생"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">제목</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="프로젝트 제목"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">주소</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="예: 강원특별자치도 강릉시, 대한민국"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
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
            프로젝트 시작일
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            프로젝트 종료일
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            디테일 페이지 제목
          </label>
          <input
            name="contentTitle"
            value={form.contentTitle}
            onChange={handleChange}
            placeholder="디테일 페이지 제목"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            디테일 페이지 본문
          </label>
          <div className="border border-gray-300 rounded-lg">
            <DynamicReactQuill
              theme="snow"
              value={form.contentText}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, contentText: value }))
              }
              className="rounded-lg"
              placeholder="솔루션 설명을 입력하세요"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            디테일 페이지 이미지 업로드
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleDetailImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <div className="flex flex-wrap gap-2">
            {allImages.map((item, index) => {
              const isPreview = item.startsWith("blob:");
              const isRemoved = removedImageUrls.includes(item);

              if (isRemoved) return null;

              return (
                <div key={index} className="relative">
                  <Image
                    width={1000}
                    height={1000}
                    src={item}
                    alt={`이미지 ${index + 1}`}
                    className="mt-2 w-20 max-w-xs rounded border"
                  />
                  {!isPreview && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(item)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
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

export default ProjectFormModal;
