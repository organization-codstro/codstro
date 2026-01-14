interface Friend {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_personality: string;
}

export interface FriendSelectorProps {
  friends: Friend[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}
