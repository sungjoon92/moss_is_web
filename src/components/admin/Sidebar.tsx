"use client";

import { adminCategories } from "@/data/adminCategories";
import { useState } from "react";

interface SidebarProps {
  selected: string;
  setSelected: (key: string) => void;
  subSelected: string;
  setSubSelected: (key: string) => void;
}

export default function Sidebar({
  selected,
  setSelected,
  subSelected,
  setSubSelected,
}: SidebarProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <aside className="w-64 bg-lime-100 border-r border-lime-300 p-6">
      <h2 className="text-2xl font-bold text-lime-700 mb-6">관리자 메뉴</h2>
      <nav className="space-y-2">
        {adminCategories.map((item) => {
          const isCategory = item.key === "category";

          return (
            <div key={item.key} className="relative">
              <button
                onClick={() => {
                  if (isCategory) {
                    setCategoryOpen(!categoryOpen);
                    setSelected(item.key);
                    setSubSelected(item.children ? item.children[0] : "");
                  } else {
                    setSelected(item.key);
                    setCategoryOpen(false);
                    setSubSelected("");
                  }
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                  selected === item.key
                    ? "bg-lime-500 text-white"
                    : "text-lime-800 hover:bg-lime-200"
                }`}
              >
                {item.name}
              </button>

              {/* 카테고리 열려있을 때 하위 메뉴 노출 */}
              {isCategory && categoryOpen && item.children && (
                <ul className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li
                      key={child}
                      className={`text-lime-800 text-sm cursor-pointer px-2 py-1 rounded hover:underline hover:bg-lime-200 ${
                        subSelected === child ? "font-semibold bg-lime-300" : ""
                      }`}
                      onClick={() => {
                        setSubSelected(child);
                      }}
                    >
                      {child}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          location.reload();
        }}
        className="mt-10 px-4 py-2 w-full rounded hover:bg-red-500 hover:text-white transition"
      >
        로그아웃
      </button>
    </aside>
  );
}
