//2차 검증 에러 상태 타입
export interface ValidationErrors {
  name: boolean;
  startDate: boolean;
  endDate: boolean;
}

/**
 * [공부 계획 노드 데이터 생성 타입]
 * 노드 생성시 사용되는 타입 정의
 */
// export interface NewStudyPlanNode {
//   study_plan_node_id: string;
//   study_plan_id: string;
//   study_plan_node_name: string;
//   study_plan_node_description: string;
//   study_plan_node_position: number;
//   study_plan_node_completed: boolean;
//   study_plan_node_start_date: string;
//   study_plan_node_end_date: string;
//   tech_stack_id: string;
// }

export interface NewStudyPlanNode extends BaseStudyPlanNode {
  study_plan_id: string;
  study_plan_node_description: string;
  study_plan_node_start_date: string;
  study_plan_node_end_date: string;
  tech_stack_id: string;
}

// 노드 UI에서 공통으로 필요한 최소 필드
export interface BaseStudyPlanNode {
  study_plan_node_id: string;
  study_plan_node_name: string;
  study_plan_node_position: number;
  study_plan_node_completed: boolean;
  tech_stack_name?: string;
  tech_stack_img_url?: string;
  study_plan_node_description?: string;
  study_plan_node_start_date?: string;
  study_plan_node_end_date?: string;
}
