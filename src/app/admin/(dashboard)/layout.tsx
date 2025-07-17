"use client"

import Sidebar from "@/components/admin/Sidebar";
import { useAutoLogout } from "@/hooks/AutoLogout";
import AutoLogoutModal from "@/hooks/AutoLogoutModal";
import { checkAuth } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { showAlert, setShowAlert, resetMainTimer, modalCountdown } = useAutoLogout();

  useEffect(() => {
    async function fetchAuth() {
      try {
        await checkAuth();
      } catch {
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuth();
  }, [router]);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>

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
