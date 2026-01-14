/**
 * [진행 중인 프로젝트 조회 파라미터]
 */
export interface GetActiveProjectsParams {
  userId: string;
}

/**
 * [기획 중인 프로젝트 조회 파라미터]
 */
export interface GetPlanningProjectsParams {
  userId: string;
}

/**
 * [프로젝트 단계 판별 로직 파라미터]
 */
export interface DeterminePlanningStepParams {
  projectId: string;
}
