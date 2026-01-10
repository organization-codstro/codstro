import { RecommendedField } from "./woomoonjeong";

export interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: RecommendedField;
  onAdd: (fieldType: string) => void;
}
