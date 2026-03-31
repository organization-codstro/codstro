import { AiUserSettings } from "../../../../../common/AiChat";

export interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: AiUserSettings) => void;
  personaName: string;
  profileImagePath?: string | null;
}
