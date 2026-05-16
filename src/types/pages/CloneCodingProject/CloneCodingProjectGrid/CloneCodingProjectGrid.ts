import {
  CloneCodingProject,
  UserCloneCodingProject,
} from "../../../common/CloneCodingProject";

export interface CloneCodingProjectGridProps {
  projects: CloneCodingProject[];
  getUserProject: (id: string) => UserCloneCodingProject | undefined;
  onCardClick: (id: string) => void;
  onToggleBookmark: (projectId: string) => void;
}
