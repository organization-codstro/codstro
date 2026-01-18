import { supabase } from "../../db/supabase/supabase";
import { PackageManagerSummary } from "../../types/api/Concepts/PackageListPage";

/**
 * [PackageManagerListService]
 * 패키지 매니저(NPM, Yarn, PNPM 등) 리스트의 조회, 검색, 필터링을 관리합니다.
 * 참조 테이블: package_manager_description_materials
 */
export const PackageManagerListService = {
  /**
   * [조회] 모든 패키지 매니저 자료 리스트를 최신순으로 가져옵니다.
   */
  async getMaterials(): Promise<PackageManagerSummary[]> {
    const { data, error } = await supabase
      .from("package_manager_description_materials")
      .select(
        `
        id: package_manager_description_material_id,
        name: package_manager_description_material_name,
        description: package_manager_description_material_description,
        category: package_manager_description_material_category,
        representativeImageUrl: package_manager_description_material_image_url
      `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) throw new Error(error.message);

    // ID가 number일 경우 컴포넌트 요구사항에 맞춰 string으로 변환
    return (data || []).map((item) => ({
      ...item,
      id: String(item.id),
    }));
  },

  /**
   * [검색] 이름 또는 설명에서 키워드를 포함하는 자료를 검색합니다.
   * @param keyword 검색어
   */
  async searchMaterials(keyword: string): Promise<PackageManagerSummary[]> {
    const { data, error } = await supabase
      .from("package_manager_description_materials")
      .select(
        `
        id: package_manager_description_material_id,
        name: package_manager_description_material_name,
        description: package_manager_description_material_description,
        category: package_manager_description_material_category,
        representativeImageUrl: package_manager_description_material_image_url
      `,
      )
      .or(
        `package_manager_description_material_name.ilike.%${keyword}%,package_manager_description_material_description.ilike.%${keyword}%`,
      )
      .order("package_manager_description_material_name", {
        ascending: true,
      });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      id: String(item.id),
    }));
  },

  /**
   * [필터링] 특정 태그(카테고리)가 포함된 자료만 필터링합니다.
   * @param categoryName 필터링할 태그 (예: 'JavaScript')
   */
  async filterByCategory(
    categoryName: string,
  ): Promise<PackageManagerSummary[]> {
    const { data, error } = await supabase
      .from("package_manager_description_materials")
      .select(
        `
        id: package_manager_description_material_id,
        name: package_manager_description_material_name,
        description: package_manager_description_material_description,
        category: package_manager_description_material_category,
        representativeImageUrl: package_manager_description_material_image_url
      `,
      )
      .contains("package_manager_description_material_category", [
        categoryName,
      ]);

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
      id: String(item.id),
    }));
  },

  /**
   * [AI 인사이트] Gemini API를 사용하여 현재 트렌드에 맞는
   * 패키지 매니저 선택 가이드 키워드를 추천받습니다.
   */
  async getAIPackageManagerInsight() {
    try {
      const response = await fetch("/api/gemini/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "현재 JavaScript 생태계에서 npm, yarn, pnpm 중 어떤 것을 선택하는 것이 성능과 보안 면에서 유리한지 짧은 인사이트를 줘.",
        }),
      });
      const data = await response.json();
      return data.insight;
    } catch (error) {
      console.error("AI Insight Error:", error);
      return "인사이트를 불러올 수 없습니다.";
    }
  },
};
