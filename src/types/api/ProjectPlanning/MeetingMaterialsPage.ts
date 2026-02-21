import { PROJECT_ROOM_TYPE } from "../../../constants/ProjectPlanning/ProjectPlanning";

/**
 * [기획 페이지 목록 조회 파라미터]
 */
export interface GetPlanningPagesParams {
  projectId: string;
}

/**
 * [회의실 상세 정보 및 요약 조회 파라미터]
 */
export interface GetMeetingDetailsParams {
  roomId: string;
}

/**
 * [회의실 생성 파라미터]
 */
export interface CreateMeetingRoomParams {
  projectId: string;
  purpose: string;
  detail: string;
  roomType: PROJECT_ROOM_TYPE;
}

/**
 * [회의 정보 업데이트 파라미터]
 */
export interface UpdateMeetingRoomParams {
  roomId: string;
  updates: {
    purpose?: string;
    detail?: string;
    date?: string;
  };
}

/**
 * [회의 요약본 직접 수정 파라미터]
 */
export interface UpdateMeetingSummaryParams {
  summaryId: string;
  summaryText: string;
}

/**
 * [AI 첫 가이드 생성 및 로그 저장 파라미터]
 */
export interface GenerateMeetingGuideParams {
  roomId: string;
  purpose: string;
  detail: string;
}

/**
 * [AI 자동 요약 생성 및 Upsert 파라미터]
 */
export interface GenerateAndSaveSummaryParams {
  roomId: string;
  meetingIndex: number;
}
