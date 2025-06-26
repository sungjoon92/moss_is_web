import { adminCategories } from "@/data/adminCategories";

export function CategoryTitle(pathname: string) {
  // /admin/category/solution 이런 경로라 가정
  const parts = pathname.split("/").filter(Boolean); // ["admin", "category", "solution"]

  // 1) 첫 번째 키 찾기: admin 제외하고
  if (parts[0] !== "admin") return "관리자 페이지";

  // 2) 최상위 메뉴 key
  const mainKey = parts[1] || "dashboard"; // 예: category, users, dashboard 등

  if (mainKey === "dashboard") {
    // 대시보드는 그냥 이름 바로 반환
    const dashboard = adminCategories.find((c) => c.key === "dashboard");
    return dashboard?.name ?? "대시보드";
  }

  // 3) mainKey에 해당하는 카테고리 객체 찾기
  const mainCategory = adminCategories.find((c) => c.key === mainKey);
  if (!mainCategory) return "관리자 페이지";

  // 4) 만약 children이 없으면 바로 mainCategory.name 반환
  if (!mainCategory.children) return mainCategory.name;

  // 5) 서브 경로 (path) 추출
  const subPath = parts[2] || "";

  // 6) children 중 path가 subPath인 항목 찾기
  const subCategory = mainCategory.children.find(
    (child) => child.path === subPath
  );
  if (subCategory) return subCategory.label;

  // 7) 기본은 mainCategory.name
  return mainCategory.name;
}
