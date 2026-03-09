import { supabase } from "../../db/supabase/supabase";
import {
  GetPersonaDetailParams,
  StartChattingParams,
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
  async getPersonaDetail(params: GetPersonaDetailParams) {
    const { data, error } = await supabase
      .from("ai_personas")
      .select("*")
      .eq("ai_persona_id", params.personaId)
      .single(); // 단일 행 조회

    if (error) throw new Error(`[getPersonaDetail Error]: ${error.message}`);
    return data;
  },

  /**
   * [채팅 시작하기 / 기존 채팅방 확인]
   * '채팅하기' 버튼 클릭 시, 해당 AI와의 기존 채팅방이 있는지 확인하거나 새로 생성합니다.
   * 참조 테이블: chat_rooms, chat_room_ai_settings
   */
  async startChatting(params: StartChattingParams) {
    // 1. 해당 페르소나와 연결된 user_ai_setting_id가 있는지 먼저 확인
    const { data: aiSetting } = await supabase
      .from("user_ai_settings")
      .select("user_ai_setting_id")
      .eq("user_id", params.userId)
      .eq("ai_persona_id", params.personaId)
      .single();

    if (!aiSetting) {
      throw new Error("먼저 AI 친구로 등록되어야 합니다.");
    }

    // 2. 이미 존재하는 채팅방이 있는지 조회 (유형이 'daily'인 경우 등)
    const { data: existingRoom } = await supabase
      .from("chat_rooms")
      .select("chat_room_id")
      .eq("user_id", params.userId)
      .eq("chat_room_type", "DAILY") // 예시: 일상 대화 타입
      .limit(1)
      .single();

    if (existingRoom) {
      return existingRoom.chat_room_id;
    }

    // 3. 없다면 새로운 채팅방 생성 로직 수행 (생략 가능 - 기획에 따라 다름)
    return null;
  },
};
