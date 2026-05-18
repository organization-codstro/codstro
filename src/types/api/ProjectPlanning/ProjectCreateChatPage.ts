import { PROJECT_STATUS_TYPE } from "../../../constants/ProjectPlanning/ProjectPlanning";

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
 * [기획 중단/임시 저장 파라미터]
 */
export interface PausePlanningParams {
  projectId: string;
}

// Edge Function이 반환하는 todo 원본 구조
export interface GeneratedTodo {
  todo_name: string;
  todo_content: string;
  todo_description?: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: PROJECT_STATUS_TYPE;
}

// generateProjectInfo 반환 타입
export interface GenerateProjectInfoResult {
  todos: GeneratedTodo[];
}
