import { STUDY_PLAN_STATE_TYPE } from "../../../../constants/Woomoonkyung/woomoonkyung";

/**
 * [추천 공부 계획 인터페이스]
 * API 응답 값과 UI 컴포넌트 Props를 맞추기 위한 타입 정의
 */
export interface RecommendedPlan {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description: string;
  study_plan_image_url: string;
  study_plan_start_date: string;
  study_plan_end_date: string;
  study_plan_state: STUDY_PLAN_STATE_TYPE;
  study_plan_is_archived: boolean;
  totalNodes: number;
  created_at: string;
  study_plan_is_recommendation: boolean;
}
