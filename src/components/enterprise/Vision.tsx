import React from "react";

const Vision: React.FC = () => {
  return (
    <div className=" flex flex-col ">
      <p className="mb-4">OUR VISION</p>
      <div className="flex flex-col md:flex-row gap-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104f2c2ebc339fd5e5e3_03.jpg"
            alt="환경복원의 산업 표준 확립"
            loading="eager"
            width={450}
            className="rounded-lg"
            sizes="(max-width: 479px) 100vw, 450px"
            srcSet="
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104f2c2ebc339fd5e5e3_03-p-500.jpg 500w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104f2c2ebc339fd5e5e3_03-p-800.jpg 800w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104f2c2ebc339fd5e5e3_03-p-1080.jpg 1080w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104f2c2ebc339fd5e5e3_03.jpg 1280w"
          />
          <h5 className="mt-2 text-center font-semibold text-lg">
            1. 환경복원의 산업 표준 확립
          </h5>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c0fe45e7ea1029578cf72_05.jpg"
            alt="이끼 기반 생물학적 가능성 연구"
            loading="eager"
            width={450}
            className="rounded-lg"
            sizes="(max-width: 479px) 100vw, 450px"
            srcSet="
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c0fe45e7ea1029578cf72_05-p-500.jpg 500w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c0fe45e7ea1029578cf72_05-p-800.jpg 800w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c0fe45e7ea1029578cf72_05-p-1080.jpg 1080w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c0fe45e7ea1029578cf72_05.jpg 1280w"
          />
          <h5 className="mt-2 text-center font-semibold text-lg">
            2. 이끼 기반 생물학적 가능성 연구
          </h5>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104ffa0af7ef15af9997_12%20(1).jpg"
            alt="이끼가 이끄는 지속 가능한 세상"
            loading="eager"
            width={450}
            className="rounded-lg"
            sizes="(max-width: 479px) 100vw, 450px"
            srcSet="
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104ffa0af7ef15af9997_12%20(1)-p-500.jpg 500w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104ffa0af7ef15af9997_12%20(1)-p-800.jpg 800w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104ffa0af7ef15af9997_12%20(1)-p-1080.jpg 1080w,
            https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681c104ffa0af7ef15af9997_12%20(1).jpg 1280w"
          />
          <h5 className="mt-2 text-center font-semibold text-lg">
            3. 이끼가 이끄는 지속 가능한 세상
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Vision;
