export interface AIPersona {
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_description: string;
  ai_persona_category?: string[];
  ai_persona_gender: string;
  ai_persona_personality: string;
  ai_persona_speech_style: string;
  ai_persona_age: number;
  ai_persona_preferred_topics?: string;
  ai_persona_preferred_features: string[] | string;
  ai_persona_one_line_introduction?: string;
  ai_persona_profile_image_path?: string;
  user_id?: string | null;
  created_at: string;
  updated_at?: string | null;
}
//채팅에서 사용하는 이모지
export interface Emoticon {
  emoticon_id: string;
  emoticon_name: string;
  emoticon_img_path: string;
  emoticon_tags: string[];
  created_at: string;
  updated_at: string | null;
}

//getChatRoomAIPersonas에서 반환한 정보가 합쳐져 MessageBubbleProps로 전해지는 타입
export interface ChatRoomAI {
  chat_room_ai_id: string;
  ai_persona_id: string;
  ai_persona_name: string;
  ai_persona_profile_image_path: string | null;
}

export interface AiUserSettings {
  //사용자를 부르는 호칠
  user_ai_setting_call_me_name: string;
  //자기 ai 인식
  user_ai_setting_ai_self_awareness: boolean;
  //서바스 접근 여부
  user_ai_setting_service_integration: boolean;
  //감정
  user_ai_setting_emotion?: string;
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
}

export type ChatMessageAttachmentType =
  | "image"
  | "camera_image"
  | "audio"
  | "file"
  | "link"
  | "location";

export interface ChatMessageMetadataAttachment {
  type: ChatMessageAttachmentType;
  storagePath?: string | null;
  thumbnailStoragePath?: string | null;
  originalFileName?: string | null;
  mimeType?: string | null;
  fileSizeBytes?: number | null;
  width?: number | null;
  height?: number | null;
  durationMs?: number | null;
  transcript?: string | null;
  url?: string | null;
  title?: string | null;
  description?: string | null;
  siteName?: string | null;
  imageUrl?: string | null;
  imageStoragePath?: string | null;
  provider?: string | null;
  placeName?: string | null;
  addressName?: string | null;
  roadAddressName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  kakaoPlaceId?: string | null;
  kakaoMapUrl?: string | null;
}

export interface LinkPreview {
  url: string;
  title: string | null;
  description: string | null;
  siteName: string | null;
  imageUrl: string | null;
  imageStoragePath: string | null;
  faviconUrl: string | null;
  status: "ready" | "failed";
}

export interface ChatMessageMetadata {
  version: number;
  attachments: ChatMessageMetadataAttachment[];
  client?: {
    platform: "web" | "ios" | "android" | "react_native" | string;
    appVersion?: string | null;
  };
}

export interface ChatMessage {
  // Primary Key
  chat_message_id: string; // uuid, PK, default: gen_random_uuid()

  // 전송한 사람
  chat_message_sender_type: "AI" | "USER"; // text, NOT NULL

  // AI 발신자일 경우 에이전트 id
  chat_message_sender_agent_id?: string; // uuid, nullable

  // 내용
  chat_message_content?: string; // text, nullable

  // 메세지 위치
  chat_message_index: number; // bigint, NOT NULL, default: 1

  // 이모지 id (FK -> emoticons.emoticon_id)
  emoticon_id?: string; // uuid, nullable

  // 포함되어있는 chat id (FK -> chat_rooms.chat_room_id)
  chat_room_id: string; // uuid, NOT NULL

  // 생성시간
  created_at?: string; // timestamp with time zone, nullable, default: now()

  // 수정시간
  updated_at?: string; // timestamp with time zone, nullable

  // 이미지 url 목록
  chat_message_file_content_path?: string[]; // ARRAY, nullable

  // 메시지 확장 메타데이터 (첨부, 링크, 위치, 클라이언트 정보)
  chat_message_metadata?: ChatMessageMetadata;

  // 메세지 타입
  chat_message_format: string; // text, NOT NULL, default: ''

  // 메세지 의도
  chat_message_interaction_type: "CASUAL" | "ACTION_REQUEST"; // text, NOT NULL, default: ''

  // 답장 메세지 id
  chat_message_reply_message_id?: string; // uuid, nullable

  // 답장 대상 AI 에이전트 id (FK -> chat_room_ai_settings.chat_room_ai_id)
  chat_message_reply_target_agent_id?: string; // uuid, nullable

  // 멘션 대상 AI 에이전트 id (FK -> chat_room_ai_settings.chat_room_ai_id)
  chat_message_mention_target_agent_id?: string; // uuid, nullable (renamed from mention_target_agent_id)
}

export interface TypingPersona {
  chat_room_ai_id: string;
  persona_name: string;
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
