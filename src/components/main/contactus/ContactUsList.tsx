"use client";

import { ContactUsCreateInput, ContactUsType } from "@/types";
import { useEffect, useState } from "react";
import ContactUsForm from "./ContactUsForm";
import { createContactUs, getContactUsList } from "@/lib/api/contactus";
import "react-quill-new/dist/quill.snow.css";
import ContactUsDetailModal from "./ContactUsDetailModal";
import Container from "@/components/Container";
import { toCamelCase } from "@/utils/caseConverter";
import { formatDateTime } from "@/utils/formatDate";
import { AnimatePresence } from "framer-motion";
interface Props {
  initialContactData: ContactUsType[];
}

export default function ContactUsList({ initialContactData }: Props) {
  // SSR로 받은 첫번쨰 데이터만로 첫페이지 랜더링한 후에 페이지네이션시에 axios 호출
  const [contactData, setContactData] =
    useState<ContactUsType[]>(initialContactData);
  // form 모달
  const [isOpenModal, setIsOpenModal] = useState(false);
  // 클릭한 카드 디테일 모달
  const [selectedItem, setSelectedItem] = useState<ContactUsType | null>(null);
  // 페이지네이션
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 첫페이지 렌더링 여부확인
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 데이터 조회
  useEffect(() => {
    // 초기 렌더링 데이터는 SSR 데이터라 판단 후 스킵
    if (page === 1 && isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    const fetchPage = async () => {
      try {
        const response = await getContactUsList({
          page,
          limit,
          sort,
          order,
        });

        const data = response.data.map(toCamelCase);
        setContactData(data);
      } catch (e) {
        console.error(e);
      }
    };

    if (page === 1 && isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    fetchPage();
  }, [page, sort, order]);

  // 데이터 생성
  const handleSubmit = async (data: ContactUsCreateInput) => {
    try {
      await createContactUs(data);
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
    }
    setIsOpenModal(false);
  };
  console.log(contactData);
  return (
    <Container className="max-w-7xl mx-auto px-4">
      {/* 게시글 리스트 - 카드형
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
      </div> */}

      {/* 게시글 리스트 - 리스트형 */}

      <div className="flex justify-between mb-5">
        {/* 제목 */}
        <h1 className="text-xl font-bold">질문게시판</h1>
        {/* 글쓰기 버튼 */}
        <button
          onClick={() => setIsOpenModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          글쓰기
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto border-t border-black">
        <table className="min-w-full table-fixed text-sm border-collapse">
          <thead>
            <tr className="border-b border-black text-black font-semibold">
              <th className="w-16 px-4 py-3 text-center">번호</th>
              <th className="px-4 py-3 text-center">제목</th>
              <th className="w-40 px-4 py-3 text-center">등록일</th>
            </tr>
          </thead>
          <tbody>
            {contactData.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  등록된 자료가 없습니다.
                </td>
              </tr>
            ) : (
              contactData.map((item, idx) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-gray-50 cursor-pointer border-b"
                >
                  <td className="text-center py-3">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="py-3 px-4 truncate">{item.title}</td>
                  <td className="text-center py-3">
                    {formatDateTime(item.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 gap-1">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="border px-2 py-1 disabled:opacity-50"
        >
          ≪
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="border px-2 py-1 disabled:opacity-50"
        >
          &lt;
        </button>
        <span className="border px-3 py-1 bg-black text-white">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="border px-2 py-1"
        >
          &gt;
        </button>
        <button
          onClick={() => setPage((p) => p + 10)}
          className="border px-2 py-1"
        >
          ≫
        </button>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selectedItem && (
          <ContactUsDetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

      {isOpenModal && (
        <ContactUsForm
          onsubmit={(e) => handleSubmit(e)}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </Container>
  );
}
