import { CloneCodingProject, UserCloneCodingProject } from "../woomoonro";

export interface CloneCodingProjectCardProps {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
  onClick: (id: string) => void;
  onToggleBookmark: (projectId: string) => void;
}
