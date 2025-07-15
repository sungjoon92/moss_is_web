"use client";
import { SolutionType } from "@/types";
import React from "react";
import SolutionList from "../solution/SolutionList";

interface PatentType {
  title: string;
  imageUrl: string;
  date: string;
  name: string;
}

interface Props {
  data: SolutionType[];
}

const patentItem: PatentType[] = [
  {
    title:
      "친환경 이끼 블록 제조방법 및 이에 의해 제조된 친환경 이끼 블록을 포함하는 벽면녹화 시스템",
    date: "2023. 12. 12",
    name: "특허 제10-2491230호",
    imageUrl: "https://placehold.co/400",
  },
];

export default function Patent({ data }: Props) {
  return (
    <section className="w-full mt-20">
      <h2 className="text-3xl text-center mb-2">특허출원 </h2>
      <p className="text-lg text-center text-gray-600 mb-10">
        ＊ 2023년 신품종 관련 보유 지적 재산권
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {patentItem.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="overflow-hidden rounded-lg shadow-md w-full aspect-square bg-white">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
            <span className="mt-5">특허출원일: {item.date}</span>
            <span>출원번호: {item.name}</span>
            <h3 className="mt-4 text-base font-medium">{item.title}</h3>
          </div>
        ))}
      </div>

      <SolutionList data={data}></SolutionList>
    </section>
  );
}
