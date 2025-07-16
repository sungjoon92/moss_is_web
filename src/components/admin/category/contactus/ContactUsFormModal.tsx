"use client";

import React, { useState, useEffect } from "react";
import { ContactUsCreateInput, ContactUsType } from "@/types";
import "react-quill-new/dist/quill.snow.css";
import { DynamicReactQuill } from "@/utils/DynamicReactQuill";

interface Props {
  mode: "create" | "edit";
  data: ContactUsType | null;
  onClose: () => void;
  onSubmit: (data: ContactUsCreateInput | ContactUsType) => void;
}

const ContactUsFormModal: React.FC<Props> = ({
  mode,
  data,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ContactUsCreateInput>({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm(data);
    } else {
      setForm({
        title: "",
        content: "",
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
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단 유효성 검사
    if (!form.title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!form.content.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-white rounded-md shadow-lg p-6 space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {mode === "create" ? "질문 등록" : "질문 수정"}
        </h2>
        <div>
          <label className="block font-medium mb-1">제목</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <DynamicReactQuill
          theme="snow"
          value={form.content}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, content: value }))
          }
          className="rounded-lg"
          placeholder="질문 내용을 입력해주세요."
        />
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUsFormModal;
