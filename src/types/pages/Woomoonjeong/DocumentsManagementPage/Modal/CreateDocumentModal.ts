import { GROUP_NAME } from "../../../../../constants/Woomoonjeong/woomoonjeong";
import { CreatePinParams } from "../../../../api/Woomoonjeong/DocumentsManagementPage";
import { Group } from "../../../../common/woomoonjeong";

export interface AddDocumentPayload {
  groupName: GROUP_NAME;
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
