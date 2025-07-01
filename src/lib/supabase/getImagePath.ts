export const getImagePathFromUrl = (
  url: string,
  bucketName: string
): string => {
  const prefix = `/storage/v1/object/public/${bucketName}/`;
  const index = url.indexOf(prefix);
  if (index === -1) return "";
  return url.slice(index + prefix.length); // 버킷 이름 다음 경로만 리턴
};
