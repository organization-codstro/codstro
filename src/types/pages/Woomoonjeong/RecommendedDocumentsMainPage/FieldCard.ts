import { RecommendedField } from "../../../common/woomoonjeong";

export interface FieldCardProps {
  field: RecommendedField,
  isSaved: boolean;
  onToggleSave: () => void;
  onAdd?: () => void;
}
