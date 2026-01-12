import { supabase } from "../../db/supabase/supabase";
import {
  SearchToolsParams,
  FilterToolsByCategoryParams,
  GetAIToolSuggestionsParams,
  ToolSummaryResponse,
} from "../../types/api/Concepts/CodingToolsListPage";

/**
 * [CodingToolsListService]
 * 코딩 툴 리스트 조회, 검색 및 카테고리 필터링을 담당합니다.
 * 참조 테이블: tool_description_materials
 */
export const CodingToolsListService = {
  /**
   * [조회] 모든 코딩 툴 리스트를 최신등록순으로 가져옵니다.
   */
  async getTools(): Promise<ToolSummaryResponse[]> {
    const { data, error } = await supabase
      .from("tool_description_materials")
      .select(
        `
        id:tool_description_material_id,
        name:tool_description_material_name,
        description:tool_description_material_description,
        category:tool_description_material_category,
        representative_image_url:tool_description_material_representative_image_url
      `
      )
      .order("tool_description_material_created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [검색] 툴 이름 또는 설명에서 키워드를 검색합니다.
   */
  async searchTools(params: SearchToolsParams): Promise<ToolSummaryResponse[]> {
    const { keyword } = params;

    const { data, error } = await supabase
      .from("tool_description_materials")
      .select(
        `
        id:tool_description_material_id,
        name:tool_description_material_name,
        description:tool_description_material_description,
        category:tool_description_material_category,
        representative_image_url:tool_description_material_representative_image_url
      `
      )
      .or(
        `tool_description_material_name.ilike.%${keyword}%,tool_description_material_description.ilike.%${keyword}%`
      )
      .order("tool_description_material_name", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [필터링] 특정 카테고리에 해당하는 툴만 필터링합니다.
   */
  async filterToolsByCategory(
    params: FilterToolsByCategoryParams
  ): Promise<ToolSummaryResponse[]> {
    const { categoryName } = params;

    const { data, error } = await supabase
      .from("tool_description_materials")
      .select(
        `
        id:tool_description_material_id,
        name:tool_description_material_name,
        description:tool_description_material_description,
        category:tool_description_material_category,
        representative_image_url:tool_description_material_representative_image_url
      `
      )
      .contains("tool_description_material_category", [categoryName]);

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [AI 제안] Gemini API를 사용하여 현재 검색어와 관련된 인기 있는 툴 키워드를 추천합니다.
   */
  async getAIToolSuggestions(
    params: GetAIToolSuggestionsParams
  ): Promise<string[]> {
    const { keyword } = params;

    try {
      const response = await fetch("/api/gemini/tool-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSearch: keyword }),
      });
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      return [];
    }
  },
};
