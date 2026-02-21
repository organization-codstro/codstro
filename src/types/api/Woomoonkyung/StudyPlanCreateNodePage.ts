import { NodeItem } from "../../pages/Woomoonkyung/Woomoonkyung";

/**
 * [GetTechStacksParams]
 * 기술 스택 목록 조회 파라미터
 */
export interface GetTechStacksParams {
  searchQuery?: string;
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
