import { Project } from "../../../common/ProjectPlanning";

export interface ProjectInfoViewProps {
  project: Project;
  onSave?: (updated: Project) => Promise<void>;
  isPlanning?: boolean;
}
