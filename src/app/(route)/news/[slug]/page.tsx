"use client";

import React from "react";
import Container from "@/components/Container";
import { NewsType } from "@/types";
import { NewsData } from "@/data/newsData";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export default function NewsPage({ params }: Props) {
  const news: NewsType | undefined = NewsData.find(
    (item) => item.link === params.slug
  );

  if (!news) return notFound();

  const {
    title,
    date,
    category,
    content,
    id,
    link,
    imageUrl,
    pageUrl,
    videoUrl,
    isMainNews,
  } = news;

  return (
    <Container className="flex flex-col md:flex-row gap-5  mx-auto my-16 px-4">
      {/* Left - 미디어 메뉴 */}
      <div className="flex flex-row items-center justify-center md:flex-col gap-6 text-sm text-gray-700 min-w-[80px]">
        <span className="text-green-600 font-semibold">미디어</span>
        <div className="rounded-full border w-10 h-10 flex items-center justify-center">
          <Link href={pageUrl} target="_blank">
            <span className="text-xl">in</span>
          </Link>
        </div>
      </div>

      {/* Right - 콘텐츠 */}
      <div className="flex-1">
        {/* 날짜 */}
        <div className="text-sm text-gray-400 text-right mb-2">{date}</div>

        {/* 제목 */}
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-4">
          {title}
        </h2>

        <hr className="my-4" />
        {category == "미디어" && videoUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <iframe
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <>
            {/* 미디어가 아니면 일반 글 + 이미지 노출 */}
            <div className="prose max-w-none">
              <p>{content}</p>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full rounded-lg mt-4"
                />
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
