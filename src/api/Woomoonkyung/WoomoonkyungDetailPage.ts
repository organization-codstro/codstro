import { supabase } from "../db/supabase/supabase";

/**
 * [우문경 공부 계획 상세 서비스]
 * 특정 공부 계획의 마스터 정보와 하위 노드 리스트를 조회합니다.
 */
export const WoomoonkyungDetailService = {
  /**
   * [공부 계획 상세 정보 및 노드 목록 통합 조회]
   * @param planId 조회할 계획의 ID
   * @returns 공부 계획 정보와 해당 계획에 속한 노드 리스트
   */
  async getPlanWithNodes(planId: number) {
    try {
      // 1. 공부 계획(study_plans) 마스터 정보 조회
      const { data: plan, error: planError } = await supabase
        .from("study_plans")
        .select("*")
        .eq("study_plan_id", planId)
        .single();

      if (planError) throw planError;

      // 2. 해당 계획에 속한 노드(study_plan_nodes) 리스트 조회
      const { data: nodes, error: nodesError } = await supabase
        .from("study_plan_nodes")
        .select(`
          *,
          tech_stacks (
            tech_stack_name,
            tech_stack_img_url
          )
        `)
        .eq("study_plan_id", planId)
        .order("position", { ascending: true });

      if (nodesError) throw nodesError;

      // 3. 진행률 계산 및 데이터 가공
      const completedNodesCount = nodes.filter((node) => node.completed).length;
      const totalNodesCount = nodes.length;
      const progressPercentage =
        totalNodesCount > 0 ? (completedNodesCount / totalNodesCount) * 100 : 0;

      return {
        plan,
        nodes,
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
   * 상세 페이지에서 체크박스 등을 통해 노드의 완료 상태를 변경할 때 사용합니다.
   * @param nodeId 노드 고유 ID (UUID)
   * @param isCompleted 완료 여부
   */
  async updateNodeCompletion(nodeId: string, isCompleted: boolean) {
    try {
      const { data, error } = await supabase
        .from("study_plan_nodes")
        .update({ completed: isCompleted })
        .eq("study_plan_node_id", nodeId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updateNodeCompletion Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 상태 변경]
   * 계획의 진행 상태(waiting, in progress, done)를 변경합니다.
   * @param planId 계획 ID
   * @param newState 변경할 상태값
   */
  async updatePlanState(planId: number, newState: "waiting" | "in progress" | "done") {
    try {
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
  }
};