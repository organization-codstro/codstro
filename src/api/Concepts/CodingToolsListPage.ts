import { supabase } from "../../db/supabase/supabase";
import { ToolSummaryResponse } from "../../types/api/Concepts/CodingToolsListPage";

/**
 * [ToolListService]
 * 코딩 툴 리스트 조회, 검색 및 카테고리 필터링을 담당합니다.
 * 참조 테이블: tool_description_materials
 */
export const ToolListService = {
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
      tags: item.category || [], // 테이블 스키마에 따라 category 배열을 tags로 사용
    }));
  },

  /**
   * [검색] 툴 이름 또는 설명에서 키워드를 검색합니다.
   * @param keyword 유저 입력 검색어
   */
  async searchTools(keyword: string): Promise<ToolSummaryResponse[]> {
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
      // ilike를 사용하여 대소문자 구분 없이 부분 일치 검색
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
   * [필터링] 특정 카테고리(IDE, Version Control 등)에 해당하는 툴만 필터링합니다.
   * @param categoryName 필터링할 카테고리 문자열
   */
  async filterToolsByCategory(
    categoryName: string
  ): Promise<ToolSummaryResponse[]> {
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
      // Postgres 배열 컬럼 내 특정 요소 포함 여부 확인
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
  async getAIToolSuggestions(keyword: string) {
    try {
      const response = await fetch("/api/gemini/tool-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSearch: keyword }),
      });
      const data = await response.json();
      return data.suggestions; // ['WebStorm', 'Sublime Text' 등]
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      return [];
    }
  },
};
