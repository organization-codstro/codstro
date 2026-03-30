export interface NoteActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  deleteConfirmMode: boolean;
}
