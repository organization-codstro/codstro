import { NodeItem } from "../../common/Woomoonkyung";

/**
 * [GetNodesByPlanIdParams]
 * 학습 노드 조회 파라미터
 */
export interface GetNodesByPlanIdParams {
  planId: string;
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
  planId: string;
}
