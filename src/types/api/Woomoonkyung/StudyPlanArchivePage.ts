/**
 * [GetArchivedPlansParams]
 * 아카이브 목록 조회에 필요한 파라미터
 */
export interface GetArchivedPlansParams {
  userId: string;
  searchQuery?: string;
}

/**
 * [GetPlanStatsParams]
 * 계획별 노드 통계 조회 파라미터
 */
export interface GetPlanStatsParams {
  planId: string;
}

/**
 * [DeleteFromArchiveParams]
 * 아카이브 삭제 또는 북마크 해제 파라미터
 */
export interface DeleteFromArchiveParams {
  planId: string;
  isRecommendation: boolean;
}


