import { RecommendedPin } from "../../../common/woomoonjeong";

export interface DocumentCardProps {
  pin: RecommendedPin;
  isSaved: boolean;
  onToggleSave: () => void;
  onAdd?: () => void;
}
