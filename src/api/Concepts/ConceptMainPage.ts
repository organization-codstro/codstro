import { supabase } from "../../db/supabase/supabase";
import {
  DocumentationCategoryResponse,
  RecommendedMaterialResponse,
} from "../../types/api/Concepts/ConceptMainPage";

/**
 * [ConceptMainService]
 * 메인 페이지의 통합 추천 리스트 및 외부 문서 자원을 관리합니다.
 */
export const ConceptMainService = {
  /**
   * [조회] 추천 개념 리스트를 가져옵니다.
   * 여러 테이블에서 최신/인기 데이터를 취합합니다. (스키마 기준)
   * 테이블: concept_..., tool_..., librarie_..., third_party_...
   */
  async getRecommendedMaterials(): Promise<RecommendedMaterialResponse[]> {
    // 1. 각 테이블에서 최신 데이터를 병렬로 가져옵니다.
    const [concepts, tools, libraries, services] = await Promise.all([
      supabase
        .from("concept_description_materials")
        .select(
          "id:concept_description_material_id, title:concept_description_material_title, category:concept_description_material_category"
        )
        .limit(2),
      supabase
        .from("tool_description_materials")
        .select(
          "id:tool_description_material_id, title:tool_description_material_name, category:tool_description_material_category"
        )
        .limit(2),
      supabase
        .from("librarie_description_materials")
        .select(
          "id:librarie_description_material_id, title:librarie_description_material_name, category:librarie_description_material_category"
        )
        .limit(2),
      supabase
        .from("third_party_services_description_materials")
        .select(
          "id:third_party_services_description_material_id, title:third_party_services_description_material_name, category:third_party_services_description_material_category"
        )
        .limit(2),
    ]);

    // 2. 통합 결과 생성 (데이터 가공)
    const combined: RecommendedMaterialResponse[] = [
      ...(concepts.data || []).map((item) => ({
        ...item,
        type: "concept" as const,
      })),
      ...(tools.data || []).map((item) => ({ ...item, type: "tool" as const })),
      ...(libraries.data || []).map((item) => ({
        ...item,
        type: "library" as const,
      })),
      ...(services.data || []).map((item) => ({
        ...item,
        type: "service" as const,
      })),
    ];

    // 3. UI에 맞게 변환 (category 배열의 첫 번째 요소를 메인 카테고리로 사용)
    return combined.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      category: Array.isArray(item.category) ? item.category[0] : "General",
      tags: Array.isArray(item.category) ? item.category : [],
    }));
  },

  /**
   * [조회] 문서 자원(Documentation Sites) 데이터를 가져옵니다.
   * 별도의 DB 테이블이 없다면 정적 데이터를 반환하거나, 'external_resources' 테이블을 참조하도록 구성합니다.
   */
  async getDocumentationSites(): Promise<DocumentationCategoryResponse[]> {
    // 현재는 예시 데이터를 기준으로 반환하며, 추후 DB 연동 시 supabase.from('docs').select('*') 로 대체 가능합니다.
    const { data, error } = await supabase.from("docs").select("*");
    if (error) throw new Error(error.message);
    return data as DocumentationCategoryResponse[];
  },

  /**
   * [AI 서비스] Gemini API를 활용하여 유저에게 맞춤형 학습 로드맵 키워드를 추천합니다.
   */
  async getAIRoadmapSuggestions(userInterests: string[]) {
    try {
      const response = await fetch("/api/gemini/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${userInterests.join(
            ", "
          )} 분야를 공부하고 있어. 다음에 공부하면 좋을 개념 3가지만 추천해줘.`,
        }),
      });
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error("Gemini Roadmap Error:", error);
      return [];
    }
  },
};
