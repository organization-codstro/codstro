import { CLONE_CODING_STATE_TYPE } from "../../../../constants/CloneCodingProject/CloneCodingProject";
import { CloneCodingProject } from "../../../common/CloneCodingProject";

export interface ProjectEditModalProps {
  project: CloneCodingProject;
  currentStatus: CLONE_CODING_STATE_TYPE;
  onSave: (
    updated: CloneCodingProject,
    newStatus: CLONE_CODING_STATE_TYPE,
  ) => void;
  onClose: () => void;
}
