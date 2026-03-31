import { ChatMessage, ChatRoomAI, Emoticon } from "../../../../common/AiChat";

export type EmoticonCache = Record<
  number,
  {
    data: Emoticon[];
    urls: Record<string, string>;
    count: number;
  }
>;

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
