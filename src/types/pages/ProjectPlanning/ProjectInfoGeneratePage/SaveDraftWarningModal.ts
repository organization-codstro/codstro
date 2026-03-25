export interface SaveDraftWarningModalProps {
  isOpen: boolean;
  todoCount: number;
  onConfirm: () => void;
  onClose: () => void;
}
