import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

// 데이터 조회
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

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 데이터 생성
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("t_solution")
    .insert([body])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}

// 데이터 수정
export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(), // 현재 시간으로 수정
  };

  const { data, error } = await supabase
    .from("t_solution")
    .update(updateData)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 데이터 삭제
export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("t_solution")
    .delete()
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
