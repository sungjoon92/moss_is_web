import React from "react";
import { HistoryType } from "@/types";

interface Props {
  data: HistoryType[];
}

const HistoryList: React.FC<Props> = ({ data }) => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-12">
      <h2 className="text-center  text-[2.5rem] font-medium leading-[1.1]">
        코드오브네이쳐가
        <br />
        걸어온 길
      </h2>
      {data.map(({ year, title, descriptions, highlights }) => (
        <div key={year} className="flex items-center gap-8">
          {/* 연도 */}
          <div className="w-[80px] text-green-600 text-3xl font-bold ">
            {year}
          </div>

          {/* 내용 */}
          <div className="flex-1 pl-10 border-l-2">
            <h3 className="text-[1.5rem] mb-5 font-medium ">{title}</h3>
            {descriptions.map((desc, index) => (
              <p key={index} className="text-sm leading-6 text-gray-800">
                {highlights?.includes(desc) ? <strong>{desc}</strong> : desc}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HistoryList;
