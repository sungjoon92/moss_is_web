"use client";

import { getHomeList } from "@/lib/api/home";
import { HomeType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
const MainVideo: React.FC = () => {
  const pathname = usePathname();
  const [homeData, setHomeData] = useState<HomeType[]>([]);

  const fetchHomeList = async () => {
    const response = await getHomeList();
    const data = response.data.map(toCamelCase);
    setHomeData(data);
  };

  useEffect(() => {
    fetchHomeList();
  }, []);

  // 홈이 아니면 null 반환 (렌더링 안 함)
  if (pathname !== "/") return null;

  return (
    <section className="mt-[72px] md:mt-0 w-full aspect-video max-h-[50vh] min-h-[300px] sm:min-h-[250px] md:min-h-[300px] relative overflow-hidden">
      {homeData.map((item) => {
        return (
          item.isMain && (
            <Link
              key={item.id}
              href={item.linkUrl}
              className="w-full h-full block"
              target="_blank"
            >
              <ReactPlayer
                src={item.videoUrl}
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
                  {item.title}
                </h2>
                {/* 이안에 콘텐츠 넣을지? */}
                <p className="text-base md:text-[2rem] font-semibold">
                  전 세계 어디라도 복원할 땅이 있는 곳이라면
                </p>
              </div>
            </Link>
          )
        );
      })}
    </section>
  );
};

export default MainVideo;
