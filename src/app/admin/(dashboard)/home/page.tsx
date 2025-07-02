"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  getHomeList,
  createHome,
  updateHome,
  deleteHome,
} from "@/lib/api/home"; // API 함수들
import HomeFormModal from "@/components/admin/category/home/HomeFormModal";
import { HomeCreateInput, HomeType } from "@/types";
import Link from "next/link";
import { toCamelCase } from "@/utils/caseConverter";

const AdminHomePage: React.FC = () => {
  const [homeList, setHomeList] = useState<HomeType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"create" | "edit">("create");
  const [editData, setEditData] = useState<HomeType | null>(null);

  // 데이터 불러오기
  const fetchHomeList = async () => {
    try {
      const response = await getHomeList();
      setHomeList(response.data.map(toCamelCase));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHomeList();
  }, []);

  // 등록/수정 처리
  const handleSubmit = async (data: HomeType | HomeCreateInput) => {
    try {
      // 새로 추가할 데이터가 isMain === true일 경우 기존 메인 false 처리
      if (editMode === "create" && data.isMain) {
        for (const video of homeList) {
          if (video.isMain) {
            await updateHome(video.id, { ...video, isMain: false });
          }
        }
      }

      if (editMode === "create") {
        await createHome(data);
      } else if (editMode === "edit" && editData) {
        // 수정 모드에서 isMain이 true인 경우에도 처리
        if (data.isMain && !editData.isMain) {
          for (const video of homeList) {
            if (video.isMain && video.id !== editData.id) {
              await updateHome(video.id, { ...video, isMain: false });
            }
          }
        }

        await updateHome(editData.id, data);
      }

      setModalOpen(false);
      await fetchHomeList();
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteHome(id);
        await fetchHomeList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMainCheck = async (selectedId: number) => {
    try {
      // 1. 전체 비디오 리스트를 순회하며
      for (const video of homeList) {
        const isMain = video.id === selectedId;
        if (video.isMain !== isMain) {
          await updateHome(video.id, {
            ...video,
            isMain,
          });
        }
      }

      await fetchHomeList(); // 다시 불러와서 갱신
    } catch (err) {
      console.error("메인 체크 실패:", err);
    }
  };

  // 수정 버튼 클릭
  const handleEdit = (item: HomeType) => {
    setEditMode("edit");
    setEditData(item);
    setModalOpen(true);
  };

  // 새로 등록 버튼 클릭
  const handleCreateClick = () => {
    setEditMode("create");
    setEditData(null);
    setModalOpen(true);
  };

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">홈 영상 관리</h1>
        <button
          onClick={handleCreateClick}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          새 영상 등록
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center px-2">메인</th>
            <th className="border border-gray-300 px-4 py-2">영상 URL</th>
            <th className="border border-gray-300 px-4 py-2">링크 URL</th>
            <th className="border border-gray-300 px-4 py-2">미리보기</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              수정
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {homeList.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={item.isMain}
                  onChange={() => handleMainCheck(item.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.videoUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle break-all">
                {item.linkUrl}
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle">
                <Link
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ReactPlayer
                    src={item.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEdit(item)}
                >
                  수정
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2 align-middle text-center">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <HomeFormModal
          mode={editMode}
          data={editData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
