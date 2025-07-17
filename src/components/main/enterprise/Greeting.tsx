"use client";

import React from "react";

const Greeting = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-6 text-gray-800">
        <h2 className="text-green-700 text-lg font-semibold">＊ GREETING</h2>
        <p className="text-2xl md:text-3xl font-bold leading-snug">
          “맑은 공기와 건강한 자연은 <br className="hidden md:block" />
          다음 세대를 위한 가장 소중한 선물입니다.”
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          moss is는 자연을 복원하고 생명을 되살리는 것을 최우선 가치로 두고
          있습니다.
          <br />
          우리는 이끼라는 작은 생명체를 통해 생태계 회복의 첫걸음을 내딛고,
          <br />
          환경과 사람, 미래 세대가 함께 숨 쉴 수 있는 세상을 만들어 갑니다.
        </p>
        <div className="text-right mt-6 text-sm text-gray-600">
          – moss is 대표, 홍길동
        </div>
      </div>

      <div className="flex-1 max-w-md">
        <img
          src="https://placehold.co/600x400"
          alt="대표자 사진"
          className="rounded-2xl object-cover w-full h-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default Greeting;
