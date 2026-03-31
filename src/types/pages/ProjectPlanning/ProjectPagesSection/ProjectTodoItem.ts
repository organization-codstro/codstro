import { ProjectTodo } from "../../../common/ProjectPlanning";

export interface TodoItemProps {
  todo: ProjectTodo;
  isEditingTodo: boolean;
  isTodoPending: boolean;
  canEdit: boolean;
  getStatusColor: (status: string) => string;
  onUpdateField: (field: keyof ProjectTodo, value: string) => void;
  onStartEdit?: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}
