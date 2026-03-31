import { ChatMessage } from "../../../../common/AiChat";

export interface ReplyPreviewProps {
  replyingTo: ChatMessage;
  onCancel: () => void;
}
