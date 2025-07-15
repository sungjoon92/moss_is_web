"use client";

import React from "react";

const OurPath = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-10">
      <div className="flex-1">
        <img
          src="https://placehold.co/600x400"
          alt="팀 일러스트"
          width={600}
          height={400}
          className="rounded-2xl shadow-md object-cover w-full"
        />
      </div>
      <div className="flex-1 space-y-4">
        <h2 className="text-green-700 text-lg font-semibold">＊ OUR PATH</h2>
        <p className="text-2xl font-bold text-gray-800 leading-relaxed">
          그래서 우리는 뜻을 모았고,
          <br />
          지속 가능한 환경을 위해 이 길을 함께 걷고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default OurPath;
