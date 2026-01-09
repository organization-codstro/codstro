import { supabase } from "../../db/supabase/supabase";

export interface NoteDetailResponse {
  id: number;
  title: string;
  content: string;
  labels: string[]; // 스키마의 note_labels
  lastUpdated: string; // created_date 또는 별도 수정일
  userId: number;
  // 관계 데이터
  relatedConcepts?: any[];
}

/**
 * [NoteDetailService]
 * 특정 노트의 상세 내용을 조회하고 삭제하는 기능을 담당합니다.
 * 참조 테이블: notes, note_concept
 */
export const NoteDetailService = {
  /**
   * [조회] 특정 ID의 노트 상세 정보와 연결된 개념들을 가져옵니다.
   */
  async getNoteDetail(noteId: string): Promise<NoteDetailResponse> {
    // 1. 노트 기본 정보 조회
    const { data: note, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        content:note_content,
        labels:note_labels,
        lastUpdated:created_date,
        userId:user_id
      `
      )
      .eq("note_id", noteId)
      .single();

    if (error) throw new Error(error.message);

    // 2. 연결된 개념(Related Concepts) 정보 조회 (note_concept 테이블 조인)
    // 필요 시 note_concept를 통해 각 설명 자료 테이블의 제목을 가져오는 쿼리를 추가할 수 있습니다.
    const { data: concepts } = await supabase
      .from("note_concept")
      .select(
        `
        concept_description_materials(concept_description_material_title),
        tool_description_materials(tool_description_material_name),
        librarie_description_materials(librarie_description_material_name)
      `
      )
      .eq("note_id", noteId);

    return {
      ...note,
      relatedConcepts: concepts || [],
    };
  },

  /**
   * [삭제] 노트를 삭제합니다.
   * (스키마에 ON DELETE CASCADE가 설정되어 있지 않다면 note_concept 관계를 먼저 삭제해야 합니다.)
   */
  async deleteNote(noteId: string): Promise<boolean> {
    // 1. 관계 테이블 데이터 우선 삭제 (참조 무결성 유지)
    const { error: relError } = await supabase
      .from("note_concept")
      .delete()
      .eq("note_id", noteId);

    if (relError) throw new Error(relError.message);

    // 2. 노트 본문 삭제
    const { error: noteError } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", noteId);

    if (noteError) throw new Error(noteError.message);

    return true;
  },

  /**
   * [AI 서비스] 노트 내용을 분석하여 관련 키워드를 추출하거나 요약본을 생성합니다.
   * Gemini API를 활용합니다.
   */
  async summarizeNoteWithAI(content: string) {
    try {
      const response = await fetch("/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `다음 학습 노트 내용을 3줄로 요약해줘: ${content.substring(
            0,
            1000
          )}`,
        }),
      });
      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error("Gemini Summarization Error:", error);
      return null;
    }
  },
};
