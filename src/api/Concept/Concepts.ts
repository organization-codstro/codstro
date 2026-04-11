import { supabase } from "../../db/supabase/supabase";
import {
  AIChatResponse,
  AIChatSource,
  AskConceptChatParams,
} from "../../types/common/Concepts";

export const ConceptsService = {
  /**
   * 기본개념 자세히 보기에서 chat 기능
   */
  async askChat(params: AskConceptChatParams): Promise<AIChatResponse> {
    const { data, error } = await supabase.functions.invoke(
      "concepts-concept_chat",
      {
        body: {
          concept_id: params.concept_id,
          messages: params.messages,
        },
      },
    );

    if (error) throw new Error(error.message);

    return {
      reply: data.reply as string,
      sources: (data.sources ?? []) as AIChatSource[],
    };
  },
};
