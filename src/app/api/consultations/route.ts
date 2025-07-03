import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

// 상담 데이터 조회 (페이징 포함)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") || "desc";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("t_consultations")
    .select("*")
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (error)
    return NextResponse.json(
      { error: "데이터 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );

  return NextResponse.json(data);
}

// 상담 데이터 생성
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.company_name) {
    return NextResponse.json(
      { error: "회사명을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!body.manager_name) {
    return NextResponse.json(
      { error: "담당자명을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (!body.tel) {
    return NextResponse.json(
      { error: "연락처를 입력해 주세요." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("t_consultations")
    .insert([body])
    .select();

  if (error)
    return NextResponse.json(
      { error: "데이터 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );

  return NextResponse.json(data, { status: 201 });
}

// 상담 데이터 수정
export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id)
    return NextResponse.json(
      { error: "수정할 데이터의 ID가 필요합니다." },
      { status: 400 }
    );

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("t_consultations")
    .update(updateData)
    .eq("id", id);

  if (error)
    return NextResponse.json(
      { error: "데이터 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );

  return NextResponse.json(data);
}

// 상담 데이터 삭제
export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id)
    return NextResponse.json(
      { error: "삭제할 데이터의 ID가 필요합니다." },
      { status: 400 }
    );

  const { data, error } = await supabase
    .from("t_consultations")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json(
      { error: "데이터 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );

  return NextResponse.json(data);
}
