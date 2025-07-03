import { NextResponse } from "next/server";
import { serialize } from "cookie";

interface RefreshRequestBody {
  refresh_token?: string;
}

export async function POST(request: Request) {
  // 클라이언트에서 전달받은 refresh_token 추출
  const body: RefreshRequestBody = await request.json();
  const refresh_token = body.refresh_token;

  // refresh_token 없으면 400 에러 응답
  if (!refresh_token) {
    return NextResponse.json(
      { error: "refresh_token required" },
      { status: 400 }
    );
  }

  // Supabase 환경변수 불러오기 (서버 비밀키 포함)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 환경변수가 없으면 500 에러 반환
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Missing Supabase env variables" },
      { status: 500 }
    );
  }

  try {
    // Supabase 토큰 갱신 API 호출 (refresh_token 사용)
    const response = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          apiKey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );

    // 응답 실패 시, 에러 메시지와 함께 401 반환
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to refresh token", details: errorData },
        { status: 401 }
      );
    }

    // 새 토큰 데이터 파싱
    const data = await response.json();
    const { access_token, refresh_token: newRefreshToken, expires_in } = data;

    // 새 액세스 토큰을 HTTP-Only 쿠키에 저장
    const tokenCookie = serialize("token", access_token, {
      httpOnly: true, // JS에서 접근 불가
      secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 전송
      maxAge: expires_in, // 토큰 만료시간 (초 단위)
      path: "/", // 전체 경로에 적용
      sameSite: "lax", // CSRF 방지 정책
    });

    // 새 리프레시 토큰을 HTTP-Only 쿠키에 저장 (30일 만료)
    const refreshCookie = serialize("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: "/",
      sameSite: "lax",
    });

    // 쿠키 헤더에 추가하여 응답 생성
    const res = NextResponse.json(
      { message: "Token refreshed" },
      { status: 200 }
    );
    res.headers.append("Set-Cookie", tokenCookie);
    res.headers.append("Set-Cookie", refreshCookie);

    return res;
  } catch (error) {
    // 서버 에러 발생 시 500 에러 반환
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
