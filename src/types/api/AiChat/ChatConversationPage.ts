export interface GetRoomInfoParams {
  roomId: string;
}

export interface GetMessagesParams {
  roomId: string;
}

export interface getChatRoomAIPersonasParams {
  roomId: string;
}
export interface getChatRoomAIPersonasResponse {
  ai_persona_id: string; // UUID
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
