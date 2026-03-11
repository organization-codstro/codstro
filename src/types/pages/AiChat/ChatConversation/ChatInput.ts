import { AIPersona, ChatMessage } from "../../../common/aiChat";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;

  replyingTo: ChatMessage | null;
  setReplyingTo: (msg: ChatMessage | null) => void;

  images: File[];
  setImages: (files: File[]) => void;

  personas: AIPersona[];
}
