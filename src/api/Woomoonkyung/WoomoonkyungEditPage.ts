import { supabase } from "../../db/supabase/supabase";
import { FirebaseStorageService } from "../Image/FirebaseStorageService";

/**
 * [우문경 공부 계획 수정 서비스]
 * 기존 공부 계획의 정보를 조회하고, 이미지 업로드를 포함한 수정을 담당합니다.
 */
export const WoomoonkyungEditService = {
  /**
   * [수정용 계획 데이터 단일 조회]
   * @param planId 조회할 계획 ID
   */
  async getPlanForEdit(planId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getPlanForEdit Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 정보 업데이트]
   * @param planId 수정할 계획 ID
   * @param planData 수정할 데이터 (이름, 설명, 날짜 등)
   * @param imageFile 새로 선택한 이미지 파일 (있을 경우 Firebase 업로드)
   */
  async updateStudyPlan(
    planId: number,
    planData: any,
    imageFile?: File
  ) {
    try {
      let imageUrl = planData.study_plan_image_url;

      // 1. 새 이미지가 업로드된 경우 Firebase Storage 처리
      if (imageFile) {
        const uploadResult = await FirebaseStorageService.uploadImage(imageFile, "plans");
        imageUrl = uploadResult.url;
      }

      // 2. Supabase DB 업데이트 (테이블 스키마 기준 필드명 사용)
      const { data, error } = await supabase
        .from("study_plans")
        .update({
          study_plan_name: planData.study_plan_name,
          study_plan_description: planData.study_plan_description,
          study_plan_image_url: imageUrl,
          study_plan_start_date: planData.study_plan_start_date,
          study_plan_end_date: planData.study_plan_end_date,
          study_plan_state: planData.study_plan_state,
          study_plan_is_archived: planData.study_plan_is_archived,
        })
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updateStudyPlan Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 삭제]
   * @param planId 삭제할 계획 ID
   */
  async deleteStudyPlan(planId: number) {
    try {
      const { error } = await supabase
        .from("study_plans")
        .delete()
        .eq("study_plan_id", planId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("[deleteStudyPlan Error]:", error);
      throw error;
    }
  }
};