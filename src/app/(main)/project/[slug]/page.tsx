import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import { projectData } from "@/data/projectData";
import { ProjectType } from "@/types";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project: ProjectType | undefined = projectData.find(
    (item) => item.link === params.slug
  );

  if (!project) return notFound();

  return (
    <Container className="max-w-6xl mx-auto  text-gray-900">
      {/* 제목 */}
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-12 leading-tight">
        {project.title}
      </h1>

      {/* 본문 상세 이미지들 */}
      <div className="space-y-8">
        {project.contentImages?.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`${project.title} 상세 이미지 ${index + 1}`}
            width={1000}
            height={1000}
            className="rounded-lg object-cover w-full"
            priority={index === 0}
          />
        ))}
      </div>

      {/* 본문 내용 */}
      <div className="my-8 text-center  text-[1.5rem] font-semibold">
        {project.contentTitle}
      </div>
      <div className="mb-12 whitespace-pre-line text-gray-800">
        {project.contentText}
      </div>
    </Container>
  );
}
