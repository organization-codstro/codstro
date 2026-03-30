import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";

import {
  LibraryDetailResponse,
  GetLibraryDetailParams,
  ToggleLibraryUnderstoodParams,
  AskLibraryAIParams,
  AddLibraryTodoParams,
} from "../../types/api/Concepts/LibraryDetailPage";

/**
 * LibraryDetailService
 *
 * 라이브러리 상세 페이지에서 필요한 모든 비즈니스 로직을 담당하는 서비스
 */
export const LibraryDetailService = {
  /**
   * 특정 라이브러리의 상세 정보와
   * 해당 라이브러리에 대한 유저의 학습(이해) 상태를 함께 조회합니다.
   */
  async getLibraryDetail(
    params: GetLibraryDetailParams,
  ): Promise<LibraryDetailResponse> {
    const { libraryId, userId } = params;

    const { data: libraryData, error: libraryError } = await supabase
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
      .eq("library_description_material_id", libraryId)
      .single();

    if (libraryError || !libraryData) {
      throw new Error("라이브러리 정보를 불러올 수 없습니다.");
    }

    const { data: userStatus } = await supabase
      .from("user_concepts")
      .select("user_concept_id")
      .eq("user_id", userId)
      .eq("library_description_material_id", libraryId)
      .maybeSingle();

    const relatedItems: any[] = [];

    return {
      ...libraryData,
      tags: libraryData.category ?? [],
      isUnderstood: Boolean(userStatus),
      relatedConcepts: relatedItems,
    };
  },

  /**
   * 라이브러리에 대한 유저의 이해 상태를 토글합니다.
   */
  async toggleLibraryUnderstood(
    params: ToggleLibraryUnderstoodParams,
  ): Promise<boolean> {
    const { userId, libraryId, currentStatus } = params;

    if (currentStatus) {
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("library_description_material_id", libraryId);

      if (error) throw error;
      return false;
    }

    const { error } = await supabase.from("user_concepts").insert({
      user_id: userId,
      library_description_material_id: libraryId,
      user_concept_is_starred: false,
      third_party_services_description_material_id: null,
    });

    if (error) throw error;
    return true;
  },

  /**
   * AI(Gemini)를 사용하여 라이브러리 관련 질의를 수행합니다.
   */
  async askLibraryAI(params: AskLibraryAIParams) {
    const { libraryName, question } = params;

    try {
      return await generateAiContent(
        `라이브러리 [${libraryName}]에 대한 질문: ${question}`,
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  /**
   * 라이브러리 학습 Todo(노트)를 생성합니다.
   */
  async addLibraryTodo(params: AddLibraryTodoParams): Promise<boolean> {
    const { userId, libraryName, type } = params;

    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[학습] ${libraryName} - ${type}`,
      note_description: `${libraryName} 라이브러리의 ${type} 관련 과제입니다.`,
      note_labels: ["Library", type],
      created_at: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};
