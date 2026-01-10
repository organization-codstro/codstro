import { Todo } from "../../project";

export interface ProjectTasksSectionProps {
  projectTodos: Todo[];
  editingTodoId: number | null;
  setEditingTodoId: (id: number | null) => void;
  updateProjectTodo: (todoId: number, updates: Partial<Todo>) => void;
  deleteProjectTodo: (todoId: number) => void;
  getStatusColor: (status: string) => string;
  onAddClick: () => void;
}
