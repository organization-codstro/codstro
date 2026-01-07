import { RecommendedPin } from "../woomoonjeong";

export interface RecommendedCreateDocumentModalPayload {
  groupName: "web" | "app" | "server" | "game" | "security" | "work" | "other";
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
