import { STUDY_PLAN_STATE_TYPE } from "../../constants/StudyPlan/StudyPlan";

/**
 * [공부 계획 상세 데이터 타입]
 */
export interface StudyPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description: string;
  study_plan_image_url?: string;
  study_plan_start_date: string;
  study_plan_end_date: string;
  study_plan_state: STUDY_PLAN_STATE_TYPE;
  created_at: string;
  user_id?: string;
  study_plan_is_recommendation: boolean;
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
 * [PlanStatsResult]
 * 각 플랜의 진행률 및 노드 완료 상태 정의
 */
export interface PlanStatsResult {
  total: number;
  completed: number;
  progress: number;
}

/**
 * [공부 계획 노드 데이터 타입]
 */

export interface StudyPlanNode {
  study_plan_node_id?: string;
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

/***StudyPlanCreateNode에서 사용하는  node 인터페이스 */
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

export interface StudyPlanStats {
  completedNodesCount: number;
  totalNodesCount: number;
  progressPercentage: number;
}

export interface StudyPlanNodeWithTechStack extends StudyPlanNode {
  tech_stacks: {
    tech_stack_name: string;
    tech_stack_img_url: string;
  }[];
}

export interface StudyPlanWithNodes {
  plan: {
    study_plan_id: string;
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    state: STUDY_PLAN_STATE_TYPE;
  };
  nodes: StudyPlanNodeWithTechStack[];
  stats: StudyPlanStats;
}
