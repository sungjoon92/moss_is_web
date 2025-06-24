"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="w-full flex justify-center mb-20">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center relative">
        {/* 텍스트 카드 */}
        <div className="z-10 bg-white w-full max-w-3xl rounded-2xl p-6 md:p-10 shadow-lg text-center lg:absolute lg:left-0 lg:top-1/2 lg:translate-y-[-50%] lg:text-left">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            전 세계 어디라도 <br className="hidden md:block" />
            <strong className="text-green-400 font-bold">복원할 땅</strong>이
            있는 곳이라면
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 leading-relaxed">
            코드오브네이처는 독자적인 환경 기술과 혁신적인 접근 방식을 통해
            <br className="hidden md:block" />
            오염된 환경과 손실된 생태계를 효율적으로 복원하는 기업입니다.{" "}
            <br className="hidden md:block" />
            자연이 스스로 가진 치유 능력을 극대화하는 기술을 개발하고,{" "}
            <br className="hidden md:block" />
            생태계가 다시 활기를 되찾을 수 있도록 지속 가능한 해결책을
            제시합니다.
          </p>

          <div className="flex justify-center lg:justify-start items-center gap-2">
            <Image
              src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/67ebb422d490701d8de4afb9_symbol_%EB%8C%80%EC%A7%80%201.png"
              alt="symbol"
              width={30}
              height={30}
              className="inline-block"
            />
            <Link
              href="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/682044b585b83fc21f05cdc4_%5B%EC%BD%94%EB%93%9C%EC%98%A4%EB%B8%8C%EB%84%A4%EC%9D%B4%EC%B2%98%5D%20%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C%EC%84%9C%20(1).pdf"
              target="_blank"
              className="text-sm text-green-400 hover:underline"
            >
              코드오브네이처 회사소개서 →
            </Link>
          </div>
        </div>

        {/* 이미지 */}
        <div className="rounded-2xl overflow-hidden shadow-lg w-full mt-6 lg:mt-0 lg:ml-auto lg:w-[60%]">
          <Image
            src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681b2b87de49e36db04cce82_%EC%9D%B4%EB%81%BC%202.jpg"
            alt="복원 이미지"
            width={1000}
            height={1000}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
