import { MeetingListItem } from "../../../types/ProjectPlanning/ProjectMeetingPage/ProjectMeetingPage";

export interface MeetingItemCardProps {
  meeting: MeetingListItem;
  onClick: (id: number) => void;
}
