import { supabase } from "../../db/supabase/supabase";
import { NoteSummaryResponse } from "../../types/api/Concepts/NotesListPage";

/**
 * [NoteListService]
 * 유저의 개인 노트 목록 조회 및 검색 기능을 담당합니다.
 * 참조 테이블: notes
 */
export const NoteListService = {
  /**
   * [조회] 특정 유저의 모든 노트 리스트를 최신 수정일 순으로 가져옵니다.
   * @param userId 현재 로그인한 유저의 ID
   */
  async getUserNotes(userId: number): Promise<NoteSummaryResponse[]> {
    const { data, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        concepts:note_labels,
        lastUpdated:created_date,
        preview:note_description
      `
      )
      .eq("user_id", userId)
      .order("created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((note) => ({
      ...note,
      // description이 비어있을 경우를 대비한 처리
      preview: note.preview || "내용 요약이 없습니다.",
    }));
  },

  /**
   * [검색] 노트 제목 또는 포함된 개념(Labels)에서 키워드를 검색합니다.
   */
  async searchUserNotes(
    userId: number,
    keyword: string
  ): Promise<NoteSummaryResponse[]> {
    const { data, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        concepts:note_labels,
        lastUpdated:created_date,
        preview:note_description
      `
      )
      .eq("user_id", userId)
      // 제목에 포함되거나, labels(array)에 해당 키워드가 포함된 경우
      .or(`note_title.ilike.%${keyword}%,note_labels.cs.{${keyword}}`)
      .order("created_date", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((note) => ({
      ...note,
      preview: note.preview || "내용 요약이 없습니다.",
    }));
  },
};
