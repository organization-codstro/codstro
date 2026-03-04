import { supabase } from "../../db/supabase/supabase";
import {
  CreateMeetingRoomParams,
  GetPlanningPagesParams,
  CreateInitialSummaryParams,
} from "../../types/api/ProjectPlanning/MeetingCreatePage";

/**
 * [MeetingCreateService]
 * 프로젝트 기획 단계에서의 회의 생성 및 관련 페이지 조회를 담당합니다.
 */
export const MeetingCreateService = {
  /**
   * [기획 페이지 목록 조회]
   * 회의 생성 시 선택할 수 있는 기획 단계의 페이지 목록을 가져옵니다.
   * @table project_planning_pages
   * @param projectId 조회할 프로젝트의 ID
   */
  async getPlanningPages(params: GetPlanningPagesParams) {
    try {
      const { data, error } = await supabase
        .from("project_planning_pages")
        .select("*")
        .eq("project_id", params.projectId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[MeetingCreateService.getPlanningPages Error]:", error);
      throw error;
    }
  },

  /**
   * [회의실 생성]
   * 유저가 입력한 목적과 유형을 바탕으로 새로운 회의 세션을 생성합니다.
   * @table project_meeting_rooms
   * @param params 회의 생성을 위한 데이터 (목적, 상세 정보, 프로젝트 ID, 유형 등)
   */
  async createMeetingRoom(params: CreateMeetingRoomParams) {
    try {
      const { data, error } = await supabase
        .from("project_meeting_rooms")
        .insert([
          {
            project_id: params.projectId,
            project__meeting_purpose: params.purpose,
            project_meeting_detail: params.detail,
            project_meeting_room_type: params.roomType,
            project_meeting_index: 1,
            project_meeting_log_created_date: new Date().toISOString(),
            project_meeting_room_id: `room_${Date.now()}_${Math.floor(
              Math.random() * 1000
            )}`,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[MeetingCreateService.createMeetingRoom Error]:", error);
      throw error;
    }
  },

  /**
   * [회의 요약 초기 생성]
   * 회의실이 생성될 때 해당 회의의 요약 레코드도 함께 준비합니다.
   * @table project_meeting_summarys
   */
  async createInitialSummary(params: CreateInitialSummaryParams) {
    try {
      const { data, error } = await supabase
        .from("project_meeting_summarys")
        .insert([
          {
            project_meeting_summary_id: `sum_${params.roomId}`,
            project_meeting_room_id: params.roomId,
            "project meeting summary":
              "회의가 시작되었습니다. 요약 내용이 여기에 표시됩니다.",
            project_meeting_summary_meeting_index: 1,
          },
        ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[MeetingCreateService.createInitialSummary Error]:", error);
      throw error;
    }
  },
};
