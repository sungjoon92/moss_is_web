"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ServiceCard = ({
  title,
  name,
  description,
  imageUrl,
  link,
}: {
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}) => {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl shadow-lg bg-white overflow-hidden flex flex-col md:flex-row"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full md:w-1/3 h-auto object-cover"
      />
      <div className="p-6 flex flex-col justify-center">
        <span className="text-sm text-green-600 font-medium mb-1">{title}</span>
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <a href={link} className="text-blue-600 font-medium hover:underline">
          더 알아보기 &rarr;
        </a>
      </div>
    </motion.div>
  );
};

export default function OurServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section ref={ref} className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-green-600 font-semibold">＊ Our Solutions</p>
          <h2 className="text-4xl font-bold leading-tight mt-2">
            코드오브네이처의
            <br />
            저비용 고효율 솔루션을 <br />
            만나보세요
          </h2>
        </motion.div>

        <div className="space-y-10">
          <motion.div initial="hidden" animate={controls} variants={fadeUp}>
            <ServiceCard
              title="황폐화 토양 복원 솔루션"
              name="모스비"
              description="모스비(Mosby)는 황폐한 토양을 되살리는 토양 복원 키트입니다. 생명력을 잃은 땅에 살포하면, 4~6주 내에 이끼가 정착하며 생태계 회복의 기반을 마련합니다."
              imageUrl="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/67ff66afed300ca59855c3ef_technology-img2.png"
              link="/services/mosby"
            />
          </motion.div>

          <motion.div initial="hidden" animate={controls} variants={fadeUp}>
            <ServiceCard
              title="이끼 전용 올인원 솔루션"
              name="몬스"
              description="몬스(MoNS)는 혹독한 환경에서도 이끼가 살아남을 수 있도록 개발된 이끼 전용 영양 솔루션입니다."
              imageUrl="https://cdn.prod.website-files.com/67e4d1513dd414300ed0cb02/681b4502f18d214de92c98e1_MoNS.png"
              link="/services/mons"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
