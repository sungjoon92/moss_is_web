import React from "react";

import { sanitizeHtmlClient } from "@/utils/sanitizeHtmlClient";
import { sanitizeHtmlServer } from "@/utils/sanitizeHtmlServer";

interface RenderHtmlProps extends React.HTMLProps<HTMLElement> {
  html: string;
  element?: keyof JSX.IntrinsicElements;
  isServer?: boolean; // 서버 사이드 렌더링 여부
}

function RenderHtml({
  html,
  element = "div",
  isServer = false,
}: RenderHtmlProps) {
  // 기본적으로 div 요소를 사용하고, 필요에 따라 다른 요소로 변경할 수 있도록 함
  if (!html) return null; // html이 없으면 null 반환

  // 빈 스트링이여도 렌더링을 하지 않도록 처리
  if (html.trim().length === 0) return null;

  // 서버 사이드 렌더링 여부에 따라 다른 방식으로 HTML을 정리
  const sanitizedHtml = isServer
    ? sanitizeHtmlServer(html)
    : sanitizeHtmlClient(html);

  const Element = element;
  return <Element dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

export default RenderHtml;
