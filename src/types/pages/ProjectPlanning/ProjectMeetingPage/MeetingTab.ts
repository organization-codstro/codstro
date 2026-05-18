import { PROJECT_ROOM_TYPE } from "../../../../constants/ProjectPlanning/ProjectPlanning";

export interface MeetingTabProps {
  label: string;
  count: number;
  type: PROJECT_ROOM_TYPE;
  selectedType: PROJECT_ROOM_TYPE;
  onClick: (type: PROJECT_ROOM_TYPE) => void;
}
