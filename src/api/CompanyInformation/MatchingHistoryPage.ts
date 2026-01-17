import { supabase } from "../../db/supabase/supabase";
import {
  GetUserMatchingListParams,
  GetUserMatchingListResponse,
  DeleteMatchingRecordParams,
  DeleteMatchingRecordResponse,
  GetAverageMatchRateParams,
  GetAverageMatchRateResponse,
} from "../../types/api/CompanyInformation/MatchingHistoryPage";

/**
 * [MatchingHistoryService]
 * AI 매칭 이력 목록 페이지 관련 API 처리를 담당하는 서비스
 */
export const MatchingHistoryService = {
  /**
   * [함수 역할]: 특정 유저의 모든 AI 매칭 이력 리스트를 조회합니다.
   * [참조 테이블]: company_user_matches
   * [설명]:
   * - 매칭 ID, 매칭 이름, 매칭 점수, 생성일 등을 조회합니다.
   * - 최신순(created_date DESC)으로 정렬합니다.
   */
  async getUserMatchingList(
    params: GetUserMatchingListParams,
  ): Promise<GetUserMatchingListResponse> {
    const { userId } = params;

    try {
      const { data, error } = await supabase
        .from("company_user_matches")
        .select(
          `
          company_user_match_id,
          company_user_match_name,
          company_user_match_rate,
          created_at,
          company_id
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error("Error fetching matching history list:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 특정 매칭 기록을 DB에서 영구 삭제합니다.
   * [참조 테이블]: company_user_matches
   */
  async deleteMatchingRecord(
    params: DeleteMatchingRecordParams,
  ): Promise<DeleteMatchingRecordResponse> {
    const { matchingId } = params;

    try {
      const { error } = await supabase
        .from("company_user_matches")
        .delete()
        .eq("company_user_matche_id", matchingId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting matching record:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 특정 유저의 평균 매칭 점수를 계산합니다. (대시보드용)
   * [참조 테이블]: company_user_matches
   */
  async getAverageMatchRate(
    params: GetAverageMatchRateParams,
  ): Promise<GetAverageMatchRateResponse> {
    const { userId } = params;

    try {
      const { data, error } = await supabase
        .from("company_user_matches")
        .select("match_rate")
        .eq("user_id", userId);

      if (error) throw error;
      if (!data || data.length === 0) return "0.00";

      const sum = data.reduce(
        (acc, curr) => acc + Number(curr.match_rate ?? 0),
        0,
      );

      return (sum / data.length).toFixed(2);
    } catch (error) {
      console.error("Error calculating average match rate:", error);
      return "0.00";
    }
  },
};
