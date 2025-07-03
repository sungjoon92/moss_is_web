"use client";

import React, { useState } from "react";
import ConsultationModal from "./ConsultationModal";
import { ConsultationCreateInput } from "@/types";
import { createConsultation } from "@/lib/api/consultation";

const FloatingButton: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSubmit = async (data: ConsultationCreateInput) => {
    try {
      await createConsultation(data);
      alert("상담 신청이 완료 되었습니다.");
    } catch (error) {
      console.error("Error creating consultation:", error);
      alert("문의 등록에 실패했습니다. 다시 시도해 주세요.");
      return;
    }
    setIsOpenModal(false);
  };
  return (
    <>
      <div
        onClick={() => setIsOpenModal(true)}
        className="fixed w-[120px] md:w-[160px] text-center bottom-8 right-[-30px] md:left-1/2 -translate-x-1/2 z-50 bg-green-400 text-white font-semibold px-6 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all cursor-pointer"
      >
        문의하기
      </div>

      {isOpenModal && (
        <ConsultationModal
          onsubmit={handleSubmit}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default FloatingButton;
