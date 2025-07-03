export const removeTimestamps = <
  T extends { createdAt?: unknown; updatedAt?: unknown }
>(
  data: T
): Omit<T, "createdAt" | "updatedAt"> => {
  // 변수를 사용하지 않아 eslint 에서 type오류를 냄으로 무시
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...rest } = data;
  return rest;
};
