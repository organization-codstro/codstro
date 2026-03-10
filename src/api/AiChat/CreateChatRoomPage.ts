// services/CreateRoomService.ts
import { supabase } from "../../db/supabase/supabase";
import {
  GetMyFriendsParams,
  GetMyFriendsResponse,
  CreateChatRoomWithAiParams,
  CreateChatRoomWithAiResponse,
} from "../../types/api/AiChat/CreateChatRoomPage";
import { ChatRoom } from "../../types/common/aiChat";

/**
 * 채팅방 생성 및 참여 AI 설정 관리를 위한 서비스
 */
export const CreateChatRoomService = {
  /**
   * [내 친구 목록 조회]
   * 방에 초대할 수 있는 '내 AI 친구' 목록을 가져옵니다.
   * 참조 테이블: user_ai_settings, ai_personas
   */
  async getMyFriends(
    params: GetMyFriendsParams,
  ): Promise<GetMyFriendsResponse[]> {
    const { data, error } = await supabase
      .from("user_ai_settings")
      .select(
        `
        user_ai_setting_id,
        ai_personas (
          ai_persona_id,
          ai_persona_name,
          ai_persona_gender,
          ai_persona_one_line_introduction
        )
      `,
      )
      .eq("user_id", params.userId);

    if (error) throw new Error(`[getMyFriends Error]: ${error.message}`);

    return data;
  },

  /**
   * [채팅방 및 AI 관계 생성]
   * 1. chat_rooms 테이블에 방 정보를 생성합니다.
   * 2. 생성된 방 ID를 사용하여 chat_room_ai_settings에 선택된 AI들을 등록합니다.
   * 참조 테이블: chat_rooms, chat_room_ai_settings
   */
  async createChatRoomWithAi(
    params: CreateChatRoomWithAiParams,
  ): Promise<CreateChatRoomWithAiResponse> {
    const { data, error } = await supabase.rpc(
      "rpc_create_chat_room_with_ai_v2",
      {
        p_user_id: params.chatRoomData.user_id,
        p_chat_room_name: params.chatRoomData.chat_room_name,
        p_chat_room_type: params.chatRoomData.chat_room_type,
        p_chat_room_topics: params.chatRoomData.chat_room_topics,
        p_chat_room_daily_is_main: params.chatRoomData.chat_room_daily_is_main,
        p_ai_setting_ids: params.selectedAiSettingIds,
      },
    );

    if (error) {
      throw new Error(`[Room Creation Error]: ${error.message}`);
    }

    const raw = data[0];

    // out_ 접두사 → ChatRoom 타입으로 매핑
    const room: ChatRoom = {
      chat_room_id: raw.out_chat_room_id,
      user_id: params.chatRoomData.user_id, // RETURNS TABLE에 포함 안 됨 → params에서 보완
      chat_room_name: raw.out_chat_room_name,
      chat_room_type: raw.out_chat_room_type,
      chat_room_topics: raw.out_chat_room_topics,
      chat_room_daily_is_main: raw.out_chat_room_daily_is_main,
      chat_room_latest_message_index: 0,
      chat_room_last_read_message_index: 0,
      created_at: raw.out_created_at,
    };

    return room;
  },
};
