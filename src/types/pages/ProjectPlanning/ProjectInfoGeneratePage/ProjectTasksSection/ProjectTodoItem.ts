import { Todo } from "../../project";

export interface ProjectTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (todoId: string, updates: Partial<Todo>) => void;
  onDelete: (todoId: string) => void;
  getStatusColor: (status: string) => string;
}
