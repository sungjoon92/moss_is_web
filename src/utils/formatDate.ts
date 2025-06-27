export const formatDateTime = (date?: string | Date | null): string => {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours().toString().padStart(2, "0");
  const minute = d.getMinutes().toString().padStart(2, "0");

  return `${year}. ${month}. ${day}. ${hour}:${minute}`;
};
