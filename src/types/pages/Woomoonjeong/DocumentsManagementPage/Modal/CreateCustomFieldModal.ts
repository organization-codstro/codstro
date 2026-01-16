import { GROUP_TYPE } from "../../../../../constants/Woomoonjeong/Woomoonjeong";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: {
    name: string;
    description: string;
    type: GROUP_TYPE;
  }) => void;
}
