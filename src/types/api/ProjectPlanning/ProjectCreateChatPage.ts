/**
 * [이전 대화 내역 불러오기 파라미터]
 */
export interface GetChatHistoryParams {
  projectId: string;
}

/**
 * [메시지 저장 파라미터]
 */
export interface SaveChatMessageParams {
  projectId: string;
  sender: "AI" | "USER";
  message: string;
  meetingIndex: number;
}

/**
 * [AI 응답 생성 및 자동 저장 파라미터]
 */
export interface GetAiResponseParams {
  projectId: string;
  userMessage: string;
  history: any[];
}

/**
 * [기획 중단/임시 저장 파라미터]
 */
export interface PausePlanningParams {
  projectId: string;
}
