import { supabase } from "../../db/supabase/supabase";

/**
 * [공부 계획 아카이브 서비스]
 * 완료된 내 계획 및 북마크(보관)된 추천 계획을 관리합니다.
 */
export const ArchiveService = {
  /**
   * [아카이브 목록 통합 조회]
   * 1. 사용자의 계획 중 상태가 'done'인 것
   * 2. 추천 계획 중 보관(is_archived) 설정이 된 것
   * @param userId 현재 사용자 ID
   * @param searchQuery 검색어 (선택 사항)
   */
  async getArchivedPlans(userId: number, searchQuery: string = "") {
    try {
      // 보관함 로직: (내 계획 AND 상태가 done) OR (추천계획 AND 보관됨)
      let query = supabase
        .from("study_plans")
        .select(`
          *,
          node_count: study_plan_nodes(count),
          completed_node_count: study_plan_nodes(count)
        `)
        .eq("user_id", userId)
        .or(`study_plan_state.eq.done,study_plan_is_archived.eq.true`);

      // 검색 조건 추가
      if (searchQuery) {
        query = query.or(
          `study_plan_name.ilike.%${searchQuery}%,study_plan_description.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query.order("study_plan_created_date", {
        ascending: false,
      });

      if (error) throw error;

      // 노드 개수 및 진행률 가공
      // 실제 프로젝트에서는 .select('study_plan_nodes(completed)')를 통해 
      // 완료된 개수만 따로 필터링해 가져오는 rpc를 쓰거나 
      // 아래처럼 개별적으로 node 데이터를 가공합니다.
      return data.map((plan: any) => ({
        ...plan,
        totalNodes: plan.node_count?.[0]?.count || 0,
      }));
    } catch (error) {
      console.error("[getArchivedPlans Error]:", error);
      throw error;
    }
  },

  /**
   * [계획별 노드 통계 상세 조회]
   * 아카이브 카드에 표시할 정확한 진행률(완료된 노드 수)을 가져옵니다.
   * @param planId 계획 ID
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

  /**
   * [아카이브에서 삭제 (영구 삭제 또는 보관 해제)]
   * @param planId 계획 ID
   * @param isRecommendation 추천 계획 여부 (추천 계획은 보관 속성만 false로 변경)
   */
  async deleteFromArchive(planId: number, isRecommendation: boolean) {
    try {
      if (isRecommendation) {
        // 추천 계획은 삭제하지 않고 보관(북마크) 상태만 해제
        const { error } = await supabase
          .from("study_plans")
          .update({ study_plan_is_archived: false })
          .eq("study_plan_id", planId);
        if (error) throw error;
      } else {
        // 내 개인 계획인 경우 영구 삭제
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
  }
};