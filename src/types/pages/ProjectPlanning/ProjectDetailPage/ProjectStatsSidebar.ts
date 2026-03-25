import { Project, ProjectTodo } from "../../../common/projectPlanning";

export interface ProjectStatsSidebarProps {
  todos: ProjectTodo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
