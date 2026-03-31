import type { KSTDateString, KSTDateOffset } from "../../types/utils/date/getKSTDateString";

export const getKSTDateString = (offsetDays: KSTDateOffset = 0): KSTDateString => {
  const now = new Date();
  const kst = new Date(
    now.getTime() + 9 * 60 * 60 * 1000 + offsetDays * 24 * 60 * 60 * 1000,
  );
  return kst.toISOString().split("T")[0];
};