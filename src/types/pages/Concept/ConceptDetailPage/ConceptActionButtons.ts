export interface ConceptActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  deleteConfirmMode: boolean;
  onEditMeta: () => void;
}
