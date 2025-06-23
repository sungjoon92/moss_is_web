import React from "react";
import { HistoryType } from "@/types";

interface Props {
  data: HistoryType[];
}

const HistoryList: React.FC<Props> = ({ data }) => {
  return (
    <section className="w-full mt-16 mb-16 px-4">
      <h2 className="w-full mb-12 text-center text-3xl sm:text-4xl font-medium leading-tight">
        모스이즈가
        <br />
        걸어온 길
      </h2>

      <div className="w-full max-w-5xl mx-auto flex flex-col space-y-8">
        {data.map(({ year, title, descriptions, highlights }) => (
          <div
            key={year}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
          >
            {/* 연도 */}
            <div className="min-w-[60px] sm:min-w-[80px] flex items-center text-green-600 text-2xl sm:text-3xl md:text-[4rem] leading-none pt-1">
              {year}
            </div>

            {/* 내용 */}
            <div className="flex-1 border-l-2 border-gray-300 pl-4 sm:pl-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
              <div className="space-y-1">
                {descriptions.map((desc, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base leading-relaxed text-gray-800"
                  >
                    {highlights?.includes(desc) ? (
                      <strong>{desc}</strong>
                    ) : (
                      desc
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryList;
