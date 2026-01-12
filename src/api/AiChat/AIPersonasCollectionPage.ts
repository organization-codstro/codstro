import { supabase } from "../../db/supabase/supabase";
import { GetPersonasByCategoryParams } from "../../types/api/AiChat/AIPersonasCollectionPage";

/**
 * AI 페르소나 컬렉션(전체 목록) 조회를 위한 서비스
 */
export const AIPersonasCollectionService = {
  /**
   * [전체 AI 페르소나 목록 조회]
   * 시스템에 등록된 모든 AI 페르소나를 가져옵니다.
   * 페이징 처리가 필요할 경우 .range()를 추가하여 최적화할 수 있습니다.
   * 참조 테이블: ai_personas
   */
  async getAllPersonas() {
    const { data, error } = await supabase
      .from("ai_personas")
      .select("*")
      .order("ai_persona_id", { ascending: true });

    if (error) throw new Error(`[getAllPersonas Error]: ${error.message}`);
    return data;
  },

  /**
   * [카테고리별 페르소나 필터링]
   * 특정 카테고리에 속한 AI들만 필터링하여 가져옵니다.
   * ai_personas_category 컬럼이 text[] 배열인 경우 사용합니다.
   */
  async getPersonasByCategory(params: GetPersonasByCategoryParams) {
    const { data, error } = await supabase
      .from("ai_personas")
      .select("*")
      .contains("ai_personas_category", [params.category]);

    if (error)
      throw new Error(`[getPersonasByCategory Error]: ${error.message}`);
    return data;
  },
};
