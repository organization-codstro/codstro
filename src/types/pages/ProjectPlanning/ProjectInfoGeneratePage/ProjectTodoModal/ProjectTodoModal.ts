import { newTodo } from "../../../../common/projectPlanning";

export interface ProjectTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: newTodo) => void;
}
