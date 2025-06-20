"use client";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="mt-4 text-gray-600 text-xl">페이지를 찾을 수 없습니다.</p>
      <p className="text-sm text-gray-400 mt-1">
        주소가 잘못되었거나 삭제된 페이지입니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
