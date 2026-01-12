/**
 * [GetNodesByPlanIdParams]
 * 학습 노드 조회 파라미터
 */
export interface GetNodesByPlanIdParams {
  planId: number;
}

/**
 * [SaveAllNodesParams]
 * 학습 노드 일괄 저장 파라미터
 */
export interface SaveAllNodesParams {
  nodes: NodeItem[];
}

/**
 * [DeleteNodeParams]
 * 개별 노드 삭제 파라미터
 */
export interface DeleteNodeParams {
  nodeId: number | string;
}

/**
 * [GetPlanInfoParams]
 * 플랜 정보 조회 파라미터
 */
export interface GetPlanInfoParams {
  planId: number;
}

/**
 * [NodeItem]
 * 학습 노드 정보 타입
 */
export interface NodeItem {
  study_plan_node_id?: string | number;
  study_plan_id: number;
  study_plan_node_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  completed: boolean;
  position: number;
  tech_stack_id?: number;
  created_date: string;
  tech_stacks?: {
    tech_stack_name: string;
    tech_stack_img_url?: string;
  }[];
  [key: string]: any;
}

/**
 * [PlanInfo]
 * 공부 계획 기본 정보 타입
 */
export interface PlanInfo {
  study_plan_id: number;
  study_plan_name: string;
  study_plan_description?: string;
  [key: string]: any;
}

/**
 * [TechStack]
 * 기술 스택 정보 타입
 */
export interface TechStack {
  tech_stack_id: number;
  tech_stack_name: string;
  tech_stack_img_url?: string;
  [key: string]: any;
}
