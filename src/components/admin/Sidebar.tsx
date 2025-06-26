"use client";
import { adminCategories } from "@/data/adminCategories";
import { logout } from "@/lib/api/auth";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  let selected = "dashboard";
  let subSelectedPath = "";

  if (pathname.startsWith("/admin/category")) {
    selected = "category";
    const parts = pathname.split("/");
    subSelectedPath = parts[3] || "";
  } else if (pathname === "/admin") {
    selected = "dashboard";
  } else if (pathname.startsWith("/admin/users")) {
    selected = "users";
  } else if (pathname.startsWith("/admin/settings")) {
    selected = "settings";
  }

  const handleClick = (key: string, path?: string) => {
    if (key === "category" && path) {
      router.push(`/admin/category/${path}`);
    } else if (key === "dashboard") {
      router.push("/admin");
    } else {
      router.push(`/admin/${key}`);
    }
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
          const isCategory = item.key === "category";
          const isSelected = selected === item.key;

          return (
            <div key={item.key} className="relative">
              <button
                onClick={() => {
                  if (isCategory) {
                    const first = item.children?.[0];
                    if (first) handleClick(item.key, first.path);
                  } else {
                    handleClick(item.key);
                  }
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                  isSelected
                    ? "bg-lime-500 text-white"
                    : "text-lime-800 hover:bg-lime-200"
                }`}
              >
                {item.name}
              </button>

              {isCategory && isSelected && item.children && (
                <ul className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li
                      key={child.path}
                      className={`text-lime-800 text-sm cursor-pointer px-2 py-1 rounded hover:underline hover:bg-lime-200 ${
                        subSelectedPath === child.path
                          ? "font-semibold bg-lime-300"
                          : ""
                      }`}
                      onClick={() => handleClick(item.key, child.path)}
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
