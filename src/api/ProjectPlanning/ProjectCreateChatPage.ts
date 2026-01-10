import { supabase } from "../../db/supabase/supabase";
import { generateAiContent } from "../Gemini/Gemini";

/**
 * [ProjectChatService]
 * 프로젝트 기획 2단계(AI 채팅)에서의 메시지 저장 및 AI 응답 처리를 담당합니다.
 */
export const ProjectChatService = {
  /**
   * [이전 대화 내역 불러오기]
   * 기존에 진행 중이던 기획 채팅 로그를 가져옵니다.
   * @table project_planning_logs
   */
  async getChatHistory(projectId: number) {
    try {
      const { data, error } = await supabase
        .from("project_planning_logs")
        .select("*")
        .eq("project_id", projectId)
        .order("project_tasks_logs_created_at", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[getChatHistory Error]:", error);
      throw error;
    }
  },

  /**
   * [메시지 저장]
   * 유저 또는 AI의 메시지를 기획 로그 테이블에 저장합니다.
   * @table project_planning_logs
   */
  async saveChatMessage(params: {
    projectId: number;
    sender: "AI" | "USER";
    message: string;
    meetingIndex: number;
  }) {
    try {
      const { data, error } = await supabase
        .from("project_planning_logs")
        .insert([
          {
            project_id: params.projectId,
            project_tasks_logs_sender: params.sender,
            project_tasks_logs_message: params.message,
            project_tasks_logs_meeting_index: params.meetingIndex,
            project_tasks_logs_created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[saveChatMessage Error]:", error);
      throw error;
    }
  },

  /**
   * [AI 응답 생성 및 자동 저장]
   * 대화 맥락을 기반으로 Gemini 응답을 생성하고 DB에 기록합니다.
   */
  async getAiResponse(projectId: number, userMessage: string, history: any[]) {
    try {
      // 1. 맥락 파악 (최근 10개 대화 추출)
      const context = history
        .map(
          (m) =>
            `${m.sender || m.project_tasks_logs_sender}: ${
              m.message || m.project_tasks_logs_message
            }`
        )
        .join("\n");

      // 2. Gemini 프롬프트 구성 (나중에 프롬프트 고도화 가능)
      const prompt = `프로젝트 기획 중입니다. 아래 대화 맥락을 참고해서 사용자의 의견에 피드백을 주고 구체적인 기능을 제안해줘.\n\n맥락:\n${context}\n\n사용자 메시지: ${userMessage}`;

      const aiText = await generateAiContent(prompt);

      // 3. AI 답변 DB 저장
      const savedAiMsg = await this.saveChatMessage({
        projectId,
        sender: "AI",
        message: aiText,
        meetingIndex: 1, // 초기 기획은 index 1로 고정하거나 관리
      });

      return savedAiMsg;
    } catch (error) {
      console.error("[getAiResponse Error]:", error);
      throw error;
    }
  },

  /**
   * [기획 중단/임시 저장]
   * 현재까지의 대화 상태를 유지하고 메인으로 돌아갈 때 사용합니다.
   */
  async pausePlanning(projectId: number) {
    // 필요 시 project_plannings 테이블의 status나 수정일자를 업데이트
    const { error } = await supabase
      .from("project_plannings")
      .update({ project_created_date: new Date().toISOString().split("T")[0] })
      .eq("project_id", projectId);

    if (error) throw error;
  },
};
