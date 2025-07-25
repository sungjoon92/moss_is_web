// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="m-auto max-w-[1280px] border-t mt-20 text-sm text-gray-800 px-4 xl:px-0">
      {/* 상단 정보 영역 */}
      <div className="w-full py-8 flex flex-col md:flex-row justify-between text-center md:text-left space-y-6 md:space-y-0">
        <div className="w-full md:w-auto">
          <p className="text-xs text-gray-500 mb-1">Email Us</p>
          <p className="font-semibold">mossis0731@naver.com</p>
        </div>
        <div className="w-full md:w-auto flex items-center">
          <p className="font-semibold">
            전북특별자치도 완주군 이서면 신지앵곡길 16
          </p>
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="w-full py-6 text-center md:text-left text-xs space-y-1 md:space-y-0 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="space-y-1">
          <p>대표자 : 김목진</p>
          <p>문의 연락처 : 010-2491-0322</p>
          <p>사업자등록번호 : 190-32-01278</p>
        </div>

        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 text-center md:text-right">
          <p className="text-green-600 font-semibold">moss is</p>
          <p className="text-gray-400 text-[11px]">
            Copyright © moss is. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
