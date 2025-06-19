"use client";
import React from "react";

interface Certificate {
  title: string;
  imageUrl: string;
}

const certificates: Certificate[] = [
  {
    title: "KCTC 미생물 품종 기탁",
    imageUrl:
      "https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c30fbca0cf957b1951502_81acddfc01358ca18bee3ecc1d2a7b49.jpg",
  },
  {
    title: "PCT 특허",
    imageUrl:
      "https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c31c566e06cf66cb12559_a2c20046d531f2253d5230ac4cdc96f5.jpg",
  },
  {
    title: "특허 10-2023-0082865",
    imageUrl:
      "https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c322abb57a8dbb44fc39d_3d940d663c8743c109dd53cabcddda6c.jpg",
  },
  {
    title: "특허 10-2021-0051770",
    imageUrl:
      "https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c324ae49527edff36adcf_77c19c94229ca2dedaf77303f4498636.jpg",
  },
  {
    title: "특허 10-2023-0096540",
    imageUrl:
      "https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c326c89ce91fec161bc54_9334871c40fe61ee22f6be6388dd19c5.jpg",
  },
];

const Certificates: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-semibold text-center mb-2">인증서</h2>
      <p className="text-lg text-center text-gray-600 mb-10">
        ＊ 2023년 신품종 관련 보유 지적 재산권
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certificates.map((cert, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-lg shadow-md w-full aspect-square bg-white">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="mt-4 text-base font-medium">{cert.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
