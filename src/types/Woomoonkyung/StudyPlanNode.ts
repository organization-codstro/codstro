export interface StudyPlan {
  study_plan_id: number;
  study_plan_name: string;
  study_plan_description: string;
  study_plans_image_url?: string;
  study_plans_start_date: string;
  study_plans_end_date: string;
  study_plans_is_archived: boolean;
  study_plans_state: "waiting" | "in progress" | "done";
  study_plans_created_date: string;
  user_id: number;
  study_plan_is_recommendation: boolean;
}

export interface StudyPlanNode {
  study_plan_node_id: number;
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  created_date: string;
  tech_stack_id: number;
  tech_stack_name: string;
  study_plan_id: number;
  tech_stack_img_url: string;
}

/***WoomoonkyungCreateNode에서 사용하는  node 인터페이스 */
export interface CteateStudyPlanNode {
  study_plan_node_id: string;
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  tech_stack_id: number;
  tech_stack_name: string;
  tech_stack_img_url: string;
}

//SortableNodeItem 에서 사용하는 폼 데이터 인터페이스
export interface SortableNodeItemNodeFormData {
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  tech_stack_id: number;
}

// StudyPlanForm 폼 내부에서 사용할 데이터 타입 정의 (StudyPlan 인터페이스 기반)
export interface StudyPlanFormFormData
  extends Omit<StudyPlan, "study_plan_id" | "study_plans_created_date"> {}
