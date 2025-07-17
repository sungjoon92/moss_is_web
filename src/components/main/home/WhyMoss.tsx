import React from "react";

const WhyMoss = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-green-700 text-lg font-semibold">＊ WHY MOSS?</h2>
      <p className="text-xl md:text-2xl font-bold text-gray-800">
        이끼는 지구 최초의 육상식물로, 생태계를 형성하는 데 중요한 역할을
        합니다.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base md:text-lg">
        <li>다른 식물들이 살아갈 수 있는 터전의 토대 역할</li>
        <li>자기 몸무게의 5배 이상 수분 저장 → 가뭄 방지</li>
        <li>산소 공급 및 작은 곤충들의 먹이로서 생태계 먹이사슬의 기초</li>
      </ul>
    </div>
  );
};

export default WhyMoss;
