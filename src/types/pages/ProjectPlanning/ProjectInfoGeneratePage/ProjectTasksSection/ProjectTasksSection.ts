import { Todo } from "../../project";

export interface ProjectTasksSectionProps {
  projectTodos: Todo[];
  editingTodoId: string | null;
  setEditingTodoId: (id: string | null) => void;
  updateProjectTodo: (todoId: string, updates: Partial<Todo>) => void;
  deleteProjectTodo: (todoId: string) => void;
  getStatusColor: (status: string) => string;
  onAddClick: () => void;
}
