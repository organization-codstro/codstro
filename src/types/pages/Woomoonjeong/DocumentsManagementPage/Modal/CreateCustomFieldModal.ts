import { GROUP_TYPE } from "../../../../../constants/Woomoonjeong/Woomoonjeong";
import { CreateFieldParams } from "../../../../api/Woomoonjeong/DocumentsManagementPage";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreateFieldParams) => void;
  groupMap: Record<GROUP_TYPE, string>;
}
