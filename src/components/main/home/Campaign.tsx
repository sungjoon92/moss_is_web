"use client";

import React from "react";

const Campaign = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-green-700 text-lg font-semibold">
        ＊ 활동 및 캠페인
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src="https://placehold.co/600x400"
          alt="환경지킴이 캠페인"
          width={600}
          height={400}
          className="rounded-xl object-cover w-full"
        />
        <img
          src="https://placehold.co/600x400"
          alt="뉴스 자료"
          width={600}
          height={400}
          className="rounded-xl object-cover w-full"
        />
      </div>
    </div>
  );
};

export default Campaign;
