import { supabase } from "../../db/supabase/supabase";
import {
  CreateAIPersonaPayload,
  CreatePersonaWithFriendParams,
  CreateUserAISettingPayload,
} from "../../types/api/AiChat/CreateAIPersonaPage";
import { AIPersona } from "../../types/common/AiChat";

export const CreateAIPersonaService = {
  async createPersona(payload: CreateAIPersonaPayload): Promise<AIPersona> {
    const { data, error } = await supabase
      .from("ai_personas")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(`[createPersona Error]: ${error.message}`);
    return data as AIPersona;
  },

  async addPersonaAsFriend(payload: CreateUserAISettingPayload) {
    const { error } = await supabase.from("user_ai_settings").insert({
      user_id: payload.user_id,
      ai_persona_id: payload.ai_persona_id,
      user_ai_setting_call_me_name: payload.user_ai_setting_call_me_name,
      user_ai_setting_ai_self_awareness:
        payload.user_ai_setting_ai_self_awareness,
      user_ai_setting_service_integration:
        payload.user_ai_setting_service_integration,
      user_ai_setting_emotion: payload.user_ai_setting_emotion,
    });

    if (error) throw new Error(`[addPersonaAsFriend Error]: ${error.message}`);
  },

  async createPersonaWithFriend(params: CreatePersonaWithFriendParams) {
    const persona = await this.createPersona(params.persona);

    await this.addPersonaAsFriend({
      ...params.settings,
      ai_persona_id: persona.ai_persona_id,
    });

    return persona;
  },
};
