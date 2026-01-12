/**
 * [CreateBasePlanParams]
 * 계획 1차 생성 파라미터
 */
export interface CreateBasePlanParams {
  planData: {
    study_plan_name: string;
    study_plan_description?: string;
    study_plan_image_url?: string;
    study_plan_start_date: string;
    study_plan_end_date: string;
    user_id?: number;
  };
  imageFile?: File;
}

/**
 * [UpdatePlanInfoParams]
 * 계획 기본 정보 업데이트 파라미터
 */
export interface UpdatePlanInfoParams {
  planId: number;
  updates: Partial<{
    study_plan_name: string;
    study_plan_description: string;
    study_plan_image_url: string;
    study_plan_start_date: string;
    study_plan_end_date: string;
    study_plan_state: string;
    study_plan_is_archived: boolean;
    study_plan_is_recommendation: boolean;
    user_id: number;
  }>;
}

/**
 * [PlanInfo]
 * 계획 기본 정보 반환 타입
 */
export interface PlanInfo {
  study_plan_id: number;
  study_plan_name: string;
  study_plan_description?: string;
  study_plan_image_url?: string;
  study_plan_start_date: string;
  study_plan_end_date: string;
  study_plan_state: string;
  study_plan_is_archived: boolean;
  study_plan_is_recommendation: boolean;
  user_id: number;
  [key: string]: any;
}
