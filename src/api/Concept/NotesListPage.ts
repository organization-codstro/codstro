import { supabase } from "../../db/supabase/supabase";
import {
  NoteSummaryResponse,
  GetUserNotesParams,
  SearchUserNotesParams,
} from "../../types/api/Concept/NotesListPage";

/**
 * [NoteListService]
 * 유저의 개인 노트 목록 조회 및 검색 기능을 담당합니다.
 * 참조 테이블: notes
 */
export const NoteListService = {
  /**
   * [조회] 특정 유저의 모든 노트 리스트를 최신 수정일 순으로 가져옵니다.
   */
  async getUserNotes(
    params: GetUserNotesParams,
  ): Promise<NoteSummaryResponse[]> {
    const { data, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        concepts:note_labels,
        lastUpdated:updated_at,
        description:note_description
      `,
      )
      .eq("user_id", params.userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((note) => ({
      ...note,
    }));
  },

  /**
   * [검색] 노트 제목 또는 포함된 개념(Labels)에서 키워드를 검색합니다.
   */
  async searchUserNotes(
    params: SearchUserNotesParams,
  ): Promise<NoteSummaryResponse[]> {
    const { data, error } = await supabase
      .from("notes")
      .select(
        `
        id:note_id,
        title:note_title,
        concepts:note_labels,
        lastUpdated:created_at,
        description:note_description
      `,
      )
      .eq("user_id", params.userId)
      // 제목에 포함되거나, labels(array)에 해당 키워드가 포함된 경우
      .or(
        `note_title.ilike.%${params.keyword}%,note_labels.cs.{${params.keyword}}`,
      )
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((note) => ({
      ...note,
    }));
  },
};
