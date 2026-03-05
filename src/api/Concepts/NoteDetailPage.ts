import { supabase } from "../../db/supabase/supabase";
import {
  GetNoteDetailParams,
  DeleteNoteDetailParams,
  SummarizeNoteWithAIParams,
  NoteDetailResponse,
} from "../../types/api/Concepts/NoteDetailPage";

/**
 * [NoteDetailService]
 * 특정 노트의 상세 내용을 조회하고 삭제하는 기능을 담당합니다.
 * 참조 테이블: notes, note_concepts
 */
export const NoteDetailService = {
  /**
   * [조회] 특정 ID의 노트 상세 정보와 연결된 개념들을 가져옵니다.
   */
  /**
   * [조회] 특정 ID의 노트 상세 정보와 연결된 개념들을 가져옵니다.
   */
  async getNoteDetail(
    params: GetNoteDetailParams,
  ): Promise<NoteDetailResponse> {
    // 1. 노트 기본 정보 조회
    const { data: note, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        content:note_content,
        lastUpdated:updated_at
      `,
      )
      .eq("note_id", params.noteId)
      .single();

    if (error) throw new Error(error.message);

    // 2. 연결된 개념 조회
    const { data: concepts } = await supabase
      .from("note_concepts")
      .select(
        `
        concept_description_materials(concept_description_material_name),
        tool_description_materials(tool_description_material_name),
        librarie_description_materials(librarie_description_material_name),
        package_manager_description_materials(package_manager_description_material_name),
        third_party_services_description_materials(third_party_services_description_material_name)
      `,
      )
      .eq("note_id", params.noteId);

    // 이름 추출 헬퍼 함수
    const extractNames = (
      concepts: any[] | null,
      relation: string,
      field: string,
    ): string[] => {
      return (
        concepts?.map((c) => c[relation]?.[0]?.[field]).filter(Boolean) ?? []
      );
    };

    // 3. 이름 배열 생성
    const conceptNames = extractNames(
      concepts,
      "concept_description_materials",
      "concept_description_material_name",
    );

    const toolNames = extractNames(
      concepts,
      "tool_description_materials",
      "tool_description_material_name",
    );

    const libraryNames = extractNames(
      concepts,
      "librarie_description_materials",
      "librarie_description_material_name",
    );

    const packageManagerNames = extractNames(
      concepts,
      "package_manager_description_materials",
      "package_manager_description_material_name",
    );

    const thirdPartyNames = extractNames(
      concepts,
      "third_party_services_description_materials",
      "third_party_services_description_material_name",
    );

    return {
      noteId: note.id,
      title: note.title,
      lastUpdated: note.lastUpdated,
      content: note.content,
      conceptNames,
      toolNames,
      libraryNames,
      packageManagerNames,
      thirdPartyNames,
    };
  },
  /**
   * [삭제] 노트를 삭제합니다.
   * (스키마에 ON DELETE CASCADE가 설정되어 있지 않다면 note_concepts 관계를 먼저 삭제해야 합니다.)
   */
  async deleteNote(params: DeleteNoteDetailParams): Promise<boolean> {
    // 1. 관계 테이블 데이터 우선 삭제
    const { error: relError } = await supabase
      .from("note_concepts")
      .delete()
      .eq("note_id", params.noteId);

    if (relError) throw new Error(relError.message);

    // 2. 노트 본문 삭제
    const { error: noteError } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", params.noteId);

    if (noteError) throw new Error(noteError.message);

    return true;
  },

  /**
   * [AI 서비스] 노트 내용을 분석하여 요약본을 생성합니다.
   * Gemini API를 활용합니다.
   */
  async summarizeNoteWithAI(params: SummarizeNoteWithAIParams) {
    try {
      const response = await fetch("/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `다음 학습 노트 내용을 3줄로 요약해줘: ${params.content.substring(
            0,
            1000,
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
