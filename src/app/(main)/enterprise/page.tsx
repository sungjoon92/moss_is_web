import Container from "@/components/Container";
import Greeting from "@/components/main/enterprise/Greeting";
import Patent from "@/components/main/enterprise/Patent";
import { supabase } from "@/lib/supabase/supabaseClient";
import { SolutionType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
export default async function EnterprisePage() {
  const { data, error } = await supabase.from("t_solution").select("*");

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data.map((item) => toCamelCase(item) as SolutionType);
  return (
    <Container className="flex gap-10">
      <Greeting />
      <Patent data={camelCaseData} />
    </Container>
  );
}

export const dynamic = "force-dynamic";
