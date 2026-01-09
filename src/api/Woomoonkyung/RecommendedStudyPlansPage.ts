import { supabase } from "../../db/supabase/supabase";

/**
 * [추천 공부 계획 서비스]
 * 추천 플랜 조회, 검색, 북마크 토글 및 내 플랜으로 복사하는 기능을 담당합니다.
 */
export const RecommendedPlanService = {
  /**
   * [추천 공부 계획 목록 및 노드 개수 조회]
   * 검색어가 있을 경우 ilike를 통해 필터링하며, 각 플랜에 속한 노드의 개수를 함께 가져옵니다.
   * @param searchQuery 검색어 (plan_name 또는 description 기준)
   * @returns 추천 플랜 리스트 (study_plan_node의 count 포함)
   */
  async getRecommendedPlans(searchQuery: string = "") {
    try {
      let query = supabase
        .from("study_plans")
        .select(
          `
          *,
          node_count: study_plan_nodes(count)
        `
        )
        .eq("study_plan_is_recommendation", true);

      // 검색어가 존재할 경우 필터링 추가
      if (searchQuery) {
        query = query.or(
          `study_plan_name.ilike.%${searchQuery}%,study_plan_description.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query.order("study_plan_created_date", {
        ascending: false,
      });

      if (error) throw error;

      // Supabase count 구조를 숫자(totalNodes)로 변환하여 반환
      return data.map((plan: any) => ({
        ...plan,
        totalNodes: plan.node_count?.[0]?.count || 0,
      }));
    } catch (error) {
      console.error("[getRecommendedPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [북마크 상태 토글 (Archive 속성 활용)]
   * 제공된 스키마의 study_plan_is_archived를 북마크 혹은 보관 상태로 활용합니다.
   * @param planId 플랜 ID
   * @param currentState 현재 북마크 상태
   */
  async toggleBookmark(planId: number, currentState: boolean) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .update({ study_plan_is_archived: !currentState })
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[toggleBookmark Error]:", error);
      throw error;
    }
  },

  /**
   * [추천 계획을 내 계획으로 추가]
   * 추천 플랜의 정보를 복사하여 새로운 study_plans 레코드를 생성합니다. (is_recommendation = false)
   * @param userId 현재 로그인한 유저 ID
   * @param targetPlan 복사할 원본 플랜 객체
   */
  async addToMyPlans(userId: number, targetPlan: any) {
    try {
      // 1. 추천 플랜 데이터를 기반으로 새로운 플랜 레코드 생성
      const { data: newPlan, error: planError } = await supabase
        .from("study_plans")
        .insert([
          {
            study_plan_name: targetPlan.study_plan_name,
            study_plan_description: targetPlan.study_plan_description,
            study_plan_image_url: targetPlan.study_plan_image_url,
            study_plan_start_date: new Date().toISOString().split("T")[0], // 오늘 날짜로 시작
            study_plan_end_date: targetPlan.study_plan_end_date,
            study_plan_state: "waiting",
            study_plan_is_archived: false,
            study_plan_is_recommendation: false,
            user_id: userId,
          },
        ])
        .select()
        .single();

      if (planError) throw planError;

      // 2. 원본 플랜의 노드들을 가져와서 새 플랜 ID로 복사 (이후 필요 시 구현)
      // 이 부분은 서버측 Function(RPC)으로 구현하는 것이 원자성 확보에 더 유리합니다.

      return newPlan;
    } catch (error) {
      console.error("[addToMyPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [북마크된 플랜 ID 목록 조회]
   * 초기 상태 설정을 위해 북마크(archived)된 ID들만 Set 형식으로 변환하기 위한 데이터를 가져옵니다.
   */
  async getBookmarkedIds(userId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("study_plan_id")
        .eq("user_id", userId)
        .eq("study_plan_is_archived", true);

      if (error) throw error;
      return data.map((item) => item.study_plan_id);
    } catch (error) {
      console.error("[getBookmarkedIds Error]:", error);
      throw error;
    }
  },
};
