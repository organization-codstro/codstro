import { CLONE_CODING_STATE_TYPE } from "../../../../constants/CloneCodingProject/CloneCodingProject";

export interface CloneCodingProjectStatusCardProps {
  currentStatus: CLONE_CODING_STATE_TYPE;
  onStatusChange: (status: CLONE_CODING_STATE_TYPE) => void;
}
