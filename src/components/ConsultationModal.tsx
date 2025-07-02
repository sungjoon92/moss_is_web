"use client";

import React from "react";

interface ConsultationModalProps {
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl bg-white rounded-md shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">상담 신청</h2>

        <form className="space-y-4 text-sm">
          <div>
            <label className="font-medium">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">
              담당자 성함/직책 <span className="text-red-500">*</span>
            </label>
            <input className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">연락처</label>
            <input className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">문의사항</label>
            <textarea
              className="w-full border rounded px-3 py-2 mt-1"
              rows={4}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              알게된 경로 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 pl-1">
              {["블로그", "인스타그램", "네이버 검색", "구글 검색", "기타"].map(
                (item, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input type="radio" name="ref" />
                    <span>{item}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="font-medium block mb-1">
              개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
            </label>
            <div className="overflow-y-scroll h-96 whitespace-pre-wrap p-4 text-sm border rounded bg-gray-50 leading-relaxed">
              {/* 개인정보 내용 샘플 */}
              개인정보 내용 넣을곳
              {/* {privacyPolicyText} */}
            </div>
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
          </div>

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

export default ConsultationModal;
