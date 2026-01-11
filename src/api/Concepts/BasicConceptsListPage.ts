import { supabase } from "../../db/supabase/supabase";
import { ConceptSummaryResponse } from "../../types/api/Concepts/BasicConceptsListPage";

/**
 * [ConceptListService]
 * 개념 리스트 조회, 검색 및 필터링을 담당합니다.
 * 참조 테이블: concept_description_materials
 */
export const ConceptListService = {
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

    // DB의 category(text[])를 컴포넌트의 tags로 매핑하여 반환
    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [검색] 키워드를 통해 제목 또는 설명에서 개념을 검색합니다.
   * @param keyword 검색어
   */
  async searchConcepts(keyword: string): Promise<ConceptSummaryResponse[]> {
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
      // 제목(title) 또는 설명(description)에 키워드가 포함된 경우 (대소문자 무시)
      .or(
        `concept_description_material_title.ilike.%${keyword}%,concept_description_material_description.ilike.%${keyword}%`
      )
      .order("concept_description_material_created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [필터] 특정 카테고리에 속한 개념들만 필터링합니다.
   * @param category 카테고리 명 (예: 'Web Development')
   */
  async filterByCategory(category: string): Promise<ConceptSummaryResponse[]> {
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
      // Postgres 배열 컬럼에 특정 값이 포함되어 있는지 확인 (@> 연산자 활용)
      .contains("concept_description_material_category", [category]);

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [AI 추천] Gemini API를 사용하여 유저의 관심사에 맞는 개념 키워드를 제안받습니다.
   */
  async getRecommendedKeywords(userInterests: string[]) {
    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: userInterests }),
      });
      const data = await response.json();
      return data.keywords; // ['Docker', 'Kubernetes', ...]
    } catch (error) {
      console.error("Gemini Recommendation Error:", error);
      return [];
    }
  },
};
