/**
 * [공부 계획 상세 인터페이스]
 * DB의 study_plans 테이블 구조와 UI 변수명을 매칭합니다.
 */
export interface StudyPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description: string;
  study_plans_image_url: string;
  study_plans_start_date: string;
  study_plans_end_date: string;
  study_plans_state: "waiting" | "in progress" | "done";
}

/**
 * [공부 계획 노드 인터페이스]
 * 각 노드의 상태와 위치 정보를 포함합니다.
 */
export interface StudyPlanNode {
  study_plan_node_id: string;
  study_plan_node_name: string;
  description: string;
  position: number;
  completed: boolean;
  start_date: string;
  end_date: string;
}
