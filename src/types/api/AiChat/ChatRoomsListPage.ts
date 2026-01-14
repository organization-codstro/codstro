/**
 * [채팅방 목록 조회]
 * 유저가 참여 중인 모든 채팅방을 가져오기 위한 파라미터
 */
export interface GetChatRoomsParams {
  userId: string;
}

/**
 * daily_new_chats 테이블 조인 결과 타입
 */
export interface DailyNewChats {
  daily_new_chats: number;
}

/**
 * chat_rooms 테이블 기본 엔티티
 */
export interface ChatRoom {
  chat_room_id: string;
  user_id: string;
  chat_room_name: string;
  chat_room_type: "daily" | "project";
  chat_room_topics: string;
  chat_rooms_unconfirmed: number;
  chat_room_created_date: string;
  daily_new_chats?: DailyNewChats | null;
}

/**
 * [채팅방 목록 조회] 응답 타입
 */
export type GetChatRoomsResponse = ChatRoom[];

/**
 * [채팅방 검색]
 * 채팅방 이름 또는 주제어 검색 파라미터
 */
export interface SearchChatRoomsParams {
  userId: string;
  searchTerm: string;
}

/**
 * [채팅방 검색] 응답 타입
 */
export type SearchChatRoomsResponse = ChatRoom[];

/**
 * [채팅방 생성]
 * 새로운 채팅방 생성을 위한 파라미터
 */
export interface CreateChatRoomParams {
  userId: string;
  roomName: string;
  roomType: "daily" | "project";
  topics: string;
}

/**
 * [채팅방 생성] 응답 타입
 */
export type CreateChatRoomResponse = ChatRoom;
