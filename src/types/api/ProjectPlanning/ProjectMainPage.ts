/**
 * [진행 중인 프로젝트 조회 파라미터]
 */
export interface GetActiveProjectsParams {
  userId: number;
}

/**
 * [기획 중인 프로젝트 조회 파라미터]
 */
export interface GetPlanningProjectsParams {
  userId: number;
}

/**
 * [프로젝트 단계 판별 로직 파라미터]
 */
export interface DeterminePlanningStepParams {
  projectId: number;
}
