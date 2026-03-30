import { supabase } from "../../db/supabase/supabase";
import {
  GetChatHistoryParams,
  SaveChatMessageParams,
  PausePlanningParams,
} from "../../types/api/ProjectPlanning/ProjectCreateChatPage";

/**
 * [ProjectCreateChatService]
 * 프로젝트 기획 2단계(AI 채팅) 메시지 저장 및 히스토리 조회를 담당합니다.
 * 유저 메시지 저장 후 Edge Function을 직접 호출해 AI 응답을 받습니다.
 */
export const ProjectCreateChatService = {
  /**
   * [이전 대화 내역 불러오기]
   * @table project_planning_logs
   */
  async getChatHistory(params: GetChatHistoryParams) {
    try {
      const { data, error } = await supabase
        .from("project_planning_logs")
        .select("*")
        .eq("project_id", params.projectId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error("[ProjectCreateChatService.getChatHistory Error]:", error);
      throw error;
    }
  },

  /**
   * [유저 메시지 저장]
   * @table project_planning_logs
   */
  async saveChatMessage(params: SaveChatMessageParams) {
    try {
      const { data, error } = await supabase
        .from("project_planning_logs")
        .insert([
          {
            project_id: params.projectId,
            project_planning_log_sender: params.sender,
            project_planning_log_message: params.message,
            project_planning_log_index: params.meetingIndex,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[ProjectCreateChatService.saveChatMessage Error]:", error);
      throw error;
    }
  },

  /**
   * [AI 응답 요청]
   * Edge Function을 fire & forget으로 직접 호출합니다.
   * AI 응답은 DB에 저장되고 프론트 구독으로 수신됩니다.
   */
  async requestAiResponse(params: { projectId: string }) {
    supabase.functions
      .invoke("project_planning-ai_chat", {
        body: { project_id: params.projectId },
      })
      .catch((err) => {
        console.error("[requestAiResponse error]:", err);
      });
  },

  /**
   * [기획 중단/임시 저장]
   */
  async pausePlanning(params: PausePlanningParams) {
    const { error } = await supabase
      .from("project_plannings")
      .update({ updated_at: new Date().toISOString() })
      .eq("project_id", params.projectId);

    if (error) throw error;
  },

  //ai가 만들어준 프로젝트 기본정보 가져오는 함수
  async generateProjectInfo({ projectId }: { projectId: string }) {
    const { data, error } = await supabase.functions.invoke(
      "project-create-basic_information",
      {
        body: { project_id: projectId },
      },
    );

    if (error) {
      throw new Error(error.message || "AI 분석 실패");
    }

    return data; // { success, todos }
  },
};
