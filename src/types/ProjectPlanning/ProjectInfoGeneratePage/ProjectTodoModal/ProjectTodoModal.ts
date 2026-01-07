import { Todo } from "../../project";

export interface ProjectTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: Todo) => void;
}