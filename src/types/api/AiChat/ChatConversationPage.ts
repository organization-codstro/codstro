export interface GetRoomInfoParams {
  roomId: string;
}

export interface GetMessagesParams {
  roomId: string;
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

export interface MarkAsReadParams {
  roomId: string;
}

export interface GenerateAiReplyParams {
  roomId: string;
  userMessage: string;
  persona: any;
}
