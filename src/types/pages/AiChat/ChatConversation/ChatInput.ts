import { ChatMessage, ChatRoomAI } from "../../../common/aiChat";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (
    emoticonId?: string,
    interactionType?: "CASUAL" | "ACTION_REQUEST",
  ) => void;
  disabled?: boolean;
  replyingTo: ChatMessage | null;
  setReplyingTo: (msg: ChatMessage | null) => void;
  images: File[];
  setImages: (files: File[]) => void;
  personas: ChatRoomAI[];
}
