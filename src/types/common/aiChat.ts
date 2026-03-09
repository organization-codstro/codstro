export interface AIPersona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_description: string;
  ai_persona_image_url: string;
  ai_persona_personality: string;
  ai_persona_gender: string;
  ai_persona_age: number;
  ai_persona_preferred_features: string;
  ai_persona_speech_style: string;
  ai_persona_created_date: string;
}

export interface ChatRoom {
  chat_room_id: string;
  user_id: string;
  chat_room_name: string;
  chat_room_type: "DAILY" | "PROJECT";
  chat_room_topics: string;
  chat_room_latest_message_index: number;
  chat_room_last_read_message_index: number;
  created_at: string;
  chat_room_daily_is_main?: boolean;
  daily_new_chats?: {
    daily_new_chat: string;
  };
}

export interface ChatMessage {
  chat_message_id: string;
  chat_message_sender: "AI" | "USER";
  chat_message_content: string;
  chat_message_sent_at: string;
  emoticon_id?: string;
  daily_chat_rooms_id: string;
  chat_message_index: number;
}

export interface UserAIFriend {
  user_ai_setting_id: string;
  ai_persona: AIPersona;
}

export interface UserRecord {
  ai_user_record_id: string;
  ai_user_record_summary: string;
  ai_user_record_created_date: string;
  user_id: string;
}
