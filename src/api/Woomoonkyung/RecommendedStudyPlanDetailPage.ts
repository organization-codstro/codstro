import { supabase } from "../../db/supabase/supabase"; // 설정된 경로에 맞게 조정하세요
import { FirebaseStorageService } from "../Image/FirebaseStorageService";

/**
 * [공부 계획 서비스]
 * 공부 계획(study_plans) 및 세부 노드(study_plan_nodes)의 CRUD를 담당합니다.
 */
export const StudyPlanService = {
  /**
   * [단일 공부 계획 상세 조회]
   * @param planId 조회할 계획의 ID
   * @returns study_plans 테이블의 단일 레코드
   */
  async getStudyPlanById(planId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getStudyPlanById Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획에 포함된 노드 리스트 조회]
   * @param planId 해당 계획의 ID
   * @returns position 순으로 정렬된 노드 및 연관된 기술 스택 정보
   */
  async getNodesByPlanId(planId: number) {
    try {
      // study_plan_nodes와 tech_stacks를 조인하여 가져옵니다.
      const { data, error } = await supabase
        .from("study_plan_nodes")
        .select(
          `
          *,
          tech_stacks (
            tech_stack_name,
            tech_stack_img_url
          )
        `
        )
        .eq("study_plan_id", planId)
        .order("position", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getNodesByPlanId Error]:", error);
      throw error;
    }
  },

  /**
   * [추천 공부 계획 리스트 조회]
   * @returns study_plan_is_recommendation이 true인 계획들
   */
  async getRecommendedPlans() {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_is_recommendation", true)
        .order("study_plan_created_date", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getRecommendedPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [새 공부 계획 생성 (이미지 포함)]
   * @param planData 계획 데이터
   * @param imageFile 첨부 이미지 (선택)
   */
  async createStudyPlan(planData: any, imageFile?: File) {
    try {
      let imageUrl = null;

      // 1. 이미지가 있다면 파이어베이스에 먼저 업로드
      if (imageFile) {
        const uploadResult = await FirebaseStorageService.uploadImage(
          imageFile,
          "plans"
        );
        imageUrl = uploadResult.url;
      }

      // 2. Supabase DB 저장
      const { data, error } = await supabase
        .from("study_plans")
        .insert([
          {
            ...planData,
            study_plan_image_url: imageUrl,
            study_plan_created_date: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[createStudyPlan Error]:", error);
      throw error;
    }
  },

  /**
   * [노드 완료 상태 토글]
   * @param nodeId 노드 ID
   * @param isCompleted 완료 여부
   */
  async toggleNodeCompletion(nodeId: string, isCompleted: boolean) {
    try {
      const { data, error } = await supabase
        .from("study_plan_nodes")
        .update({ completed: isCompleted })
        .eq("study_plan_node_id", nodeId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[toggleNodeCompletion Error]:", error);
      throw error;
    }
  },
};
