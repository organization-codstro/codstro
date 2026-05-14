// ===========================
// StudyPlanEditService API 파일
// ===========================
import { supabase } from "../../db/supabase/supabase";
import { FirebaseStorageService } from "../Image/FirebaseStorageService";
import {
  GetPlanForEditParams,
  UpdateStudyPlanParams,
  DeleteStudyPlanParams,
} from "../../types/api/Woomoonkyung/StudyPlanEditPage";
import { StudyPlan } from "../../types/common/Woomoonkyung";

/**
 * [우문경 공부 계획 수정 서비스]
 * 기존 공부 계획의 정보를 조회하고, 이미지 업로드를 포함한 수정을 담당합니다.
 */
export const StudyPlanEditService = {
  /**
   * [수정용 계획 데이터 단일 조회]
   */
  async getPlanForEdit(params: GetPlanForEditParams): Promise<StudyPlan> {
    try {
      const { planId } = params;

      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data as StudyPlan;
    } catch (error) {
      console.error("[getPlanForEdit Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 정보 업데이트]
   */
  async updateStudyPlan(params: UpdateStudyPlanParams): Promise<StudyPlan> {
    try {
      const { planId, planData, imageFile } = params;

      let imageUrl = planData.study_plan_image_url ?? null;

      /**
       * 새 이미지가 존재하면
       * - 기존 이미지 삭제
       * - 새 이미지 업로드
       */
      if (imageFile) {
        // 기존 이미지가 있으면 삭제
        if (planData.study_plan_image_url) {
          await FirebaseStorageService.deleteImage(
            planData.study_plan_image_url,
          );
        }

        // 새 이미지 업로드
        const uploadResult = await FirebaseStorageService.uploadImage(
          imageFile,
          "plans",
        );

        imageUrl = uploadResult.url;
      }

      /**
       * Supabase 업데이트
       */
      const { data, error } = await supabase
        .from("study_plans")
        .update({
          study_plan_name: planData.study_plan_name,
          study_plan_description: planData.study_plan_description ?? null,
          study_plan_image_url: imageUrl,
          study_plan_start_date: planData.study_plan_start_date,
          study_plan_end_date: planData.study_plan_end_date,
          study_plan_state: planData.study_plan_state,
        })
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (error) throw error;

      return data as StudyPlan;
    } catch (error) {
      console.error("[updateStudyPlan Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 삭제]
   */
  async deleteStudyPlan(params: DeleteStudyPlanParams): Promise<boolean> {
    try {
      const { planId } = params;

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
  },
};
