import React from "react";
import { Investors, Partners } from "@/data/partners";

const Partner = () => {
  return (
    <section className="w-[70%] flex flex-col items-center bg-white py-16 gap-10">
      <h2 className="text-4xl font-bold leading-tight">
        COFN과 함께하는 파트너
      </h2>
      <article>
        <h3>＊ 주요 투자사</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Investors.map((investor, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={investor}
                alt={`Investor ${index + 1}`}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </article>
      <article>
        <h3>＊ 주요 파트너사</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={partner}
                alt={`Investor ${index + 1}`}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Partner;
