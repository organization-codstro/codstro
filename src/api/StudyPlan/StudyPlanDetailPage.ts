import { supabase } from "../../db/supabase/supabase";
import {
  GetPlanWithNodesParams,
  UpdateNodeCompletionParams,
  UpdatePlanStateParams,
} from "../../types/api/StudyPlan/StudyPlanDetailPage";
import {
  StudyPlanWithNodes,
  StudyPlanNode,
  StudyPlanNodeWithTechStack,
  StudyPlan,
} from "../../types/common/StudyPlan";

/**
 * [우문경 공부 계획 상세 서비스]
 * 특정 공부 계획의 마스터 정보와 하위 노드 리스트를 조회합니다.
 */
export const StudyPlanDetailService = {
  /**
   * [공부 계획 상세 정보 및 노드 목록 통합 조회]
   */
  async getPlanWithNodes(
    params: GetPlanWithNodesParams,
  ): Promise<StudyPlanWithNodes> {
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

      const completedNodesCount = nodes.filter(
        (node) => node.study_plan_node_completed,
      ).length;
      const totalNodesCount = nodes.length;
      const progressPercentage =
        totalNodesCount > 0 ? (completedNodesCount / totalNodesCount) * 100 : 0;

      return {
        plan: {
          study_plan_id: plan.study_plan_id,
          title: plan.study_plan_name,
          description: plan.study_plan_description,
          imageUrl: plan.study_plan_image_url,
          startDate: plan.study_plan_start_date,
          endDate: plan.study_plan_end_date,
          state: plan.study_plan_state,
        },
        nodes: nodes as StudyPlanNodeWithTechStack[],
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
  ): Promise<StudyPlanNode> {
    try {
      const { nodeId, isCompleted } = params;

      const { data, error } = await supabase
        .from("study_plan_nodes")
        .update({ study_plan_node_completed: isCompleted })
        .eq("study_plan_node_id", nodeId)
        .select()
        .single();
      if (error) throw error;
      return data as StudyPlanNode;
    } catch (error) {
      console.error("[updateNodeCompletion Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 상태 변경]
   */
  async updatePlanState(params: UpdatePlanStateParams): Promise<StudyPlan> {
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
