// ===========================
// WoomoonkyungMainService 타입 파일
// ===========================

/**
 * [GetActiveMyPlansParams]
 * 진행 중인 내 학습 계획 목록 조회 파라미터
 */
export interface GetActiveMyPlansParams {
  userId: number;
}

/**
 * [DeletePlanParams]
 * 계획 삭제 파라미터
 */
export interface DeletePlanParams {
  planId: number;
}

/**
 * [GetPlanStatsParams]
 * 계획별 상세 통계 조회 파라미터
 */
export interface GetPlanStatsParams {
  planId: number;
}

/**
 * [PlanWithStats]
 * 진행 중인 학습 계획과 통계 정보 포함
 */
export interface PlanWithStats {
  [key: string]: any;
  stats: PlanStats;
}

/**
 * [PlanStats]
 * 학습 계획 통계 정보
 */
export interface PlanStats {
  total: number;
  completed: number;
  progress: number;
}
