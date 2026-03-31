import { supabase } from "../../db/supabase/supabase";
import {
  GetNoteContentByIdParams,
  GetNoteContentByIdResponse,
  NoteUpdateAIRequest,
  NoteUpdateAIResponse,
} from "../../types/api/Concepts/NoteUpdatePage";

/**
 * aiService.js
 *
 * Supabase Edge Function을 통해 AI에게 메시지를 보내고 응답을 받는 서비스 레이어.
 *
 * [Edge Function 응답 형식]
 *  { reply: string, updatedNote?: string | null }
 *   - reply       : AI의 답변 텍스트
 *   - updatedNote : 노트 수정이 필요한 경우 수정된 마크다운 전문, 없으면 null
 */

export const NoteUpdatePageService = {
  async getNoteContentById(
    params: GetNoteContentByIdParams,
  ): Promise<GetNoteContentByIdResponse> {
    // 1. 노트 기본 정보 조회
    const { data: note, error } = await supabase
      .from("notes")
      .select(
        `
          content:note_content
        `,
      )
      .eq("note_id", params.noteId)
      .single();

    if (error) throw new Error(error.message);
    return {
      content: note.content,
    };
  },

  //todo : 이거 구현
  async saveNote({}) {},

  async callAI({
    noteId,
    messages,
  }: NoteUpdateAIRequest): Promise<NoteUpdateAIResponse> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "concepts-note_ai_update_chat",
        {
          body: { noteId, messages },
        },
      );

      if (error) throw error;

      return data as NoteUpdateAIResponse;
    } catch (err) {
      console.error("[callAI] Edge function invoke failed", err);
      throw new Error(
        `Edge Function error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  },
};
