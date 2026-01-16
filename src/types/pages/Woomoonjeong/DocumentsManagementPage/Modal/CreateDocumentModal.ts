import { GROUP_TYPE } from "../../../../../constants/Woomoonjeong/Woomoonjeong";

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
  onAdd: (payload: AddDocumentPayload) => void;
}
