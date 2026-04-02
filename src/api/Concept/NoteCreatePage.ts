import { supabase } from "../../db/supabase/supabase";

import {
  GetNoteByIdParams,
  CreateNoteParams,
} from "../../types/api/Concept/NoteCreatePage";

/**
 * [NoteCreateService]
 * 개인 학습 노트의 생성, 수정, 조회 및 AI 본문 생성을 담당합니다.
 * 참조 테이블: notes, note_concepts
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
   * [생성/수정] 노트를 생성 선택된 개념들과의 관계를 설정합니다.
   * 트랜잭션 처리를 위해 연달아 실행합니다.
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

    // 1. 노트 껍데기 먼저 저장 (content는 일단 빈 문자열)
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .insert({
        note_title: title,
        note_content: "", // AI가 채울 예정
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
        concept_description_material_id: c.type === "concept" ? c.id : null,
        tool_description_material_id: c.type === "tool" ? c.id : null,
        library_description_material_id: c.type === "library" ? c.id : null,
        package_manager_description_material_id:
          c.type === "packageManager" ? c.id : null,
        third_party_services_description_material_id:
          c.type === "thirdPartyService" ? c.id : null,
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
};
