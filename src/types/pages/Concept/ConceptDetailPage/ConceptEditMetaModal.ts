export interface ConceptEditMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    labels: string[];
  }) => Promise<void>;
  initialTitle: string;
  initialDescription: string;
  initialLabels: string[];
  isSaving?: boolean;
}
