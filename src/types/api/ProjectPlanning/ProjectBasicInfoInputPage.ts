export interface ProjectBasicInfo {
  project_topic?: string;
  desired_features?: string;
  concepts_to_cover?: string;
  other_info?: string;
}

/**
 * [기초 정보 저장 및 프로젝트 초기화 파라미터]
 */
export interface SaveOrUpdateBasicInfoParams {
  userId: number;
  info: ProjectBasicInfo;
  projectId?: number;
}

/**
 * [기존 임시 저장 데이터 로드 파라미터]
 */
export interface GetPlanningBasicInfoParams {
  projectId: number;
}
