import { supabase } from "../../db/supabase/supabase";
import { FirebaseStorageService } from "../Image/FirebaseStorageService";
import {
  CreateBasePlanParams,
  UpdatePlanInfoParams
} from "../../types/api/Woomoonkyung/StudyPlanCreatePage";
import { StudyPlan } from "../../types/common/Woomoonkyung";

/**
 * [공부 계획 등록 서비스]
 * 공부 계획의 기본 정보를 생성하고 관리합니다.
 */
export const PlanRegistrationService = {
  /**
   * [공부 계획 1차 생성]
   */
  async createBasePlan(params: CreateBasePlanParams): Promise<number> {
    try {
      const { planData, imageFile } = params;

      let imageUrl: string | null = null;

      /**
       * 이미지가 존재하면 Firebase Storage에 업로드
       * - path는 StoragePath 타입에 맞게 지정
       * - 현재는 "plans" 폴더에 저장
       */
      if (imageFile) {
        const uploadResult = await FirebaseStorageService.uploadImage(
          imageFile,
          "plans", 
        );

        imageUrl = uploadResult.url;
      }

      /**
       * Supabase에 공부 계획 기본 정보 저장
       * - Firebase에서 받은 imageUrl을 DB에 저장
       */
      const { data, error } = await supabase
        .from("study_plans")
        .insert([
          {
            study_plan_name: planData.study_plan_name,
            study_plan_description: planData.study_plan_description || null,
            study_plan_image_url:
              imageUrl || planData.study_plan_image_url || null,
            study_plan_start_date: planData.study_plan_start_date,
            study_plan_end_date: planData.study_plan_end_date,
            study_plan_state: "waiting",
            study_plan_is_archived: false,
            study_plan_is_recommendation: false,
            user_id: planData.user_id,
          },
        ])
        .select("study_plan_id")
        .single();

      if (error) throw error;

      return data.study_plan_id;
    } catch (error) {
      console.error("[createBasePlan Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 기본 정보 업데이트]
   */
  async updatePlanInfo(params: UpdatePlanInfoParams): Promise<StudyPlan> {
    try {
      const { planId, updates } = params;

      const { data, error } = await supabase
        .from("study_plans")
        .update(updates)
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (error) throw error;
      return data as StudyPlan;
    } catch (error) {
      console.error("[updatePlanInfo Error]:", error);
      throw error;
    }
  },
};
