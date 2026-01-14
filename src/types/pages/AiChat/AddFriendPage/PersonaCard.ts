interface Persona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_personality: string;
}

export interface PersonaCardProps {
  persona: Persona;
  isFriend: boolean;
  onToggleFriend?: (id: string) => void;
  onViewProfile: (id: string) => void;
  variant?: "horizontal" | "vertical";
}
