import { supabase } from "@/lib/supabase/supabaseClient";
import { toCamelCase } from "@/utils/caseConverter";
import ContactUsList from "@/components/main/contactus/ContactUsList";
import { ContactUsType } from "@/types";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function ContactUsPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page ?? "1", 10);
  const limit = parseInt(searchParams.limit ?? "10", 10);
  const sort = searchParams.sort ?? "id";
  const order = searchParams.order === "asc" ? "asc" : "desc";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("t_contactus")
    .select("*", { count: "exact" })
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (error) {
    console.error("데이터 로딩 실패:", error.message);
    return <div>에러 발생</div>;
  }

  const camelCaseData = data.map((item) => toCamelCase(item) as ContactUsType);

  return (
    <ContactUsList
      initialContactData={camelCaseData}
      initialTotal={count ?? 0}
      initialPage={page}
      initialLimit={limit}
      initialSort={sort}
      initialOrder={order}
    />
  );
}

export const dynamic = "force-dynamic";
