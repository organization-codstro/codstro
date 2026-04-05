import { supabase } from "../../db/supabase/supabase";
import {
  LibrarySummaryResponse,
  SearchlibrarysParams,
  FilterlibrarysParams,
} from "../../types/api/Concept/ConceptListPage";

/**
 * [LibraryListService]
 * 라이브러리 및 프레임워크 리스트의 조회, 검색, 필터링을 담당합니다.
 * 참조 테이블: library_description_materials
 */
export const ConceptListService = {
  /**
   * [조회] 모든 라이브러리 리스트를 최신순으로 가져옵니다.
   */
  async getConcept(): Promise<LibrarySummaryResponse[]> {
    const { data, error } = await supabase
      .from("library_description_materials")
      .select(
        `
        id:library_description_material_id,
        name:library_description_material_name,
        description:library_description_material_description,
        category:library_description_material_category,
        content:library_description_material_content,
        documentUrl : library_description_material_document_url,
        includedLanguage:library_description_material_included_language,
        representativeImageUrl:library_description_material_image_url
      `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [검색] 라이브러리 이름 또는 포함된 언어로 검색합니다.
   */
  async searchConcept(
    params: SearchlibrarysParams,
  ): Promise<LibrarySummaryResponse[]> {
    const { keyword } = params;

    const { data, error } = await supabase
      .from("library_description_materials")
      .select(
        `
        id:library_description_material_id,
        name:library_description_material_name,
        description:library_description_material_description,
        category:library_description_material_category,
        content:library_description_material_content,
        documentUrl : library_description_material_document_url,
        includedLanguage:library_description_material_included_language,
        representativeImageUrl:library_description_material_image_url
      `,
      )
      .or(
        `library_description_material_name.ilike.%${keyword}%,library_description_material_included_language.ilike.%${keyword}%`,
      )
      .order("library_description_material_name", { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },

  /**
   * [필터] 특정 언어 또는 카테고리로 라이브러리를 필터링합니다.
   */
  async filterConcept(
    params: FilterlibrarysParams,
  ): Promise<LibrarySummaryResponse[]> {
    const { column, value } = params;

    let query = supabase.from("library_description_materials").select(`
        id:library_description_material_id,
        name:library_description_material_name,
        description:library_description_material_description,
        category:library_description_material_category,
        content:library_description_material_content,
        documentUrl : library_description_material_document_url,
        includedLanguage:library_description_material_included_language,
        representativeImageUrl:library_description_material_image_url
      `);

    if (column === "language") {
      query = query.eq("library_description_material_included_language", value);
    } else {
      query = query.contains("library_description_material_category", [value]);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      ...item,
    }));
  },
};
