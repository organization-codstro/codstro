import { ChatMessage } from "../../../common/aiChat";
export interface MessageBubbleProps {
  message: ChatMessage;
  onReply: (msg: ChatMessage) => void;
}
