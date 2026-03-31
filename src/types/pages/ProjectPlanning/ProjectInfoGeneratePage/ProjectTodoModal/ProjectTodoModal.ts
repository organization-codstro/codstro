import { NewProjectTodo } from "../../../../common/ProjectPlanning";

export interface ProjectTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: NewProjectTodo) => void;
}
