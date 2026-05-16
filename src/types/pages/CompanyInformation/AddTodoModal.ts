import {
  GROUP_NAME_TYPE,
  TODO_STATUS_TYPE,
} from "../../../constants/TodoManagement/TodoManagement";

interface AvailableGroup {
  group_id: GROUP_NAME_TYPE;
  group_name: string;
}
export interface AddTodoModalProeps {
  isOpen: boolean;
  onClose: () => void;
  conceptName: string;
  todoType: "documentation" | "clone_project" | "custom";
  onConfirm: (formData: TodoForm) => Promise<void>;
  availableGroups: AvailableGroup[];
}

export interface TodoForm {
  todo_name: string;
  todo_content: string;
  todo_description: string;
  todo_start_date: string;
  todo_end_date: string;
  group_name: GROUP_NAME_TYPE;
  todo_status: TODO_STATUS_TYPE;
}
