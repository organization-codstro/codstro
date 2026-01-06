import { GroupType } from "../woomoonjeong";

export interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: {
    name: string;
    description: string;
    type: GroupType;
  }) => void;
}
