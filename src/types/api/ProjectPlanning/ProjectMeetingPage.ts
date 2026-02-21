import { PROJECT_ROOM_TYPE } from "../../../constants/ProjectPlanning/ProjectPlanning";

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
  type: PROJECT_ROOM_TYPE;
}
