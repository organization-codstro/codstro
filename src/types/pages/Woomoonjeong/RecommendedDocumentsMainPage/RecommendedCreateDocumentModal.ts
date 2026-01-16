import { GroupType } from "../../../../constants/Woomoonjeong/Woomoonjeong";
import { RecommendedPin } from "../woomoonjeong";

export interface RecommendedCreateDocumentModalPayload {
  groupName: GroupType;
  fieldName: string;
  documentName: string;
  documentUrl: string;
  documentDescription: string;
  documentCategory: string;
}

export interface RecommendedCreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: RecommendedPin;
  onAdd: (payload: RecommendedCreateDocumentModalPayload) => void;
}
