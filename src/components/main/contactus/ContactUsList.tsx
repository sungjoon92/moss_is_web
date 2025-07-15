"use client";

import { ContactUsCreateInput, ContactUsType } from "@/types";
import { useState } from "react";
import ContactUsCard from "./ContactUsCard";
import ContactUsForm from "./ContactUsForm";
import { createContactUs } from "@/lib/api/contactus";

interface Props {
  ContactData: ContactUsType[];
}

export default function ContactUsList({ ContactData }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSubmit = async (data: ContactUsCreateInput) => {
    try {
      await createContactUs(data);
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
    }
    setIsOpenModal(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        {/* 상단 */}
        <h1 className="text-3xl font-bold text-gray-800">질문 게시판</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setIsOpenModal(true)}
        >
          글쓰기
        </button>
      </div>

      {/* 게시글 리스트 - 카드형 */}
      {ContactData.map((item) => {
        return <ContactUsCard key={item.id} item={item} />;
      })}

      {isOpenModal && (
        <div className="flex gap-6">
          {ContactData.map((item) => (
            <ContactUsForm
              key={item.id}
              onsubmit={handleSubmit}
              onClose={() => setIsOpenModal(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
