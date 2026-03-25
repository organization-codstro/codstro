import { Project } from "../../../common/projectPlanning";

export interface ProjectInfoViewProps {
  project: Project;
  onSave?: (updated: Project) => Promise<void>;
  isPlanning?: boolean;
}
