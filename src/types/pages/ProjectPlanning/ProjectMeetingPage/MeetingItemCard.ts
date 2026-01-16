import { MeetingListItem } from "./ProjectMeetingPage";

export interface MeetingItemCardProps {
  meeting: MeetingListItem;
  onClick: (id: string) => void;
}
