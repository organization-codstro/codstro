import { MATERIAL_TYPE, PAGE_SIZE } from "../../constants/Concepts/concepts";
import { supabase } from "../../db/supabase/supabase";
import { GetConceptsByType } from "../../types/pages/Concepts/Concepts";

export const ConceptsService = {
  /**
   * type에 따라 최신 자료 반환, all일 경우 모든 테이블 합쳐서 최근 자료 반환
   * page: 1-based
   */
  async getConceptsByType(params: GetConceptsByType): Promise<{
    data: any[];
    hasMore: boolean;
  }> {
    const { type, page } = params;
    const offset = (page - 1) * PAGE_SIZE;

    const tableMap: Record<MATERIAL_TYPE, string> = {
      concept: "concept_description_materials",
      tool: "tool_description_materials",
      librarie: "librarie_description_materials",
      third_party_service: "third_party_services_description_materials",
      package_manager: "package_manager_description_materials",
    };

    // ----------------------
    // all 타입 처리
    // ----------------------
    if (type === "all") {
      const allDataPromises = Object.entries(tableMap).map(
        async ([materialType, table]) => {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.warn(error.message);
            return [];
          }

          return (data || []).map((item: any) => {
            let id = "";
            let name = "";

            switch (materialType) {
              case "concept":
                id = item.concept_description_material_id;
                name = item.concept_description_material_name;
                break;
              case "tool":
                id = item.tool_description_material_id;
                name = item.tool_description_material_name;
                break;
              case "librarie":
                id = item.librarie_description_material_id;
                name = item.librarie_description_material_name;
                break;
              case "third_party_service":
                id = item.third_party_services_description_material_id;
                name = item.third_party_services_description_material_name;
                break;
              case "package_manager":
                id = item.package_manager_description_material_id;
                name = item.package_manager_description_material_name;
                break;
            }

            return {
              id,
              name,
              type: materialType,
              created_at: item.created_at,
            };
          });
        },
      );

      const results = await Promise.all(allDataPromises);
      const allData = results.flat();

      // 내림차순 정렬
      const sorted = allData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      const pagedData = sorted.slice(offset, offset + PAGE_SIZE);

      return {
        data: pagedData,
        hasMore: offset + PAGE_SIZE < sorted.length,
      };
    }

    // ----------------------
    // 일반 타입 처리
    // ----------------------
    const tableName = tableMap[type];
    if (!tableName) throw new Error("Invalid material type");

    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    const sorted = (data || []).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const pagedData = sorted.slice(offset, offset + PAGE_SIZE);

    return {
      data: pagedData.map((item: any) => {
        let id = "";
        let name = "";
        switch (type) {
          case "concept":
            id = item.concept_description_material_id;
            name = item.concept_description_material_name;
            break;
          case "tool":
            id = item.tool_description_material_id;
            name = item.tool_description_material_name;
            break;
          case "librarie":
            id = item.librarie_description_material_id;
            name = item.librarie_description_material_name;
            break;
          case "third_party_service":
            id = item.third_party_services_description_material_id;
            name = item.third_party_services_description_material_name;
            break;
          case "package_manager":
            id = item.package_manager_description_material_id;
            name = item.package_manager_description_material_name;
            break;
        }
        return { id, name, type, created_at: item.created_at };
      }),
      hasMore: offset + PAGE_SIZE < sorted.length,
    };
  },
};
