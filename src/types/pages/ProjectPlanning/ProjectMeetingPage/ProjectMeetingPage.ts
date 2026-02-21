import { PROJECT_ROOM_TYPE } from "../../../../constants/ProjectPlanning/ProjectPlanning";

export interface MeetingListItem {
  meeting_id: string;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  type: PROJECT_ROOM_TYPE;
}
