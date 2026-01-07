interface Persona {
  ai_persona_id: number;
  ai_persona_name: string;
  ai_persona_personality: string;
}

export interface PersonaCardProps {
  persona: Persona;
  isFriend: boolean;
  onToggleFriend?: (id: number) => void;
  onViewProfile: (id: number) => void;
  variant?: "horizontal" | "vertical";
}
