

/**
 * [기초 정보 저장 및 프로젝트 초기화 파라미터]
 */
export interface SaveOrUpdateBasicInfoParams {
  userId: string;
  info: ProjectBasicInfo;
  projectId?: string;
}

/**
 * [기존 임시 저장 데이터 로드 파라미터]
 */
export interface GetPlanningBasicInfoParams {
  projectId: string;
}
