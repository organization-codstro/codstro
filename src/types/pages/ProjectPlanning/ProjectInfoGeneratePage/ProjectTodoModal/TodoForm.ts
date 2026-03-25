import { NewProjectTodo } from "../../../../common/projectPlanning";

export interface TodoFormProps {
  onAdd: (todo: NewProjectTodo) => void;
  onCancel: () => void;
}
