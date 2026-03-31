import { UITodo } from "../../../../common/ProjectPlanning";

export interface ProjectTodoItemProps {
  todo: UITodo;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: (clientId: string, updates: Partial<UITodo>) => void;

  onDelete: (todoId: string) => void;
  getStatusColor: (status: string) => string;
}
