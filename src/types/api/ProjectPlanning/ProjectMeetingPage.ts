export type MeetingType = "feature" | "free" | "all";

export interface MeetingListItem {
  meeting_id: number;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  type: "feature" | "free";
}
