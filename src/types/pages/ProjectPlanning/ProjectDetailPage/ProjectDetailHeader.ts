import { Project } from "../../../common/ProjectPlanning";

export interface ProjectDetailHeaderProps {
  project: Project;
  isEditing: boolean;
  onBack: () => void;
  onContinuePlanning: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}
