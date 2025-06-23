"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainVideo: React.FC = () => {
  const pathname = usePathname();

  // 홈이 아니면 null 반환 (렌더링 안 함)
  if (pathname !== "/") return null;

  return (
    <section className="mt-[72px] md:mt-0 w-full aspect-video max-h-[50vh] min-h-[300px] sm:min-h-[250px] md:min-h-[300px] relative overflow-hidden">
      <Link
        href="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02%2F681dca92deecb58c406a6a47_COFN_bg-transcode.mp4"
        className="w-full h-full block"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02%2F681dca92deecb58c406a6a47_COFN_bg-transcode.mp4"
            type="video/webm"
          />
        </video>

        <div className="absolute left-4 right-4 bottom-4 md:left-10 md:bottom-5 text-white text-center md:text-left flex flex-col gap-2 md:gap-3">
          <h2 className="text-sm md:mb-3 md:text-[1.5rem] font-semibold">
            For our next generation
          </h2>
          <p className="text-base md:text-[2rem] font-semibold">
            전 세계 어디라도 복원할 땅이 있는 곳이라면
          </p>
        </div>
      </Link>
    </section>
  );
};

export default MainVideo;
