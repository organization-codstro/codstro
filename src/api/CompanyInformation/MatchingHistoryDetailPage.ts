import { supabase } from "../../db/supabase/supabase";
import {
  GetMatchingHistoryDetailParams,
  GetMatchingHistoryDetailResponse,
  UpdateMatchingHistoryNameParams,
  UpdateMatchingHistoryNameResponse,
  DeleteMatchingHistoryParams,
  DeleteMatchingHistoryResponse,
} from "../../types/api/CompanyInformation/MatchingHistoryDetailPage";

/**
 * [MatchingHistoryDetailService]
 * AI 매칭 이력 상세 페이지 관련 API 처리를 담당하는 서비스
 */
export const MatchingHistoryDetailService = {
  /**
   * [함수 역할]: 특정 AI 매칭 이력의 상세 데이터(매칭 점수, 리포트 내용, 제안 사항 등)를 조회합니다.
   * [참조 테이블]: company_user_matches
   * [설명]:
   * - 매칭 고유 ID(company_user_matche_id)를 사용하여 상세 리포트 데이터를 가져옵니다.
   * - match_rate(점수), reason(분석 내용), suggestions(개선 제안) 필드를 포함합니다.
   */
  async getMatchingHistoryDetail(
    params: GetMatchingHistoryDetailParams
  ): Promise<GetMatchingHistoryDetailResponse> {
    const { matchingId } = params;

    try {
      const { data, error } = await supabase
        .from("company_user_matches")
        .select(
          `
          company_user_matche_id,
          company_user_matche_name,
          match_rate,
          company_user_matche_reason,
          company_user_matche_suggestions,
          company_user_matche_created_date,
          company_id,
          user_id
        `
        )
        .eq("company_user_matche_id", matchingId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching matching history detail:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 유저의 매칭 기록 명칭을 수정합니다. (필요 시 사용)
   * [참조 테이블]: company_user_matches
   */
  async updateMatchingHistoryName(
    params: UpdateMatchingHistoryNameParams
  ): Promise<UpdateMatchingHistoryNameResponse> {
    const { matchingId, newName } = params;

    try {
      const { data, error } = await supabase
        .from("company_user_matches")
        .update({ company_user_matche_name: newName })
        .eq("company_user_matche_id", matchingId)
        .select();

      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error("Error updating matching history name:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 특정 매칭 기록을 삭제합니다.
   * [참조 테이블]: company_user_matches
   */
  async deleteMatchingHistory(
    params: DeleteMatchingHistoryParams
  ): Promise<DeleteMatchingHistoryResponse> {
    const { matchingId } = params;

    try {
      const { error } = await supabase
        .from("company_user_matches")
        .delete()
        .eq("company_user_matche_id", matchingId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting matching history:", error);
      throw error;
    }
  },
};
