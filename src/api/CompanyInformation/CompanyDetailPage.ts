import { supabase } from "../../db/supabase/supabase";
import { GetUserRecordResponse } from "../../types/api/AiChat/UserInfoPage";
import {
  GetCompanyDetailParams,
  GetCompanyDetailResponse,
  CheckIsBookmarkedParams,
  CheckIsBookmarkedResponse,
  AddBookmarkParams,
  AddBookmarkResponse,
  DeleteBookmarkParams,
  DeleteBookmarkResponse,
  ToggleBookmarkStatusParams,
  ToggleBookmarkStatusResponse,
} from "../../types/api/CompanyInformation/CompanyDetailPage";
import { GenerateAiMatchReportParams, GenerateAiMatchReportResponse } from "../../types/api/CompanyInformation/CompanyMatchPage";
import { generateAiContent } from "../Gemini/Gemini";

/**
 * [CompanyDetailService]
 * 회사 상세 페이지 관련 API 처리를 담당하는 서비스
 */
export const CompanyDetailService = {
  /**
   * [함수 역할]: 특정 회사의 상세 정보(ID, 이름, 산업, 설명, 웹사이트, 가치관 등)를 조회합니다.
   * [참조 테이블]: companys
   */
  async getCompanyDetail(
    params: GetCompanyDetailParams
  ): Promise<GetCompanyDetailResponse> {
    try {
      const { data, error } = await supabase
        .from("companys")
        .select("*")
        .eq("company_id", params.companyId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching company detail:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 특정 유저가 해당 회사를 북마크(관심 등록)했는지 여부를 확인합니다.
   * [참조 테이블]: user_favorite_companies
   */
  async checkIsBookmarked(
    params: CheckIsBookmarkedParams
  ): Promise<CheckIsBookmarkedResponse> {
    try {
      const { data, error } = await supabase
        .from("user_favorite_companies")
        .select("user_favorite_company_id")
        .eq("user_id", params.userId)
        .eq("company_id", params.companyId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error("Error checking bookmark status:", error);
      return false;
    }
  },

  /**
   * [함수 역할]: 회사를 관심 목록에 추가합니다.
   * [참조 테이블]: user_favorite_companies
   */
  async addBookmark(params: AddBookmarkParams): Promise<AddBookmarkResponse> {
    try {
      const { error } = await supabase.from("user_favorite_companies").insert([
        {
          user_id: params.userId,
          company_id: params.companyId,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error adding bookmark:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 회사를 관심 목록에서 제거합니다.
   * [참조 테이블]: user_favorite_companies
   */
  async deleteBookmark(
    params: DeleteBookmarkParams
  ): Promise<DeleteBookmarkResponse> {
    try {
      const { error } = await supabase
        .from("user_favorite_companies")
        .delete()
        .eq("user_id", params.userId)
        .eq("company_id", params.companyId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 유저의 현재 북마크 상태에 따라 추가 또는 삭제를 수행합니다. (Toggle)
   * [비고]: UI 내 toggleBookmark 핸들러에서 호출하기 용이하도록 구성
   */
  async toggleBookmarkStatus(
    params: ToggleBookmarkStatusParams
  ): Promise<ToggleBookmarkStatusResponse> {
    if (params.currentlyBookmarked) {
      return await this.deleteBookmark({
        userId: params.userId,
        companyId: params.companyId,
      });
    } else {
      return await this.addBookmark({
        userId: params.userId,
        companyId: params.companyId,
      });
    }
  },

  /**
   * [함수 역할]: 유저의 AI 기록과 회사 정보를 비교하여 매칭 리포트를 생성합니다.
   * @param params 회사 정보 (이름, 가치관 등)
   * @param userRecord UserInfoService.getUserRecord에서 가져온 유저 활동 데이터
   */
  async generateAiMatchReport(
    params: GenerateAiMatchReportParams,
    userRecord: GetUserRecordResponse // GetUserRecordResponse 타입
  ): Promise<GenerateAiMatchReportResponse> {
    // 유저 기록에서 분석에 쓸만한 필드들을 추출합니다. (필드명은 DB 구조에 맞춰 조정하세요)
    const userSummary = userRecord.ai_user_record_summary || "정보 없음";

    const prompt = `
      당신은 전문 커리어 컨설턴트입니다. 
      [회사 정보]
      회사명: ${params.companyName}
      회사가치: ${params.companyValues}

      [유저 활동 요약 기록]
      ${userSummary}
      
      위의 유저 활동 기록과 회사의 가치를 심층 분석하여 리포트를 마크다운 형식으로 작성해주세요.
      내용에는 ## Strengths, ## Good Fits, ## Areas to Develop를 포함하고, 
      마지막에 match_rate(0~100 사이의 숫자)를 'SCORE: 숫자' 형식으로 포함해주세요.
      만약 유저의 활동 기록이 부족하다면, 솔직하게 그 점을 언급하고 일반적인 조언을 제공해주세요.
    `;

    return await generateAiContent(prompt);
  },
};
