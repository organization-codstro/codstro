import { Project } from "./project";

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onContinue?: (e: React.MouseEvent) => void;
}
