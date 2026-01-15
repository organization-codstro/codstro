/**
 * company_user_matches 매칭 리스트/통계 관련 타입 정의
 */

/** 매칭 리스트 아이템 */
export interface MatchingListItem {
  company_user_matche_id: string;
  company_user_matche_name: string;
  match_rate: number;
  company_user_matche_created_date: string;
  company_id: string;
}

/** 유저 매칭 리스트 조회 Params */
export interface GetUserMatchingListParams {
  userId: string;
}

/** 유저 매칭 리스트 조회 Response */
export type GetUserMatchingListResponse = MatchingListItem[];

/** 매칭 기록 삭제 Params */
export interface DeleteMatchingRecordParams {
  matchingId: string;
}

/** 매칭 기록 삭제 Response */
export type DeleteMatchingRecordResponse = boolean;

/** 평균 매칭 점수 조회 Params */
export interface GetAverageMatchRateParams {
  userId: string;
}

/** 평균 매칭 점수 조회 Response */
export type GetAverageMatchRateResponse = string;
