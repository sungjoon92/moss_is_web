import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

// 질문 데이터 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "desc";
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const searchField = searchParams.get("searchField") || "title";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("t_contactus").select("*");

  // 검색 필드 및 키워드가 있을 경우
  if (keyword && searchField) {
    query = query.like(searchField, `%${keyword}%`);
  }

  // 카테고리 필터 (전체가 아니면 필터 적용)
  if (category && category !== "전체") {
    query = query.eq("category", category);
  }

  const { data, error } = await query
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (error) {
    return NextResponse.json(
      { error: "질문 목록 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 질문 데이터 생성
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json(
      { error: "제목을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!body.content) {
    return NextResponse.json(
      { error: "내용을 입력해 주세요." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("t_contactus")
    .insert([body])
    .select();

  if (error) {
    return NextResponse.json(
      { error: "질문 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

// 질문 데이터 수정
export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json(
      { error: "수정할 질문의 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("t_contactus")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "질문 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 질문 데이터 삭제
export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "삭제할 질문의 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("t_contactus")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "질문 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
