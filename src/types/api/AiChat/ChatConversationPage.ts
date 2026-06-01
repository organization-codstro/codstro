import { ChatMessage, ChatMessageMetadata } from "../../common/AiChat";

export interface GetRoomInfoParams {
  roomId: string;
}
export interface GetEmoticonsParams {
  page: number;
  limit: number;
  keyword?: string;
}

export interface GetMessagesParams {
  roomId: string;
  limit?: number;
  page?: number;
}

export interface GetChatRoomAIPersonasParams {
  roomId: string;
}
export interface GetChatRoomAIPersonasResponse {
  /**
   * chat_room에 있는 ai 관계의 id
   */
  chat_room_ai_id: string;
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_profile_image_path: string | null;
}
export type ChatMessageSenderType = "USER" | "AI";
export type ChatMessageFormat = "TEXT" | "MULTIMODAL" | "IMG";
export type ChatMessageInteractionType = "CASUAL" | "ACTION_REQUEST";

export interface SendMessageParams {
  chat_room_id: string;

  chat_message_sender_type: ChatMessageSenderType;
  chat_message_sender_agent_id: string | null;

  chat_message_content: string | null;
  chat_message_file_content_path: string[] | null;
  chat_message_metadata: ChatMessageMetadata;
  emoticon_id: string | null;

  chat_message_format: ChatMessageFormat;
  chat_message_index: number;

  chat_message_interaction_type: ChatMessageInteractionType;

  chat_message_reply_message_id: string | null;
  chat_message_reply_target_agent_id: string | null;

  chat_message_mention_target_agent_id: string | null;
}

interface PostgresInsertPayload<T> {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: "INSERT";
  new: T;
  old: Record<string, never>;
  errors: string[] | null;
}
export interface SubscribeToMessagesParams {
  roomId: string;
  callback: (payload: PostgresInsertPayload<ChatMessage>) => void;
}
