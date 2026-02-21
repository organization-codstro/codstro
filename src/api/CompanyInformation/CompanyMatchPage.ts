import { supabase } from "../../db/supabase/supabase";
import {
  GetCompanyMatchDetailParams,
  GetCompanyMatchDetailResponse,
  CreateMatchResultParams,
  CreateMatchResultResponse,
  GetAllUserMatchParams,
  GetAllUserMatchResponse,
} from "../../types/api/CompanyInformation/CompanyMatchPage";

/**
 * [CompanyMatchService]
 * 회사 AI 매칭 관련 API 처리를 담당하는 서비스
 */
export const CompanyMatchService = {
  /**
   * [함수 역할]: 특정 유저와 특정 회사의 AI 매칭 상세 결과(점수, 분석 내용, 개선 제안 등)를 조회합니다.
   * [참조 테이블]: company_user_matchs, companys
   * [설명]: 회사의 이름과 매칭 데이터를 함께 가져오기 위해 JOIN 쿼리를 사용합니다.
   */
  async getCompanyMatchDetail(
    params: GetCompanyMatchDetailParams,
  ): Promise<GetCompanyMatchDetailResponse> {
    try {
      const { data, error } = await supabase
        .from("company_user_matchs")
        .select(
          `
          *,
          companys (
            company_name
          )
        `,
        )
        .eq("user_id", params.userId)
        .eq("company_id", params.companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching match detail:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 유저의 모든 회사 매칭 이력을 조회합니다.
   * [참조 테이블]: company_user_matchs
   * [설명]: 매칭 리스트 페이지 등에서 전체적인 현황을 보여줄 때 사용합니다.
   */
  async getAllUserMatches(
    params: GetAllUserMatchParams,
  ): Promise<GetAllUserMatchResponse> {
    try {
      const { data, error } = await supabase
        .from("company_user_matchs")
        .select(
          `
          user_id,
          company_user_match_id,
          company_user_match_name,
          company_user_match_rate,
          company_user_match_suggestions,
          company_user_match_reason,
          created_at,
          company_id
        `,
        )
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching all matches:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 새로운 AI 매칭 결과를 저장합니다.
   * [참조 테이블]: company_user_matchs
   * [설명]: AI 분석이 완료된 후 결과를 DB에 기록할 때 사용합니다.
   */
  async createMatchResult(
    params: CreateMatchResultParams,
  ): Promise<CreateMatchResultResponse> {
    try {
      const { data, error } = await supabase
        .from("company_user_matchs")
        .insert([
          {
            user_id: params.userId,
            company_id: params.companyId,
            company_user_match_name: `${
              params.companyName
            } - ${new Date().toLocaleDateString()}`,
            match_rate: params.matchRate,
            company_user_match_reason: params.reason,
            company_user_match_suggestions: params.suggestions,
            company_user_match_created_date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating match result:", error);
      throw error;
    }
  },
};
