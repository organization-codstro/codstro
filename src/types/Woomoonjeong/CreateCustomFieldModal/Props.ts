import { FieldGroupType } from "../../../constants/Woomoonjeong/Woomoonjeong";

export interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: {
    name: string;
    description: string;
    type: FieldGroupType;
  }) => void;
}
