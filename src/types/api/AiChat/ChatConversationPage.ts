export interface GetRoomInfoParams {
  roomId: number;
}

export interface GetMessagesParams {
  roomId: number;
}

export interface SendMessageParams {
  roomId: number;
  content: string;
  sender: "USER" | "AI";
  nextIndex: number;
}

export interface SubscribeToMessagesParams {
  roomId: number;
  callback: (payload: any) => void;
}

export interface MarkAsReadParams {
  roomId: number;
}

export interface GenerateAiReplyParams {
  roomId: number;
  userMessage: string;
  persona: any;
}
