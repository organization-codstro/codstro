import { supabase } from "../../db/supabase/supabase";
import {
  GetPlanningPagesParams,
  GetMeetingDetailsParams,
  CreateMeetingRoomParams,
  UpdateMeetingRoomParams,
  UpdateMeetingSummaryParams,
} from "../../types/api/ProjectPlanning/MeetingMaterialsPage";

/**
 * [ProjectMeetingService]
 * 프로젝트 기획 회의와 관련된 모든 DB 작업 및 AI 연동을 담당합니다.
 */
export const MeetingMaterialsService = {
  // ==========================================
  // 1. 조회 (Read) 관련 함수
  // ==========================================

  /**
   * [기획 페이지 목록 조회]
   * 회의 생성 시 참조할 페이지 목록을 가져옵니다.
   * @table project_planning_pages
   */
  async getPlanningPages(params: GetPlanningPagesParams) {
    const { data, error } = await supabase
      .from("project_planning_pages")
      .select("*")
      .eq("project_id", params.projectId);

    if (error) throw error;
    return data;
  },

  /**
   * [회의실 상세 정보 및 요약 조회]
   * 특정 회의실의 기본 정보와 가장 최근의 요약본을 함께 가져옵니다.
   * @table project_meeting_rooms, project_meeting_summarys
   */
  async getMeetingDetails(params: GetMeetingDetailsParams) {
    try {
      // 회의실 정보 조회
      const { data: room, error: roomError } = await supabase
        .from("project_meeting_rooms")
        .select("*")
        .eq("project_meeting_room_id", params.roomId)
        .single();

      if (roomError) throw roomError;

      // 최신 요약본 조회
      const { data: summary } = await supabase
        .from("project_meeting_summarys")
        .select("*")
        .eq("project_meeting_room_id", params.roomId)
        .order("project_meeting_summary_meeting_index", { ascending: false })
        .limit(1)
        .single();

      return { room, summary: summary || null };
    } catch (error) {
      console.error(
        "[MeetingMaterialsService.getMeetingDetails Error]:",
        error,
      );
      throw error;
    }
  },

  // ==========================================
  // 2. 생성 및 수정 (C/U) 관련 함수
  // ==========================================

  /**
   * [회의실 생성]
   * 새로운 회의 세션을 생성합니다.
   * @table project_meeting_rooms
   */
  async createMeetingRoom(params: CreateMeetingRoomParams) {
    const roomId = `room_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const { data, error } = await supabase
      .from("project_meeting_rooms")
      .insert([
        {
          project_meeting_room_id: roomId,
          project_id: params.projectId,
          project_meeting_purpose: params.purpose,
          project_meeting_detail: params.detail,
          project_meeting_room_type: params.roomType,
          project_meeting_index: 1,
          project_meeting_log_created_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [회의 정보 업데이트]
   * 이름(날짜), 목적, 상세 내용을 수정합니다.
   * @table project_meeting_rooms
   */
  async updateMeetingRoom(params: UpdateMeetingRoomParams) {
    const { data, error } = await supabase
      .from("project_meeting_rooms")
      .update({
        project_meeting_name: params.updates.name,
        project_meeting_purpose: params.updates.purpose,
        project_meeting_detail: params.updates.detail,
      })
      .eq("project_meeting_room_id", params.roomId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [회의 요약본 직접 수정]
   * 유저가 에디터에서 수정한 요약 내용을 저장합니다.
   * @table project_meeting_summarys
   */
  async updateMeetingSummary(params: UpdateMeetingSummaryParams) {
    const { data, error } = await supabase
      .from("project_meeting_summarys")
      .update({ project_meeting_summary: params.summaryText })
      .eq("project_meeting_summary_id", params.summaryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
