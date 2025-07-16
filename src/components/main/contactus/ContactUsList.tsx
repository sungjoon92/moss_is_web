"use client";

import { ContactUsCreateInput, ContactUsType } from "@/types";
import { useState } from "react";
import ContactUsCard from "./ContactUsCard";
import ContactUsForm from "./ContactUsForm";
import { createContactUs } from "@/lib/api/contactus";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";
import ContactUsDetailModal from "./ContactUsDetailModal";
import Container from "@/components/Container";

interface Props {
  ContactData: ContactUsType[];
}

export default function ContactUsList({ ContactData }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContactUsType | null>(null);
  console.log(isOpenModal);


  const handleSubmit = async (data: ContactUsCreateInput) => {
    try {
      await createContactUs(data);
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
    }
    setIsOpenModal(false);
  };
  return (
    <Container className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">질문 게시판</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setIsOpenModal(true)}
        >
          글쓰기
        </button>
      </div>

      {/* 게시글 리스트 - 카드형 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ContactData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer"
          >
            <ContactUsCard item={item} />
          </div>
        ))}
      </div>

      {/* 클릭한 아이템 모달 */}
      {selectedItem && (
        <ContactUsDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* 입력용 form 모달 */}
      {isOpenModal && (
        <ContactUsForm
          onsubmit={handleSubmit}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </Container>
  );
}
