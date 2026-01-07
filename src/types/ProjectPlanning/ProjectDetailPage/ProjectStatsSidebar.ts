import { Project, Todo } from "../project";

export interface ProjectStatsSidebarProps {
  project: Project;
  todos: Todo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
