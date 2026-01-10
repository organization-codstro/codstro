export interface AIPersona {
  ai_persona_id: number;
  ai_persona_name: string;
  ai_persona_gender: string;
  ai_persona_personality: string;
  ai_persona_preferred_features: string;
  ai_persona_speech_style: string;
  ai_persona_created_date: string;
  ai_persona_age: number;
}

export interface ChatRoom {
  chat_room_id: number;
  chat_room_name: string;
  chat_room_type: 'daily' | 'project';
  chat_room_daily_is_main?: boolean;
  chat_room_topics: string;
  chat_room_created_date: string;
  user_id: number;
  chat_rooms_unconfirmed: number;
}

export interface ChatMessage {
  chat_message_id: number;
  chat_message_sender: 'AI' | 'USER';
  chat_message_content: string;
  chat_message_sent_at: string;
  emoticon_id?: number;
  daily_chat_rooms_id: number;
}

export interface UserAIFriend {
  user_ai_setting_id: number;
  ai_persona: AIPersona;
}

export interface UserRecord {
  ai_user_record_id: number;
  ai_user_record_summary: string;
  ai_user_record_created_date: string;
  user_id: number;
}
