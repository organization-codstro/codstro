import { StudyPlanNode } from "../../common/StudyPlan";

/**
 * [단일 공부 계획 상세 조회 파라미터]
 */
export type GetStudyPlanByIdParams = string;

/**
 * [공부 계획에 포함된 노드 리스트 조회 파라미터]
 */
export type GetNodesByPlanIdParams = string;

/**
 * [새 공부 계획 생성 파라미터]
 */
// export interface CreateStudyPlanParams {
//   planData: any;
//   imageFile?: File;
// }

/**
 * [노드 완료 상태 토글 파라미터]
 */
export interface ToggleNodeCompletionParams {
  nodeId: string;
  isCompleted: boolean;
}

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
  nodes: StudyPlanNode[];
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
