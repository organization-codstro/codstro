// ===========================
// WoomoonkyungDetailService 타입 파일
// ===========================

import { STUDY_PLAN_STATE_TYPE } from "../../../constants/Woomoonkyung/woomoonkyung";

/**
 * [GetPlanWithNodesParams]
 * 공부 계획 상세 조회 파라미터
 */
export interface GetPlanWithNodesParams {
  planId: string;
}

/**
 * [UpdateNodeCompletionParams]
 * 노드 완료 상태 업데이트 파라미터
 */
export interface UpdateNodeCompletionParams {
  nodeId: string;
  isCompleted: boolean;
}

/**
 * [UpdatePlanStateParams]
 * 공부 계획 상태 변경 파라미터
 */
export interface UpdatePlanStateParams {
  planId: string;
  newState: STUDY_PLAN_STATE_TYPE;
}
