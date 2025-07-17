"use client";

import { ContactUsCreateInput, ContactUsType } from "@/types";
import { useEffect, useState } from "react";
import ContactUsCard from "./ContactUsCard";
import ContactUsForm from "./ContactUsForm";
import { createContactUs, getContactUsList } from "@/lib/api/contactus";
import "react-quill-new/dist/quill.snow.css";
import ContactUsDetailModal from "./ContactUsDetailModal";
import Container from "@/components/Container";
import { motion, AnimatePresence } from "framer-motion"; // 상단에 추가
import { toCamelCase } from "@/utils/caseConverter";
interface Props {
  initialContactData: ContactUsType[];
}

export default function ContactUsList({ initialContactData }: Props) {

  // SSR로 받은 첫번쨰 데이터만로 첫페이지 랜더링한 후에 페이지네이션시에 axios 호출
  const [contactData, setContactData] = useState<ContactUsType[]>(initialContactData);
  // form 모달
  const [isOpenModal, setIsOpenModal] = useState(false);
  // 클릭한 카드 디테일 모달
  const [selectedItem, setSelectedItem] = useState<ContactUsType | null>(null);
  // 페이지네이션
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 첫페이지 렌더링 여부확인 
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // 데이터 조회
  useEffect(() => {
    if (page === 1 && isInitialLoad) {
      setIsInitialLoad(false); // 초기 렌더링 데이터는 SSR 데이터라 판단 후 스킵
      return;
    }
    async function fetchPage() {
      try {
        const response = await getContactUsList({ page, limit, sort, order });
        const data = response.data.map(toCamelCase);
        setContactData(data)
      } catch (e) {
        console.error(e);
      }
    }

    fetchPage();
  }, [page, sort, order]);

  console.log(contactData);
  
  // 데이터 생성
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
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => setIsOpenModal(true)}
        >
          글쓰기
        </button>
      </div>

      {/* 게시글 리스트 - 카드형 */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactData.map((item) => (
          <motion.div
          layout
            layoutId={`contact-${item.id}`} // 클릭한 카드와 모달이 공유할 ID
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer"
          >
            <ContactUsCard item={item} />
          </motion.div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-2">
          <span>정렬:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {/* <option value="id">ID</option> */}
            <option value="created_at">작성일</option>
            <option value="title">제목</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
            className="border rounded px-2 py-1"
          >
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            이전
          </button>
          <span>페이지 {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            다음
          </button>
        </div>
      </div>


      {/* 클릭한 아이템 모달 */}
      <AnimatePresence>
        {selectedItem && (
          <ContactUsDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

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
