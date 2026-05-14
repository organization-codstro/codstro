import { UITodo } from "../../../common/ProjectPlanning";

export interface ProjectStatsSidebarProps {
  todos: UITodo[];
  isPlanning: boolean;
  onNewMeeting: () => void;
  onViewMeetings: () => void;
}
