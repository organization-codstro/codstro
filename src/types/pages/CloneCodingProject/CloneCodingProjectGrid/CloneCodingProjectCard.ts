import {
  CloneCodingProject,
  UserCloneCodingProject,
} from "../../../common/CloneCodingProject";

export interface CloneCodingProjectCardProps {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
  onClick: (id: string) => void;
  onToggleBookmark: (projectId: string) => void;
}
