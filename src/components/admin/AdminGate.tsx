"use client";

import React, { useEffect, useState } from "react";
import { LoginForm } from "@/components/admin/auth/LoginForm";
import AdminPage from "@/app/admin/(side)/page";

export default function AdminGate() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500">로딩 중...</div>;
  }

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <AdminPage />;
}
