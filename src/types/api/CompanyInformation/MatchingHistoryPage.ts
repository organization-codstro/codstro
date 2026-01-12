/**
 * company_user_matches 매칭 리스트/통계 관련 타입 정의
 */

/** 매칭 리스트 아이템 */
export interface MatchingListItem {
  company_user_matche_id: number;
  company_user_matche_name: string | null;
  match_rate: number | null;
  company_user_matche_created_date: string;
  company_id: number;
}

/** 유저 매칭 리스트 조회 Params */
export interface GetUserMatchingListParams {
  userId: number;
}

/** 유저 매칭 리스트 조회 Response */
export type GetUserMatchingListResponse = MatchingListItem[];

/** 매칭 기록 삭제 Params */
export interface DeleteMatchingRecordParams {
  matchingId: number;
}

/** 매칭 기록 삭제 Response */
export type DeleteMatchingRecordResponse = boolean;

/** 평균 매칭 점수 조회 Params */
export interface GetAverageMatchRateParams {
  userId: number;
}

/** 평균 매칭 점수 조회 Response */
export type GetAverageMatchRateResponse = string;
