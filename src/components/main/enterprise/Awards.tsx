"use client";

import React, { useState } from "react";
import { AwardsType } from "@/types";

interface Props {
  data: AwardsType[];
}
const Awards: React.FC<Props> = ({ data }) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-8">＊ 수상내역</h2>
      <div>
        {data.map(({ year, items }) => (
          <div
            key={year}
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
            className={`p-4 rounded-md transition duration-300 border-b-4 mb-4 ${
              hoveredYear === year ? "bg-green-400 text-white" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="mb-2 leading-tight">
                    ＊ {item}
                  </li>
                ))}
              </ul>
              <span className="min-w-[3rem] text-right">{year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
