import { MATERIAL_TYPE } from "../../constants/Concepts/concepts";
import { concepts } from "../../data/Concepts/concepts";
import { supabase } from "../../db/supabase/supabase";

import {
  GetNoteByIdParams,
  UpdateNoteParams,
  GenerateNoteContentParams,
  getNoteConceptsParams,
  getNoteConceptsResponse,
} from "../../types/api/Concepts/NoteUpdatePage";
import { ConceptItem } from "../../types/common/concepts";

/**
 * [NoteCreateService]
 * 개인 학습 노트의 생성, 수정, 조회 및 AI 본문 생성을 담당합니다.
 * 참조 테이블: notes, note_concepts
 */
export const NoteUpdateService = {
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
   * [생성/수정] 노트를 저장하고 선택된 개념들과의 관계를 설정합니다.
   * 트랜잭션 처리를 위해 연달아 실행합니다.
   */
  async updateNote(params: UpdateNoteParams) {
    const { id, title, labels, userId, concept, description } = params;

    // 1️⃣ 노트 본문 저장 (notes 테이블)
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .upsert({
        note_id: id,
        note_title: title,
        note_labels: labels,
        user_id: userId,
        created_at: new Date().toISOString().split("T")[0],
        note_description: description,
      })
      .select()
      .single();

    if (noteError) throw noteError;

    // 2️⃣ 기존 관계 조회 (note_concepts 테이블)
    const { data: existingRelations, error: existingError } = await supabase
      .from("note_concepts")
      .select("*")
      .eq("note_id", note.note_id);

    if (existingError) throw existingError;

    // DB에 있는 material ID 배열
    const existingIds = existingRelations
      .flatMap((r) => [
        r.concept_description_material_id,
        r.tool_description_material_id,
        r.librarie_description_material_id,
        r.package_manager_description_material_id,
        r.third_party_services_description_material_id,
      ])
      .filter(Boolean);

    // 현재 선택된 material ID 배열
    const selectedIds = concept.map((c) => c.id);

    // 3️⃣ 삭제: DB에는 있는데 선택 안된 것
    const idsToDelete = existingIds.filter((id) => !selectedIds.includes(id));

    if (idsToDelete.length > 0) {
      const deleteFilters = idsToDelete
        .map(
          (id) =>
            `concept_description_material_id.eq.${id},tool_description_material_id.eq.${id},librarie_description_material_id.eq.${id},package_manager_description_material_id.eq.${id},third_party_services_description_material_id.eq.${id}`,
        )
        .join(",");

      await supabase.from("note_concepts").delete().or(deleteFilters);
    }

    // 4️⃣ 추가: 선택에는 있지만 DB에는 없는 것
    const idsToAdd = selectedIds.filter((id) => !existingIds.includes(id));

    if (idsToAdd.length > 0) {
      const relationData = concept
        .filter((c) => idsToAdd.includes(c.id))
        .map((c) => ({
          note_id: note.note_id,
          concept_description_material_id: c.type === "concept" ? c.id : null,
          tool_description_material_id: c.type === "tool" ? c.id : null,
          librarie_description_material_id: c.type === "librarie" ? c.id : null,
          package_manager_description_material_id:
            c.type === "package_manager" ? c.id : null,
          third_party_services_description_material_id:
            c.type === "third_party_service" ? c.id : null,
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

  //노트 업데이트 화면에서 노트와 연결되어 있는 id 반환
  async getNoteConcepts(
    params: getNoteConceptsParams,
  ): Promise<getNoteConceptsResponse> {
    const { NoteId } = params;

    // note_concepts에서 노트별 관계 조회 (join 없이 ID만)
    const { data: relations, error } = await supabase
      .from("note_concepts")
      .select(
        `
      concept_description_material_id,
      tool_description_material_id,
      librarie_description_material_id,
      package_manager_description_material_id,
      third_party_services_description_material_id
    `,
      )
      .eq("note_id", NoteId);

    if (error) throw error;

    const noteConceptIds: ConceptItem[] = [];

    relations?.forEach((rel) => {
      if (rel.concept_description_material_id)
        noteConceptIds.push({ id: rel.concept_description_material_id });
      if (rel.tool_description_material_id)
        noteConceptIds.push({ id: rel.tool_description_material_id });
      if (rel.librarie_description_material_id)
        noteConceptIds.push({ id: rel.librarie_description_material_id });
      if (rel.package_manager_description_material_id)
        noteConceptIds.push({
          id: rel.package_manager_description_material_id,
        });
      if (rel.third_party_services_description_material_id)
        noteConceptIds.push({
          id: rel.third_party_services_description_material_id,
        });
    });

    return { noteConceptIds };
  },

  /**
   * [삭제] 노트를 삭제합니다. (CASCADE 설정 시 note_concept도 자동 삭제됨)
   */
  // async deleteNote(params: DeleteNoteParams) {
  //   const { error } = await supabase
  //     .from("notes")
  //     .delete()
  //     .eq("note_id", params.noteId);

  //   if (error) throw error;
  //   return true;
  // },
};
