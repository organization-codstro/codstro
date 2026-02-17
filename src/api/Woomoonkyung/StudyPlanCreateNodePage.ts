import { supabase } from "../../db/supabase/supabase";
import {
  GetTechStacksParams,
  TechStack,
  SaveAllNodesParams,
  NodeItem,
  UpdateNodePositionsParams,
} from "../../types/api/Woomoonkyung/StudyPlanCreateNodePage";

/**
 * [노드 관리 및 설정 서비스]
 * 기술 스택 목록 조회, 노드 생성, 순서 변경(Drag & Drop) 반영을 담당합니다.
 */
export const WoomoonkyungCreateNodeService = {
  /**
   * [사용 가능한 기술 스택 목록 조회]
   */
  async getTechStacks(params?: GetTechStacksParams): Promise<TechStack[]> {
    try {
      const searchQuery = params?.searchQuery ?? "";

      let query = supabase
        .from("tech_stacks")
        .select("*")
        .order("tech_stack_name", { ascending: true });

      if (searchQuery) {
        query = query.ilike("tech_stack_name", `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TechStack[];
    } catch (error) {
      console.error("[getTechStacks Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 노드 일괄 저장 및 순서 업데이트]
   */
  async saveAllNodes(params: SaveAllNodesParams): Promise<NodeItem[]> {
    try {
      const { planId, nodes } = params;

      const { error: deleteError } = await supabase
        .from("study_plan_nodes")
        .delete()
        .eq("study_plan_id", planId);
      if (deleteError) throw deleteError;

      const nodesToInsert = nodes.map((node) => ({
        study_plan_id: planId,
        study_plan_node_name: node.study_plan_node_name,
        study_plan_node_description: node.study_plan_node_description,
        study_plan_node_start_date: node.start_date,
        study_plan_node_end_date: node.end_date,
        study_plan_node_completed: node.study_plan_node_completed || false,
        study_plan_node_position: node.study_plan_node_position,
        tech_stack_id: node.tech_stack_id,
        created_at: node.created_at || new Date().toISOString().split("T")[0],
      }));

      const { data, error: insertError } = await supabase
        .from("study_plan_nodes")
        .insert(nodesToInsert)
        .select();

      if (insertError) throw insertError;
      return data as NodeItem[];
    } catch (error) {
      console.error("[saveAllNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [개별 노드 삭제]
   */
  async deleteNode(nodeId: string): Promise<boolean> {
    try {
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
   * [노드 순서만 대량 업데이트]
   */
  async updateNodePositions(
    params: UpdateNodePositionsParams,
  ): Promise<NodeItem[]> {
    try {
      const { updates } = params;

      const { data, error } = await supabase
        .from("study_plan_nodes")
        .upsert(
          updates.map((u) => ({
            study_plan_node_id: u.id,
            position: u.position,
          })),
        )
        .select();

      if (error) throw error;
      return data as NodeItem[];
    } catch (error) {
      console.error("[updateNodePositions Error]:", error);
      throw error;
    }
  },
};
