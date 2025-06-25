import { NextResponse } from "next/server";
export async function POST() {
  // JWT 쿠키를 삭제
  const response = NextResponse.json({ message: "로그아웃 성공" });
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
