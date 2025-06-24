import type { AdminCategory } from "@/types";

export const adminCategories: AdminCategory[] = [
  { name: "대시보드", key: "dashboard" },
  {
    name: "카테고리",
    key: "category",
    children: ["홈", "기업소개", "솔루션", "프로젝트", "소식"],
  },
  { name: "사용자 관리", key: "users" },
  { name: "설정", key: "settings" },
];
