import { Project, Todo } from "../../../common/projectPlanning";

export interface ProjectStatsSidebarProps {
  project: Project;
  todos: Todo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
