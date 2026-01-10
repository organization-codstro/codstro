import { MeetingType } from "./ProjectMeetingPage";

export interface MeetingTabProps {
  label: string;
  count: number;
  type: MeetingType;
  selectedType: MeetingType;
  onClick: (type: MeetingType) => void;
}
