"use client";
import Link from "next/link";

const WhatWeDo: React.FC = () => {
  return (
    <section className="w-[70%] py-16 bg-white flex flex-col items-center  text-center gap-5">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-green-600 font-semibold my-4">＊ WHAT WE DO</p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-snug mb-6">
          연구가 기술을 만들고,
          <br />
          기술이 토양을 되살립니다.
        </h1>
        <p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
          산불, 과잉 농업, 산업화로 생명이 사라진 땅 위에 코드오브네이처는{" "}
          <strong className="font-semibold text-black">
            이끼 기반 복원 솔루션
          </strong>
          을 제공합니다. 자사의 독자적인 복원 기술이 적용된 지 6-8개월 후,
          토양은 더 이상 죽은 땅이 아니라, 생명이 자라는 기반이 됩니다.
        </p>
      </div>

      <div className=" flex flex-col md:flex-row justify-center items-center gap-6 px-4">
        <img
          src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/67e51af625ec994f6136a8e7_%EB%B3%B5%EC%9B%90%20%EB%B9%84%EA%B5%90%EC%82%AC%EC%A7%84_%EC%A0%84.JPG"
          alt="Before Restoration"
          className="w-full md:w-1/2 rounded shadow-lg object-cover"
        />
        <img
          src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/67e51af7670da7138565ba47_%EB%B3%B5%EC%9B%90%20%EB%B9%84%EA%B5%90%EC%82%AC%EC%A7%84_%ED%9B%84.JPG"
          alt="After Restoration"
          className="w-full md:w-1/2 rounded shadow-lg object-cover"
        />
      </div>
      <div className="text-center">무언가의 데이터가 있다면 받아야 할 곳</div>
      <Link href="/solution">
        <span className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-green-200 transition-700">
          진행한 프로젝트 더보기
          <svg
            width="5%"
            height="5%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
              fill="currentColor"
              fill-opacity="0.94"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L17.5858 12L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289Z"
              fill="currentColor"
              fill-opacity="0.94"
            ></path>
          </svg>
        </span>
      </Link>
    </section>
  );
};

export default WhatWeDo;
