import type { AdminCategory } from "@/types";

export const adminCategories: AdminCategory[] = [
  { id: 1, name: "대시보드", key: "dashboard" },
  {
    id: 2,
    name: "카테고리",
    key: "category",
    children: [
      { label: "홈", path: "home" },
      { label: "기업소개", path: "enterprise" },
      { label: "솔루션", path: "solution" },
      { label: "프로젝트", path: "project" },
      { label: "소식", path: "news" },
    ],
  },
  { id: 3, name: "사용자 관리", key: "users" },
  { id: 4, name: "설정", key: "settings" },
];
