export interface GetRoomInfoParams {
  roomId: string;
}
export interface GetEmoticonsParams {
  page: number;
  limit: number;
  keyword?: string;
}

export interface GetMessagesParams {
  roomId: string;
}

export interface GetChatRoomAIPersonasParams {
  roomId: string;
}
export interface GetChatRoomAIPersonasResponse {
  /**
   * chat_room에 있는 ai 관계의 id
   */
  chat_room_ai_id: string; // UUID
  ai_persona_name: string; // 이름
}

export interface SendMessageParams {
  roomId: string;
  content: string;
  sender: "USER" | "AI";
  nextIndex: number;
}

export interface SubscribeToMessagesParams {
  roomId: string;
  callback: (payload: any) => void;
}

export interface GenerateAiReplyParams {
  roomId: string;
  userMessage: string;
  persona: any;
}
