import { supabase } from "../../db/supabase/supabase";
import {
  GetChatMessagesParams,
  SaveMessageParams,
  DeleteMeetingParams,
  SaveMeetingSummaryParams,
  RequestAiResponseParams,
} from "../../types/api/ProjectPlanning/MeetingProgressPage";

/**
 * [MeetingProgressService]
 * 회의 진행, 채팅 로그 관리, AI 응답 및 회의실 제어를 담당합니다.
 */
export const MeetingProgressService = {
  // ==========================================
  // 1. 채팅 로그 (Messages) 관련 함수
  // ==========================================

  /**
   * [채팅 내역 불러오기]
   * 해당 회의실의 모든 대화 내역을 시간순으로 가져옵니다.
   * @table project_meeting_logs
   */
  async getChatMessages(params: GetChatMessagesParams) {
    const { data, error } = await supabase
      .from("project_meeting_logs")
      .select("*")
      .eq("project_meeting_room_id", params.roomId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * [메시지 전송 및 저장]
   * 유저나 AI의 메시지를 DB에 저장합니다.
   * @table project_meeting_logs
   */
  async saveMessage(params: SaveMessageParams) {
    const { data, error } = await supabase
      .from("project_meeting_logs")
      .insert([
        {
          project_meeting_room_id: params.roomId,
          project_meeting_log_sender: params.sender,
          project_meeting_log_message: params.message,
          project_meeting_log_meeting_index: params.meetingIndex,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [AI 응답 요청 - fire & forget]
   * Edge Function을 호출하고 응답을 기다리지 않습니다.
   * AI 응답은 realtime 구독으로 수신합니다.
   */
  requestAiResponse(params: RequestAiResponseParams) {
    supabase.functions
      .invoke("project_planning-meeting_ai_chat", {
        body: JSON.stringify({ room_id: params.roomId }),
        headers: { "Content-Type": "application/json" },
      })
      .catch((err) => {
        console.error("[requestAiResponse error]:", err);
      });
  },

  // ==========================================
  // 2. 회의실 상태 관리 (저장/삭제)
  // ==========================================

  /**
   * [회의실 삭제]
   * 회의실과 관련된 모든 로그 및 요약 정보를 삭제합니다. (Cascade 설정이 없을 경우 순차 삭제)
   * @table project_meeting_rooms, project_meeting_logs, project_meeting_summarys
   */
  async deleteMeeting(params: DeleteMeetingParams) {
    // 1. 관련 페이지 삭제 (FK 참조 해제)
    await supabase
      .from("project_meeting_room_pages")
      .delete()
      .eq("project_meeting_room_id", params.roomId);
    // 2. 관련 로그 삭제
    await supabase
      .from("project_meeting_logs")
      .delete()
      .eq("project_meeting_room_id", params.roomId);
    // 3. 관련 요약 삭제
    await supabase
      .from("project_meeting_summarys")
      .delete()
      .eq("project_meeting_room_id", params.roomId);
    // 4. 회의실 삭제
    const { error } = await supabase
      .from("project_meeting_rooms")
      .delete()
      .eq("project_meeting_room_id", params.roomId);

    if (error) throw error;
    return true;
  },

  /**
   * [회의 요약 저장 - Save Meeting]
   * project_planning-meeting_summation Edge Function을 호출합니다.
   * 내부적으로 요약 생성 → project_meeting_summarys 저장 → meeting_index +1 을 한 번에 처리합니다.
   */
  async saveMeetingSummary(params: SaveMeetingSummaryParams) {
    const { data, error } = await supabase.functions.invoke(
      "project_planning-meeting_summation",
      {
        body: JSON.stringify({ room_id: params.roomId }),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (error) throw error;
    if (data?.skipped) throw new Error("요약할 메시지가 없습니다.");
    return data; // { success, summary, previous_index, new_index }
  },
};
