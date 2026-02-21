import { CloneCodingProject, UserCloneCodingProject } from "../../../common/woomoonro";

export interface CloneCodingProjectCardProps {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
  onClick: (id: string) => void;
  onToggleBookmark: (projectId: string) => void;
}
