export const getKSTDateString = (offsetDays = 0): string => {
  const now = new Date();
  // UTC+9 보정
  const kst = new Date(
    now.getTime() + 9 * 60 * 60 * 1000 + offsetDays * 24 * 60 * 60 * 1000,
  );
  return kst.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
