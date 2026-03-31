import { ProjectTodo } from "../../../common/ProjectPlanning";

export interface ProjectStatsSidebarProps {
  todos: ProjectTodo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
