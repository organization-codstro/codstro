import { supabase } from "../../db/supabase/supabase";

/**
 * [노드 관리 및 설정 서비스]
 * 기술 스택 목록 조회, 노드 생성, 순서 변경(Drag & Drop) 반영을 담당합니다.
 */
export const NodeManagementService = {
  /**
   * [사용 가능한 기술 스택 목록 조회]
   * @param searchQuery 검색어 (선택 사항)
   */
  async getTechStacks(searchQuery: string = "") {
    try {
      let query = supabase
        .from("tech_stacks")
        .select("*")
        .order("tech_stack_name", { ascending: true });

      if (searchQuery) {
        query = query.ilike("tech_stack_name", `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getTechStacks Error]:", error);
      throw error;
    }
  },

  /**
   * [공부 계획 노드 일괄 저장 및 순서 업데이트]
   * 기존 노드를 모두 삭제하고 새로운 리스트로 덮어쓰거나, 
   * 변경된 순서(position)를 일괄 업데이트합니다.
   * @param planId 해당 공부 계획 ID
   * @param nodes 저장할 전체 노드 리스트
   */
  async saveAllNodes(planId: number, nodes: any[]) {
    try {
      // 1. 기존 노드 데이터 삭제 (일관성 유지를 위해 삭제 후 재생성 방식 사용 가능)
      const { error: deleteError } = await supabase
        .from("study_plan_nodes")
        .delete()
        .eq("study_plan_id", planId);

      if (deleteError) throw deleteError;

      // 2. 새로운 노드 리스트 삽입 (position 반영)
      // ID는 UUID로 자동 생성되므로 제외하고 삽입
      const nodesToInsert = nodes.map((node) => ({
        study_plan_id: planId,
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed || false,
        position: node.position,
        tech_stack_id: node.tech_stack_id,
        created_date: node.created_date || new Date().toISOString().split("T")[0]
      }));

      const { data, error: insertError } = await supabase
        .from("study_plan_nodes")
        .insert(nodesToInsert)
        .select();

      if (insertError) throw insertError;
      return data;
    } catch (error) {
      console.error("[saveAllNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [개별 노드 삭제]
   * @param nodeId 삭제할 노드 ID (UUID)
   */
  async deleteNode(nodeId: string) {
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
   * 드래그 앤 드롭 후 DB의 position 값을 동기화할 때 사용합니다.
   * @param updates [{ id: 'uuid', position: 1 }, ...] 형태의 배열
   */
  async updateNodePositions(updates: { id: string; position: number }[]) {
    try {
      // Supabase는 단일 요청으로 다중 업데이트(upsert)를 지원합니다.
      const { data, error } = await supabase
        .from("study_plan_nodes")
        .upsert(
          updates.map((u) => ({
            study_plan_node_id: u.id,
            position: u.position,
          }))
        )
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[updateNodePositions Error]:", error);
      throw error;
    }
  }
};