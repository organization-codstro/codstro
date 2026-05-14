import { CompanyInterview } from "../../common/CompanyInformation";

/**
 * [면접 이력 상세 조회] Params
 */
export interface GetInterviewHistoryDetailParams {
  id: string;
}

/**
 * [면접 이력 상세 조회] Response
 */
export interface GetInterviewHistoryDetailResponse {
  id: string;
  company_qna_question: string;
  company_user_qna_answer: string;
  company_user_qna_evaluation: string;
  created_at: string;
  user_id: string;
  company_qna_id: string;
}

/**
 * [유저 전체 면접 이력 조회] Params
 */
export interface GetAllUserInterviewHistoriesParams {
  userId: string;
}

/**
 * [유저 전체 면접 이력 조회] Response
 */
export type GetAllUserInterviewHistoriesResponse = CompanyInterview[];

/**
 * [면접 이력 삭제] Params
 */
export interface DeleteInterviewHistoryParams {
  id: string;
}

/**
 * [면접 이력 삭제] Response
 */
export type DeleteInterviewHistoryResponse = boolean;
