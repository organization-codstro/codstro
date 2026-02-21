import { AIPersona } from "../../../common/aiChat";

export interface PersonaCardProps {
  persona: AIPersona;
  isFriend: boolean;
  onToggleFriend?: (id: string) => void;
  onViewProfile: (id: string) => void;
  variant?: "horizontal" | "vertical";
}
