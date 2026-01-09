import { supabase } from "../../db/supabase/supabase";

/**
 * [우문경 노드 편집 페이지 서비스]
 * 학습 노드의 리스트 조회, 대량 저장(순서 변경 포함), 개별 삭제 기능을 담당합니다.
 */
export const WoomoonkyungEditNodeService = {
  /**
   * [학습 노드 리스트 조회]
   * 해당 공부 계획에 등록된 노드들을 순서(position)대로 가져옵니다.
   * @param planId 공부 계획 ID
   */
  async getNodesByPlanId(planId: number) {
    try {
      const { data, error } = await supabase
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

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getNodesByPlanId Error]:", error);
      throw error;
    }
  },

  /**
   * [학습 노드 일괄 저장]
   * 편집 및 드래그 앤 드롭으로 변경된 노드 리스트를 일괄적으로 업데이트(upsert)합니다.
   * 기존에 없던 노드는 추가되고, 있던 노드는 수정됩니다.
   * @param nodes 저장할 전체 노드 배열
   */
  async saveAllNodes(nodes: any[]) {
    try {
      // DB 스키마에 맞게 데이터 매핑
      const nodesToUpsert = nodes.map((node) => ({
        study_plan_node_id: typeof node.study_plan_node_id === 'number' && node.study_plan_node_id > 1000000000000 
          ? undefined // 임시 ID(Date.now())인 경우 DB에서 생성하도록 제외
          : node.study_plan_node_id,
        study_plan_id: node.study_plan_id,
        study_plan_node_name: node.study_plan_node_name,
        description: node.description,
        start_date: node.start_date,
        end_date: node.end_date,
        completed: node.completed || false,
        position: node.position,
        tech_stack_id: node.tech_stack_id,
        created_date: node.created_date || new Date().toISOString().split("T")[0]
      }));

      const { data, error } = await supabase
        .from("study_plan_nodes")
        .upsert(nodesToUpsert)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[saveAllNodes Error]:", error);
      throw error;
    }
  },

  /**
   * [개별 노드 삭제]
   * @param nodeId 삭제할 노드 고유 ID
   */
  async deleteNode(nodeId: number | string) {
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
   * [플랜 정보 조회]
   * 상단 헤더에 표시할 플랜의 기본 정보를 가져옵니다.
   * @param planId 공부 계획 ID
   */
  async getPlanInfo(planId: number) {
    try {
      const { data, error } = await supabase
        .from("study_plans")
        .select("study_plan_id, study_plan_name, study_plan_description")
        .eq("study_plan_id", planId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getPlanInfo Error]:", error);
      throw error;
    }
  },

  /**
   * [사용 가능 기술 스택 조회]
   * 우측 사이드바의 TechStackPicker에서 사용할 목록을 가져옵니다.
   */
  async getTechStacks() {
    try {
      const { data, error } = await supabase
        .from("tech_stacks")
        .select("*")
        .order("tech_stack_name", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getTechStacks Error]:", error);
      throw error;
    }
  }
};