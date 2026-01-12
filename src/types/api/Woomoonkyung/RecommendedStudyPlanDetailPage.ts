/**
 * [단일 공부 계획 상세 조회 파라미터]
 */
export type GetStudyPlanByIdParams = number;

/**
 * [공부 계획에 포함된 노드 리스트 조회 파라미터]
 */
export type GetNodesByPlanIdParams = number;

/**
 * [새 공부 계획 생성 파라미터]
 */
export interface CreateStudyPlanParams {
  planData: any;
  imageFile?: File;
}

/**
 * [노드 완료 상태 토글 파라미터]
 */
export interface ToggleNodeCompletionParams {
  nodeId: string;
  isCompleted: boolean;
}
