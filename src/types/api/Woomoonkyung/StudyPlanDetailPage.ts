// ===========================
// WoomoonkyungDetailService 타입 파일
// ===========================

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
  newState: "waiting" | "in progress" | "done";
}

/**
 * [NodeDetail]
 * 계획 노드 상세 타입
 */
export interface NodeDetail {
  study_plan_node_id: string;
  study_plan_id: string;
  study_plan_node_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  completed: boolean;
  position: number;
  tech_stacks?: {
    tech_stack_name: string;
    tech_stack_img_url?: string;
  }[];
  [key: string]: any;
}

/**
 * [PlanStats]
 * 계획 진행률 통계 타입
 */
export interface PlanStats {
  completedNodesCount: number;
  totalNodesCount: number;
  progressPercentage: number;
}

/**
 * [PlanDetail]
 * 공부 계획 상세 반환 타입
 */
export interface PlanDetail {
  plan: any;
  nodes: NodeDetail[];
  stats: PlanStats;
}
