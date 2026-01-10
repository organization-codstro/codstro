import { Project, UserProject } from "../woomoonro";

export interface ProjectCardProps {
  project: Project;
  userProject?: UserProject;
  onClick: (id: number) => void;
  onToggleBookmark: (projectId: number) => void;
}
