/**
 * [내 친구 목록 조회]
 * 내 AI 친구 목록 조회 파라미터
 */
export interface GetMyFriendsParams {
  userId: string;
}

/**
 * AI 페르소나 기본 정보
 */
export interface AiPersona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_gender: string;
  ai_persona_personality: string;
}

/**
 * [내 친구 목록 조회] 응답 타입
 * UI 사용을 위해 평탄화된 구조
 */
export interface MyFriend extends AiPersona {
  user_ai_setting_id: string;
}

/**
 * [내 친구 목록 조회] 응답 타입
 */
export type GetMyFriendsResponse = MyFriend[];

/**
 * [채팅방 및 AI 관계 생성]
 * 채팅방 생성 및 AI 연결 파라미터
 */
export interface CreateChatRoomWithAiParams {
  userId:string;
  name: string;
  type: "daily" | "project";
  topics: string;
  isMain: boolean;
  selectedAiSettingIds: string[];
}

/**
 * chat_rooms 테이블 엔티티
 */
export interface ChatRoom {
  chat_room_id: string;
  user_id: string;
  chat_room_name: string;
  chat_room_type: "daily" | "project";
  chat_room_topics: string;
  chat_room_daily_is_main: boolean;
  chat_rooms_unconfirmed: number;
  chat_room_created_date?: string;
}

/**
 * [채팅방 및 AI 관계 생성] 응답 타입
 */
export type CreateChatRoomWithAiResponse = ChatRoom;
