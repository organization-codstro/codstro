import { AiUserSettings } from "../../../../../common/aiChat";

export interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: AiUserSettings) => void;
  personaName: string;
  profileImagePath?: string | null;
}
