import Container from "@/components/Container";
import Image from "next/image";
import { supabase } from "@/lib/supabase/supabaseClient";
import { sanitizeHtmlServer } from "@/utils/sanitizeHtmlServer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDateTime } from "@/utils/formatDate";
import ReactPlayer from "react-player";
interface Props {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: Props) {
  try {
    const id = Number(params.id);

    // ID 유효성 검사
    if (isNaN(id) || id <= 0) {
      return notFound();
    }

    const { data, error } = await supabase
      .from("t_news")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Supabase error:", error);
      return notFound();
    }

    const {
      title,
      date,
      category,
      content,
      image_url: imageUrl,
      page_url: pageUrl,
      video_url: videoUrl,
    } = data;

    const sanitizedContent = sanitizeHtmlServer(content);

    return (
      <Container className="flex flex-col md:flex-row gap-12 mx-auto my-12 md:my-20 px-4 pt-4">
        {/* Left - 카테고리 & 링크 */}
        <div className="flex flex-row items-center justify-center md:flex-col gap-6 text-sm text-gray-700 min-w-[100px]">
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full font-semibold text-xs">
            {category}
          </span>
          {pageUrl && (
            <Link href={pageUrl} target="_blank">
              <span className="text-base font-medium hover:underline transition-all">
                기사 더보기
              </span>
            </Link>
          )}
        </div>

        {/* Right - 본문 */}
        <div className="flex-1">
          <div className="text-sm text-gray-400 text-right mb-2">
            {formatDateTime(date)}
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {title}
          </h2>

          <hr className="my-4" />

          {category === "미디어" && videoUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
              <ReactPlayer src={videoUrl} width="100%" height="100%" controls />
            </div>
          ) : (
            <div className="max-w-none leading-relaxed text-gray-800 text-base">
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
              {imageUrl && (
                <Image
                  width={1000}
                  height={1000}
                  src={imageUrl}
                  alt={title}
                  className="w-full rounded-xl mt-6 shadow-md"
                />
              )}
            </div>
          )}
        </div>
      </Container>
    );
  } catch (error) {
    console.error("뉴스 상세 페이지 오류:", error);
    return notFound();
  }
}
