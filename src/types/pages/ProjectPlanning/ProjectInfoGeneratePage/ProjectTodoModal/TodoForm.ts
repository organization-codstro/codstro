import { NewProjectTodo } from "../../../../common/ProjectPlanning";

export interface TodoFormProps {
  onAdd: (todo: NewProjectTodo) => void;
  onCancel: () => void;
}
