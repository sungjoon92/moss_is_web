"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    router.push("/home");
  };

  return (
    // 비디오가 랜더링중이면 /images/landing.png 완료되면 /videos/landing.mp4
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/landing.png"
        alt="랜딩 이미지"
        className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
      />

      {/* <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/landing.png"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity `}
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video> */}

      {/* 배경 */}
      <div
        className={`absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white transition-opacity duration-1000`}
      >
        {/* 글자 */}
        <div
          className={`text-4xl md:text-5xl font-bold text-center leading-snug duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 leading-relaxed tracking-tight drop-shadow-xl transition-all duration-2000">
            작은 식물, 큰 가치
            <br />
            <span className="text-green-400 md:text-green-500 animate-pulse">
              이끼
            </span>
            로 자연을 지키다
          </h1>
          <button
            onClick={handleClick}
            className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-lg rounded-full transition shadow-lg"
          >
            모스이즈와 함께하기
          </button>
        </div>
      </div>
    </div>
  );
}
