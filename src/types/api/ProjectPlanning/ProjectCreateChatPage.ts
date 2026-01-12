/**
 * [이전 대화 내역 불러오기 파라미터]
 */
export interface GetChatHistoryParams {
  projectId: number;
}

/**
 * [메시지 저장 파라미터]
 */
export interface SaveChatMessageParams {
  projectId: number;
  sender: "AI" | "USER";
  message: string;
  meetingIndex: number;
}

/**
 * [AI 응답 생성 및 자동 저장 파라미터]
 */
export interface GetAiResponseParams {
  projectId: number;
  userMessage: string;
  history: any[];
}

/**
 * [기획 중단/임시 저장 파라미터]
 */
export interface PausePlanningParams {
  projectId: number;
}
