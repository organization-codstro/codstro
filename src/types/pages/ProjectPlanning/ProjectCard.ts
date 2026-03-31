import { Project } from "../../common/ProjectPlanning";

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onContinue?: (e: React.MouseEvent) => void;
  onDelete?: (projectId: string) => void;
}
