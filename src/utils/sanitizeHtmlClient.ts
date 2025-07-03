import DOMPurify from "dompurify";

export function sanitizeHtmlClient(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}
