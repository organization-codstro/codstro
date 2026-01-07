import { Pin } from "../../woomoonjeong";

export interface AddDocumentPayload {
  groupType: string;
  fieldName: string;
  documentName: string;
  documentUrl: string;
  documentCategory: string;
  documentNameDescription: string;
}

export interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: Pin; // 수정 대상 핀
  onAdd: (payload: AddDocumentPayload) => void;
}
