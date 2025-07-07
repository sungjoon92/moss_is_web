import Container from "@/components/Container";
import SolutionList from "@/components/main/solution/SolutionList";
import { supabase } from "@/lib/supabase/supabaseClient";
import { SolutionType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";

export default async function SolutionPage() {
  // SSR 방식
  const { data, error } = await supabase
    .from("t_solution")
    .select("*");

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data.map((item) => toCamelCase(item) as SolutionType);

   // CSR 방식
  // const [data, setData] = useState([]);
  // const fetchSolution = async () => {
  //   try {
  //     const response = await getSolutions({});
  //     setData(response.data.map(toCamelCase));
  //   } catch (error) {
  //     console.error("데이터를 불러오는 중 오류 발생:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchSolution();
  // }, []);
  return (
    <Container>
      <SolutionList initialData={camelCaseData} />
    </Container>
  );
}
export const dynamic = "force-dynamic";

