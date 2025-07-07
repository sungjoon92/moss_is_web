import Container from "@/components/Container";
import { toCamelCase } from "@/utils/caseConverter";
import ProjectList from "@/components/main/project/ProjectLIst";
import { supabase } from "@/lib/supabase/supabaseClient";
import { ProjectType } from "@/types";

export default async function ProjectPage() {
  const { data, error } = await supabase
    .from("t_project")
    .select("*");

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data.map((item) => toCamelCase(item) as ProjectType);

  return (
    <Container className="t-[80px] md:mt-0 ">
      <ProjectList initialData={camelCaseData} />
    </Container>
  );
}

export const dynamic = "force-dynamic";