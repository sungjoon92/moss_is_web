// lib/supabase/deleteImage.ts
import { supabase } from "./supabaseClient";

export const deleteImage = async ({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("이미지 삭제 실패:", error.message);
    throw error;
  }
};
