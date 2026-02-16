import { GROUP_TYPE } from "../../../../../constants/Woomoonjeong/Woomoonjeong";
import { CreatePinParams } from "../../../../api/Woomoonjeong/DocumentsManagementPage";
import { Group } from "../../woomoonjeong";

export interface AddDocumentPayload {
  groupName: GROUP_TYPE;
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
