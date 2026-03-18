import { GROUP_NAME } from "../../../../../constants/Woomoonjeong/woomoonjeong";
import { CreateFieldParams } from "../../../../api/Woomoonjeong/DocumentsManagementPage";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreateFieldParams) => void;
  groupMap: Record<GROUP_NAME, string>;
}
