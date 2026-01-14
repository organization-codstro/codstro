/**
 * [기획 페이지 목록 조회 파라미터]
 */
export interface GetPlanningPagesParams {
  projectId: string;
}

/**
 * [회의실 생성 파라미터]
 */
export interface CreateMeetingRoomParams {
  projectId: string;
  purpose: string;
  detail: string;
  roomType: "Feature" | "Free";
}

/**
 * [회의 요약 초기 생성 파라미터]
 */
export interface CreateInitialSummaryParams {
  roomId: string;
}
