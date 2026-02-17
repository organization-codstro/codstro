import { supabase } from "../../db/supabase/supabase";
import {
  GetPlanWithNodesParams,
  UpdateNodeCompletionParams,
  UpdatePlanStateParams,
  PlanDetail,
  NodeDetail,
} from "../../types/api/Woomoonkyung/StudyPlanDetailPage";

/**
 * [우문경 공부 계획 상세 서비스]
 * 특정 공부 계획의 마스터 정보와 하위 노드 리스트를 조회합니다.
 */
export const WoomoonkyungDetailService = {
  /**
   * [공부 계획 상세 정보 및 노드 목록 통합 조회]
   */
  async getPlanWithNodes(params: GetPlanWithNodesParams): Promise<PlanDetail> {
    try {
      const { planId } = params;

      const { data: plan, error: planError } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();
      if (planError) throw planError;

      const { data: nodes, error: nodesError } = await supabase
        .from("study_plan_nodes")
        .select(
          `
          *,
          tech_stacks (
            tech_stack_name,
            tech_stack_img_url
          )
        `,
        )
        .eq("study_plan_id", planId)
        .order("study_plan_node_position", { ascending: true });
      if (nodesError) throw nodesError;

      const completedNodesCount = nodes.filter((node) => node.completed).length;
      const totalNodesCount = nodes.length;
      const progressPercentage =
        totalNodesCount > 0 ? (completedNodesCount / totalNodesCount) * 100 : 0;

      return {
        plan,
        nodes: nodes as NodeDetail[],
        stats: {
          completedNodesCount,
          totalNodesCount,
          progressPercentage,
        },
      };
    } catch (error) {
      console.error("[getPlanWithNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [노드 완료 상태 업데이트]
   */
  async updateNodeCompletion(
    params: UpdateNodeCompletionParams,
  ): Promise<NodeDetail> {
    try {
      const { nodeId, isCompleted } = params;

      const { data, error } = await supabase
        .from("study_plan_nodes")
        .update({ completed: isCompleted })
        .eq("study_plan_node_id", nodeId)
        .select()
        .single();
      if (error) throw error;
      return data as NodeDetail;
    } catch (error) {
      console.error("[updateNodeCompletion Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 상태 변경]
   */
  async updatePlanState(params: UpdatePlanStateParams): Promise<any> {
    try {
      const { planId, newState } = params;

      const { data, error } = await supabase
        .from("study_plans")
        .update({ study_plan_state: newState })
        .eq("study_plan_id", planId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updatePlanState Error]:", error);
      throw error;
    }
  },
};
