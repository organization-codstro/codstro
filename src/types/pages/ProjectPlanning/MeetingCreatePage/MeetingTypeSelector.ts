import { PROJECT_ROOM_TYPE } from "../../../../constants/ProjectPlanning/ProjectPlanning";

export interface MeetingTypeSelectorProps {
  selectedType: PROJECT_ROOM_TYPE | null;
  onSelect: (type: PROJECT_ROOM_TYPE) => void;
}
