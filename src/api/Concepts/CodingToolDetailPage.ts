import { supabase } from "../../db/supabase/supabase";
import {
  GetToolDetailParams,
  ToggleToolUnderstoodParams,
  GetToolAIAdviceParams,
  AddToolTodoParams,
  ToolDetailResponse,
} from "../../types/api/Concepts/CodingToolDetailPage";

/**
 * [CodingToolDetailService]
 * 코딩 툴 상세 정보 조회 및 유저 상호작용(이해함, Todo 추가)을 담당합니다.
 * 참조 테이블: tool_description_materials, user_concepts
 */
export const CodingToolDetailService = {
  /**
   * [조회] 특정 코딩 툴의 상세 정보와 해당 유저의 학습 상태를 가져옵니다.
   */
  async getToolDetail(
    params: GetToolDetailParams
  ): Promise<ToolDetailResponse> {
    const { toolId, userId } = params;

    // 1. 코딩 툴 기본 데이터 조회
    const { data: toolData, error: toolError } = await supabase
      .from("tool_description_materials")
      .select(
        `
        id:tool_description_material_id,
        name:tool_description_material_name,
        description:tool_description_material_description,
        content:tool_description_material_content,
        category:tool_description_material_category,
        officialSite:tool_description_material_document_url
      `
      )
      .eq("tool_description_material_id", toolId)
      .single();

    if (toolError) throw new Error(toolError.message);

    // 2. 유저의 '이해함' 상태 체크
    const { data: userConcept } = await supabase
      .from("user_concepts")
      .select("user_concept_id")
      .eq("user_id", userId)
      .eq("tool_description_material_id", toolId)
      .single();

    // 3. 연관 아이템 조회
    const relatedItems: any[] = [];

    return {
      ...toolData,
      tags: toolData.category || [],
      isUnderstood: !!userConcept,
      relatedConcepts: relatedItems,
    };
  },

  /**
   * [업데이트] 코딩 툴에 대한 '이해함' 상태를 토글합니다.
   */
  async toggleToolUnderstood(
    params: ToggleToolUnderstoodParams
  ): Promise<boolean> {
    const { userId, toolId, currentStatus } = params;

    if (currentStatus) {
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("tool_description_material_id", toolId);

      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase.from("user_concepts").insert({
        user_id: userId,
        tool_description_material_id: parseInt(toolId),
        user_concept_is_starred: false,
      });

      if (error) throw error;
      return true;
    }
  },

  /**
   * [AI 서비스] Gemini API를 사용하여 도구(Tool) 활용법이나 추가 정보를 생성합니다.
   */
  async getToolAIAdvice(params: GetToolAIAdviceParams): Promise<string> {
    const { toolName, prompt } = params;

    try {
      const response = await fetch("/api/gemini/tool-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: toolName,
          question: prompt,
        }),
      });
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("AI Advice Fetch Error:", error);
      throw error;
    }
  },

  /**
   * [Todo 추가] 해당 툴 학습 과제를 유저의 개인 노트(notes)에 등록합니다.
   */
  async addToolTodo(params: AddToolTodoParams): Promise<boolean> {
    const { userId, toolName, type } = params;

    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[${type}] ${toolName} 마스터하기`,
      note_description: `${toolName} 도구에 대한 ${type} 과제입니다.`,
      note_labels: ["tool", type],
      created_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};
