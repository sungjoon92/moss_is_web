import { supabase } from "./supabaseClient";

export const uploadImage = async (
  file: File,
  options: { folder?: string; bucket?: string } = {}
): Promise<string> => {
  const { folder = "uploads", bucket = "solution" } = options;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // 1. 파일 업로드
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  // 2. 업로드 성공 시 public URL 가져오기
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl; // 업로드한 이미지의 공개 URL 반환
};
