import { GROUP_NAME_TYPE } from "../../../../../constants/TodoManagement/TodoManagement";
import { CreatePinParams } from "../../../../api/TodoManagement/DocumentsManagementPage";
import { Group } from "../../../../common/TodoManagement";

export interface AddDocumentPayload {
  groupName: GROUP_NAME_TYPE;
  fieldName: string;
  documentName: string;
  documentUrl: string;
  documentDescription: string;
  documentCategory: string;
}

export interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: CreatePinParams) => void;
  groups: Group[];
}
