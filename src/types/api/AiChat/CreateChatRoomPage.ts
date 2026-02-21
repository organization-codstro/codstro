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
 * [내 친구 목록 조회] 응답 타입
 */
export type GetMyFriendsResponse = MyFriend[];

/**
 * [채팅방 및 AI 관계 생성]
 * 채팅방 생성 및 AI 연결 파라미터
 */
export interface CreateChatRoomWithAiParams {
  chatRoomData: Omit<
    ChatRoom,
    "chat_room_id" | "chat_room_created_date" | "chat_room_unconfirmed"
  >;
  selectedAiSettingIds: string[];
}

/**
 * [채팅방 및 AI 관계 생성] 응답 타입
 */
export type CreateChatRoomWithAiResponse = ChatRoom;
