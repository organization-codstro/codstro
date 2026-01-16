import { newTodo } from "../../project";

export interface ProjectTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: newTodo) => void;
}
