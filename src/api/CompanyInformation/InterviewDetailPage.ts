import { supabase } from "../../db/supabase/supabase";
import {
  GetCompanyQuestionsParams,
  GetCompanyQuestionsResponse,
  GetCompanyInfoParams,
  GetCompanyInfoResponse,
  SaveUserInterviewResponseParams,
  SaveUserInterviewResponseResponse,
  GetUserInterviewHistoryParams,
  GetUserInterviewHistoryResponse,
  EvaluateInterviewAnswerParams,
  EvaluationResponse,
} from "../../types/api/CompanyInformation/InterviewDetailPage";

/**
 * [InterviewDetailService]
 * 회사 면접 상세 페이지 관련 API 처리를 담당하는 서비스
 */
export const InterviewDetailService = {
  /**
   * [함수 역할]: 특정 회사의 면접 질문(QnA) 리스트를 가져옵니다.
   * [참조 테이블]: company_qnas
   */
  async getCompanyQuestions(
    params: GetCompanyQuestionsParams,
  ): Promise<GetCompanyQuestionsResponse> {
    const { data, error } = await supabase
      .from("company_qnas")
      .select("*")
      .eq("company_id", params.companyId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * [함수 역할]: 특정 회사의 기본 정보를 조회합니다. (헤더 표시용)
   * [참조 테이블]: companys
   */
  async getCompanyInfo(
    params: GetCompanyInfoParams,
  ): Promise<GetCompanyInfoResponse> {
    const { data, error } = await supabase
      .from("companys")
      .select("company_name")
      .eq("company_id", params.companyId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [함수 역할]: 유저의 면접 답변과 AI 평가 결과를 저장합니다.
   * [참조 테이블]: company_user_qnas
   * [주의]: evaluateAndSave 사용 시 Edge Function이 저장까지 처리하므로
   *         이 함수는 별도 저장이 필요한 경우에만 직접 호출하세요.
   */
  async saveUserInterviewResponse(
    params: SaveUserInterviewResponseParams,
  ): Promise<SaveUserInterviewResponseResponse> {
    const { data, error } = await supabase
      .from("company_user_qnas")
      .insert([
        {
          user_id: params.userId,
          company_qna_id: params.questionId,
          company_qna_question: params.questionText,
          company_user_qna_answer: params.userAnswer,
          company_user_qna_evaluation: params.evaluation,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [함수 역할]: 해당 회사의 모든 질문에 대한 유저의 이전 답변 이력을 확인합니다.
   * [참조 테이블]: company_user_qnas
   */
  async getUserInterviewHistory(
    params: GetUserInterviewHistoryParams,
  ): Promise<GetUserInterviewHistoryResponse> {
    const { data, error } = await supabase
      .from("company_user_qnas")
      .select(
        `
        *,
        company_qnas!inner(company_id)
      `,
      )
      .eq("user_id", params.userId)
      .eq("company_qnas.company_id", params.companyId);

    if (error) throw error;
    return data;
  },

  // ─── AI 답변 평가 + DB 저장 ───────────────────────────────────

  /**
   * [함수 역할]: 답변 AI 평가 + company_user_qnas 저장을 한 번에 처리합니다.
   * [Edge Function]: company_informatio-evaluate_interview_answer
   * [저장 테이블]: company_user_qnas
   *
   * InterviewDetailPage에서 기존의 두 단계 호출:
   *   1. evaluateInterviewAnswer() → AI 피드백 텍스트 반환
   *   2. saveUserInterviewResponse() → DB 저장
   * 을 이 메서드 하나로 대체합니다.
   */
  async evaluateAndSave(
    params: EvaluateInterviewAnswerParams,
  ): Promise<EvaluationResponse> {
    const { data, error } = await supabase.functions.invoke(
      "company_informatio-evaluate_interview_answer",
      { body: params },
    );

    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);

    return data as EvaluationResponse;
  },
};
