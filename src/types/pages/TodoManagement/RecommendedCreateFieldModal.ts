import { RecommendedField } from "../../common/TodoManagement";

export interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: RecommendedField;
  onAdd: (groupName: string, selectFieldId: string) => void;
}
