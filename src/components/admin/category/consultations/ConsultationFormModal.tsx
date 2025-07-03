"use client";

import React, { useState, useEffect } from "react";
import { ConsultationCreateInput, ConsultationType } from "@/types";

interface Props {
  mode: "create" | "edit";
  data: ConsultationType | null;
  onClose: () => void;
  onSubmit: (data: ConsultationCreateInput | ConsultationType) => void;
}

const ConsultationFormModal: React.FC<Props> = ({
  mode,
  data,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ConsultationCreateInput>({
    companyName: "",
    managerName: "",
    tel: "",
    message: "",
    referrer: "",
    agreePrivacy: false,
    status: "접수",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm(data);
    } else {
      setForm({
        companyName: "",
        managerName: "",
        tel: "",
        message: "",
        referrer: "",
        agreePrivacy: false,
        status: "접수",
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
    if (!form.companyName.trim()) {
      alert("회사명을 입력해 주세요.");
      return;
    }
    if (!form.managerName.trim()) {
      alert("담당자 성함/직책을 입력해 주세요.");
      return;
    }
    if (!form.tel.trim()) {
      alert("연락처를 입력해 주세요.");
      return;
    }
    if (!form.referrer.trim()) {
      alert("알게 된 경로를 선택해 주세요.");
      return;
    }
    if (!form.agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
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
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {mode === "create" ? "상담 등록" : "상담 수정"}
        </h2>
        <div>
          <label className="block font-medium mb-1">회사명</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">담당자 성함/직책</label>
          <input
            name="managerName"
            value={form.managerName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">연락처</label>
          <input
            name="tel"
            value={form.tel}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">문의사항</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">알게 된 경로</label>
          <div className="space-y-2 pl-1">
            {["블로그", "인스타그램", "네이버 검색", "구글 검색", "기타"].map(
              (item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="referrer"
                    value={item}
                    checked={form.referrer === item}
                    onChange={handleChange}
                  />
                  <span>{item}</span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="agreePrivacy"
            type="checkbox"
            name="agreePrivacy"
            checked={form.agreePrivacy}
            onChange={handleChange}
          />
          <label htmlFor="agreePrivacy" className="text-sm select-none">
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">문의 상태</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="접수">접수</option>
            <option value="처리중">처리중</option>
            <option value="완료">완료</option>
            <option value="보류">보류</option>
          </select>
        </div>
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

export default ConsultationFormModal;
