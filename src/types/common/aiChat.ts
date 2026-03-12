export interface AIPersona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_description: string;
  ai_persona_personality: string;
  ai_persona_gender: string;
  ai_persona_age: number;
  ai_persona_preferred_features: string;
  ai_persona_speech_style: string;
  ai_persona_one_line_introduction?: string;
  ai_persona_profile_image_url?: string;
  created_at: string;
}

//getChatRoomAIPersonas에서 반환하는 chat room 에 있는 ai 정보들
export interface ChatRoomAI {
  chat_room_ai_id: string;
  ai_persona_name: string;
}
export interface AiUserSettings {
  user_ai_setting_call_me_name: string;
  user_ai_setting_ai_self_awareness: boolean;
  user_ai_setting_service_integration: boolean;
}

export interface ChatRoom {
  chat_room_id: string;
  user_id: string;
  chat_room_name: string;
  chat_room_type: "DAILY" | "PROJECT";
  chat_room_topics: string[];
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
  //전송한 사람
  chat_message_sender: "AI" | "USER";
  //내용
  chat_message_content: string;
  //이모지 id
  emoticon_id?: string;
  //포함되어있는 chat id
  chat_room_id: string;
  //메세지 위치
  chat_message_index: number;
  // 생성시간
  created_at: string;
  //이미지 id
  chat_message_img_content_url: string[];
  //멘션시 들어가는 에이전트 id
  mention_target_agent_id?: string;
  //답장
  chat_message_reply_message?: string;
  //답장시에 들어가는 ai 에이전트 id
  chat_message_reply_target_agent_id?: string;
  //메세지 타입
  chat_message_format: string;
  //메세지 의도
  chat_message_interaction_type: "CASUAL" | "ACTION_REQUEST";
}

export interface UserAiSettings {
  user_ai_setting_call_me_name: string;
  //자기를 ai로 인식할수 있는가
  user_ai_setting_ai_self_awareness: string;
  //ai 서비스 접근
  user_ai_setting_service_integration: string;
  //ai기본 감정
  user_ai_setting_emotion: string;
}

export interface UserAIFriend {
  user_ai_setting_id: string;
  ai_personas: AIPersona;
}

export interface UserRecord {
  ai_user_record_id: string;
  ai_user_record_summary: string;
  created_at: string;
  user_id: string;
}
