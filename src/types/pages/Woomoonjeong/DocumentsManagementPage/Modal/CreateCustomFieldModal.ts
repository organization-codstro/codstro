import { GROUP_NAME_TYPE } from "../../../../../constants/Woomoonjeong/woomoonjeong";
import { CreateFieldParams } from "../../../../api/Woomoonjeong/DocumentsManagementPage";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreateFieldParams) => void;
  groupMap: Record<GROUP_NAME_TYPE, string>;
}
