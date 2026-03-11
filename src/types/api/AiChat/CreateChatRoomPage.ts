import { AIPersona, ChatRoom } from "../../common/aiChat";

/**
 * [내 친구 목록 조회]
 * 내 AI 친구 목록 조회 파라미터
 */
export interface GetMyFriendsParams {
  userId: string;
}

/**
 * [내 친구 목록 조회] 응답 타입
 */
export interface MyFriend extends AIPersona {
  user_ai_setting_id: string;
}

/**
 * [내 친구 목록 조회] 응답 타입의 ai_personas 타입
 */
export type GetMyFriendsResponseAiPersonas = Pick<
  AIPersona,
  | "ai_persona_id"
  | "ai_persona_name"
  | "ai_persona_gender"
  | "ai_persona_one_line_introduction"
>;

/**
 * [내 친구 목록 조회] 응답 타입
 */
export interface GetMyFriendsResponse {
  user_ai_setting_id: string;
  ai_personas: GetMyFriendsResponseAiPersonas[];
}

/**
 * [채팅방 및 AI 관계 생성]
 * 채팅방 생성 및 AI 연결 파라미터
 */
export interface CreateChatRoomWithAiParams {
  chatRoomData: Omit<
    ChatRoom,
    | "chat_room_id"
    | "created_at"
    | "chat_room_latest_message_index"
    | "chat_room_last_read_message_index"
    | "chat_room_summary"
    | "chat_room_summary_message_index"
  >;
  selectedAiSettingIds: string[];
}

/**
 * [채팅방 및 AI 관계 생성] 응답 타입
 */
export type CreateChatRoomWithAiResponse = ChatRoom;
