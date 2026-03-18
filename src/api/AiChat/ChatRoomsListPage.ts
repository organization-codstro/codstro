// services/ChatListService.ts
import { supabase } from "../../db/supabase/supabase";
import {
  GetChatRoomsParams,
  GetChatRoomsResponse,
  SearchChatRoomsParams,
  SearchChatRoomsResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  DeleteChatRoomParams,
} from "../../types/api/AiChat/ChatRoomsListPage";

/**
 * 채팅방 목록 조회 및 메인 리스트 관리를 위한 서비스
 */
export const ChatRoomsListService = {
  /**
   * [채팅방 목록 조회]
   * 유저가 참여 중인 모든 채팅방을 가져옵니다.
   * 각 방의 마지막 메시지 미리보기를 위해 daily_new_chats와 chat_messages를 참조할 수 있습니다.
   * 참조 테이블: chat_rooms, daily_new_chats
   */
  async getChatRooms(
    params: GetChatRoomsParams,
  ): Promise<GetChatRoomsResponse> {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select(
        `
        *
      `,
      )
      .eq("user_id", params.userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`[getChatRooms Error]: ${error.message}`);

    // daily_new_chats가 없을 경우를 대비해 데이터를 가공하여 반환할 수 있습니다.
    return data;
  },

  /**
   * [채팅방 검색]
   * 채팅방 이름 또는 주제어를 통해 참여 중인 방을 검색합니다.
   * 참조 테이블: chat_rooms
   */
  async searchChatRooms(
    params: SearchChatRoomsParams,
  ): Promise<SearchChatRoomsResponse> {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .eq("user_id", params.userId)
      .or(
        `chat_room_name.ilike.%${params.searchTerm}%,chat_room_topics.ilike.%${params.searchTerm}%`,
      );

    if (error) throw new Error(`[searchChatRooms Error]: ${error.message}`);
    return data;
  },

  /**
   * [채팅방 생성]
   * 새로운 채팅 세션을 생성합니다. (예: 일상 대화 혹은 프로젝트 대화)
   * 참조 테이블: chat_rooms
   */
  async createChatRoom(
    params: CreateChatRoomParams,
  ): Promise<CreateChatRoomResponse> {
    const { data, error } = await supabase
      .from("chat_rooms")
      .insert([
        {
          user_id: params.userId,
          chat_room_name: params.roomName,
          chat_room_type: params.roomType,
          chat_room_topics: params.topics,
          chat_room_latest_message_index: 0,
          chat_room_last_read_message_index: 0,
          chat_room_summary: null,
          chat_room_summary_message_index: 0,
        },
      ])
      .select();

    if (error) throw new Error(`[createChatRoom Error]: ${error.message}`);
    return data[0];
  },

  /**
   * [채팅방 삭제]
   * 채팅방을 삭제합니다.
   * 참조 테이블: delete_chat_room 호출
   */
  async deleteChatRoom(params: DeleteChatRoomParams) {
    const { chatRoomId } = params;

    const { error } = await supabase.rpc("delete_chat_room", {
      room_id: chatRoomId,
    });

    if (error) {
      console.error("deleteChatRoom error:", error);
      return { success: false, message: error.message || "삭제 실패" };
    }

    return { success: true };
  },
};
