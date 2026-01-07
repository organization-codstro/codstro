import { GroupType } from "../../woomoonjeong";

export interface AddDocumentPayload {
  groupName: GroupType;
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
