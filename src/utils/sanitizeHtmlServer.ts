import createDOMPurify from "dompurify";

const window = require("jsdom").window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHtmlServer(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}
