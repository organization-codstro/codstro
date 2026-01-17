// ThirdPartyListService.ts
import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";
import {
  ThirdPartySummaryResponse,
  SearchServicesParams,
  FilterServicesByCategoryParams,
  GetAIServiceStackAdviceParams,
} from "../../types/api/Concepts/ThirdPartyListPage";

/**
 * [ThirdPartyListService]
 * 서드파티 서비스 리스트 조회, 검색 및 카테고리 필터링을 담당합니다.
 * 참조 테이블: third_party_services_description_materials
 */
export const ThirdPartyListService = {
  /**
   * [조회] 모든 서드파티 서비스 리스트를 최신순으로 가져옵니다.
   */
  async getServices(): Promise<ThirdPartySummaryResponse[]> {
    const { data, error } = await supabase
      .from("third_party_services_description_materials")
      .select(
        `
        id:third_party_services_description_material_id,
        name:third_party_services_description_material_name,
        description:third_party_services_description_material_description,
        category:third_party_services_description_material_category,
        representative_image_url:third_party_services_description_material_image_url
      `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [검색] 서비스 이름 또는 설명에서 키워드를 검색합니다.
   */
  async searchServices(
    params: SearchServicesParams,
  ): Promise<ThirdPartySummaryResponse[]> {
    const { keyword } = params;

    const { data, error } = await supabase
      .from("third_party_services_description_materials")
      .select(
        `
        id:third_party_services_description_material_id,
        name:third_party_services_description_material_name,
        description:third_party_services_description_material_description,
        category:third_party_services_description_material_category,
        representative_image_url:third_party_services_description_material_representative_image_url
      `,
      )
      .or(
        `third_party_services_description_material_name.ilike.%${keyword}%,third_party_services_description_material_description.ilike.%${keyword}%`,
      )
      .order("third_party_services_description_material_name", {
        ascending: true,
      });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [필터링] 특정 카테고리에 해당하는 서비스만 필터링합니다.
   */
  async filterServicesByCategory(
    params: FilterServicesByCategoryParams,
  ): Promise<ThirdPartySummaryResponse[]> {
    const { categoryName } = params;

    const { data, error } = await supabase
      .from("third_party_services_description_materials")
      .select(
        `
        id:third_party_services_description_material_id,
        name:third_party_services_description_material_name,
        description:third_party_services_description_material_description,
        category:third_party_services_description_material_category,
        representative_image_url:third_party_services_description_material_representative_image_url
      `,
      )
      .contains("third_party_services_description_material_category", [
        categoryName,
      ]);

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      tags: item.category || [],
    }));
  },

  /**
   * [AI 제안] Gemini API를 사용하여 프로젝트 규모나 성격에 맞는
   * 최적의 서드파티 인프라 조합을 제안받습니다.
   */
  async getAIServiceStackAdvice(
    params: GetAIServiceStackAdviceParams,
  ): Promise<string> {
    const { projectBrief } = params;

    try {
      const response = await generateAiContent(
        `${projectBrief} 프로젝트에 적합한 유료/무료 서드파티 서비스 스택을 추천해줘.`,
      );
      return response;
    } catch (error) {
      console.error("AI Service Advice Error:", error);
      return "추천 정보를 가져올 수 없습니다.";
    }
  },
};
