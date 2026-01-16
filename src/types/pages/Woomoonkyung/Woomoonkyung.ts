export interface StudyPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description?: string;
  study_plan_image_url?: string;
  study_plan_start_date: string;
  study_plan_end_date: string;
  study_plan_is_archived: boolean;
  study_plan_state: "waiting" | "in progress" | "done";
  created_at: string;
  user_id?: string;
  study_plan_is_recommendation: boolean;
}

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
  tech_stack_name?: string;
  tech_stack_img_url?: string;
}

/***WoomoonkyungCreateNode에서 사용하는  node 인터페이스 */
export interface CreateStudyPlanNode {
  study_plan_node_id: string;
  study_plan_node_name: string;
  description: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  position: number;
  tech_stack_id: string;
  tech_stack_name: string;
  tech_stack_img_url: string;
}
