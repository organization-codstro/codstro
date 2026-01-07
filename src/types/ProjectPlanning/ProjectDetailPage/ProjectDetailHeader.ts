import { Project } from "../project";

export interface ProjectDetailHeaderProps {
  project: Project;
  isEditing: boolean;
  onBack: () => void;
  onContinuePlanning: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}
