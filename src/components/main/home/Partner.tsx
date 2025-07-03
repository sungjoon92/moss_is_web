import React from "react";
import { Investors, Partners } from "@/data/partners";
import Image from "next/image";

const Partner = () => {
  return (
    <section className="flex flex-col items-center bg-white py-16 gap-10">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        COFN과 함께하는 파트너
      </h2>
      <article>
        <h3>＊ 주요 투자사</h3>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Investors.map((investor, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={investor}
                alt={`Investor ${index + 1}`}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </article>
      <article>
        <h3>＊ 주요 파트너사</h3>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={partner}
                alt={`Investor ${index + 1}`}
                width={1000}
                height={1000}
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
