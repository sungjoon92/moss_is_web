"use client";

import React, { useEffect, useState } from "react";
import { ConsultationType, ConsultationCreateInput } from "@/types";
import {
  createConsultation,
  deleteConsultation,
  getConsultations,
  updateConsultation,
} from "@/lib/api/consultation";
import { toCamelCase } from "@/utils/caseConverter";
import AdminConsultationList from "@/components/admin/category/consultations/AdminConsultationList";
import ConsultationFormModal from "@/components/admin/category/consultations/ConsultationFormModal";

const AdminConsultationPage: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationType[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<ConsultationType | null>(null);

  // 상담 데이터 불러오기
  const fetchConsultations = React.useCallback(async () => {
    try {
      const response = await getConsultations({ page, limit, sort, order });
      const data = response.data.map(toCamelCase);
      setConsultations(data);
    } catch (error) {
      console.error(error);
    }
  }, [page, limit, sort, order]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  // 등록/수정 처리
  const handleSubmit = async (
    data: ConsultationCreateInput | ConsultationType
  ) => {
    try {
      if (editMode === "create") {
        await createConsultation(data as ConsultationCreateInput);
      } else if (editMode === "edit" && "id" in data) {
        await updateConsultation(data.id, data);
      }
      setModalOpen(false);
      await fetchConsultations();
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    }
  };

  // 문의 상태 변경 처리
  // 상태는 "접수", "처리중", "완료", "보류" 중 하나로 설정
  // 상태 변경 시 API 호출 후 목록 새로고침
  const handleEditStatus = async (id: number, status: string) => {
    try {
      await updateConsultation(id, { status });
      await fetchConsultations();
    } catch {
      alert("상태 변경 실패");
    }
  };

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteConsultation(id);
        await fetchConsultations();
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 수정 버튼 클릭
  const handleEdit = (consultation: ConsultationType) => {
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

        <AdminConsultationList
          data={consultations}
          onDelete={handleDelete}
          onEdit={handleEdit}
          page={page}
          onPageChange={setPage}
          sort={sort}
          order={order}
          onSortChange={setSort}
          onOrderChange={setOrder}
          onEditStatus={handleEditStatus}
        />
      </div>

      {modalOpen && (
        <ConsultationFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AdminConsultationPage;
