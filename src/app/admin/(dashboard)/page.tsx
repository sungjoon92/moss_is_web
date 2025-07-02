"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/lib/api/auth";
import { useAutoLogout } from "@/hooks/AutoLogout";
import AutoLogoutModal from "@/hooks/AutoLogoutModal";
import AdminProjectPage from "./project/page";
import AdminNewsPage from "./news/page";
import AdminSolutionPage from "./solution/page";
import AdminHomePage from "./home/page";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { showAlert, setShowAlert, resetMainTimer, modalCountdown } =
    useAutoLogout();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("에러로그:", error);
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuth();
  }, [router]);

  // /admin으로 접근하면 자동 리디렉션
  useEffect(() => {
    if (pathname === "/admin") {
      router.replace("/admin/home");
    }
  }, [pathname, router]);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-lime-700 mb-4"></h1>
        <div className="bg-white shadow rounded-lg p-6 min-h-[300px]">
          {pathname.startsWith("/admin/home") && <AdminHomePage />}
          {pathname.startsWith("/admin/solution") && <AdminSolutionPage />}
          {pathname.startsWith("/admin/project") && <AdminProjectPage />}
          {pathname.startsWith("/admin/news") && <AdminNewsPage />}

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
