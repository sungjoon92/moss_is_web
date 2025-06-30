import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const jsdom = new JSDOM(""); // 인스턴스 생성
const window = jsdom.window; // window 객체 추출
const DOMPurify = createDOMPurify(window);

export function sanitizeHtmlServer(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}
