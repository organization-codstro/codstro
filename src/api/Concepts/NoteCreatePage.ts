import { supabase } from "../../db/supabase/supabase";

export interface NoteDetail {
  id?: number;
  title: string;
  content: string;
  labels: string[]; // concepts 목록을 labels로 활용
  userId: number;
}

export interface AvailableConcept {
  id: string;
  name: string;
  type: string;
}

/**
 * [NoteService]
 * 개인 학습 노트의 생성, 수정, 조회 및 AI 본문 생성을 담당합니다.
 * 참조 테이블: notes, note_concept
 */
export const NoteService = {
  /**
   * [조회] 특정 유저의 단일 노트 상세 내용을 가져옵니다.
   */
  async getNoteById(noteId: string) {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("note_id", noteId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * [생성/수정] 노트를 저장하고 선택된 개념들과의 관계를 설정합니다.
   * 트랜잭션 처리를 위해 연달아 실행합니다.
   */
  async saveNote(noteData: NoteDetail, conceptIds: number[]) {
    const isEditing = !!noteData.id;

    // 1. 노트 본문 저장 (notes 테이블)
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .upsert({
        note_id: noteData.id, // 존재하면 수정, 없으면 생성
        note_title: noteData.title,
        note_content: noteData.content,
        note_labels: noteData.labels,
        user_id: noteData.userId,
        created_date: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (noteError) throw noteError;

    // 2. 기존 관계 삭제 (수정 모드일 경우 note_concept 초기화)
    if (isEditing) {
      await supabase.from("note_concept").delete().eq("note_id", note.note_id);
    }

    // 3. 신규 관계 등록 (note_concept 테이블)
    if (conceptIds.length > 0) {
      const relationData = conceptIds.map((cid) => ({
        note_id: note.note_id,
        concept_description_material_id: cid, // 편의상 concept_id 컬럼에 매핑
        // 나머지 material_id들은 기본값 1 또는 NULL 처리
        tool_description_material_id: 1,
        librarie_description_material_id: 1,
        package_manager_description__materials_id: 1,
        third_party_services_description_material_id: 1,
      }));

      const { error: relError } = await supabase
        .from("note_concept")
        .insert(relationData);

      if (relError) throw relError;
    }

    return note;
  },

  /**
   * [AI 서비스] 선택된 개념 키워드들을 기반으로 노트의 초안 마크다운을 생성합니다.
   * Gemini API를 사용합니다.
   */
  async generateNoteContent(concepts: string[]) {
    try {
      const response = await fetch("/api/gemini/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${concepts.join(
            ", "
          )} 개념들을 포함한 학습 노트 초안을 마크다운 형식으로 작성해줘.`,
        }),
      });

      if (!response.ok) throw new Error("AI 생성에 실패했습니다.");
      const data = await response.json();
      return data.content; // 생성된 마크다운 본문
    } catch (error) {
      console.error("Gemini Note Generation Error:", error);
      throw error;
    }
  },

  /**
   * [삭제] 노트를 삭제합니다. (CASCADE 설정 시 note_concept도 자동 삭제됨)
   */
  async deleteNote(noteId: number) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", noteId);

    if (error) throw error;
    return true;
  },
};
