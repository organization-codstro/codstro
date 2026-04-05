import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";

import {
  ConceptDetailResponse,
  GetConceptDetailParams,
  AskConceptAIParams,
  AddConceptTodoParams,
} from "../../types/api/Concept/ConceptDetailPage";

/**
 * LibraryDetailService
 *
 * 라이브러리 상세 페이지에서 필요한 모든 비즈니스 로직을 담당하는 서비스
 */
export const ConceptDetailService = {
  /**
   * 특정 라이브러리의 상세 정보와
   * 해당 라이브러리에 대한 유저의 학습(이해) 상태를 함께 조회합니다.
   */
  async getConceptDetail(
    params: GetConceptDetailParams,
  ): Promise<ConceptDetailResponse> {
    const { conceptId } = params;

    const { data: conceptData, error: conceptError } = await supabase
      .from("library_description_materials")
      .select(
        `
        id:library_description_material_id,
        name:library_description_material_name,
        language:library_description_material_included_language,
        description:library_description_material_description,
        content:library_description_material_content,
        category:library_description_material_category,
        officialSite:library_description_material_document_url
      `,
      )
      .eq("library_description_material_id", conceptId)
      .single();

    if (conceptError || !conceptData) {
      throw new Error("라이브러리 정보를 불러올 수 없습니다.");
    }

    const relatedItems: any[] = [];

    return {
      ...conceptData,
      tags: conceptData.category ?? [],
      relatedConcepts: relatedItems,
    };
  },

  /**
   * AI(Gemini)를 사용하여 라이브러리 관련 질의를 수행합니다.
   */
  async askAIChat(params: AskConceptAIParams) {
    const { conceptName, question } = params;

    try {
      return await generateAiContent(
        `라이브러리 [${conceptName}]에 대한 질문: ${question}`,
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  /**
   * 라이브러리 학습 Todo(노트)를 생성합니다.
   */
  async addLibraryTodo(params: AddConceptTodoParams): Promise<boolean> {
    const { userId, conceptName, type } = params;

    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[학습] ${conceptName} - ${type}`,
      note_description: `${conceptName} 라이브러리의 ${type} 관련 과제입니다.`,
      note_labels: ["Library", type],
      created_at: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};
