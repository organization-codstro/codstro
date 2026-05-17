import { StudyPlanNode } from "../../common/StudyPlan";

/**
 * [GetNodesByPlanIdParams]
 * 학습 노드 조회 파라미터
 */
export interface GetNodesByPlanIdParams {
  planId: string;
}

/**
 * [StudyPlanNodeRow]
 * study_plan_nodes 테이블에서 조회되는 노드 데이터 형식
 * tech_stacks 테이블과 조인하여 기술 스택 정보를 포함합니다.
 */
export type StudyPlanNodeRow = Omit<
  StudyPlanNode,
  "tech_stack_name" | "tech_stack_img_url"
> & {
  tech_stacks: {
    tech_stack_name: string;
    tech_stack_img_url: string;
  } | null;
};

/**
 * [SaveAllNodesParams]
 * 학습 노드 일괄 저장 파라미터
 */
export interface SaveAllNodesParams {
  nodes: StudyPlanNode[];
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
