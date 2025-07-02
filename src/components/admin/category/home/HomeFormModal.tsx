"use client";

import { HomeCreateInput, HomeType } from "@/types";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  mode: "create" | "edit";
  data: HomeType | null;
  onClose: () => void;
  onSubmit: (data: HomeType | HomeCreateInput) => void;
}

const HomeFormModal: React.FC<Props> = ({ mode, data, onClose, onSubmit }) => {
  const [form, setForm] = useState<HomeType | HomeCreateInput>({
    linkUrl: "",
    videoUrl: "",
    createdAt: "",
    updatedAt: "",
    isMain: false,
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setForm(data);
    } else {
      setForm({
        linkUrl: "",
        videoUrl: "",
        createdAt: "",
        updatedAt: "",
        isMain: false,
      });
    }
  }, [mode, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl p-6 space-y-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800">
          {mode === "create" ? "홈 영상 등록" : "홈 영상 수정"}
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">영상 URL</label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="예: https://youtube.com/xxx"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">링크 URL</label>
          <input
            name="linkUrl"
            value={form.linkUrl}
            onChange={handleChange}
            placeholder="예: https://www.youtube.com/xxx"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="aspect-video">
          <a href={form.linkUrl} target="_blank" rel="noopener noreferrer">
            <ReactPlayer
              src={form.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          </a>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            메인 비디오 여부
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isMain"
              checked={form.isMain}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isMain: e.target.checked }))
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">
              {form.isMain ? "✅ 메인 비디오로 설정됨" : "❌ 메인 아님"}
            </span>
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

export default HomeFormModal;
