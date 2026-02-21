import { GROUP_TYPE } from "../../../../constants/Woomoonjeong/woomoonjeong";
import {
  Group,
  RecommendedField,
  RecommendedPin,
} from "../../../common/woomoonjeong";

export interface RecommendedCreateDocumentModalPayload {
  groupName: GROUP_TYPE;
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
  groups: Group[];
}
