import { supabase } from "../../db/supabase/supabase";
import {
  GetArchivedPlansParams,
  GetPlanStatsParams,
  DeleteFromArchiveParams,
} from "../../types/api/Woomoonkyung/StudyPlanArchivePage";
import { PlanStatsResult, StudyPlan } from "../../types/common/Woomoonkyung";

/**
 * [공부 계획 아카이브 서비스]
 * 완료된 내 계획 및 북마크(보관)된 추천 계획을 관리합니다.
 */
export const StudyPlanArchiveService = {
  /**
   * [아카이브 목록 통합 조회]
   */
  async getArchivedPlans(params: GetArchivedPlansParams): Promise<StudyPlan[]> {
    try {
      const { userId, searchQuery = "" } = params;

      // DONE 상태 플랜 가져오기
      const { data: plans, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", userId)
        .eq("study_plan_state", "done");

      if (error) throw error;

      if (!plans || plans.length === 0) {
        return [];
      }

      let filteredPlans: StudyPlan[] = plans;

      // 검색어 필터
      if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase();

        filteredPlans = plans.filter(
          (plan) =>
            plan.study_plan_name?.toLowerCase().includes(lowerQuery) ||
            plan.study_plan_description?.toLowerCase().includes(lowerQuery),
        );
      }

      if (filteredPlans.length === 0) {
        return [];
      }

      // 노드 개수 조회
      const planIds = filteredPlans.map((plan) => plan.study_plan_id);

      const { data: nodes, error: nodeError } = await supabase
        .from("study_plan_nodes")
        .select("study_plan_id")
        .in("study_plan_id", planIds);

      if (nodeError) throw nodeError;

      // count 매핑
      const countMap: Record<string, number> = {};

      nodes?.forEach((node) => {
        countMap[node.study_plan_id] = (countMap[node.study_plan_id] || 0) + 1;
      });

      // 최종 반환
      return filteredPlans
        .map((plan) => ({
          ...plan,
          totalNodes: countMap[plan.study_plan_id] || 0,
        }))
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
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
        .select("study_plan_node_completed")
        .eq("study_plan_id", planId);

      if (error) throw error;

      const total = nodes.length;
      const completed = nodes.filter((n) => n.study_plan_node_completed).length;
      const progress = total > 0 ? (completed / total) * 100 : 0;

      return { total, completed, progress };
    } catch (error) {
      console.error("[getPlanStats Error]:", error);
      throw error;
    }
  },

  /**
   * [아카이브에서 삭제 (영구 삭제)]
   */
  async deleteFromArchive(params: DeleteFromArchiveParams): Promise<boolean> {
    try {
      const { planId } = params;

      const { error } = await supabase
        .from("study_plans")
        .delete()
        .eq("study_plan_id", planId);
      if (error) throw error;

      return true;
    } catch (error) {
      console.error("[deleteFromArchive Error]:", error);
      throw error;
    }
  },
};
