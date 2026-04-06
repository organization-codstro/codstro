import { supabase } from "../../db/supabase/supabase";
import {
  GetConceptContentByIdParams,
  GetConceptContentByIdResponse,
  ConceptUpdateAIRequest,
  ConceptUpdateAIResponse,
} from "../../types/api/Concept/ConceptUpdatePage";

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

export const ConceptUpdatePageService = {
  async getConceptContentById(
    params: GetConceptContentByIdParams,
  ): Promise<GetConceptContentByIdResponse> {
    const { data: concept, error } = await supabase
      .from("concepts")
      .select(
        `
          content:concept_content
        `,
      )
      .eq("concept_id", params.conceptId)
      .single();

    if (error) throw new Error(error.message);
    return {
      content: concept.content,
    };
  },

  async saveConcept({
    conceptId,
    content,
  }: {
    conceptId: string;
    content: string;
  }): Promise<void> {
    const { error } = await supabase
      .from("concepts")
      .update({
        concept_content: content,
        updated_at: new Date().toISOString(),
      })
      .eq("concept_id", conceptId);

    if (error) throw new Error(error.message);
  },

  async callAI({
    conceptId,
    messages,
  }: ConceptUpdateAIRequest): Promise<ConceptUpdateAIResponse> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "concepts-concept_ai_update_chat",
        {
          body: { conceptId, messages },
        },
      );

      if (error) throw error;

      return data as ConceptUpdateAIResponse;
    } catch (err) {
      console.error("[callAI] Edge function invoke failed", err);
      throw new Error(
        `Edge Function error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  },
};
