import { Todo } from "../woomoonjeong";

export interface TodoCardProps {
  todo: Todo;
  isDeletePending: boolean;
  onNavigate: () => void;
  onToggleStatus: (e: React.MouseEvent) => void;
  onDeleteClick: (e: React.MouseEvent) => void;
}