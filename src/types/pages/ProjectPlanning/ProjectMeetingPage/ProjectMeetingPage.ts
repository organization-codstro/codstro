export type MeetingType = "Feature" | "Free" | "All";

export interface MeetingListItem {
  meeting_id: string;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  type: MeetingType;
}
