import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";

/**
 * [ProjectMeetingService]
 * 프로젝트 기획 회의와 관련된 모든 DB 작업 및 AI 연동을 담당합니다.
 */
export const ProjectMeetingService = {
  // ==========================================
  // 1. 조회 (Read) 관련 함수
  // ==========================================

  /**
   * [기획 페이지 목록 조회]
   * 회의 생성 시 참조할 페이지 목록을 가져옵니다.
   * @table project_planning_pages
   */
  async getPlanningPages(projectId: number) {
    const { data, error } = await supabase
      .from("project_planning_pages")
      .select("*")
      .eq("project_id", projectId);

    if (error) throw error;
    return data;
  },

  /**
   * [회의실 상세 정보 및 요약 조회]
   * 특정 회의실의 기본 정보와 가장 최근의 요약본을 함께 가져옵니다.
   * @table project_meeting_rooms, project_meeting_summarys
   */
  async getMeetingDetails(roomId: string) {
    try {
      // 회의실 정보 조회
      const { data: room, error: roomError } = await supabase
        .from("project_meeting_rooms")
        .select("*")
        .eq("project_meeting_room_id", roomId)
        .single();

      if (roomError) throw roomError;

      // 최신 요약본 조회
      const { data: summary } = await supabase
        .from("project_meeting_summarys")
        .select("*")
        .eq("project_meeting_room_id", roomId)
        .order("project_meeting_summary_meeting_index", { ascending: false })
        .limit(1)
        .single();

      return { room, summary: summary || null };
    } catch (error) {
      console.error("[getMeetingDetails Error]:", error);
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
  async createMeetingRoom(params: {
    projectId: number;
    purpose: string;
    detail: string;
    roomType: "Feature" | "Free";
  }) {
    const roomId = `room_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const { data, error } = await supabase
      .from("project_meeting_rooms")
      .insert([
        {
          project_meeting_room_id: roomId,
          project_id: params.projectId,
          project__meeting_purpose: params.purpose,
          project_meeting_detail: params.detail,
          project_meeting_room_type: params.roomType,
          project_meeting_index: 1,
          project_tasks_logs_created_date: new Date().toISOString(),
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
  async updateMeetingRoom(
    roomId: string,
    updates: {
      purpose?: string;
      detail?: string;
      date?: string;
    }
  ) {
    const { data, error } = await supabase
      .from("project_meeting_rooms")
      .update({
        project__meeting_purpose: updates.purpose,
        project_meeting_detail: updates.detail,
        project_tasks_logs_created_date: updates.date,
      })
      .eq("project_meeting_room_id", roomId)
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
  async updateMeetingSummary(summaryId: string, summaryText: string) {
    const { data, error } = await supabase
      .from("project_meeting_summarys")
      .update({ "project meeting summary": summaryText })
      .eq("project_meeting_summary_id", summaryId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ==========================================
  // 3. AI 연동 (Gemini + DB) 관련 함수
  // ==========================================

  /**
   * [AI 첫 가이드 생성 및 로그 저장]
   * 회의 시작 시 Gemini의 첫 메시지를 로그에 기록합니다.
   */
  async generateMeetingGuide(roomId: string, purpose: string, detail: string) {
    const prompt = `회의 목적: ${purpose}\n상세 정보: ${params.detail}\n위 내용을 바탕으로 회의를 시작하기 위한 가이드를 작성해줘.`;
    const aiResponse = await generateAiContent(prompt);

    const { data, error } = await supabase
      .from("project_tasks_logs")
      .insert([
        {
          project_meeting_room_id: roomId,
          project_tasks_log_sender: "AI",
          project_tasks_log_message: aiResponse,
          project_tasks_log_meeting_index: 1,
          project_tasks_log_created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [AI 자동 요약 생성 및 Upsert]
   * 대화 로그를 기반으로 요약을 생성하여 저장합니다.
   */
  async generateAndSaveSummary(roomId: string, meetingIndex: number) {
    // 1. 대화 로그 가져오기
    const { data: logs } = await supabase
      .from("project_tasks_logs")
      .select("project_tasks_log_sender, project_tasks_log_message")
      .eq("project_meeting_room_id", roomId)
      .order("project_tasks_log_created_at", { ascending: true });

    const history = logs
      ?.map(
        (l) => `${l.project_tasks_log_sender}: ${l.project_tasks_log_message}`
      )
      .join("\n");

    // 2. Gemini 요약 요청
    const prompt = `다음 대화 내용을 요약해줘:\n${history}`;
    const summaryResult = await generateAiContent(prompt);

    // 3. 요약 테이블 저장 (Upsert)
    const { data, error } = await supabase
      .from("project_meeting_summarys")
      .upsert({
        project_meeting_summary_id: `sum_${roomId}_idx_${meetingIndex}`,
        project_meeting_room_id: roomId,
        "project meeting summary": summaryResult,
        project_meeting_summary_meeting_index: meetingIndex,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
