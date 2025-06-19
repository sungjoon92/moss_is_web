import React from "react";
import Link from "next/link";
import { ProjectType } from "@/types";
import Container from "../Container";

interface Props {
  data: ProjectType[];
}

const ProjectCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-10">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between lg:flex-row items-center bg-white rounded-lg shadow-sm"
        >
          {/* 텍스트 영역 */}
          <div className="flex flex-col lg:w-1/2 space-y-4">
            <span className="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1 w-max">
              {item.category}
            </span>
            <h3 className="text-3xl font-semibold leading-snug whitespace-pre-line">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
            <div className="flex items-center text-xs text-gray-500 space-x-3">
              <span>{item.location}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{item.date}</span>
            </div>
            <Link
              href={item.link}
              className="text-green-600 text-sm font-semibold hover:underline flex items-center gap-1"
            >
              더 알아보기 →
            </Link>
          </div>

          {/* 이미지 영역 */}
          <Link
            href={item.link}
            className="min-w-[250px] lg:w-1/3 block rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
