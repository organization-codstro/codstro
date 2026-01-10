import { GroupType } from "../../woomoonjeong";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: {
    name: string;
    description: string;
    type: GroupType;
  }) => void;
}
