import { Project } from "../../common/projectPlanning";

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onContinue?: (e: React.MouseEvent) => void;
}
