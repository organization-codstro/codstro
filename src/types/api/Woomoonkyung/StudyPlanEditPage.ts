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
