import Container from "@/components/Container";
import Image from "next/image";
import { supabase } from "@/lib/supabase/supabaseClient";
import { sanitizeHtmlServer } from "@/utils/sanitizeHtmlServer";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  try {
    const id = Number(params.id);

    // ID 유효성 검사
    if (isNaN(id) || id <= 0) {
      return notFound();
    }

    const { data, error } = await supabase
      .from("t_solution")
      .select("*")
      .eq("id", id)
      .single();

    // 에러 처리
    if (error) {
      console.error("Supabase error:", error);
      return notFound();
    }

    // 데이터가 없는 경우
    if (!data) {
      return notFound();
    }

    const sanitizedContent = sanitizeHtmlServer(data.content);

    return (
      <Container className="flex flex-col items-center text-center font-sans">
        <h1 className="text-3xl mb-4">{data.title}</h1>
        <span className="text-sm text-gray-500 mb-4">{data.category_tag}</span>
        <div
          className="mb-6 whitespace-pre-line ql-editor"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
        {data.image_url && (
          <Image
            src={data.image_url}
            alt={data.title}
            width={1000}
            height={1000}
            className="rounded-lg w-full object-cover"
          />
        )}
      </Container>
    );
  } catch (error) {
    console.error("Error fetching solution:", error);
    return notFound();
  }
}
