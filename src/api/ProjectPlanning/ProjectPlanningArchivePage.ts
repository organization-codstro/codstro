import { supabase } from "../../db/supabase/supabase";
import {
  Project,
  GetArchivedProjectsParams,
  ExtendProjectPeriodParams,
} from "../../types/api/ProjectPlanning/ProjectPlanningArchivePage";

/**
 * [ProjectArchiveService]
 * 마감일이 지난 아카이브된 프로젝트 목록 조회를 담당합니다.
 */
export const ProjectArchiveService = {
  /**
   * [아카이브된 프로젝트 목록 조회]
   * project_end_date가 현재 날짜보다 이전인 프로젝트를 가져옵니다.
   * @table projects
   */
  async getArchivedProjects(params: GetArchivedProjectsParams) {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", params.userId)
        .lt("project_end_date", today) // Less Than (마감일 < 오늘)
        .order("project_end_date", { ascending: false });

      if (error) throw error;

      // UI 호환성을 위해 상태값 추가
      return data.map((project) => ({
        ...project,
        project_status: "active", // 테이블 기준 active이나 기간이 만료된 상태
      })) as Project[];
    } catch (error) {
      console.error("[getArchivedProjects Error]:", error);
      throw error;
    }
  },

  /**
   * [프로젝트 복구 또는 기간 연장 (선택 사항)]
   * 아카이브된 프로젝트의 마감일을 수정하여 다시 활성화할 때 사용합니다.
   */
  async extendProjectPeriod(params: ExtendProjectPeriodParams) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .update({ project_end_date: params.newEndDate })
        .eq("project_id", params.projectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[extendProjectPeriod Error]:", error);
      throw error;
    }
  },
};
