"use client";

import React, { useEffect, useState } from "react";
import AdminVideoSettings from "@/components/admin/category/home/AdminVideoSettings";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/lib/api/auth";
import { useAutoLogout } from "@/hooks/AutoLogout";
import AutoLogoutModal from "@/hooks/AutoLogoutModal";
import { CategoryTitle } from "@/components/admin/CategoryTitle";
import AdminProjectPage from "./category/project/page";
import AdminNewsPage from "./category/news/page";
import AdminSolutionPage from "./category/solution/page";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { showAlert, setShowAlert, resetMainTimer, modalCountdown } =
    useAutoLogout();

  const title = CategoryTitle(pathname);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await checkAuth();
        setAuthenticated(true);
      } catch (error) {
        console.error("에러로그:", error);
        router.replace("/admin/login");
      }
    };
    fetchAuth();
  }, [router]);

  if (authenticated === null)
    return <div className="text-center py-10">로딩 중...</div>;
  if (authenticated === false) return null;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-lime-700 mb-4">{title}</h1>
        <div className="bg-white shadow rounded-lg p-6 min-h-[300px]">
          {pathname === "/admin" && <p>대시보드 관리 페이지</p>}

          {pathname.startsWith("/admin/category/home") && (
            <AdminVideoSettings />
          )}
          {pathname.startsWith("/admin/category/enterprise") && (
            <p>🏢 기업소개 콘텐츠</p>
          )}
          {pathname.startsWith("/admin/category/solution") && (
            <AdminSolutionPage />
          )}
          {pathname.startsWith("/admin/category/project") && (
            <AdminProjectPage />
          )}
          {pathname.startsWith("/admin/category/news") && <AdminNewsPage />}

          {pathname.startsWith("/admin/users") && (
            <p>사용자 목록 관리 페이지</p>
          )}
          {pathname.startsWith("/admin/settings") && <p>설정 페이지입니다.</p>}
        </div>
      </main>

      {showAlert && (
        <AutoLogoutModal
          countdown={modalCountdown}
          onConfirm={() => {
            setShowAlert(false);
            resetMainTimer();
          }}
        />
      )}
    </div>
  );
}
