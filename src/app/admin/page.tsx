"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { adminCategories } from "@/data/adminCategories";
import AdminVideoSettings from "@/components/admin/category/home/AdminVideoSettings";
import AdminSolutionManager from "@/components/admin/category/solution/AdminSolutionManager";
import AdminProjectManager from "@/components/admin/category/project/AdminProjectManager";
import AdminNewsManager from "@/components/admin/category/news/AdminNewsManager";
import { LoginForm } from "@/components/admin/auth/LoginForm";
import { solutionData } from "@/data/solutionData";
import { projectData } from "@/data/projectData";
import { NewsData } from "@/data/newsData";

export default function AdminPage() {
  const [selected, setSelected] = useState("dashboard");
  const [subSelected, setSubSelected] = useState("홈"); // 기본값은 '홈'

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 로그인정보 backend에서 받을시에 사용
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   setIsLoggedIn(!!token);
  //   setLoading(false);
  // }, []);

  // if (loading) return <div className="p-8 text-gray-500">로딩 중...</div>;

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selected={selected}
        setSelected={setSelected}
        subSelected={subSelected}
        setSubSelected={setSubSelected}
      />  
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-lime-700 mb-4">
          {adminCategories.find((c) => c.key === selected)?.name ?? selected}
          {selected === "category" ? ` > ${subSelected}` : ""}
        </h1>

        <div className="bg-white shadow rounded-lg p-6 min-h-[300px]">
          {selected === "dashboard" && <p>대시보드 관리 페이지</p>}

          {selected === "category" && (
            <>
              {subSelected === "홈" && <AdminVideoSettings />}
              {subSelected === "기업소개" && <p>🏢 기업소개 콘텐츠</p>}
              {subSelected === "솔루션" && (
                <AdminSolutionManager data={solutionData} />
              )}
              {subSelected === "프로젝트" && (
                <AdminProjectManager data={projectData} />
              )}
              {subSelected === "소식" && <AdminNewsManager data={NewsData} />}
            </>
          )}

          {selected === "users" && <p>사용자 목록 관리 페이지</p>}
          {selected === "settings" && <p>설정 페이지입니다.</p>}
        </div>
      </main>
    </div>
  );
}
