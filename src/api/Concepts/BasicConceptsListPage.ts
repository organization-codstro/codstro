import { supabase } from "../../db/supabase/supabase";
import {
  SearchConceptsParams,
  FilterByCategoryParams,
  GetRecommendedKeywordsParams,
  ConceptSummaryResponse,
} from "../../types/api/Concepts/BasicConceptsListPage";

/**
 * [ConceptListService]
 * 개념 리스트 조회, 검색 및 필터링을 담당합니다.
 * 참조 테이블: concept_description_materials
 */
export const BasicConceptsListService = {
  /**
   * [조회] 전체 개념 리스트를 가져옵니다.
   * 기본적으로 최신순으로 정렬합니다.
   */
  async getConcepts(): Promise<ConceptSummaryResponse[]> {
    const { data, error } = await supabase
      .from("concept_description_materials")
      .select(
        `
        id:concept_description_material_id,
        name:concept_description_material_title,
        description:concept_description_material_description,
        category:concept_description_material_category,
        representative_image_url:concept_description_material_representative_image_url
      `
      )
      .order("concept_description_material_created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [검색] 키워드를 통해 제목 또는 설명에서 개념을 검색합니다.
   */
  async searchConcepts(
    params: SearchConceptsParams
  ): Promise<ConceptSummaryResponse[]> {
    const { keyword } = params;

    const { data, error } = await supabase
      .from("concept_description_materials")
      .select(
        `
        id:concept_description_material_id,
        name:concept_description_material_title,
        description:concept_description_material_description,
        category:concept_description_material_category,
        representative_image_url:concept_description_material_representative_image_url
      `
      )
      .or(
        `concept_description_material_title.ilike.%${keyword}%,concept_description_material_description.ilike.%${keyword}%`
      )
      .order("concept_description_material_created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [필터] 특정 카테고리에 속한 개념들만 필터링합니다.
   */
  async filterByCategory(
    params: FilterByCategoryParams
  ): Promise<ConceptSummaryResponse[]> {
    const { category } = params;

    const { data, error } = await supabase
      .from("concept_description_materials")
      .select(
        `
        id:concept_description_material_id,
        name:concept_description_material_title,
        description:concept_description_material_description,
        category:concept_description_material_category,
        representative_image_url:concept_description_material_representative_image_url
      `
      )
      .contains("concept_description_material_category", [category]);

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [AI 추천] Gemini API를 사용하여 유저의 관심사에 맞는 개념 키워드를 제안받습니다.
   */
  async getRecommendedKeywords(
    params: GetRecommendedKeywordsParams
  ): Promise<string[]> {
    const { userInterests } = params;

    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: userInterests }),
      });
      const data = await response.json();
      return data.keywords;
    } catch (error) {
      console.error("Gemini Recommendation Error:", error);
      return [];
    }
  },
};
