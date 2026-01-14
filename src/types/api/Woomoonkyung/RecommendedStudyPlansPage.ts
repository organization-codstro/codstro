/**
 * [추천 공부 계획 목록 및 노드 개수 조회 파라미터]
 */
export type GetRecommendedPlansParams = string;

/**
 * [북마크 상태 토글 파라미터]
 */
export interface ToggleBookmarkParams {
  planId: string;
  currentState: boolean;
}

/**
 * [추천 계획을 내 계획으로 추가 파라미터]
 */
export interface AddToMyPlansParams {
  userId: string;
  targetPlan: any;
}

/**
 * [북마크된 플랜 ID 목록 조회 파라미터]
 */
export type GetBookmarkedIdsParams = number;
