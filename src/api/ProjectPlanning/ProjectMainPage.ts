import { supabase } from "../../db/supabase/supabase";
import {
  GetActiveProjectsParams,
  GetPlanningProjectsParams,
  DeterminePlanningStepParams,
  DeleteProjectParams,
} from "../../types/api/ProjectPlanning/ProjectMainPage";

/**
 * [ProjectMainService]
 * 메인 페이지에서 사용되는 프로젝트 목록 조회 및 상태 관리 기능을 제공합니다.
 */
export const ProjectMainService = {
  /**
   * [진행 중인 프로젝트 조회]
   * 확정되어 projects 테이블에 저장된 프로젝트 목록을 가져옵니다.
   * @table projects
   */
  async getActiveProjects(params: GetActiveProjectsParams) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // UI 일관성을 위해 status 추가
      return data.map((project) => ({ ...project, project_status: "active" }));
    } catch (error) {
      console.error("[getActiveProjects Error]:", error);
      throw error;
    }
  },

  /**
   * [기획 중인 프로젝트 조회]
   * 아직 기획 단계에 있어 project_plannings 테이블에 있는 목록을 가져옵니다.
   * @table project_plannings
   */
  async getPlanningProjects(params: GetPlanningProjectsParams) {
    try {
      const { data, error } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // UI 일관성을 위해 status 추가
      return data.map((project) => ({
        ...project,
        project_status: "planning",
      }));
    } catch (error) {
      console.error("[getPlanningProjects Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 단계 판별 로직]
   * 기획 중인 프로젝트를 클릭했을 때, 저장된 필드 상태에 따라 이동할 단계를 결정합니다.
   * @param project 기획 중인 프로젝트 객체
   */
  async determinePlanningStep(params: DeterminePlanningStepParams) {
    try {
      // 1. 프로젝트 상세 데이터 조회
      const { data: project, error: projError } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("project_id", params.projectId)
        .single();

      if (projError) throw projError;

      // 2. 채팅 로그 존재 여부 확인 (1단계 vs 2단계 구분)
      const { count: logCount, error: logError } = await supabase
        .from("project_planning_logs")
        .select("*", { count: "exact", head: true })
        .eq("project_id", params.projectId);

      if (logError) throw logError;

      // [단계 판별]
      // Step 1: 로그가 전혀 없음 (입력 폼 단계)
      if (!logCount || logCount === 0) return { step: 1, data: project };

      // Step 2: 로그는 있으나 필수 정보(stacks, topic 등) 중 하나라도 null인 경우 (AI 채팅 단계)
      const isComplete =
        project.project_stacks &&
        project.project_topic &&
        project.project_description &&
        project.project_main_color;

      if (!isComplete) return { step: 2, data: project };

      // Step 3: 정보가 모두 채워짐 (최종 확인 단계)
      return { step: 3, data: project };
    } catch (error) {
      console.error("[determinePlanningStep Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 삭제]
   * 기획 여부에 따라 다른 테이블에서 연관 데이터를 cascade 삭제합니다.
   *
   * [기획중 삭제 순서]
   * project_planning_pages → project_planning_logs → project_plannings
   *
   * [활성 프로젝트 삭제 순서]
   * project_meeting_logs → project_meeting_summarys → project_meeting_rooms
   * todos → projects
   */
  async deleteProject(params: DeleteProjectParams) {
    const { projectId, isPlanning } = params;

    try {
      if (isPlanning) {
        // ── 기획중 프로젝트 삭제 ──────────────────────────────

        const { error: logsError } = await supabase
          .from("project_planning_logs")
          .delete()
          .eq("project_id", projectId);
        if (logsError) throw logsError;

        const { error: pagesError } = await supabase
          .from("project_planning_pages")
          .delete()
          .eq("project_id", projectId);
        if (pagesError) throw pagesError;

        const { error: planningError } = await supabase
          .from("project_plannings")
          .delete()
          .eq("project_id", projectId);
        if (planningError) throw planningError;
      } else {
        // ── 활성 프로젝트 삭제 ───────────────────────────────

        // 0. project_pages 삭제 (FK 때문에 먼저 삭제)
        const { error: pagesError } = await supabase
          .from("project_pages")
          .delete()
          .eq("project_id", projectId);
        if (pagesError) throw pagesError;

        // 1. 해당 프로젝트의 meeting room id 목록 조회
        const { data: rooms, error: roomsQueryError } = await supabase
          .from("project_meeting_rooms")
          .select("project_meeting_room_id")
          .eq("project_id", projectId);
        if (roomsQueryError) throw roomsQueryError;

        if (rooms && rooms.length > 0) {
          const roomIds = rooms.map((r) => r.project_meeting_room_id);

          // 2. meeting logs 삭제
          const { error: meetingLogsError } = await supabase
            .from("project_meeting_logs")
            .delete()
            .in("project_meeting_room_id", roomIds);
          if (meetingLogsError) throw meetingLogsError;

          // 3. meeting summarys 삭제
          const { error: meetingSummarysError } = await supabase
            .from("project_meeting_summarys")
            .delete()
            .in("project_meeting_room_id", roomIds);
          if (meetingSummarysError) throw meetingSummarysError;

          // 4. meeting rooms 삭제
          const { error: meetingRoomsError } = await supabase
            .from("project_meeting_rooms")
            .delete()
            .eq("project_id", projectId);
          if (meetingRoomsError) throw meetingRoomsError;
        }

        // 5. todos 삭제
        const { error: todosError } = await supabase
          .from("todos")
          .delete()
          .eq("project_id", projectId);
        if (todosError) throw todosError;

        // 6. 프로젝트 본체 삭제
        const { error: projectError } = await supabase
          .from("projects")
          .delete()
          .eq("project_id", projectId);
        if (projectError) throw projectError;
      }
    } catch (error) {
      console.error("[deleteProject Error]:", error);
      throw error;
    }
  },
};
