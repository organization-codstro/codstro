import { supabase } from "../../db/supabase/supabase";
import { FirebaseStorageService } from "../Image/FirebaseStorageService";

/**
 * [공부 계획 등록 서비스]
 * 공부 계획의 기본 정보를 생성하고 관리합니다.
 */
export const PlanRegistrationService = {
  /**
   * [공부 계획 1차 생성]
   * 기본 정보(이름, 설명, 날짜 등)를 저장하고 생성된 고유 ID를 반환합니다.
   * 노드 설정 전 단계에서 '껍데기'를 만드는 역할을 합니다.
   * * @param planData 폼 입력 데이터
   * @param imageFile 선택한 이미지 파일 (있을 경우 Firebase 업로드)
   * @returns 생성된 study_plan_id
   */
  async createBasePlan(planData: any, imageFile?: File) {
    try {
      let imageUrl = null;

      // 1. 이미지가 존재할 경우 파이어베이스 스토리지 업로드 후 URL 확보
      if (imageFile) {
        const uploadResult = await FirebaseStorageService.uploadImage(imageFile, "plans");
        imageUrl = uploadResult.url;
      }

      // 2. Supabase DB에 계획 레코드 삽입 (테이블 스키마 기준)
      const { data, error } = await supabase
        .from("study_plans")
        .insert([
          {
            study_plan_name: planData.study_plan_name,
            study_plan_description: planData.study_plan_description || null, // 데이터가 없으면 null 허용
            study_plan_image_url: imageUrl || planData.study_plan_image_url || null,
            study_plan_start_date: planData.study_plan_start_date,
            study_plan_end_date: planData.study_plan_end_date,
            study_plan_state: "waiting", // 초기 생성 시 기본값
            study_plan_is_archived: false,
            study_plan_is_recommendation: false,
            user_id: planData.user_id || 1, // 현재 로그인 유저 ID
          },
        ])
        .select("study_plan_id")
        .single();

      if (error) throw error;

      // 3. 생성된 PK(ID) 반환 -> 이후 노드 추가 페이지로 이동 시 활용
      return data.study_plan_id;
    } catch (error) {
      console.error("[createBasePlan Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 기본 정보 업데이트]
   * @param planId 계획 ID
   * @param updates 수정할 데이터
   */
  async updatePlanInfo(planId: number, updates: any) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .update(updates)
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updatePlanInfo Error]:", error);
      throw error;
    }
  }
};