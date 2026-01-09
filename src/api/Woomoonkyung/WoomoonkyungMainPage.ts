import { supabase } from "../../db/supabase/supabase";

/**
 * [우문경 메인 대시보드 서비스]
 * 진행 중인 학습 계획 목록 조회 및 통계 계산을 담당합니다.
 */
export const WoomoonkyungMainService = {
  /**
   * [진행 중인 내 학습 계획 목록 조회]
   * 상태가 'in progress'이고 추천 계획이 아닌 본인의 계획만 가져옵니다.
   * 각 계획에 속한 노드들의 전체 개수와 완료된 개수를 Join하여 함께 가져옵니다.
   */
  async getActiveMyPlans(userId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select(
          `
          *,
          study_plan_nodes (
            completed
          )
        `
        )
        .eq("user_id", userId)
        .eq("study_plan_state", "in progress")
        .eq("study_plan_is_recommendation", false)
        .order("study_plan_created_date", { ascending: false });

      if (error) throw error;

      // 데이터를 가공하여 진행률(progress) 정보를 포함시킵니다.
      return data.map((plan: any) => {
        const nodes = plan.study_plan_nodes || [];
        const total = nodes.length;
        const completed = nodes.filter((n: any) => n.completed).length;
        const progress = total > 0 ? (completed / total) * 100 : 0;

        return {
          ...plan,
          stats: {
            total,
            completed,
            progress,
          },
        };
      });
    } catch (error) {
      console.error("[getActiveMyPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [학습 계획 삭제]
   * @param planId 삭제할 계획 ID
   */
  async deletePlan(planId: number) {
    try {
      const { error } = await supabase
        .from("study_plans")
        .delete()
        .eq("study_plan_id", planId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("[deletePlan Error]:", error);
      throw error;
    }
  },

  /**
   * [계획별 상세 통계 수동 조회]
   * 특정 계획의 노드 데이터를 기반으로 실시간 통계가 필요할 때 사용합니다.
   */
  async getPlanStats(planId: number) {
    try {
      const { data: nodes, error } = await supabase
        .from("study_plan_nodes")
        .select("completed")
        .eq("study_plan_id", planId);

      if (error) throw error;

      const total = nodes.length;
      const completed = nodes.filter((n) => n.completed).length;
      const progress = total > 0 ? (completed / total) * 100 : 0;

      return { total, completed, progress };
    } catch (error) {
      console.error("[getPlanStats Error]:", error);
      throw error;
    }
  },
};
