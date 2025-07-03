import dynamic from "next/dynamic";

export const DynamicReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});
