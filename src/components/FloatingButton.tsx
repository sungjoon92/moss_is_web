"use client";

import React, { useState } from "react";
import ConsultationModal from "./ConsultationModal";

const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="fixed w-[120px] md:w-[160px] text-center bottom-8 right-[-30px] md:left-1/2 -translate-x-1/2 z-50 bg-green-400 text-white font-semibold px-6 py-4 rounded-full shadow-lg hover:bg-green-700 transition-all cursor-pointer"
      >
        문의하기
      </div>

      {isOpen && <ConsultationModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingButton;
