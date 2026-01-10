import { Todo } from "../../project";

export interface TodoFormProps {
  onAdd: (todo: Todo) => void;
  onCancel: () => void;
}