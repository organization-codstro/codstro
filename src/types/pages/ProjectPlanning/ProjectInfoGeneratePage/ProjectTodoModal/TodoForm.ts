import { newTodo } from "../../../../common/projectPlanning";

export interface TodoFormProps {
  onAdd: (todo: newTodo) => void;
  onCancel: () => void;
}
