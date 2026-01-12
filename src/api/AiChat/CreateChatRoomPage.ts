// services/CreateRoomService.ts
import { supabase } from "../../db/supabase/supabase";
import {
  GetMyFriendsParams,
  GetMyFriendsResponse,
  CreateChatRoomWithAiParams,
  CreateChatRoomWithAiResponse,
} from "../../types/api/AiChat/CreateChatRoomPage";

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
    params: GetMyFriendsParams
  ): Promise<GetMyFriendsResponse> {
    const { data, error } = await supabase
      .from("user_ai_settings")
      .select(
        `
        user_ai_setting_id,
        ai_personas (
          ai_persona_id,
          ai_persona_name,
          ai_persona_gender,
          ai_persona_personality
        )
      `
      )
      .eq("user_id", params.userId);

    if (error) throw new Error(`[getMyFriends Error]: ${error.message}`);

    // UI 구조에 맞게 평탄화(Flatten)하여 반환
    return data.map((item: any) => ({
      ...item.ai_personas,
      user_ai_setting_id: item.user_ai_setting_id,
    }));
  },

  /**
   * [채팅방 및 AI 관계 생성]
   * 1. chat_rooms 테이블에 방 정보를 생성합니다.
   * 2. 생성된 방 ID를 사용하여 chat_room_ai_settings에 선택된 AI들을 등록합니다.
   * 참조 테이블: chat_rooms, chat_room_ai_settings
   */
  async createChatRoomWithAi(
    params: CreateChatRoomWithAiParams
  ): Promise<CreateChatRoomWithAiResponse> {
    // 1. 채팅방 기본 정보 생성
    const { data: room, error: roomError } = await supabase
      .from("chat_rooms")
      .insert([
        {
          user_id: params.userId,
          chat_room_name: params.name,
          chat_room_type: params.type,
          chat_room_topics: params.topics,
          chat_room_daily_is_main: params.isMain,
          chat_rooms_unconfirmed: 0,
        },
      ])
      .select()
      .single();

    if (roomError)
      throw new Error(`[Room Creation Error]: ${roomError.message}`);

    // 2. 채팅방 - AI 관계 데이터 준비
    const aiSettings = params.selectedAiSettingIds.map((id) => ({
      chat_room_id: room.chat_room_id,
      user_ai_setting_id: id,
    }));

    // 3. 관계 데이터 일괄 삽입
    const { error: relationError } = await supabase
      .from("chat_room_ai_settings")
      .insert(aiSettings);

    if (relationError) {
      // 관계 생성 실패 시 방 삭제 로직(Rollback)을 고려할 수 있습니다.
      throw new Error(`[AI Setting Error]: ${relationError.message}`);
    }

    return room;
  },
};
