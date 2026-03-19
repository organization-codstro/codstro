import { supabase } from "../../db/supabase/supabase";
import {
  AddFriendParams,
  AddFriendResponse,
  DeleteFriendParams,
  GetPersonaDetailParams,
  // StartChattingParams,
} from "../../types/api/AiChat/AIPersonaDetailPage";

/**
 * AI 페르소나 상세 및 관련 설정을 관리하는 서비스
 */
export const AIPersonaDetailService = {
  /**
   * [AI 상세 정보 조회]
   * 특정 ID를 가진 AI 페르소나의 모든 상세 정보를 가져옵니다.
   * 참조 테이블: ai_personas
   */
  async getPersonaDetail(
    params: GetPersonaDetailParams,
  ): Promise<AddFriendResponse> {
    try {
      // 페르소나 정보 조회
      const { data: persona, error: personaError } = await supabase
        .from("ai_personas")
        .select("*")
        .eq("ai_persona_id", params.personaId)
        .single();

      if (personaError) {
        throw new Error(
          `[getPersonaDetail Persona Error]: ${personaError.message}`,
        );
      }

      // 친구 여부 확인
      const { data: friendData, error: friendError } = await supabase
        .from("user_ai_settings")
        .select("user_ai_setting_id")
        .eq("user_id", params.userId)
        .eq("ai_persona_id", params.personaId)
        .maybeSingle();

      if (friendError) {
        throw new Error(
          `[getPersonaDetail Friend Check Error]: ${friendError.message}`,
        );
      }

      const isFriend = !!friendData;

      return {
        aiPersona: persona,
        isFriend,
        userAiSettingId: friendData?.user_ai_setting_id ?? null,
      };
    } catch (error) {
      console.error("[getPersonaDetail]:", error);
      throw error;
    }
  },

  /**
   * [AI 친구 추가]
   * 특정 ID를 가진 AI 페르소나에 유저 정보를 추가해서 친구 추가를 하는 것
   * 참조 테이블: user_ai_settings
   */

  async addFriend(params: AddFriendParams) {
    const { aiPersonaId, userId, aiUserSettings } = params;

    const { data, error } = await supabase
      .from("user_ai_settings")
      .insert({
        ai_persona_id: aiPersonaId,
        user_id: userId,
        user_ai_setting_call_me_name:
          aiUserSettings.user_ai_setting_call_me_name,
        user_ai_setting_ai_self_awareness:
          aiUserSettings.user_ai_setting_ai_self_awareness,
        user_ai_setting_service_integration:
          aiUserSettings.user_ai_setting_service_integration,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * [AI 친구 삭제]
   * 특정 ID를 가진 AI 페르소나 삭제
   * 참조 테이블: ai_personas
   */

  async deleteFriend(params: DeleteFriendParams) {
    const { userAiSettingId } = params;
    const { error } = await supabase
      .from("user_ai_settings")
      .delete()
      .eq("user_ai_setting_id", userAiSettingId);

    if (error) {
      console.error("AI Setting 삭제 실패:", error);
      throw error;
    }

    return true;
  },

  /**
   * [채팅 시작하기 / 기존 채팅방 확인]
   * '채팅하기' 버튼 클릭 시, 해당 AI와의 기존 채팅방이 있는지 확인하거나 새로 생성합니다.
   * 참조 테이블: chat_rooms, chat_room_ai_settings
   */
  // async startChatting(params: StartChattingParams) {
  //   // 1. 해당 페르소나와 연결된 user_ai_setting_id가 있는지 먼저 확인
  //   const { data: aiSetting } = await supabase
  //     .from("user_ai_settings")
  //     .select("user_ai_setting_id")
  //     .eq("user_id", params.userId)
  //     .eq("ai_persona_id", params.personaId)
  //     .single();

  //   if (!aiSetting) {
  //     throw new Error("먼저 AI 친구로 등록되어야 합니다.");
  //   }

  //   // 2. 이미 존재하는 채팅방이 있는지 조회 (유형이 'daily'인 경우 등)
  //   const { data: existingRoom } = await supabase
  //     .from("chat_rooms")
  //     .select("chat_room_id")
  //     .eq("user_id", params.userId)
  //     .eq("chat_room_type", "DAILY") // 예시: 일상 대화 타입
  //     .limit(1)
  //     .single();

  //   if (existingRoom) {
  //     return existingRoom.chat_room_id;
  //   }

  //   // 3. 없다면 새로운 채팅방 생성 로직 수행 (생략 가능 - 기획에 따라 다름)
  //   return null;
  // },
};
