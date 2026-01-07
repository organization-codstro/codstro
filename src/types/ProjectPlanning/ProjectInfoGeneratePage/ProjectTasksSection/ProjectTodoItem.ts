import { Todo } from "../../project";

export interface ProjectTodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (todoId: number, updates: Partial<Todo>) => void;
  onDelete: (todoId: number) => void;
  getStatusColor: (status: string) => string;
}
