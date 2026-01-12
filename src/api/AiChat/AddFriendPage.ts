import { supabase } from "../../db/supabase/supabase";
import {
  AddFriendParams,
  AddFriendResponse,
  GetMyFriendsParams,
  GetMyFriendsResponse,
  RemoveFriendParams,
  SearchPersonasParams,
} from "../../types/api/AiChat/AddFriendPage";

/**
 * 친구 찾기 및 유저 AI 설정 관리 서비스
 */
export const AddFriendService = {
  /**
   * [내 AI 친구 목록 조회]
   * 유저가 설정한 AI 친구들의 정보를 상세 정보와 함께 가져옵니다.
   * 참조 테이블: user_ai_settings, ai_personas
   */

  async getMyFriends(params: GetMyFriendsParams) {
    const { data, error } = await supabase
      .from("user_ai_settings")
      .select(
        `
        *,
        ai_personas (*)
      `
      )
      .eq("user_id", params.userId);

    if (error) throw new Error(`[getMyFriends Error]: ${error.message}`);

    // ai_personas 정보만 추출하여 반환하거나 구조화
    return (data as unknown as GetMyFriendsResponse).map((item) => ({
      ...item.ai_personas,
      user_ai_setting_id: item.user_ai_setting_id,
    }));
  },

  /**
   * [AI 페르소나 검색 및 필터링]
   * 성격, 성별, 주제, 나이 등의 조건을 Supabase 쿼리로 처리합니다.
   * 참조 테이블: ai_personas
   */
  async searchPersonas(params: SearchPersonasParams) {
    let query = supabase.from("ai_personas").select("*");

    if (params.personality) {
      query = query.ilike("ai_persona_personality", `%${params.personality}%`);
    }
    if (params.gender) {
      query = query.eq("ai_persona_gender", params.gender);
    }
    if (params.topics) {
      query = query.ilike(
        "ai_persona_preferred_features",
        `%${params.topics}%`
      );
    }
    if (params.age) {
      query = query.eq("ai_persona_age", parseInt(params.age));
    }

    const { data, error } = await query;
    if (error) throw new Error(`[searchPersonas Error]: ${error.message}`);
    return data;
  },

  /**
   * [친구 추가 (AI 설정 생성)]
   * 1. user_ai_settings 테이블에 새로운 레코드 생성
   * 2. ai_persona_id에 추가하려는 AI 페르소나 ID 연결
   * 3. 기본 설정값들과 함께 저장
   */
  async addFriend(params: AddFriendParams): Promise<AddFriendResponse> {
    const insertData = {
      user_id: params.userId,
      ai_persona_id: params.personaId, // 추가하려는 AI 페르소나 ID
      user_ai_setting_call_me_name: params.callMeName,
      user_ai_setting_emotion: "Normal",
      user_ai_setting_ai_self_awareness: params.aiSelfAwareness,
      user_ai_setting_service_integration: params.serviceIntegration,
    };

    const { data, error } = await supabase
      .from("user_ai_settings")
      .insert(insertData);

    if (error) throw new Error(`[addFriend Error]: ${error.message}`);
  },

  /**
   * [친구 삭제 (AI 설정 제거)]
   */
  async removeFriend(props: RemoveFriendParams) {
    const { error } = await supabase
      .from("user_ai_settings")
      .delete()
      .eq("user_id", props.userId)
      .eq("ai_persona_id", props.personaId);

    if (error) throw new Error(`[removeFriend Error]: ${error.message}`);
  },
};
