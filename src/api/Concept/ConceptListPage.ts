import { supabase } from "../../db/supabase/supabase";
import {
  LibrarySummaryResponse,
  SearchlibrarysParams,
  FilterlibrarysParams,
} from "../../types/api/Concept/ConceptListPage";

/**
 * [LibraryListService]
 * 라이브러리 및 프레임워크 리스트의 조회, 검색, 필터링을 담당합니다.
 * 참조 테이블: concepts
 */
export const ConceptListService = {
  /**
   * [조회] 모든 라이브러리 리스트를 최신순으로 가져옵니다.
   */
  async getConcept(): Promise<LibrarySummaryResponse[]> {
    const { data, error } = await supabase
      .from("concepts")
      .select(
        `
        id:concept_id,
        name:concept_name,
        description:concept_description,
        category:concept_category,
        content:concept_content,
        documentUrl : concept_document_url,
        includedField:concept_field
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
      .from("concepts")
      .select(
        `
        id:concept_id,
        name:concept_name,
        description:concept_description,
        category:concept_category,
        content:concept_content,
        documentUrl : concept_document_url,
        includedField:concept_field      `,
      )
      .or(`concept_name.ilike.%${keyword}%,concept_field.ilike.%${keyword}%`)
      .order("concept_name", { ascending: true });

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

    let query = supabase.from("concepts").select(`
    concept_id,
    concept_name,
    concept_description,
    concept_category,
    concept_content,
    concept_document_url,
    concept_field
  `);

    if (column === "language") {
      query = query.eq("concept_field", value);
    } else if (column === "category") {
      query = query.contains("concept_category", [value]);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw new Error(error.message);

    return (data || []).map((item) => ({
      id: item.concept_id,
      name: item.concept_name,
      description: item.concept_description,
      category: item.concept_category,
      content: item.concept_content,
      documentUrl: item.concept_document_url,
      includedField: item.concept_field,
    }));
  },
};
