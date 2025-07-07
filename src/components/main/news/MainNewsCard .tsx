import { NewsType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: NewsType[];
}

const MainNewsCard: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data
        .filter((item) => item.isMainNews)
        .map((item) => {
          const { id, imageUrl, title } = item;
          return (
            <Link
              key={id}
              href={`/news/${id}`}
              className="w-full mx-auto relative overflow-hidden aspect-[16/9] mb-[5rem]"
            >
              <Image
                src={imageUrl}
                alt="뉴스룸 메인 이미지"
                width={1000}
                height={1000}
                className="w-full object-cover"
                priority
              />
              {/* 텍스트 오버레이 */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 right-6">
                <h2 className="text-white text-stroke  drop-shadow-[0_0_1px_black] text-xl md:text-4xl leading-tight max-w-[90%]">
                  {title}
                </h2>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default MainNewsCard;
