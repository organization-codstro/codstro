import { Project, ProjectTodo } from "../../../common/projectPlanning";

export interface ProjectStatsSidebarProps {
  project: Project;
  todos: ProjectTodo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
