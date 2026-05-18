import { ProjectTodo } from "../../../common/ProjectPlanning";

export interface ProjectTodoListProps {
  isEditing: boolean;
  pageId: string;
  todos: ProjectTodo[];
  editingTodoId: { pageId: string; todoId: string } | null;
  deletePendingId: string | undefined;
  getStatusColor: (status: string) => string;
  onAddTodo?: (pageId: string, todo: ProjectTodo) => void;
  onUpdateTodoField: (todoId: string, field: keyof ProjectTodo, value: string) => void;
  onStartEditTodo: (todoId: string) => void;
  onSaveTodo: (todoId: string, todo: ProjectTodo) => void;
  onCancelEditTodo: () => void;
  onDeleteTodoAction: (e: React.MouseEvent, todoId: string) => void;
}
