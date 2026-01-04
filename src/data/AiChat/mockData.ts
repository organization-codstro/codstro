import { AIPersona, ChatRoom, ChatMessage } from "../../types/AiChat/aiChat";

export const mockAIPersonas: AIPersona[] = [
  {
    ai_persona_id: 1,
    ai_persona_name: "Luna",
    ai_persona_gender: "Female",
    ai_persona_personality: "Playful",
    ai_persona_preferred_features: "Development, Daily Life",
    ai_persona_speech_style: "Casual, Friendly",
    ai_persona_created_date: "2024-01-15",
    ai_persona_age: 22,
  },
  {
    ai_persona_id: 2,
    ai_persona_name: "Alex",
    ai_persona_gender: "Male",
    ai_persona_personality: "Calm",
    ai_persona_created_date: "2024-02-20",
    ai_persona_age: 25,
    ai_persona_preferred_features: "Project Planning, Code Review",
    ai_persona_speech_style: "Professional, Mentoring",
  },
  {
    ai_persona_id: 3,
    ai_persona_name: "Sky",
    ai_persona_gender: "Non-binary",
    ai_persona_personality: "Empathetic",
    ai_persona_preferred_features: "Daily Talk, Emotional Support",
    ai_persona_speech_style: "Warm, Understanding",
    ai_persona_created_date: "2024-03-10",
    ai_persona_age: 24,
  },
];

export const mockChatRooms: ChatRoom[] = [
  {
    chat_room_id: 1,
    chat_room_name: "Daily Reflection",
    chat_room_type: "daily",
    chat_room_daily_is_main: true,
    chat_room_topics: "Daily Life, Coding Journey",
    chat_room_created_date: "2024-12-01",
    user_id: 1,
    chat_rooms_unconfirmed: 2,
  },
  {
    chat_room_id: 2,
    chat_room_name: "React Project Help",
    chat_room_type: "project",
    chat_room_topics: "React, TypeScript",
    chat_room_created_date: "2024-12-15",
    user_id: 1,
    chat_rooms_unconfirmed: 0,
  },
];

export const mockMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      chat_message_id: 1,
      chat_message_sender: "AI",
      chat_message_content: "Hi! How was your coding today?",
      chat_message_sent_at: "2024-12-25T10:00:00",
      daily_chat_rooms_id: 1,
    },
    {
      chat_message_id: 2,
      chat_message_sender: "USER",
      chat_message_content: "It was great! I learned React hooks.",
      chat_message_sent_at: "2024-12-25T10:05:00",
      daily_chat_rooms_id: 1,
    },
  ],
  2: [
    {
      chat_message_id: 3,
      chat_message_sender: "AI",
      chat_message_content:
        "Welcome to your project chat! What are you building?",
      chat_message_sent_at: "2024-12-25T09:00:00",
      daily_chat_rooms_id: 2,
    },
  ],
};

export const mockUserRecord = {
  ai_user_record_id: 1,
  ai_user_record_summary:
    "User is learning React and TypeScript. Shows interest in web development and UI/UX design. Prefers practical projects over theory.",
  ai_user_record_created_date: "2024-12-01",
  user_id: 1,
};
