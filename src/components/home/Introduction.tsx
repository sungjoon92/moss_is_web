import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center py-10 border-b-2 gap-6 md:gap-20">
      {/* 왼쪽: 제목 (한 줄 고정) */}
      <div className="text-green-600 font-semibold whitespace-nowrap">
        ＊ WHO WE ARE
      </div>

      {/* 오른쪽: 본문 내용 */}
      <div className="space-y-3 text-center md:text-left">
        <h2 className="text-xl md:text-2xl lg:text-3xl leading-snug font-bold">
          moss is는 독자적인 환경 기술로 전 세계 황폐한 토양을 복원하고,
          <br />
          생태계가 다시 활기를 되찾을 수 있도록 지속 가능한 해결책을 제시합니다.
        </h2>
      </div>
    </div>
  );
};

export default Introduction;
