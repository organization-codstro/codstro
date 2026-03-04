import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";
import {
  GetChatMessagesParams,
  SaveMessageParams,
  GetAiResponseParams,
  DeleteMeetingParams,
  IncrementMeetingIndexParams,
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
      .order("project_meeting_log_created_at", { ascending: true });

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
          project_meeting_log_created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * [AI 실시간 응답 생성]
   * 유저의 질문과 이전 대화 맥락을 파악하여 AI 답변을 생성하고 DB에 저장합니다.
   */
  async getAiResponse(params: GetAiResponseParams) {
    // 1. 맥락 파악을 위해 최근 대화 내역 가져오기 (최근 5개)
    const { data: history } = await supabase
      .from("project_meeting_logs")
      .select("project_meeting_log_sender, project_meeting_log_message")
      .eq("project_meeting_room_id", params.roomId)
      .order("project_meeting_log_created_at", { ascending: false })
      .limit(5);

    const context = history
      ?.reverse()
      .map(
        (m) =>
          `${m.project_meeting_log_sender}: ${m.project_meeting_log_message}`,
      )
      .join("\n");

    // 2. Gemini 프롬프트 구성
    const prompt = `이전 대화 내역:\n${context}\n\n사용자 메시지: ${params.userMessage}\n위 맥락을 바탕으로 적절한 답변을 해줘.`;
    const aiText = await generateAiContent(prompt);

    // 3. AI 답변 저장
    return await this.saveMessage({
      roomId: params.roomId,
      sender: "AI",
      message: aiText,
      meetingIndex: params.meetingIndex,
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
    // 1. 관련 로그 삭제
    await supabase
      .from("project_meeting_logs")
      .delete()
      .eq("project_meeting_room_id", params.roomId);
    // 2. 관련 요약 삭제
    await supabase
      .from("project_meeting_summarys")
      .delete()
      .eq("project_meeting_room_id", params.roomId);
    // 3. 회의실 삭제
    const { error } = await supabase
      .from("project_meeting_rooms")
      .delete()
      .eq("project_meeting_room_id", params.roomId);

    if (error) throw error;
    return true;
  },

  /**
   * [회의 인덱스 증가 및 저장]
   * 회의가 저장될 때 회차(Index)를 올리거나 상태를 갱신합니다.
   */
  async incrementMeetingIndex(params: IncrementMeetingIndexParams) {
    const { data, error } = await supabase
      .from("project_meeting_rooms")
      .update({ project_meeting_index: params.currentIndex + 1 })
      .eq("project_meeting_room_id", params.roomId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
