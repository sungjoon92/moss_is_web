import Image from "next/image";
import React from "react";

interface MediaArticleCardProps {
  data: {
    imageUrl: string;
    description: string;
  };
}

const MediaArticleCard: React.FC<MediaArticleCardProps> = ({ data }) => {
  return (
    <article className="flex flex-col gap-3 rounded-md overflow-hidden">
      <Image
        width={1000}
        height={1000}
        src={data.imageUrl}
        alt="media"
        className="w-full h-auto rounded-md hover:scale-110 transition-transform duration-1000"
      />
      <p className="text-gray-700 text-sm">{data.description}</p>
    </article>
  );
};

export default MediaArticleCard;
