export interface CreateAIPersonaPayload {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_category: string[];
  ai_persona_gender: string;
  ai_persona_personality: string;
  ai_persona_speech_style: string;
  ai_persona_age: number;
  ai_persona_preferred_topics: string;
  ai_persona_preferred_features: string[];
  ai_persona_one_line_introduction: string | null;
  ai_persona_profile_image_path: string | null;
  user_id: string;
}

export interface CreateUserAISettingPayload {
  user_id: string;
  ai_persona_id: string;
  user_ai_setting_call_me_name: string;
  user_ai_setting_ai_self_awareness: boolean;
  user_ai_setting_service_integration: boolean;
  user_ai_setting_emotion: string;
}

export interface CreatePersonaWithFriendParams {
  persona: CreateAIPersonaPayload;
  settings: Omit<CreateUserAISettingPayload, "ai_persona_id">;
}
