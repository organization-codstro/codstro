/**
 * [GetTechStacksParams]
 * 기술 스택 목록 조회 파라미터
 */
export interface GetTechStacksParams {
  searchQuery?: string;
}

/**
 * [TechStack]
 * 기술 스택 정보 타입
 */
export interface TechStack {
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
  tech_stack_created_date: string;
  [key: string]: any;
}

/**
 * [NodeItem]
 * 공부 계획 노드 정보
 */
export interface NodeItem {
  study_plan_node_id?: string;
  study_plan_id: string;
  study_plan_node_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  completed: boolean;
  position: number;
  tech_stack_id?: string;
  created_date: string;
  [key: string]: any;
}

/**
 * [SaveAllNodesParams]
 * 전체 노드 저장 파라미터
 */
export interface SaveAllNodesParams {
  planId: string;
  nodes: NodeItem[];
}

/**
 * [UpdateNodePositionItem]
 * 개별 노드 위치 정보
 */
export interface UpdateNodePositionItem {
  id: string;
  position: number;
}

/**
 * [UpdateNodePositionsParams]
 * 노드 위치 일괄 업데이트 파라미터
 */
export interface UpdateNodePositionsParams {
  updates: UpdateNodePositionItem[];
}
