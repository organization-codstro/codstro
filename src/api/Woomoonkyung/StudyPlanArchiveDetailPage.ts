import { supabase } from "../../db/supabase/supabase";

/**
 * [우문경 상세 및 아카이브 서비스]
 * 공부 계획의 상세 조회, 수정, 삭제 및 노드 진행률에 따른 상태 자동 동기화를 담당합니다.
 */
export const WoomoonkyungService = {
  /**
   * [공부 계획 상세 정보 조회]
   * @param planId 조회할 계획의 고유 ID
   */
  async getPlanDetail(planId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getPlanDetail Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 세부 노드 리스트 조회]
   * @param planId 계획 ID
   */
  async getPlanNodes(planId: number) {
    try {
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
      console.error("[getPlanNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [노드 완료 상태 전환 및 플랜 상태 자동 동기화]
   * 노드 하나를 완료 처리할 때마다 전체 진행률을 계산하여
   * 부모 플랜의 상태(waiting/in progress/done)를 자동으로 업데이트합니다.
   * * @param planId 부모 계획 ID
   * @param nodeId 수정할 노드 ID (UUID)
   * @param completed 완료 여부
   */
  async toggleNodeAndSyncStatus(
    planId: number,
    nodeId: string,
    completed: boolean
  ) {
    try {
      // 1. 노드 상태 업데이트
      const { error: nodeUpdateError } = await supabase
        .from("study_plan_nodes")
        .update({ completed })
        .eq("study_plan_node_id", nodeId);

      if (nodeUpdateError) throw nodeUpdateError;

      // 2. 해당 플랜의 모든 노드 완료 현황 파악
      const { data: nodes, error: fetchError } = await supabase
        .from("study_plan_nodes")
        .select("completed")
        .eq("study_plan_id", planId);

      if (fetchError) throw fetchError;

      // 3. 진행률 기반 비즈니스 로직 결정
      const total = nodes.length;
      const completedCount = nodes.filter((n) => n.completed).length;

      let newState: "waiting" | "in progress" | "done" = "in progress";

      if (completedCount === 0) {
        newState = "waiting";
      } else if (completedCount === total && total > 0) {
        newState = "done";
      }

      // 4. 부모 플랜(study_plans) 상태 업데이트
      const { data: updatedPlan, error: planUpdateError } = await supabase
        .from("study_plans")
        .update({ study_plan_state: newState })
        .eq("study_plan_id", planId)
        .select()
        .single();

      if (planUpdateError) throw planUpdateError;

      // 최종적으로 업데이트된 플랜 정보 반환
      return { updatedPlan, completedCount, total };
    } catch (error) {
      console.error("[toggleNodeAndSyncStatus Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 정보 수정]
   * @param planId 수정할 계획 ID
   * @param updates 수정할 데이터 필드들
   */
  async updatePlan(
    planId: number,
    updates: Partial<{
      study_plan_name: string;
      study_plan_description: string;
      study_plan_state: string;
      study_plan_start_date: string;
      study_plan_end_date: string;
      study_plan_image_url: string;
      study_plan_is_archived: boolean;
    }>
  ) {
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
      console.error("[updatePlan Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 삭제]
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
};
