import { supabase } from "../../db/supabase/supabase";
import {
  InterviewQuestion,
  MatchResult,
  CheckIsBookmarkedResponse,
  CheckIsBookmarkedParams,
  AddBookmarkParams,
  AddBookmarkResponse,
  DeleteBookmarkParams,
  DeleteBookmarkResponse,
  ToggleBookmarkStatusParams,
  ToggleBookmarkStatusResponse,
  GetCompanyDetailParams,
  GetCompanyDetailResponse,
  GenerateInterviewQuestionsParams,
  EvaluateInterviewAnswerParams,
} from "../../types/api/CompanyInformation/CompanyDetailPage";
import { EvaluationResponse } from "../../types/api/CompanyInformation/InterviewDetailPage";

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
    params: GetCompanyDetailParams,
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
   * [참조 테이블]: user_favorite_companys
   */
  async checkIsBookmarked(
    params: CheckIsBookmarkedParams,
  ): Promise<CheckIsBookmarkedResponse> {
    try {
      const { data, error } = await supabase
        .from("user_favorite_companys")
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
   * [참조 테이블]: user_favorite_companys
   */
  async addBookmark(params: AddBookmarkParams): Promise<AddBookmarkResponse> {
    try {
      const { error } = await supabase.from("user_favorite_companys").insert([
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
   * [참조 테이블]: user_favorite_companys
   */
  async deleteBookmark(
    params: DeleteBookmarkParams,
  ): Promise<DeleteBookmarkResponse> {
    try {
      const { error } = await supabase
        .from("user_favorite_companys")
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
    params: ToggleBookmarkStatusParams,
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
   * AI 매칭 분석 실행 + DB 저장
   * Edge Function: analyze-company-match
   */ async analyzeCompanyMatch(params: {
    userId: string;
    companyId: string;
    companyName: string;
    companyValues: string;
    companyDescription: string;
    companyIndustry: string;
    userSummary: string;
  }): Promise<MatchResult> {
    const { data, error } = await supabase.functions.invoke(
      "company_information-analyze_company_match",
      {
        body: params,
      },
    );

    if (error) throw new Error(error.message);
    if (data.error) throw new Error(data.error);

    return data as MatchResult;
  },

  /**
   * 기존 매칭 결과 조회
   */
  async getExistingMatchResult(params: {
    userId: string;
    companyId: string;
  }): Promise<{
    company_user_match_rate: number;
    company_user_match_reason: string;
    company_user_match_suggestions: string;
    created_at: string;
  } | null> {
    const { data, error } = await supabase
      .from("company_user_matches")
      .select(
        "company_user_match_rate, company_user_match_reason, company_user_match_suggestions, created_at",
      )
      .eq("user_id", params.userId)
      .eq("company_id", params.companyId)
      .single();

    if (error) return null;
    return data;
  },

  // ─── 면접 질문 생성 ───────────────────────────────────────────

  /**
   * AI 면접 질문 생성 + DB 저장
   * Edge Function: company_information-generate_interview_questions
   */
  async generateInterviewQuestions(
    params: GenerateInterviewQuestionsParams,
  ): Promise<InterviewQuestion[]> {
    const { data, error } = await supabase.functions.invoke(
      "company_information-generate_interview_questions",
      {
        body: params,
      },
    );

    if (error) throw new Error(error.message);
    if (data.error) throw new Error(data.error);

    return data.questions as InterviewQuestion[];
  },

  // ─── 면접 답변 평가 ───────────────────────────────────────────

  /**
   * 답변 평가 + DB 저장
   * Edge Function: company_informatio-evaluate_interview_answer
   */
  async evaluateInterviewAnswer(
    params: EvaluateInterviewAnswerParams,
  ): Promise<EvaluationResponse> {
    const { data, error } = await supabase.functions.invoke(
      "company_informatio-evaluate_interview_answer",
      {
        body: params,
      },
    );

    if (error) throw new Error(error.message);
    if (data.error) throw new Error(data.error);

    return data as EvaluationResponse;
  },

  // ─── 유저 AI 기록 조회 ────────────────────────────────────────

  /**
   * ai_user_records에서 유저 요약 정보 조회
   */
  async getUserAiSummary(userId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("ai_user_records")
      .select("ai_user_record_summary")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data.ai_user_record_summary;
  },
};
