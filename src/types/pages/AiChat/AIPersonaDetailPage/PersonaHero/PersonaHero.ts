import { AiUserSettings } from "../../../../common/AiChat";

export interface PersonaHeroProps {
  name: string;
  gender: string;
  age: number;
  createdDate: string;
  profilePath?: string;
  onDeleteFriendClick: () => void;
  onAddFriendClick: (settings: AiUserSettings) => void;
  isFriend: boolean;
}
