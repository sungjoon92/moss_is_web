"use client";

import { ContactUsCreateInput } from "@/types";
import { DynamicReactQuill } from "@/utils/DynamicReactQuill";
import React, { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

interface Props {
  onClose: () => void;
  onsubmit?: (data: ContactUsCreateInput) => void;
}

const ContactUsForm: React.FC<Props> = ({ onClose, onsubmit }) => {
  const [form, setForm] = useState<ContactUsCreateInput>({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("질문글 등록이 완료되었습니다.");
    // 유효성 검사
    onsubmit?.(form);
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl bg-white rounded-md shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">질문글 등록</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="font-medium">제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              autoFocus
              className="w-full border rounded px-3 py-2 mt-1"
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

          <button
            type="submit"
            className="w-full bg-black text-white py-2 mt-4 rounded font-semibold"
          >
            무료 상담하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
