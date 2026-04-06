import { PAGE_SIZE } from "../../constants/Concepts/Concepts";
import { supabase } from "../../db/supabase/supabase";

import {
  GetNoteByIdParams,
  CreateNoteParams,
  GetConceptsByType,
} from "../../types/api/Concept/NoteCreatePage";

/**
 * [NoteCreateService]
 * 개인 학습 노트의 생성, 수정, 조회 및 AI 본문 생성을 담당합니다.
 * 참조 테이블: notes, note_concepts, concepts
 */
export const NoteCreateService = {
  /**
   * [조회] 특정 유저의 단일 노트 상세 내용을 가져옵니다.
   */
  async getNoteById(params: GetNoteByIdParams) {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("note_id", params.noteId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * [생성] 노트를 생성하고 선택된 개념들과의 관계를 설정합니다.
   */
  async createNote(params: CreateNoteParams) {
    const {
      title,
      prompt,
      labels = [],
      userId,
      concepts = [],
      description,
    } = params;

    // 1. 노트 껍데기 먼저 저장
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .insert({
        note_title: title,
        note_content: "",
        note_labels: labels,
        note_description: description,
        user_id: userId,
        created_at: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (noteError) throw noteError;

    // 2. note_concepts 관계 저장
    if (concepts.length > 0) {
      const relationData = concepts.map((c) => ({
        note_id: note.note_id,
        concept_id: c.id,
      }));

      const { error: relError } = await supabase
        .from("note_concepts")
        .insert(relationData);

      if (relError) throw relError;
    }

    // 3. Edge Function으로 AI 노트 생성 및 저장
    const { error: fnError } = await supabase.functions.invoke(
      "concepts-note_ai_create",
      {
        body: {
          note_id: note.note_id,
          user_id: userId,
          title,
          description,
          prompt,
          concepts,
          labels,
        },
      },
    );

    if (fnError) throw fnError;

    return note;
  },

  /**
   * concept_category 기준으로 concepts 조회
   * type: "all" 이면 전체, 아니면 해당 카테고리 필터링
   * page: 1-based
   */
  async getConceptsByType(params: GetConceptsByType): Promise<{
    data: any[];
    hasMore: boolean;
  }> {
    const { type, page } = params;
    const offset = (page - 1) * PAGE_SIZE;

    // 1. concepts 테이블에서 조회 (all이면 전체, 아니면 category 필터)
    let query = supabase
      .from("concepts")
      .select("concept_id, concept_name, concept_category, created_at")
      .order("created_at", { ascending: false });

    if (type !== "all") {
      query = query.contains("concept_category", [type]);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    const sorted = (data || []).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const pagedData = sorted.slice(offset, offset + PAGE_SIZE);

    return {
      data: pagedData.map((item) => ({
        id: item.concept_id,
        name: item.concept_name,
        category: item.concept_category,
        created_at: item.created_at,
      })),
      hasMore: offset + PAGE_SIZE < sorted.length,
    };
  },
};
