"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    router.push("/home");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 배경 비디오 */}
      <video
        src="/videos/landing.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 오버레이 및 CTA */}
      <div
        className={`absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-snug">
          작은 식물, 큰 가치<br />
          이끼로 자연을 지키다
        </h1>
        <button
          onClick={handleClick}
          className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-lg rounded-full transition shadow-lg"
        >
          모스이즈와 함께하기
        </button>
      </div>
    </div>
  );
}
