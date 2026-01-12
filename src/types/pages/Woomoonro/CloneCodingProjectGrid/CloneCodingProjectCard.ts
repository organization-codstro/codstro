import { CloneCodingProject, UserCloneCodingProject } from "../woomoonro";

export interface CloneCodingProjectCardProps {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
  onClick: (id: number) => void;
  onToggleBookmark: (projectId: number) => void;
}
