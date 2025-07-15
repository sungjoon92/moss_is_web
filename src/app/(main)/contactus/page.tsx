import ContactUsList from "@/components/main/contactus/ContactUsList";
import { supabase } from "@/lib/supabase/supabaseClient";
import { ContactUsType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";

export default async function ContactUsPage() {
  const { data, error } = await supabase.from("t_contactus").select("*");

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data.map((item) => toCamelCase(item) as ContactUsType);

  return <ContactUsList ContactData={camelCaseData} />;
}

export const dynamic = "force-dynamic";
