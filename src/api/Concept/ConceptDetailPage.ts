import { supabase } from "../../db/supabase/supabase";

import {
  ConceptDetailResponse,
  GetConceptDetailParams,
  AddConceptTodoParams,
  DeleteConceptDetailParams,
  DeleteConceptDetailResponse,
} from "../../types/api/Concept/ConceptDetailPage";
import { Concept } from "../../types/common/Concepts";

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
      .from("concepts")
      .select(
        `
        id:concept_id,
        name:concept_name,
        field:concept_field,
        description:concept_description,
        content:concept_content,
        category:concept_category,
        officialSite:concept_document_url
      `,
      )
      .eq("concept_id", conceptId)
      .single();

    if (conceptError || !conceptData) {
      throw new Error("라이브러리 정보를 불러올 수 없습니다.");
    }

    const relatedItems: Concept[] = [];

    return {
      ...conceptData,
      tags: conceptData.category ?? [],
      relatedConcepts: relatedItems,
    };
  },

  /**
   * 라이브러리 학습 노트를 생성합니다.
   */
  async addConceptTodo(params: AddConceptTodoParams): Promise<boolean> {
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

  /**
   * 개념의 일부 정보를 업데이트 합니다.
   */
  async updateConceptMeta(params: {
    conceptId: string;
    title: string;
    description: string;
    labels: string[];
  }): Promise<void> {
    const { error } = await supabase
      .from("concepts")
      .update({
        concept_name: params.title,
        concept_description: params.description,
        concept_category: params.labels,
        updated_at: new Date().toISOString(),
      })
      .eq("concept_id", params.conceptId);

    if (error) throw new Error(error.message);
  },

  /**
   * 개념을 삭제합니다.
   * - 해당 개념만 연결된 노트는 함께 삭제
   * - 다른 개념도 연결된 노트는 관계만 끊고 노트는 유지
   */
  async deleteConcept(
    params: DeleteConceptDetailParams,
  ): Promise<DeleteConceptDetailResponse> {
    const { conceptId } = params;

    const { data: linkedNotes, error: linkedNotesError } = await supabase
      .from("note_concepts")
      .select("note_id")
      .eq("concept_id", conceptId);

    if (linkedNotesError) throw new Error(linkedNotesError.message);

    const noteIds = (linkedNotes ?? []).map((row) => row.note_id);

    const noteIdsToDelete: string[] = [];

    if (noteIds.length > 0) {
      const { data: noteCounts, error: noteCountsError } = await supabase
        .from("note_concepts")
        .select("note_id")
        .in("note_id", noteIds);

      if (noteCountsError) throw new Error(noteCountsError.message);

      const conceptCountByNote = (noteCounts ?? []).reduce<
        Record<string, number>
      >((acc, row) => {
        acc[row.note_id] = (acc[row.note_id] ?? 0) + 1;
        return acc;
      }, {});

      for (const noteId of noteIds) {
        if (conceptCountByNote[noteId] === 1) {
          noteIdsToDelete.push(noteId);
        }
      }
    }

    const { error: relError } = await supabase
      .from("note_concepts")
      .delete()
      .eq("concept_id", conceptId);

    if (relError) throw new Error(relError.message);

    if (noteIdsToDelete.length > 0) {
      const { error: noteError } = await supabase
        .from("notes")
        .delete()
        .in("note_id", noteIdsToDelete);

      if (noteError) throw new Error(noteError.message);
    }

    const { error: conceptError } = await supabase
      .from("concepts")
      .delete()
      .eq("concept_id", conceptId);

    if (conceptError) throw new Error(conceptError.message);

    return {
      deletedNoteCount: noteIdsToDelete.length,
      unlinkedNoteCount: noteIds.length - noteIdsToDelete.length,
    };
  },
};
