import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center py-10 px-5 md:px-0 md:flex-row border-b-2">
      <div className="text-green-600 font-semibold my-4">＊ WHO WE ARE</div>
      <div className="w-[70%] space-y-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl leading-snug mb-6">
          코드오브네이처는 독자적인 환경 기술로 전 세계 황폐한 토양을 복원하고,
          <br></br>
          생태계가 다시 활기를 되찾을 수 있도록 지속 가능한 해결책을 제시합니다.
        </h2>
      </div>
    </div>
  );
};

export default Introduction;
