"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ContactUsType, ContactUsCreateInput } from "@/types";
import { getContactUsList, createContactUs } from "@/lib/api/contactus";
import ContactUsForm from "./ContactUsForm";
import ContactUsDetailModal from "./ContactUsDetailModal";
import Container from "@/components/Container";
import { toCamelCase } from "@/utils/caseConverter";
import { formatDateTime } from "@/utils/formatDate";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
interface Props {
  initialContactData: ContactUsType[];
  initialTotal: number;
  initialPage: number;
  initialLimit: number;
  initialSort: string;
  initialOrder: "asc" | "desc";
}

export default function ContactUsList({
  initialContactData,
  initialTotal,
  initialPage,
  initialLimit,
  initialSort,
  initialOrder,
}: Props) {
  const [contactData, setContactData] = useState(initialContactData);
  const [totalItems, setTotalItems] = useState(initialTotal);

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? String(initialPage), 10);
  const limit = parseInt(searchParams.get("limit") ?? String(initialLimit), 10);
  const sort = searchParams.get("sort") ?? initialSort;
  const order = (searchParams.get("order") as "asc" | "desc") ?? initialOrder;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContactUsType | null>(null);
  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    const fetchPage = async () => {
      const response = await getContactUsList({ page, limit, sort, order });
      const camelData = response.data.data.map(toCamelCase);
      setContactData(camelData);
      setTotalItems(response.data.total);
    };

    fetchPage();
  }, [page, limit, sort, order]);

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    router.push(`/contactus?${params.toString()}`);
  };

  const onPageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };

  const handleSubmit = async (data: ContactUsCreateInput) => {
    try {
      await createContactUs(data);
      setIsOpenModal(false);
      updateParams({ page: 1 }); // 새 글 작성 시 1페이지로 이동
    } catch (e) {
      console.error(e);
    }
  };

  const getPageNumbers = () => {
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, page + half);
    if (end - start + 1 < maxButtons) {
      if (start === 1) end = Math.min(totalPages, start + maxButtons - 1);
      else if (end === totalPages) start = Math.max(1, end - maxButtons + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <Container className="max-w-7xl mx-auto px-4">
      {/* 헤더 + 글쓰기 */}
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-bold">질문게시판</h1>
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
                  <td className="text-center py-3">{(page - 1) * limit + idx + 1}</td>
                  <td className="py-3 px-4 truncate">{item.title}</td>
                  <td className="text-center py-3">{formatDateTime(item.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 gap-1">
        {/* 맨 처음 */}
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={`border px-2 py-1 rounded flex items-center justify-center w-8 h-8
      ${page === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-300" : "hover:bg-gray-100"}
    `}
        >
          <ChevronsLeft size={16} />
        </button>

        {/* 이전 */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`border px-2 py-1 rounded flex items-center justify-center w-8 h-8
      ${page === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-300" : "hover:bg-gray-100"}
    `}
        >
          <ChevronLeft size={16} />
        </button>

        {/* 숫자 버튼 */}
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`border px-3 py-1 rounded w-8 h-8 flex items-center justify-center
        ${p === page ? "bg-black text-white" : "hover:bg-gray-100"}
      `}
          >
            {p}
          </button>
        ))}

        {/* 다음 */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`border px-2 py-1 rounded flex items-center justify-center w-8 h-8
      ${page === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-300" : "hover:bg-gray-100"}
    `}
        >
          <ChevronRight size={16} />
        </button>

        {/* 맨 끝 */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={`border px-2 py-1 rounded flex items-center justify-center w-8 h-8
      ${page === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-300" : "hover:bg-gray-100"}
    `}
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selectedItem && (
          <ContactUsDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
      {isOpenModal && (
        <ContactUsForm onsubmit={handleSubmit} onClose={() => setIsOpenModal(false)} />
      )}
    </Container>
  );
}
