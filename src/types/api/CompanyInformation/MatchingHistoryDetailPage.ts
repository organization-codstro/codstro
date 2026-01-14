/**
 * company_user_matches AI 매칭 기록 관련 타입 정의
 */

/** AI 매칭 상세 데이터 */
export interface MatchingHistoryDetail {
  company_user_matche_id: string;
  company_user_matche_name: string | null;
  match_rate: number | null;
  company_user_matche_reason: string | null;
  company_user_matche_suggestions: string | null;
  company_user_matche_created_date: string;
  company_id: string;
  user_id: string;
}

/** 매칭 상세 조회 Params */
export interface GetMatchingHistoryDetailParams {
  matchingId: string;
}

/** 매칭 상세 조회 Response */
export type GetMatchingHistoryDetailResponse = MatchingHistoryDetail;

/** 매칭 기록 이름 수정 Params */
export interface UpdateMatchingHistoryNameParams {
  matchingId: string;
  newName: string;
}

/** 매칭 기록 이름 수정 Response */
export type UpdateMatchingHistoryNameResponse = MatchingHistoryDetail[];

/** 매칭 기록 삭제 Params */
export interface DeleteMatchingHistoryParams {
  matchingId: string;
}

/** 매칭 기록 삭제 Response */
export type DeleteMatchingHistoryResponse = boolean;
