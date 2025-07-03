"use client";

import { LoginForm } from "@/components/admin/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <LoginForm
        onLoginSuccess={() => {
          router.push("/admin");
        }}
      />
    </div>
  );
}
