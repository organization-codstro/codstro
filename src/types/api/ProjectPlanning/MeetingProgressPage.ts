/**
 * [채팅 내역 불러오기 파라미터]
 */
export interface GetChatMessagesParams {
  roomId: string;
}

/**
 * [메시지 전송 및 저장 파라미터]
 */
export interface SaveMessageParams {
  roomId: string;
  sender: "AI" | "USER";
  message: string;
  meetingIndex: number;
}

/**
 * [AI 실시간 응답 생성 파라미터]
 */
export interface GetAiResponseParams {
  roomId: string;
  userMessage: string;
  meetingIndex: number;
}

export interface RequestAiResponseParams {
  roomId: string;
}

/**
 * [회의실 삭제 파라미터]
 */
export interface DeleteMeetingParams {
  roomId: string;
}

/**
 * [회의 인덱스 증가 및 저장 파라미터]
 */
export interface SaveMeetingSummaryParams {
  roomId: string;
}
