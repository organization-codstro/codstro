import { supabase } from "../../db/supabase/supabase";
import {
  GetUserInterviewListParams,
  GetUserInterviewListResponse,
  DeleteInterviewRecordParams,
  DeleteInterviewRecordResponse,
  GetInterviewCountParams,
  GetInterviewCountResponse,
} from "../../types/api/CompanyInformation/InterviewHistoryPage";

/**
 * [함수 역할]: 특정 유저가 작성한 모든 면접 기록 리스트를 조회합니다.
 * [참조 테이블]: company_user_qnas
 * [설명]: 목록에 필요한 ID, 질문 내용, 답변 내용, 생성 날짜 등을 최신순으로 가져옵니다.
 */
export const getUserInterviewList = async (
  params: GetUserInterviewListParams
): Promise<GetUserInterviewListResponse> => {
  const { userId } = params;

  try {
    const { data, error } = await supabase
      .from("company_user_qnas")
      .select(
        `
        id,
        company_qna_question,
        company_user_qna_answer,
        company_user_qna_create_date,
        company_user_qna_evaluation
      `
      )
      .eq("user_id", userId)
      .order("company_user_qna_create_date", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error("Error fetching interview list:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 특정 면접 기록을 DB에서 영구 삭제합니다.
 * [참조 테이블]: company_user_qnas
 */
export const deleteInterviewRecord = async (
  params: DeleteInterviewRecordParams
): Promise<DeleteInterviewRecordResponse> => {
  const { id } = params;

  try {
    const { error } = await supabase
      .from("company_user_qnas")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting interview record:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저의 전체 기록 개수를 확인합니다. (필요 시 사용)
 * [참조 테이블]: company_user_qnas
 */
export const getInterviewCount = async (
  params: GetInterviewCountParams
): Promise<GetInterviewCountResponse> => {
  const { userId } = params;

  try {
    const { count, error } = await supabase
      .from("company_user_qnas")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) throw error;
    return count ?? 0;
  } catch (error) {
    console.error("Error fetching interview count:", error);
    return 0;
  }
};
