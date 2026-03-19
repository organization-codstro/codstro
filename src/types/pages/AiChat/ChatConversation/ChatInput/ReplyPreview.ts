import { ChatMessage } from "../../../../common/aiChat";

export interface ReplyPreviewProps {
  replyingTo: ChatMessage;
  onCancel: () => void;
}
