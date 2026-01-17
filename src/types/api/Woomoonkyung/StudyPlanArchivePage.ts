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

/**
 * [PlanStatsResult]
 * 계획별 노드 통계 반환 타입
 */
export interface PlanStatsResult {
  total: number;
  completed: number;
  progress: number;
}

/**
 * [ArchivedPlan]
 * 아카이브 목록 조회 반환 타입
 */
export interface ArchivedPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description?: string;
  study_plan_state: string;
  study_plan_is_archived: boolean;
  created_at: string;
  node_count: { count: number }[];
  completed_node_count: { count: number }[];
  totalNodes: number;
  [key: string]: any;
}
