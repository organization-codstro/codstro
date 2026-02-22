import { RecommendedField } from "../../common/woomoonjeong";

export interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: RecommendedField;
  onAdd: (groupName: string, selectFieldId : string) => void;
}
