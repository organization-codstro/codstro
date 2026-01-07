export interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  conceptName: string;
  todoType: "documentation" | "clone_project" | "custom";
}

export interface TodoForm {
  title: string;
  group: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}
