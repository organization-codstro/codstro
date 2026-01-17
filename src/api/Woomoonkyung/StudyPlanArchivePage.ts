import { supabase } from "../../db/supabase/supabase";
import {
  GetArchivedPlansParams,
  GetPlanStatsParams,
  DeleteFromArchiveParams,
  PlanStatsResult,
  ArchivedPlan,
} from "../../types/api/Woomoonkyung/StudyPlanArchivePage";

/**
 * [공부 계획 아카이브 서비스]
 * 완료된 내 계획 및 북마크(보관)된 추천 계획을 관리합니다.
 */
export const StudyPlanArchiveService = {
  /**
   * [아카이브 목록 통합 조회]
   */
  async getArchivedPlans(params: GetArchivedPlansParams) {
    try {
      const { userId, searchQuery = "" } = params;

      let query = supabase
        .from("study_plans")
        .select(
          `
          *,
          node_count: study_plan_nodes(count),
          completed_node_count: study_plan_nodes(count)
        `
        )
        .eq("user_id", userId)
        .or(`study_plan_state.eq.done,study_plan_is_archived.eq.true`);

      if (searchQuery) {
        query = query.or(
          `study_plan_name.ilike.%${searchQuery}%,study_plan_description.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;

      return (data as any[]).map((plan) => ({
        ...plan,
        totalNodes: plan.node_count?.[0]?.count || 0,
      })) as ArchivedPlan[];
    } catch (error) {
      console.error("[getArchivedPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [계획별 노드 통계 상세 조회]
   */
  async getPlanStats(params: GetPlanStatsParams): Promise<PlanStatsResult> {
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

  /**
   * [아카이브에서 삭제 (영구 삭제 또는 보관 해제)]
   */
  async deleteFromArchive(params: DeleteFromArchiveParams): Promise<boolean> {
    try {
      const { planId, isRecommendation } = params;

      if (isRecommendation) {
        const { error } = await supabase
          .from("study_plans")
          .update({ study_plan_is_archived: false })
          .eq("study_plan_id", planId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("study_plans")
          .delete()
          .eq("study_plan_id", planId);
        if (error) throw error;
      }
      return true;
    } catch (error) {
      console.error("[deleteFromArchive Error]:", error);
      throw error;
    }
  },
};
