/**
 * [아카이브된 프로젝트 목록 조회 파라미터]
 */
export interface GetArchivedProjectsParams {
  userId: string;
}

/**
 * [프로젝트 복구 또는 기간 연장 파라미터]
 */
export interface ExtendProjectPeriodParams {
  projectId: string;
  newEndDate: string;
}
