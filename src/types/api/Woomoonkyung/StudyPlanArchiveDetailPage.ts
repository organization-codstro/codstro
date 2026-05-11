/**
 * [공부 계획 상세 정보 조회 파라미터]
 */
export type GetPlanDetailParams = string;

/**
 * [공부 계획 세부 노드 리스트 조회 파라미터]
 */
export type GetPlanNodesParams = string;

/**
 * [노드 완료 상태 전환 및 플랜 상태 자동 동기화 파라미터]
 */
export interface ToggleNodeAndSyncStatusParams {
  planId: string;
  nodeId: string;
  completed: boolean;
}

/**
 * [공부 계획 정보 수정 파라미터]
 */
export interface UpdatePlanParams {
  planId: string;
  updates: Partial<{
    study_plan_name: string;
    study_plan_description: string;
    study_plan_state: string;
    study_plan_start_date: string;
    study_plan_end_date: string;
    study_plan_image_url: string;
  }>;
}

/**
 * [공부 계획 삭제 파라미터]
 */
export type DeletePlanParams = string;
