import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

// 솔루션 데이터 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort") || "id";
  const order = searchParams.get("order") || "desc";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("t_solution")
    .select("*")
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (error) {
    return NextResponse.json(
      { error: "솔루션 목록 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 솔루션 데이터 생성
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

  if (!body.category) {
    return NextResponse.json(
      { error: "카테고리를 선택해 주세요." },
      { status: 400 }
    );
  }

  if (!body.category_tag) {
    return NextResponse.json(
      { error: "카테고리 태그를 입력해 주세요." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("t_solution")
    .insert([body])
    .select();

  if (error) {
    return NextResponse.json(
      { error: "솔루션 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

// 솔루션 데이터 수정
export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json(
      { error: "수정할 솔루션의 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("t_solution")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "솔루션 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// 솔루션 데이터 삭제
export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { error: "삭제할 솔루션의 ID가 필요합니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("t_solution")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "솔루션 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
