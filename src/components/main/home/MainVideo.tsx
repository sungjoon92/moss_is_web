import { supabase } from "@/lib/supabase/supabaseClient";
import { HomeType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import Link from "next/link";
import ReactPlayer from "react-player";
export default async function MainVideo() {

  const { data, error } = await supabase
    .from("t_home")
    .select("*")
    .eq("is_main", true)
    .limit(1);

  if (error) {
    console.error("서버에서 데이터 가져오기 오류:", error.message);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!data) return <div>데이터가 없습니다.</div>;

  const camelCaseData = data?.[0] ? toCamelCase(data[0]) as HomeType : null;
console.log("camelCaseData:", camelCaseData);

  if (!camelCaseData) {
    return null;
  }

  return (
    <section className="mt-[72px] md:mt-0 w-full aspect-video max-h-[50vh] min-h-[300px] sm:min-h-[250px] md:min-h-[300px] relative overflow-hidden">
      <Link
        key={camelCaseData.id}
        href={camelCaseData.linkUrl}
        className="w-full h-full block"
        target="_blank"
      >
        <ReactPlayer
          src={camelCaseData.videoUrl}
          width="100%"
          height="100%"
          playing={true}
          loop={true}
          muted={true}
          controls={false}
          className="pointer-events-none"
        ></ReactPlayer>

        <div className="absolute left-4 right-4 bottom-4 md:left-10 md:bottom-5 text-white text-center md:text-left flex flex-col gap-2 md:gap-3">
          <h2 className="text-sm md:mb-3 md:text-[1.5rem] font-semibold">
            {camelCaseData.title}
          </h2>

          {/* 이안에 콘텐츠 넣을지? */}
          <p className="text-base md:text-[2rem] font-semibold">
            전 세계 어디라도 복원할 땅이 있는 곳이라면
          </p>
        </div>
      </Link>
    </section>
  );
};