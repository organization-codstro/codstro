import { supabase } from "../../db/supabase/supabase";
import {
  GetActiveMyPlansParams,
  DeletePlanParams,
  GetPlanStatsParams,
  PlanWithStats,
  PlanStats,
} from "../../types/api/Woomoonkyung/StudyPlanMainPage";

/**
 * [우문경 메인 대시보드 서비스]
 * 진행 중인 학습 계획 목록 조회 및 통계 계산을 담당합니다.
 */
export const WoomoonkyungMainService = {
  /**
   * [진행 중인 내 학습 계획 목록 조회]
   */
  async getActiveMyPlans(
    params: GetActiveMyPlansParams,
  ): Promise<PlanWithStats[]> {
    try {
      const { userId } = params;

      const today = new Date();
      today.setHours(0, 0, 0, 0); // 날짜 비교 안정화 (자정 기준)

      const { data, error } = await supabase
        .from("study_plans")
        .select(
          `
        *,
        study_plan_nodes (
          study_plan_node_end_date
        )
      `,
        )
        .eq("user_id", userId)
        .eq("study_plan_state", "in progress")
        .eq("study_plan_is_recommendation", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data.map((plan: any) => {
        const nodes = plan.study_plan_nodes || [];

        const total = nodes.length;
        const completed = nodes.filter((node: any) => {
          if (!node.study_plan_node_end_date) return false;
          return new Date(node.study_plan_node_end_date) < today;
        }).length;

        const progress = total > 0 ? (completed / total) * 100 : 0;

        return {
          ...plan,
          stats: {
            total,
            completed,
            progress,
          },
        } as PlanWithStats;
      });
    } catch (error) {
      console.error("[getActiveMyPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [학습 계획 삭제]
   * 1. study_plan_nodes에서 해당 plan의 모든 노드 삭제
   * 2. study_plans에서 plan 삭제
   */
  async deletePlan(params: DeletePlanParams): Promise<boolean> {
    try {
      const { planId } = params;

      const { error: nodesError } = await supabase
        .from("study_plan_nodes")
        .delete()
        .eq("study_plan_id", planId);

      if (nodesError) throw nodesError;

      const { error: planError } = await supabase
        .from("study_plans")
        .delete()
        .eq("study_plan_id", planId);

      if (planError) throw planError;

      return true;
    } catch (error) {
      console.error("[deletePlan Error]:", error);
      throw error;
    }
  },

  /**
   * [계획별 상세 통계 수동 조회]
   */
  async getPlanStats(params: GetPlanStatsParams): Promise<PlanStats> {
    try {
      const { planId } = params;

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
