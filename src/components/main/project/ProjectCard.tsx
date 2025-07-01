import React from "react";
import Link from "next/link";
import { ProjectType } from "@/types";
import Image from "next/image";

interface Props {
  data: ProjectType[];
}

const ProjectCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-10">
      {data.map((item, index) => {
        const {
          id,
          category,
          title,
          description,
          imageUrl,
          location,
          startDate,
          endDate,
        } = item;
        return (
          <div
            key={index}
            className="flex flex-col justify-between md:flex-row items-start bg-white rounded-md"
          >
            {/* 텍스트 영역 */}
            <div className="flex flex-col md:w-1/2 space-y-4">
              <span className="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1 w-max">
                {category}
              </span>
              <Link
                href={`/project/${id}`}
                className="text-3xl font-semibold leading-snug whitespace-pre-line"
              >
                {title}
              </Link>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span>{location}</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{startDate}</span>
                <span>{endDate}</span>
              </div>
              <Link
                href={`/project/${id}`}
                className="text-green-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                더 알아보기 →
              </Link>
            </div>

            {/* 이미지 영역 */}
            <Link
              href={`/project/${id}`}
              className="w-full md:w-1/3 block rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={imageUrl}
                alt={title}
                width={1000}
                height={1000}
                className="w-full h-64 object-cover rounded-lg"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
