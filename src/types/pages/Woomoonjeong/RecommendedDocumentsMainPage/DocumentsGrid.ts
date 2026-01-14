import { RecommendedField, RecommendedPin } from "../woomoonjeong";

export interface DocumentsGridProps {
  contentType: "documents" | "fields";
  documents: RecommendedPin[];
  fields: RecommendedField[];
  savedPins: Set<string>;
  savedFields: Set<string>;
  onToggleSavePin: (id: string) => void;
  onToggleSaveField: (id: string) => void;
  onAddDocument?: (pin: RecommendedPin) => void;
  onAddField?: (field: RecommendedField) => void;
}
