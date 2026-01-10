interface Friend {
  ai_persona_id: number;
  ai_persona_name: string;
  ai_persona_personality: string;
}

export interface FriendSelectorProps {
  friends: Friend[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}
