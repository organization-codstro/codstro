import { newTodo } from "../../project";

export interface TodoFormProps {
  onAdd: (todo: newTodo) => void;
  onCancel: () => void;
}
