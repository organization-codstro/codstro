// ===========================
// WoomoonkyungEditService 타입 파일
// ===========================

/**
 * [GetPlanForEditParams]
 * 수정용 계획 단일 조회 파라미터
 */
export interface GetPlanForEditParams {
  planId: string;
}

/**
 * [UpdateStudyPlanParams]
 * 공부 계획 정보 업데이트 파라미터
 */
export interface UpdateStudyPlanParams {
  planId: string;
  planData: Partial<{
    study_plan_name: string;
    study_plan_description?: string;
    study_plan_image_url?: string;
    study_plan_start_date: string;
    study_plan_end_date: string;
    study_plan_state: string;
    study_plan_is_archived: boolean;
  }>;
  imageFile?: File;
}

/**
 * [DeleteStudyPlanParams]
 * 공부 계획 삭제 파라미터
 */
export interface DeleteStudyPlanParams {
  planId: string;
}

/**
 * [StudyPlanInfo]
 * 공부 계획 정보 타입
 */
export interface StudyPlanInfo {
  study_plan_id: string;
  study_plan_name: string;
  study_plan_description?: string;
  study_plan_image_url?: string;
  study_plan_start_date: string;
  study_plan_end_date: string;
  study_plan_state: "waiting" | "in progress" | "done";
  study_plan_is_archived: boolean;
  [key: string]: any;
  created_at: string;
  study_plan_is_recommendation: boolean;
}
