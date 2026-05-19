import { supabase } from "../../db/supabase/supabase";
import {
  GetInterviewHistoryDetailParams,
  GetInterviewHistoryDetailResponse,
  GetAllUserInterviewHistoriesParams,
  GetAllUserInterviewHistoriesResponse,
  DeleteInterviewHistoryParams,
  DeleteInterviewHistoryResponse,
} from "../../types/api/CompanyInformation/InterviewHistoryDetailPage";

/**
 * [InterviewHistoryDetailService]
 * 면접 이력 상세 페이지 관련 API 처리를 담당하는 서비스
 */
export const InterviewHistoryDetailService = {
  /**
   * [함수 역할]: 특정 면접 답변 이력의 상세 정보(질문, 답변, AI 피드백)를 조회합니다.
   * [참조 테이블]: company_user_qnas
   * [설명]:
   * - 사용자가 이전에 제출한 특정 답변 ID(id)를 기준으로 데이터를 가져옵니다.
   * - 질문 텍스트, 유저 답변, AI 평가 결과 및 작성 날짜를 포함합니다.
   */
  async getInterviewHistoryDetail(
    params: GetInterviewHistoryDetailParams,
  ): Promise<GetInterviewHistoryDetailResponse> {
    try {
      const { data, error } = await supabase
        .from("company_user_qnas")
        .select(
          `
          id,
          company_qna_question,
          company_user_qna_answer,
          company_user_qna_evaluation,
          created_at,
          user_id
        `,
        )
        .eq("id", params.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching interview history detail:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 유저의 전체 면접 이력 목록을 최신순으로 조회합니다. (목록 페이지용)
   * [참조 테이블]: company_user_qnas
   */
  async getAllUserInterviewHistories(
    params: GetAllUserInterviewHistoriesParams,
  ): Promise<GetAllUserInterviewHistoriesResponse> {
    try {
      const { data, error } = await supabase
        .from("company_user_qnas")
        .select(
          "id, company_qna_question, created_at, company_user_qna_answer, company_user_qna_evaluation, created_at",
        )
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching interview histories:", error);
      throw error;
    }
  },

  /**
   * [함수 역할]: 잘못된 피드백이나 기록을 유저가 삭제하고 싶을 때 사용합니다.
   * [참조 테이블]: company_user_qnas
   */
  async deleteInterviewHistory(
    params: DeleteInterviewHistoryParams,
  ): Promise<DeleteInterviewHistoryResponse> {
    try {
      const { error } = await supabase
        .from("company_user_qnas")
        .delete()
        .eq("id", params.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting interview history:", error);
      throw error;
    }
  },
};
