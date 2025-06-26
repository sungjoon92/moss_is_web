import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 데이터 조회
export async function GET() {
  const { data, error } = await supabase.from("t_solution").select("*");
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

  const { data, error } = await supabase
    .from("t_solution")
    .update(updates)
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
