import { AiUserSettings } from "../../../../common/aiChat";

export interface PersonaHeroProps {
  name: string;
  gender: string;
  age: number;
  createdDate: string;
  profileImageUrl?: string;
  isFriend: boolean;
  onAddFriendClick: (settings: AiUserSettings) => void;
}
