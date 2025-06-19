// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t mt-20 text-sm text-gray-800">
      {/* 상단 정보 영역 */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between text-center md:text-left space-y-6 md:space-y-0">
        <div className="w-full md:w-auto">
          <p className="text-xs text-gray-500 mb-1">Email Us</p>
          <p className="font-semibold">codeofnature@c-of-n.com</p>
        </div>
        <div className="w-full md:w-auto">
          <p className="text-xs text-gray-500 mb-1">Yangsan Office</p>
          <p className="font-semibold">
            경남 양산시 물금읍 부산대학로 <strong>144, 209호</strong>
          </p>
        </div>
        <div className="w-full md:w-auto">
          <p className="text-xs text-gray-500 mb-1">Seoul Office</p>
          <p className="font-semibold">
            서울 관악구 남부순환로 <strong>2072 2층, 6B</strong>
          </p>
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="max-w-6xl mx-auto px-4 py-6 border rounded-lg text-center md:text-left text-xs space-y-1 md:space-y-0 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="space-y-1">
          <p>대표자 : 박재홍</p>
          <p>사업자등록번호 : 817-86-02036</p>
          <p>개인정보 처리방침</p>
        </div>

        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 text-center md:text-right">
          <p className="text-green-600 font-semibold">Code of {`{Nature.}`}</p>
          <p className="text-gray-400 text-[11px]">
            Copyright © Code of Nature. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
