import { supabase } from "../../db/supabase/supabase";

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
  async getActiveProjects(userId: number) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("project_created_date", { ascending: false });

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
  async getPlanningProjects(userId: number) {
    try {
      const { data, error } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("user_id", userId)
        .order("project_created_date", { ascending: false });

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
  async determinePlanningStep(projectId: number) {
    try {
      // 1. 프로젝트 상세 데이터 조회
      const { data: project, error: projError } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("project_id", projectId)
        .single();

      if (projError) throw projError;

      // 2. 채팅 로그 존재 여부 확인 (1단계 vs 2단계 구분)
      const { count: logCount, error: logError } = await supabase
        .from("project_planning_logs")
        .select("*", { count: "exact", head: true })
        .eq("project_id", projectId);

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
   * [뉴스 데이터 조회 (Mock/RSS)]
   * Gemini API 등을 활용하거나 외부 RSS를 파싱하여 뉴스 데이터를 반환합니다.
   */
  async getTrendingNews() {
    // 실제 구현 시 RSS 파서나 AI 생성 함수 호출
    // 현재는 인터페이스 규격에 맞춰 반환
    return [
      {
        id: 1,
        title: "AI-powered development tools gaining popularity",
        date: "2026-01-10",
      },
      { id: 2, title: "Next-gen React patterns for 2026", date: "2026-01-09" },
      {
        id: 3,
        title: "The rise of Supabase in Enterprise",
        date: "2026-01-08",
      },
    ];
  },
};
