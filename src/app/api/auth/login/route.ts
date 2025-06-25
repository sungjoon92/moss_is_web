import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Supabase 로그인 시도
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { access_token, refresh_token, expires_in } = data.session;

  // access_token 쿠키 설정
  const accessTokenCookie = serialize("token", access_token, {
    httpOnly: true,
    path: "/",
    maxAge: expires_in, // 1시간
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // refresh_token 쿠키 설정
  const refreshTokenCookie = serialize("refresh_token", refresh_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 1개월
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // 응답에 쿠키 추가
  const response = NextResponse.json({ message: "로그인 성공" });
  response.headers.append("Set-Cookie", accessTokenCookie);
  response.headers.append("Set-Cookie", refreshTokenCookie);

  return response;
}
