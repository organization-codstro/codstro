import { ChatMessage, ChatRoomAI } from "../../../common/AiChat";
export interface MessageBubbleProps {
  message: ChatMessage;
  onReply: (msg: ChatMessage) => void;
  personas?: ChatRoomAI[]; // AI 이름 표시용
  allMessages?: ChatMessage[]; // 답장 원본 메시지 조회용
}
