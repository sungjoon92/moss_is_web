"use client";

import React, { useEffect, useState } from "react";
import { ContactUsCreateInput, ContactUsType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import { createContactUs, deleteContactUs, getContactUsList, updateContactUs } from "@/lib/api/contactus";
import AdminContactUsList from "@/components/admin/category/contactus/AdminContactUsList";
import ContactUsFormModal from "@/components/admin/category/contactus/ContactUsFormModal";

const AdminContactUsPage: React.FC = () => {
  const [consultations, setConsultations] = useState<ContactUsType[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<ContactUsType | null>(null);

  // 상담 데이터 불러오기
  const fetchContactUs = React.useCallback(async () => {
    try {
      const response = await getContactUsList({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setConsultations(data);
    } catch (error) {
      console.error(error);
    }
  }, [page, limit, sort, order]);

  useEffect(() => {
    fetchContactUs();
  }, [fetchContactUs]);

  // 등록/수정 처리
  const handleSubmit = async (
    data: ContactUsCreateInput | ContactUsType
  ) => {
    try {
      if (editMode === "create") {
        await createContactUs(data as ContactUsCreateInput);
      } else if (editMode === "edit" && "id" in data) {
        await updateContactUs(data.id, data);
      }
      setModalOpen(false);
      await fetchContactUs();
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    }
  };

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteContactUs(id);
        await fetchContactUs();
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 수정 버튼 클릭
  const handleEdit = (consultation: ContactUsType) => {
    setEditMode("edit");
    setEditData(consultation);
    setModalOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">상담 목록</h1>
        </div>

        <AdminContactUsList
          data={consultations}
          onDelete={handleDelete}
          onEdit={handleEdit}
          page={page}
          onPageChange={setPage}
          sort={sort}
          order={order}
          onSortChange={setSort}
          onOrderChange={setOrder}
        />
      </div>

      {modalOpen && (
        <ContactUsFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminContactUsPage;
