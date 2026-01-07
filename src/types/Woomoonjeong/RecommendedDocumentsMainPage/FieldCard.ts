import { RecommendedField } from "../woomoonjeong";

export interface FieldCardProps {
  field: RecommendedField,
  isSaved: boolean;
  onToggleSave: () => void;
  onAdd?: () => void;
}
