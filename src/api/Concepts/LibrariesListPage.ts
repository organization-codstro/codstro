import { supabase } from "../../db/supabase/supabase";
import {
  LibrarySummaryResponse,
  SearchLibrariesParams,
  FilterLibrariesParams,
  GetAILibraryStackRecommendationParams,
} from "../../types/api/Concepts/LibrariesListPage";

/**
 * [LibraryListService]
 * 라이브러리 및 프레임워크 리스트의 조회, 검색, 필터링을 담당합니다.
 * 참조 테이블: librarie_description_materials
 */
export const LibraryListService = {
  /**
   * [조회] 모든 라이브러리 리스트를 최신순으로 가져옵니다.
   */
  async getLibraries(): Promise<LibrarySummaryResponse[]> {
    const { data, error } = await supabase
      .from("librarie_description_materials")
      .select(
        `
        id:librarie_description_material_id,
        name:librarie_description_material_name,
        language:librarie_description_material_included_language,
        description:librarie_description_material_description,
        category:librarie_description_material_category,
        representative_image_url:librarie_description_material_representative_image_url
      `
      )
      .order("librarie_description_materials_created_date", {
        ascending: false,
      });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [검색] 라이브러리 이름 또는 포함된 언어로 검색합니다.
   */
  async searchLibraries(
    params: SearchLibrariesParams
  ): Promise<LibrarySummaryResponse[]> {
    const { keyword } = params;

    const { data, error } = await supabase
      .from("librarie_description_materials")
      .select(
        `
        id:librarie_description_material_id,
        name:librarie_description_material_name,
        language:librarie_description_material_included_language,
        description:librarie_description_material_description,
        category:librarie_description_material_category,
        representative_image_url:librarie_description_material_representative_image_url
      `
      )
      .or(
        `librarie_description_material_name.ilike.%${keyword}%,librarie_description_material_included_language.ilike.%${keyword}%`
      )
      .order("librarie_description_material_name", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [필터] 특정 언어 또는 카테고리로 라이브러리를 필터링합니다.
   */
  async filterLibraries(
    params: FilterLibrariesParams
  ): Promise<LibrarySummaryResponse[]> {
    const { column, value } = params;

    let query = supabase.from("librarie_description_materials").select(`
        id:librarie_description_material_id,
        name:librarie_description_material_name,
        language:librarie_description_material_included_language,
        description:librarie_description_material_description,
        category:librarie_description_material_category,
        representative_image_url:librarie_description_material_representative_image_url
      `);

    if (column === "language") {
      query = query.eq(
        "librarie_description_material_included_language",
        value
      );
    } else {
      query = query.contains("librarie_description_material_category", [value]);
    }

    const { data, error } = await query.order(
      "librarie_description_materials_created_date",
      { ascending: false }
    );

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [AI 추천] Gemini API를 사용하여 특정 프로젝트 성격에 맞는 라이브러리 조합을 추천받습니다.
   */
  async getAILibraryStackRecommendation(
    params: GetAILibraryStackRecommendationParams
  ): Promise<string[]> {
    const { projectType } = params;

    try {
      const response = await fetch("/api/gemini/stack-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${projectType} 개발을 위한 추천 라이브러리와 프레임워크 스택을 알려줘.`,
        }),
      });
      const data = await response.json();
      return data.recommendations;
    } catch (error) {
      console.error("AI Stack Recommendation Error:", error);
      return [];
    }
  },
};
