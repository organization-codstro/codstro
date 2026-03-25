import { NewProjectTodo } from "../../../../common/projectPlanning";

export interface ProjectTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: NewProjectTodo) => void;
}
