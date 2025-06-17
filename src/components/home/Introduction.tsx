import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-10 w-[70%] px-5 md:px-0 border-b-2">
      <div className="text-green-600 font-semibold">＊ WHO WE ARE</div>
      <h2 className="w-[70%] text-3xl font-bold">
        코드오브네이처는 독자적인 환경 기술로 전 세계 황폐한 토양을 복원하고,
        생태계가 다시 활기를 되찾을 수 있도록 지속 가능한 해결책을 제시합니다.
      </h2>
    </div>
  );
};

export default Introduction;
