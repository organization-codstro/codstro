import { supabase } from "../../db/supabase/supabase";
import {
  GetNodesByPlanIdParams,
  SaveAllNodesParams,
  DeleteNodeParams,
  GetPlanInfoParams,
  NodeItem,
  PlanInfo,
  TechStack,
} from "../../types/api/Woomoonkyung/StudyPlanEditNodePage";

/**
 * [우문경 노드 편집 페이지 서비스]
 * 학습 노드의 리스트 조회, 대량 저장(순서 변경 포함), 개별 삭제 기능을 담당합니다.
 */
export const WoomoonkyungEditNodeService = {
  /**
   * [학습 노드 리스트 조회]
   */
  async getNodesByPlanId(params: GetNodesByPlanIdParams): Promise<NodeItem[]> {
    try {
      const { planId } = params;

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
      return data as NodeItem[];
    } catch (error) {
      console.error("[getNodesByPlanId Error]:", error);
      throw error;
    }
  },

  /**
   * [학습 노드 일괄 저장]
   */
  async saveAllNodes(params: SaveAllNodesParams): Promise<NodeItem[]> {
    try {
      const { nodes } = params;

      const nodesToUpsert = nodes.map((node) => ({
        study_plan_node_id:
          typeof node.study_plan_node_id === "number" &&
          node.study_plan_node_id > 1000000000000
            ? undefined
            : node.study_plan_node_id,
        study_plan_id: node.study_plan_id,
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed || false,
        position: node.position,
        tech_stack_id: node.tech_stack_id,
        created_date:
          node.created_date || new Date().toISOString().split("T")[0],
      }));

      const { data, error } = await supabase
        .from("study_plan_nodes")
        .upsert(nodesToUpsert)
        .select();

      if (error) throw error;
      return data as NodeItem[];
    } catch (error) {
      console.error("[saveAllNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [개별 노드 삭제]
   */
  async deleteNode(params: DeleteNodeParams): Promise<boolean> {
    try {
      const { nodeId } = params;

      const { error } = await supabase
        .from("study_plan_nodes")
        .delete()
        .eq("study_plan_node_id", nodeId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("[deleteNode Error]:", error);
      throw error;
    }
  },

  /**
   * [플랜 정보 조회]
   */
  async getPlanInfo(params: GetPlanInfoParams): Promise<PlanInfo> {
    try {
      const { planId } = params;

      const { data, error } = await supabase
        .from("study_plans")
        .select("study_plan_id, study_plan_name, study_plan_description")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data as PlanInfo;
    } catch (error) {
      console.error("[getPlanInfo Error]:", error);
      throw error;
    }
  },

  /**
   * [사용 가능 기술 스택 조회]
   */
  async getTechStacks(): Promise<TechStack[]> {
    try {
      const { data, error } = await supabase
        .from("tech_stacks")
        .select("*")
        .order("tech_stack_name", { ascending: true });

      if (error) throw error;
      return data as TechStack[];
    } catch (error) {
      console.error("[getTechStacks Error]:", error);
      throw error;
    }
  },
};
