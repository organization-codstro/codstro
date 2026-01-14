import { Todo } from "../project";

export interface TodoItemProps {
  todo: Todo;
  isEditingTodo: boolean;
  isTodoPending: boolean;
  canEdit: boolean;
  getStatusColor: (status: string) => string;
  onUpdateField: (field: keyof Todo, value: string) => void;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (e: React.MouseEvent) => void;
}
