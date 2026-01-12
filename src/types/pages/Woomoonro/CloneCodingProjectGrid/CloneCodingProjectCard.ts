import { CloneCodingProject, UserCloneCodingProject } from "../woomoonro";


export interface ProjectCardProps {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
  onClick: (id: number) => void;
  onToggleBookmark: (projectId: number) => void;
}
