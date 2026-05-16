import { GROUP_NAME_TYPE } from "../../../../../constants/TodoManagement/TodoManagement";
import { CreateFieldParams } from "../../../../api/TodoManagement/DocumentsManagementPage";

export interface CreateCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreateFieldParams) => void;
  groupMap: Record<GROUP_NAME_TYPE, string>;
}
