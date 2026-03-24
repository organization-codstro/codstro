import { PROJECT_ROOM_TYPE } from "../../constants/ProjectPlanning/ProjectPlanning";
import { supabase } from "../../db/supabase/supabase";
import {
  GetMeetingListParams,
  GetMeetingsByTypeParams,
} from "../../types/api/ProjectPlanning/ProjectMeetingPage";
import { MeetingListItem } from "../../types/pages/ProjectPlanning/ProjectMeetingPage/ProjectMeetingPage";

/**
 * [ProjectMeetingListService]
 * 프로젝트 내의 회의실 목록 조회 및 필터링을 담당합니다.
 */
export const ProjectMeetingListService = {
  /**
   * [프로젝트별 회의 목록 조회]
   * 특정 프로젝트에 속한 모든 회의실 데이터를 가져옵니다.
   * @table project_meeting_rooms
   */
  async getMeetingList(params: GetMeetingListParams) {
    try {
      const { data, error } = await supabase
        .from("project_meeting_rooms")
        .select(
          `
          meeting_id:project_meeting_room_id,
          meeting_name:project_meeting_logs_created_date, 
          meeting_purpose:project__meeting_purpose,
          meeting_created_date:project_meeting_logs_created_date,
          type:project_meeting_room_type
        `,
        )
        .eq("project_id", params.projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // DB의 대문자/소문자 타입을 UI 타입(feature, free)으로 매핑
      return data.map((item) => ({
        ...item,
        type: item.type?.toLowerCase() as PROJECT_ROOM_TYPE,
      })) as MeetingListItem[];
    } catch (error) {
      console.error("[getMeetingList Error]:", error);
      throw error;
    }
  },

  /**
   * [타입별 회의 목록 필터링 조회 (서버측 필터링 필요 시)]
   * 전체를 불러와서 클라이언트에서 필터링할 수도 있지만, 데이터가 많을 경우 사용합니다.
   */
  async getMeetingsByType(params: GetMeetingsByTypeParams) {
    try {
      const { data, error } = await supabase
        .from("project_meeting_rooms")
        .select(
          `
          meeting_id:project_meeting_room_id,
          meeting_name:project_meeting_logs_created_date,
          meeting_purpose:project__meeting_purpose,
          meeting_created_date:project_meeting_logs_created_date,
          type:project_meeting_room_type
        `,
        )
        .eq("project_id", params.projectId)
        .eq(
          "project_meeting_room_type",
          params.type.charAt(0).toUpperCase() + params.type.slice(1),
        ) // 'feature' -> 'Feature'
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as MeetingListItem[];
    } catch (error) {
      console.error("[getMeetingsByType Error]:", error);
      throw error;
    }
  },
};
