import { AIPersona } from "../../../common/AiChat";

export interface PersonaCardProps {
  persona: AIPersona;
  isFriend: boolean;
  onToggleFriend?: (id: string) => void;
  onViewProfile: (id: string) => void;
  variant?: "horizontal" | "vertical";
}
