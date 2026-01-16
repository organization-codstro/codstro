/**
 * [회의 타입]
 */
export type MeetingType = "Feature" | "Free";

/**
 * [회의 목록 아이템 인터페이스]
 */
export interface MeetingListItem {
  meeting_id: string;
  meeting_name: string;
  meeting_purpose: string;
  meeting_created_date: string;
  type: MeetingType;
}

/**
 * [프로젝트별 회의 목록 조회 파라미터]
 */
export interface GetMeetingListParams {
  projectId: string;
}

/**
 * [타입별 회의 목록 필터링 조회 파라미터]
 */
export interface GetMeetingsByTypeParams {
  projectId: string;
  type: MeetingType;
}
