import { UITodo } from "../../../../common/projectPlanning";

export interface ProjectTasksSectionProps {
  projectTodos: UITodo[];

  editingTodoClientId: string | null;
  setEditingTodoClientId: (id: string | null) => void;

  updateProjectTodo: (clientId: string, updates: Partial<UITodo>) => void;

  deleteProjectTodo: (clientId: string) => void;

  getStatusColor: (status: string) => string;
  onAddClick: () => void;
}
