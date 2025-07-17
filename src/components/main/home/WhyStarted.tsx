"use client";

import Image from "next/image";
import React from "react";

const WhyStarted = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-6">
        <h2 className="text-green-700 text-lg font-semibold">
          ＊ WHY WE STARTED
        </h2>
        <p className="text-2xl leading-relaxed font-bold text-gray-800">
          대기오염으로 인해 맑은 공기와 하늘 아래
          <br />
          마음껏 뛰어놀지 못하는 우리 아이들에게
          <br />
          청정한 환경을 만들어주고 싶어서 시작되었습니다.
        </p>
      </div>
      <div className="flex-1">
        <Image
          src="/images/아이들사진.png"
          alt="아이들 뛰어노는 모습"
          width={600}
          height={300}
          className="rounded-2xl shadow-md object-cover w-full"
          placeholder="blur"
          blurDataURL="https://placehold.co/600x400"
        />
      </div>
    </div>
  );
};

export default WhyStarted;
