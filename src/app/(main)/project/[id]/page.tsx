// src/app/(main)/project/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import { supabase } from "@/lib/supabase/supabaseClient";
import { ProjectType } from "@/types";
import { toCamelCase } from "@/utils/caseConverter";
import { sanitizeHtmlServer } from "@/utils/sanitizeHtmlServer";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id) || id <= 0) return notFound();

    const { data, error } = await supabase
      .from("t_project")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase error:", error);
      return notFound();
    }

    const projectData = toCamelCase(data);
    const project = {
      ...projectData,
      contentImages:
        typeof projectData.contentImages === "string"
          ? JSON.parse(projectData.contentImages)
          : projectData.contentImages,
    } as ProjectType;

    const sanitizedContent = sanitizeHtmlServer(project.contentText);

    return (
      <Container className="max-w-6xl mx-auto text-gray-900">
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
        <div className="my-8 text-center text-[1.5rem] font-semibold">
          {project.contentTitle}
        </div>
        <div
          className="mb-12 whitespace-pre-line text-gray-800"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
      </Container>
    );
  } catch (err) {
    console.error("ProjectDetailPage error:", err);
    return notFound();
  }
}
