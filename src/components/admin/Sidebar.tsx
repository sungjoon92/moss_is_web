"use client";
import { adminCategories } from "@/data/adminCategories";
import { logout } from "@/lib/api/auth";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 경로에서 마지막 부분을 기준으로 selected 체크
  // 예: /admin/solution -> selectedPath = 'solution'
  const selectedPath = pathname.split("/")[2] || "";

  const handleClick = (path: string) => {
    router.push(`/admin/${path}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/admin/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <aside className="w-64 bg-lime-100 border-r border-lime-300 p-6">
      <h2 className="text-2xl font-bold text-lime-700 mb-6">관리자 메뉴</h2>
      <nav className="space-y-2">
        {adminCategories.map((item) => {
          const isSelected = selectedPath === item.path;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.path)}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                isSelected
                  ? "bg-lime-500 text-white"
                  : "text-lime-800 hover:bg-lime-200"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 px-4 py-2 w-full rounded hover:bg-red-500 hover:text-white transition"
      >
        로그아웃
      </button>
    </aside>
  );
}
