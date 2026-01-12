import { CloneCodingProject, UserCloneCodingProject } from "../woomoonro";

export interface ProjectGridProps {
  projects: CloneCodingProject[];
  getUserProject: (id: number) => UserCloneCodingProject | undefined;
  onCardClick: (id: number) => void;
  onToggleBookmark: (projectId: number) => void;
}
