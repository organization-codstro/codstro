import { RecommendedField, RecommendedPin } from "../woomoonjeong";

export interface DocumentsGridProps {
  contentType: "documents" | "fields";
  documents: RecommendedPin[];
  fields: RecommendedField[];
  savedPins: Set<number>;
  savedFields: Set<number>;
  onToggleSavePin: (id: number) => void;
  onToggleSaveField: (id: number) => void;
  onAddDocument?: (pin: RecommendedPin) => void;
  onAddField?: (field: RecommendedField) => void;
}
