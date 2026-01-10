import { Project, UserProject } from "../woomoonro";

export interface ProjectGridProps {
  projects: Project[];
  getUserProject: (id: number) => UserProject | undefined;
  onCardClick: (id: number) => void;
  onToggleBookmark: (projectId: number) => void;
}
