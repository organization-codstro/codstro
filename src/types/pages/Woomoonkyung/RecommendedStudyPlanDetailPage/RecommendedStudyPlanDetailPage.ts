/**
 * [공부 계획 상세 데이터 타입]
 * Supabase study_plans 테이블의 레코드 구조 정의
 */
export interface StudyPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description: string;
  study_plans_image_url: string;
  study_plans_start_date: string;
  study_plans_end_date: string;
  study_plans_state: "waiting" | "in progress" | "done";
  study_plans_is_archived: boolean;
}

/**
 * [공부 계획 노드 데이터 타입]
 * 기술 스택 정보가 포함된 study_plan_nodes 레코드 구조 정의
 */
export interface StudyPlanNode {
  study_plan_node_id: string;
  study_plan_id: string;
  study_plan_node_name: string;
  study_plan_node_description: string;
  study_plan_node_position: number;
  study_plan_node_completed: boolean;
  study_plan_node_start_date: string;
  study_plan_node_end_date: string;
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
}
