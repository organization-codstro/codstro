/**
 * company_user_qnas 면접 기록 관련 타입 정의
 */

/** 면접 기록 단일 아이템 */
export interface UserInterviewItem {
  id: string;
  company_qna_question: string | null;
  company_user_qna_answer: string | null;
  company_user_qna_create_date: string;
  company_user_qna_evaluation: string | null;
}

/** 특정 유저 면접 기록 리스트 조회 Params */
export interface GetUserInterviewListParams {
  userId: string;
}

/** 특정 유저 면접 기록 리스트 조회 Response */
export type GetUserInterviewListResponse = UserInterviewItem[];

/** 면접 기록 삭제 Params */
export interface DeleteInterviewRecordParams {
  id: string;
}

/** 면접 기록 삭제 Response */
export type DeleteInterviewRecordResponse = boolean;

/** 면접 기록 개수 조회 Params */
export interface GetInterviewCountParams {
  userId: string;
}

/** 면접 기록 개수 조회 Response */
export type GetInterviewCountResponse = number;
