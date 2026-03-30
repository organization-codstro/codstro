import { supabase } from "../../db/supabase/supabase";

import {
  GetNoteByIdParams,
  GenerateNoteContentParams,
  DeleteNoteParams,
  CreateNoteParams,
} from "../../types/api/Concepts/NoteCreatePage";

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
      content,
      labels = [],
      userId,
      concepts = [],
      description,
    } = params;

    // 1. 노트 본문 저장 (notes 테이블)
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .insert({
        note_title: title,
        note_content: content,
        note_labels: labels,
        note_description: description,
        user_id: userId,
        created_at: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (noteError) throw noteError;

    // 2. note_concepts에 type별 컬럼 매핑
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

    return note;
  },

  /**
   * [AI 서비스] 선택된 개념 키워드들을 기반으로 노트의 초안 마크다운을 생성합니다.
   * Gemini API를 사용합니다.
   */
  async generateNoteContent(params: GenerateNoteContentParams) {
    try {
      const response = await fetch("/api/gemini/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${params.concepts.join(
            ", ",
          )} 개념들을 포함한 학습 노트 초안을 마크다운 형식으로 작성해줘.`,
        }),
      });

      if (!response.ok) throw new Error("AI 생성에 실패했습니다.");
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("Gemini Note Generation Error:", error);
      throw error;
    }
  },

  /**
   * [삭제] 노트를 삭제합니다. (CASCADE 설정 시 note_concepts도 자동 삭제됨)
   */
  async deleteNote(params: DeleteNoteParams) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", params.noteId);

    if (error) throw error;
    return true;
  },
};
